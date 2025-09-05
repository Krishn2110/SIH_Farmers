// import React from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png";


// const Navbar = () => {
//   const navigate = useNavigate();

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
//       <div className="container flex items-center justify-between px-4 py-3 mx-auto">
//         {/* Logo */}
        

//         <div className="flex items-center">
//           <div className="flex items-center justify-center w-10 h-10 mr-2 overflow-hidden bg-white rounded-full">
//             <img
//               src={logo}
//               alt="AgriPredict Logo"
//               className="object-contain w-full h-full"
//             />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900">KishanMitra</h1>
//         </div>

//         {/* Navigation Menu */}
//         <nav className="hidden space-x-8 md:flex">
//           <a href="#" className="font-medium text-gray-600 hover:text-green-500">
//             Home
//           </a>
//           <a href="#" className="font-medium text-gray-600 hover:text-green-500">
//             About
//           </a>
//           <a href="#" className="font-medium text-gray-600 hover:text-green-500">
//             Review
//           </a>
//           <a href="#" className="font-medium text-gray-600 hover:text-green-500">
//             Contact
//           </a>
//         </nav>

//         {/* Auth Buttons */}
//         <div className="flex space-x-4">
//           <button
//             onClick={() => navigate("/signup")}
//             className="px-4 py-2 font-medium text-green-600 transition duration-300 
// bg-transparent border border-green-600 rounded-lg 
// hover:bg-emerald-600 hover:text-white hover:border-emerald-600
// "
//           >
//             Sign Up
//           </button>
//           <button
//             onClick={() => navigate("/login")}
//             className="px-4 py-2 font-medium text-white transition duration-300 
// bg-gradient-to-r from-green-600 to-emerald-600 
// rounded-lg hover:from-green-700 hover:to-emerald-700
// "
//           >
//             Log In
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  // temporary login state (replace witah real auth later)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

        {/* Navigation Menu */}
        <nav className="hidden space-x-8 md:flex">
          <a href="#" className="font-medium text-gray-600 hover:text-green-500">
            Home
          </a>
          <a href="#" className="font-medium text-gray-600 hover:text-green-500">
            About
          </a>
          <a href="#" className="font-medium text-gray-600 hover:text-green-500">
            Review
          </a>
          <a href="#" className="font-medium text-gray-600 hover:text-green-500">
            Contact
          </a>

          {/* Show Dashboard ONLY if user logged in */}
          {isLoggedIn && (
            <a href="#" className="font-medium text-gray-600 hover:text-green-500">
              Dashboard
            </a>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="flex space-x-4">
          {!isLoggedIn ? (
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
                onClick={() => {
                  navigate("/login");
                  setIsLoggedIn(true); // simulate login success
                }}
                className="px-4 py-2 font-medium text-white transition duration-300 
                bg-gradient-to-r from-green-600 to-emerald-600 
                rounded-lg hover:from-green-700 hover:to-emerald-700"
              >
                Log In
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsLoggedIn(false)} // simulate logout
              className="px-4 py-2 font-medium text-white transition duration-300 
              bg-red-500 rounded-lg hover:bg-red-600"
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
