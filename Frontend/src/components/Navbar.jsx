import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-2 overflow-hidden">
            <img
              src={logo}
              alt="AgriPredict Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">AgriPredict</h1>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-600 hover:text-green-500 font-medium">
            Dashboard
          </a>
          <a href="#" className="text-gray-600 hover:text-green-500 font-medium">
            Features
          </a>
          <a href="#" className="text-gray-600 hover:text-green-500 font-medium">
            Pricing
          </a>
          <a href="#" className="text-gray-600 hover:text-green-500 font-medium">
            Support
          </a>
        </nav>

        {/* Auth Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/signup")}
            className="bg-transparent border border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-medium py-2 px-4 rounded-lg transition duration-300"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
          >
            Log In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
