import React from "react"; 

const MessagePage = ({ id }) => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold text-indigo-800">
        Messaging Employee ID: {id}
      </h1>
    </div>
  );
};

export default MessagePage;