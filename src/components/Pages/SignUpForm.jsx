import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SocialMediaButtons from './SocialMediaButtons';

const SignUpForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};
    const { name, email, password } = formData;

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    const [firstName, ...lastNameParts] = formData.name.split(' ');
    const lastName = lastNameParts.join(' ') || '';

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email: formData.email, password: formData.password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Store user data and auth token
        const userData = { 
          firstName, 
          lastName, 
          email: formData.email 
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        
        if (data.token) {
          localStorage.setItem('authToken', data.token);
        }
        
        // Navigate to profile page with user data
        navigate('/profile', { state: { newUser: userData } });
      } else {
        setErrors({ apiError: data.message || "Registration failed." });
      }
    } catch (error) {
      setErrors({ apiError: "Error during registration. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="font-bold text-2xl text-center mb-6">Create Account</h1>
        {/* <SocialMediaButtons /> */}
        <p className="text-center text-sm mb-4">Or use your email for registration</p>

        {errors.apiError && <p className="text-red-500 text-sm text-center mb-4">{errors.apiError}</p>}
        
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              className="bg-gray-100 p-3 w-full rounded-md border border-gray-200"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="bg-gray-100 p-3 w-full rounded-md border border-gray-200"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-6">
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="bg-gray-100 p-3 w-full rounded-md border border-gray-200"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white font-bold py-3 rounded-full hover:bg-red-600 transition duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;