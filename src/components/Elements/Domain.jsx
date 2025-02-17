import React from 'react';

const Domain = ({ imgSrc, heading }) => {
  return (
    <div className="border-2 p-4 flex flex-col justify-center hover:scale-105 hover:z-10 items-center align-middle w-full h-auto bg-white rounded-lg shadow-md transition-all duration-300">
      <img src={imgSrc} alt={heading} className="w-16 h-16 border-2 p-2 rounded-full mb-4" />
      <h3 className="text-center text-lg font-semibold text-gray-700">{heading}</h3>
    </div>
  );
};

export default Domain;
