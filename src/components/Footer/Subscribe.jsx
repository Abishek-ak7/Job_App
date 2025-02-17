import React from 'react';

const Subscribe = () => {
  return (
    <div className="flex flex-col md:flex-row p-10 md:p-20 gap-10 ">
      {/* Left Section: Gradient Box with Heading and Text */}
      <div className="w-full md:w-1/2 bg-gradient-to-r from-blue-500 to-purple-500 p-12 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl">
        <h1 className="text-5xl font-extrabold text-white">Start Building for Free</h1>
        <p className="text-lg text-white mt-5 opacity-90">
          Your company is unique, and you need an identity solution that scales with your business. Let us help you get started.
        </p>
      </div>

      {/* Right Section: Subscription Form */}
      <div className="w-full md:w-1/2 p-12 rounded-lg bg-white shadow-lg md:shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-xl">
        <h2 className="text-3xl font-semibold text-gray-900">Subscribe Now</h2>
        <div className="mt-8 space-y-5">
          <input
            type="email"
            placeholder="Enter your work email"
            className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 ease-in-out hover:shadow-lg"
          />
          <button className="w-full bg-blue-600 text-white px-6 py-4 rounded-xl hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
            Subscribe
          </button>
        </div>
        <p className="text-gray-500 mt-4 text-center opacity-80">
          You’ll receive updates and pro tips directly to your inbox.
        </p>
      </div>
    </div>
  );
};

export default Subscribe;
