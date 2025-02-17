import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navigation/Navbar";

const employees = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Software Engineer",
    profilePicture: "https://i.pravatar.cc/150?img=10",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "UI/UX Designer",
    profilePicture: "https://i.pravatar.cc/150?img=20",
  },
  {
    id: 3,
    name: "Catherine Lee",
    role: "Project Manager",
    profilePicture: "https://i.pravatar.cc/150?img=30",
  },
  {
    id: 4,
    name: "David Kim",
    role: "DevOps Engineer",
    profilePicture: "https://i.pravatar.cc/150?img=40",
  },
];

const FindEmployeesPage = () => {
  const navigate = useNavigate();

  const handleMessageClick = (employeeId) => {
    navigate(`/msg/${employeeId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
        <Navbar/>
      <h1 className="text-3xl font-bold text-center text-indigo-800 mb-6">
        Find Employees
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4 hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={employee.profilePicture}
              alt={employee.name}
              className="w-16 h-16 rounded-full border-2 border-indigo-500"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">
                {employee.name}
              </h2>
              <p className="text-sm text-gray-500">{employee.role}</p>
            </div>
            <button
              onClick={() => handleMessageClick(employee.id)}
              className="p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full transition duration-300"
              title={`Message ${employee.name}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindEmployeesPage;
