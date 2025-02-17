import React from 'react';
import Register from '../../assets/Register.png';
import Apply from '../../assets/apply.png';
import Upload from '../../assets/Upload.png';

const Working = () => {
  return (
    <div className="flex flex-col justify-center items-center py-12 px-4 md:px-8 w-full bg-gradient-to-b from-green-200 to-green-150">
      <h1 className="text-3xl md:text-5xl text-charcoalGray font-semibold text-center">Working Process</h1>
      <h1 className="text-4xl md:text-6xl font-bold text-center text-charcoalGray mt-2">
        How It Works
      </h1>

      {/* Steps Container */}
      <div className="flex flex-wrap justify-center gap-8 mt-12 w-full">
        {/* Step 1 */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out w-full sm:w-[300px] lg:w-[350px]">
          <h1 className="text-softGreen text-5xl md:text-6xl font-bold">01</h1>
          <img
            src={Register}
            className="w-28 md:w-36 border-4 border-charcoalGray rounded-full my-4 transform hover:scale-110 transition-transform duration-300"
            alt="Register"
          />
          <h2 className="bg-softGreen text-white text-center py-3 text-lg md:text-2xl w-full rounded-md shadow-md hover:bg-green-600 transition duration-300 h-16 flex items-center justify-center">
            Register Your Account
          </h2>
          <p className="text-base md:text-xl mt-4 text-center text-charcoalGray">
            You need to create an account to apply for a job.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out w-full sm:w-[300px] lg:w-[350px]">
          <h1 className="text-softGreen text-5xl md:text-6xl font-bold">02</h1>
          <img
            src={Apply}
            className="w-28 md:w-36 border-4 border-charcoalGray rounded-full my-4 transform hover:scale-110 transition-transform duration-300"
            alt="Apply"
          />
          <h2 className="bg-softGreen text-white text-center py-3 text-lg md:text-2xl w-full rounded-md shadow-md hover:bg-green-600 transition duration-300 h-16 flex items-center justify-center">
            Apply For Your Dream Job
          </h2>
          <p className="text-base md:text-xl mt-4 text-center text-charcoalGray">
            Apply for the job you prefer, which suits your skills.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out w-full sm:w-[300px] lg:w-[350px]">
          <h1 className="text-softGreen text-5xl md:text-6xl font-bold">03</h1>
          <img
            src={Upload}
            className="w-28 md:w-36 border-4 border-charcoalGray p-2 rounded-full my-4 transform hover:scale-110 transition-transform duration-300"
            alt="Upload"
          />
          <h2 className="bg-softGreen text-white text-center py-3 text-lg md:text-2xl w-full rounded-md shadow-md hover:bg-green-600 transition duration-300 h-16 flex items-center justify-center">
            Upload your Portfolio
          </h2>
          <p className="text-base md:text-xl mt-4 text-center text-charcoalGray">
            Upload your portfolio to showcase your skills and more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Working;
