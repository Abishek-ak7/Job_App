import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './components/Pages/Register';
import Main from "./components/Main/Main";
import FindJobsPage from "./components/Pages/FIndJobsPage";
import MessagingPage from "./components/Pages/MessagingPage";
import ProfilePage from "./components/Pages/ProfilePage";
import UserMessaging from "./components/Pages/UserMessaging";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Main />} />
        <Route path="/jobs" element={<FindJobsPage />} />
        <Route path="/msg/:employeeId" element={<UserMessaging />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/msg" element={<MessagingPage/>}/>
      </Routes>
    </Router>
  );
};

export default App;
