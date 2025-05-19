const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Adding JWT for authentication
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // Increased limit for profile pictures

// Environment variables (in production, use proper env files)
const JWT_SECRET = "your-secret-key-should-be-in-env-file";
const PORT = process.env.PORT || 5000;

// Database connection
const db = new sqlite3.Database("./sqlite.db", (err) => {
  if (err) console.error("Database connection error:", err);
  else console.log("Connected to SQLite database.");
});

// Create users table if it doesn't exist with proper updated_at column
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT,
    lastName TEXT,
    email TEXT UNIQUE,
    password TEXT,
    phone TEXT,
    location TEXT,
    profilePicture TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

// Alternative way to ensure updated_at column exists
db.run(`
  ALTER TABLE users ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
`, (err) => {
  // Ignore "duplicate column" error - this is expected if column already exists
  if (err && !err.message.includes('duplicate column')) {
    console.error("Error adding updated_at column:", err);
  }
});

// Create employees table
db.run(`
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    position TEXT,
    email TEXT UNIQUE,
    organization TEXT,
    imageUrl TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

// Authentication middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Fetch employees from the database
app.get("/api/employees", (req, res) => {
  db.all(`SELECT * FROM employees`, [], (err, rows) => {
    if (err) return res.status(500).json({ message: "Database error", error: err.message });
    res.json(rows);
  });
});


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sreeabishek215@gmail.com", // Replace with your email
    pass: "ocaemznvekogsgah", // Use App Password if using Gmail
  },
});

app.post("/send-email", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required." });
  }

  const mailOptions = {
    from: "sreeabishek215@gmail.com",
    to: email,
    subject: "Welcome to Our Service!",
    text: "Thank you for subscribing! We're excited to have you on board.",
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});


// Register a user
app.post("/api/register", async (req, res) => {
  const { firstName, lastName, email, password, phone, location, profilePicture } = req.body;

  if (!firstName || !email || !password) {
    return res.status(400).json({ message: "First name, email, and password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      `INSERT INTO users (firstName, lastName, email, password, phone, location, profilePicture) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, email, hashedPassword, phone || null, location || null, profilePicture || null],
      function (err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(409).json({ message: "Email already registered" });
          }
          return res.status(500).json({ message: "Database error", error: err.message });
        }
        
        // Generate JWT token
        const token = jwt.sign({ id: this.lastID, email }, JWT_SECRET, { expiresIn: '24h' });
        
        res.status(201).json({ 
          message: "User registered successfully", 
          userId: this.lastID,
          token
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Error processing request", error: error.message });
  }
});

// Login a user
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err) return res.status(500).json({ message: "Database error", error: err.message });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

      // Generate JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          location: user.location,
          profilePicture: user.profilePicture,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Error processing request", error: error.message });
    }
  });
});

// Get user profile - protected route
app.get("/api/profile", authenticate, (req, res) => {
  const userEmail = req.user.email;

  db.get(
    `SELECT firstName, lastName, email, phone, location, profilePicture FROM users WHERE email = ?`,
    [userEmail],
    (err, row) => {
      if (err) return res.status(500).json({ message: "Error fetching profile", error: err.message });
      if (!row) return res.status(404).json({ message: "User not found" });

      res.json(row);
    }
  );
});

// Update user profile - protected route
app.put("/api/profile", authenticate, (req, res) => {
  const userEmail = req.user.email;
  const { firstName, lastName, phone, location, profilePicture } = req.body;

  // Validate input
  if (!firstName) {
    return res.status(400).json({ message: "First name is required" });
  }

  // Use a consistent query that works with or without the updated_at column
  // If the column doesn't exist, this will just ignore that part of the update
  db.run(
    `UPDATE users SET 
     firstName = ?, 
     lastName = ?, 
     phone = ?, 
     location = ?, 
     profilePicture = ?
     WHERE email = ?`,
    [firstName, lastName || null, phone || null, location || null, profilePicture || null, userEmail],
    function (err) {
      if (err) return res.status(500).json({ message: "Error updating profile", error: err.message });
      if (this.changes === 0) return res.status(404).json({ message: "User not found" });

      // Return updated profile
      db.get(
        `SELECT firstName, lastName, email, phone, location, profilePicture FROM users WHERE email = ?`,
        [userEmail],
        (err, row) => {
          if (err) return res.status(500).json({ message: "Error fetching updated profile" });
          res.json({ 
            message: "Profile updated successfully",
            profile: row
          });
        }
      );
    }
  );
});

// Delete user account - protected route
app.delete("/api/profile", authenticate, (req, res) => {
  const userEmail = req.user.email;

  db.run(
    `DELETE FROM users WHERE email = ?`,
    [userEmail],
    function (err) {
      if (err) return res.status(500).json({ message: "Error deleting account", error: err.message });
      if (this.changes === 0) return res.status(404).json({ message: "User not found" });

      res.json({ message: "Account deleted successfully" });
    }
  );
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));