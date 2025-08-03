import React from "react";

const Header = ({ showModal }) => (
  <nav className="fixed top-0 w-full z-50 glass border-b border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">PI10</span>
          </div>
          <h1 className="text-xl font-semibold">Prepin10</h1>
        </div>
        <button
          onClick={showModal}
          className=" cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
        >
          Subscribe for Updates
        </button>
      </div>
    </div>
  </nav>
);

export default Header;
