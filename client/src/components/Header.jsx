import React from "react";

const Header = ({ showModal }) => (
  <nav className="fixed top-0 w-full z-50 glass border-b border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center space-x-2">
          <span className="text-white hidden">PI10</span>
          <h1 className="text-md lg:text-xl sm:font-normal lg:font-semibold">
            Prepin10
          </h1>
        </div>
        <button
          onClick={showModal}
          className="
            cursor-pointer
            bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700
            px-3 py-1 text-xs rounded-full font-medium
            transition-all duration-300 transform hover:scale-105
            sm:px-6 sm:py-2 sm:text-base
          "
        >
          <span className="hidden sm:inline">Subscribe for Updates</span>
          <span className="sm:hidden">Subscribe</span>
        </button>
      </div>
    </div>
  </nav>
);

export default Header;
