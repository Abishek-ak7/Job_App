import React from "react";
import { useParams } from "react-router-dom";

const MessagingPage = () => {
  const { employeeId } = useParams();

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold">
        Messaging Employee ID: {employeeId}
      </h1>
    </div>
  );
};

export default MessagingPage;
