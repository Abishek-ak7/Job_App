import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status (e.g., from localStorage or API)
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleNavigation = (path) => {
    if (!isAuthenticated) {
      alert('Please log in or sign up to access this page.');
      navigate('/register'); // Redirect to login page
      return;
    }
    navigate(path);
  };

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <nav className="mx-[5%] p-4">
          {/* Desktop Navbar */}
          <div className="hidden md:flex justify-between items-center">
            <div className="text-xl font-bold">JobApp</div>
            <ul className="flex space-x-8">
              <li className="text-black hover:text-gray-200 md:mt-3 cursor-pointer" onClick={() => handleNavigation('/')}>Home</li>
              <li className="text-black hover:text-gray-200 md:mt-3 cursor-pointer" onClick={() => handleNavigation('/jobs')}>Find Jobs</li>
              <li className="text-black hover:text-gray-200 md:mt-3 cursor-pointer" onClick={() => handleNavigation('/msg')}>Messages</li>
              <li>
                <button className="bg-violet-600 rounded-full text-white p-3"><a href='/register'>Apply as Freelance</a></button>
              </li>
            </ul>
            {/* Profile Menu for Desktop */}
            {isAuthenticated && (
              <div className="relative">
                <button onClick={toggleProfileMenu} className="text-black p-3 hover:text-gray-200">
                  <span className="text-lg font-semibold">Profile</span>
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 bg-white shadow-lg rounded-lg w-48 mt-2">
                    <ul className="text-black">
                      <li className="px-4 py-2 hover:bg-gray-200"><a href="/profile">My Profile</a></li>
                      <li className="px-4 py-2 hover:bg-gray-200"><a href="/settings">Settings</a></li>
                      <li className="px-4 py-2 hover:bg-gray-200" onClick={() => { localStorage.removeItem('user'); setIsAuthenticated(false); navigate('/register'); }}>Logout</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Navbar (Hamburger Menu) */}
          <div className="flex justify-between items-center md:hidden">
            <div className="text-xl font-bold">JobApp</div>
            <button onClick={toggleMenu} className="text-black ml-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Links */}
          {isMenuOpen && (
            <ul className="flex flex-col bg-gray-800 p-4">
              <li className="text-white hover:text-gray-200 cursor-pointer" onClick={() => handleNavigation('/')}>Home</li>
              <li className="text-white hover:text-gray-200 cursor-pointer" onClick={() => handleNavigation('/jobs')}>Find Jobs</li>
              <li className="text-white hover:text-gray-200 cursor-pointer" onClick={() => handleNavigation('/msg')}>Messages</li>
              <li className="text-white hover:text-gray-200 cursor-pointer" onClick={() => handleNavigation('/hire')}>Hire Talent</li>
              <li>
                <button className="bg-violet-600 rounded-full text-white p-3"><a href='/register'>Apply as Freelance</a></button>
              </li>
              {isAuthenticated && (
                <li className="relative">
                  <button onClick={toggleProfileMenu} className="text-white p-3 hover:text-gray-200">Profile</button>
                  {isProfileMenuOpen && (
                    <div className="absolute left-0 bg-white shadow-lg rounded-lg w-48 mt-2">
                      <ul className="text-black">
                        <li className="px-4 py-2 hover:bg-gray-200"><a href="/profile">My Profile</a></li>
                        <li className="px-4 py-2 hover:bg-gray-200"><a href="/settings">Settings</a></li>
                        <li className="px-4 py-2 hover:bg-gray-200" onClick={() => { localStorage.removeItem('user'); setIsAuthenticated(false); navigate('/register'); }}>Logout</li>
                      </ul>
                    </div>
                  )}
                </li>
              )}
            </ul>
          )}
        </nav>
      </header>
      <div className="pt-20">{/* Ensure content is visible below navbar */}</div>
    </div>
  );
};

export default Navbar;