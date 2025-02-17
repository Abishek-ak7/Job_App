import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Toggle the menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle the Profile Dropdown visibility
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <nav className="mx-[5%] p-4">
          {/* Desktop Navbar */}
          <div className="hidden md:flex justify-between items-center">
            <div className="text-xl font-bold">JobApp</div>
            <ul className="flex space-x-8">
              <li className="text-black hover:text-gray-200 md:mt-3"><a href='/'>Home</a></li>
              <li className="text-black hover:text-gray-200 md:mt-3"><a href='/jobs'>Find Jobs</a></li>
              <li className="text-black hover:text-gray-200 md:mt-3"><a href='/employee'>Find Employees</a></li>
              <li className="text-black hover:text-gray-200 md:mt-3"><a href='/msg'>Messages</a></li>
              <li className="text-black hover:text-gray-200 md:mt-3">Hire Talent</li>
              <li>
                <button className="bg-violet-600 rounded-full text-white p-3"><a href='/register'>Apply as Freelance</a></button>
              </li>
            </ul>
            
            {/* Profile Menu for Desktop */}
            <div className="relative">
              <button onClick={toggleProfileMenu} className="text-black p-3 hover:text-gray-200">
                <span className="text-lg font-semibold">Profile</span>
              </button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 bg-white shadow-lg rounded-lg w-48 mt-2">
                  <ul className="text-black">
                    <li className="px-4 py-2 hover:bg-gray-200">
                      <a href="/profile">My Profile</a>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200">
                      <a href="/settings">Settings</a>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200">
                      <a href="/logout">Logout</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navbar (Hamburger Menu) */}
          <div className="flex justify-between items-center md:hidden">
            <div className="text-xl font-bold">JobApp</div>

            {/* Hamburger Icon for Mobile */}
            <button 
              onClick={toggleMenu} 
              className="text-black ml-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Links */}
          <ul 
            className={`flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 bg-gray-800 md:bg-transparent p-4 md:p-0 ${isMenuOpen ? 'block' : 'hidden'}`}
          >
            <li className="text-white hover:text-gray-200"><a href='/'>Home</a></li>
            <li className="text-white hover:text-gray-200"><a href='/jobs'>Find Jobs</a></li>
            <li className="text-white hover:text-gray-200"><a href='/employee'>Find Employees</a></li>
            <li className="text-white hover:text-gray-200"><a href='/msg'>Messages</a></li>
            <li className="text-white hover:text-gray-200">Hire Talent</li>
            <li>
              <button className="bg-violet-600 rounded-full text-white p-3"><a href='/register'>Apply as Freelance</a></button>
            </li>

            {/* Profile Menu for Mobile */}
            <li className="relative">
              <button onClick={toggleProfileMenu} className="text-white p-3 hover:text-gray-200">
                Profile
              </button>
              {isProfileMenuOpen && (
                <div className="absolute left-0 bg-white shadow-lg rounded-lg w-48 mt-2">
                  <ul className="text-black">
                    <li className="px-4 py-2 hover:bg-gray-200">
                      <a href="/profile">My Profile</a>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200">
                      <a href="/settings">Settings</a>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200">
                      <a href="/logout">Logout</a>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </header>

      {/* Content Section */}
      {/* Ensure content is not hidden behind the fixed navbar by adding padding-top */}
      <div className="pt-20">
        {/* The rest of your page content goes here */}
      </div>
    </div>
  );
};

export default Navbar;
