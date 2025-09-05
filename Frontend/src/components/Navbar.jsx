import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container flex items-center justify-between px-4 py-3 mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 mr-2 overflow-hidden bg-white rounded-full">
            <img
              src={logo}
              alt="AgriPredict Logo"
              className="object-contain w-full h-full"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">AgriPredict</h1>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden space-x-8 md:flex">
          <a href="#" className="font-medium text-gray-600 hover:text-green-500">
            Dashboard
          </a>
          <a href="#" className="font-medium text-gray-600 hover:text-green-500">
            Features
          </a>
          <a href="#" className="font-medium text-gray-600 hover:text-green-500">
            Pricing
          </a>
          <a href="#" className="font-medium text-gray-600 hover:text-green-500">
            Support
          </a>
        </nav>

        {/* Auth Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-2 font-medium text-green-500 transition duration-300 bg-transparent border border-green-500 rounded-lg hover:bg-green-500 hover:text-white"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 font-medium text-white transition duration-300 bg-green-500 rounded-lg hover:bg-green-600"
          >
            Log In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
