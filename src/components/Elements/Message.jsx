// Message.js
import React from 'react';

const Message = ({ message, isSentByUser }) => {
  return (
    <div
      className={`flex ${isSentByUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-xs p-4 rounded-lg text-white shadow-md ${
          isSentByUser ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gray-300 text-gray-800'
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default Message;
