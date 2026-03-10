import React from "react";

const AuthCard = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-md w-full max-w-md">
        <div className="bg-blue-600 rounded-t-md px-6 py-4 text-center">
          <h1 className="text-2xl font-bold text-white tracking-widest">
            GRAPURA
          </h1>
          <p className="text-white text-xs mt-1">
            Graphura India Private Limited
          </p>
        </div>
        <div className="px-6 py-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            {title}
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
