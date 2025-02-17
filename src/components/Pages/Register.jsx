import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignIn";
import Navbar from "../Navigation/Navbar";

const Register = () => {
  const [isSignInVisible, setIsSignInVisible] = useState(true);

  const toggleFormVisibility = () => {
    setIsSignInVisible((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Navbar/>
      <div className="relative w-[800px] h-[500px] border-2 border-black rounded-lg overflow-hidden">
        {/* Left Side: Welcome Back or Hello, Friend */}
        <div
          className={`absolute inset-0 w-1/2 flex flex-col justify-center items-center p-8 text-white transition-all duration-1000 transform ${
            isSignInVisible ? "bg-blue-500 translate-x-0" : "bg-green-500 translate-x-full"
          }`}
        >
          {isSignInVisible ? (
            <>
              <h1 className="text-2xl font-bold mb-4">Welcome Back</h1>
              <p className="mb-6">
                To keep connected with us, please login with your details.
              </p>
              <button
                className="text-white border-2 px-6 py-2 font-bold rounded-full"
                onClick={toggleFormVisibility}
              >
                SIGN UP
              </button>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4">Hello, Friend</h1>
              <p className="mb-6">
                Enter your personal details and start your journey with us.
              </p>
              <button
                className="border-2 text-white px-6 py-2 font-bold rounded-full"
                onClick={toggleFormVisibility}
              >
                SIGN IN
              </button>
            </>
          )}
        </div>

        {/* Right Side: Form */}
        <div
          className={`absolute inset-0 w-1/2 flex justify-center items-center p-8 transition-all duration-500 transform ${
            isSignInVisible ? "bg-blue-50 translate-x-full" : "bg-green-50 translate-x-0"
          }`}
        >
          {isSignInVisible ? (
            <SignInForm />
          ) : (
            <SignUpForm />
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
