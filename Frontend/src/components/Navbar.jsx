import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container flex items-center justify-between px-4 py-3 mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 mr-2 overflow-hidden bg-white rounded-full">
            <img
              src={logo}
              alt="KishanMitra Logo"
              className="object-contain w-full h-full"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">KishanMitra</h1>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Navigation Menu */}
        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:static top-16 left-0 right-0 bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-8 transition-all duration-300 ease-in-out`}
        >
          <button
            onClick={() => {
              isAuthenticated ? navigate("/farmer-dashboard") : navigate("/");
              setIsMenuOpen(false);
            }}
            className="font-medium text-gray-600 hover:text-green-500"
          >
            Home
          </button>
          <button
            onClick={() => {
              navigate("/about");
              setIsMenuOpen(false);
            }}
            className="font-medium text-gray-600 hover:text-green-500"
          >
            About
          </button>
          <button
            onClick={() => {
              navigate("/feedback");
              setIsMenuOpen(false);
            }}
            className="font-medium text-gray-600 hover:text-green-500"
          >
            Feedback
          </button>

          {/* Show Dashboard ONLY if user logged in */}
          {isAuthenticated && (
            <button
              onClick={() => {
                navigate("/dashboard");
                setIsMenuOpen(false);
              }}
              className="font-medium text-gray-600 hover:text-green-500"
            >
              Dashboard
            </button>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-2 font-medium text-green-600 transition duration-300 
                bg-transparent border border-green-600 rounded-lg 
                hover:bg-emerald-600 hover:text-white hover:border-emerald-600"
              >
                Sign Up
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 font-medium text-white transition duration-300 
                bg-gradient-to-r from-green-600 to-emerald-600 
                rounded-lg hover:from-green-700 hover:to-emerald-700"
              >
                Log In
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">
                Welcome, {user?.name || user?.UserName}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 font-medium text-white transition duration-300 
                bg-red-500 rounded-lg hover:bg-red-600"
              >
                Log Out
              </button>
            </div>
          )}
        </div>

        {/* Mobile Auth Buttons */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:hidden flex-col space-y-4 p-4 bg-white absolute top-16 left-0 right-0 shadow-md transition-all duration-300 ease-in-out`}
        >
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => {
                  navigate("/signup");
                  setIsMenuOpen(false);
                }}
                className="px-4 py-2 font-medium text-green-600 transition duration-300 
                bg-transparent border border-green-600 rounded-lg 
                hover:bg-emerald-600 hover:text-white hover:border-emerald-600"
              >
                Sign Up
              </button>
              <button
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
                className="px-4 py-2 font-medium text-white transition duration-300 
                bg-gradient-to-r from-green-600 to-emerald-600 
                rounded-lg hover:from-green-700 hover:to-emerald-700"
              >
                Log In
              </button>
            </>
          ) : (
            <div className="flex flex-col space-y-4">
              <span className="text-sm font-medium text-gray-700">
                Welcome, {user?.name || user?.UserName}
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="px-4 py-2 font-medium text-white transition duration-300 
                bg-red-500 rounded-lg hover:bg-red-600"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;