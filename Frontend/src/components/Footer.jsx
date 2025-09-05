// import React from "react";

// const Footer = () => {
//   return (
//     <footer className="bg-gradient-to-r from-green-600 to-green-800 text-white py-10 mt-16">
//       <div className="container mx-auto px-4 text-center md:text-left grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* About */}
//         <div>
//           <h3 className="font-bold text-xl mb-3">AgriPredict</h3>
//           <p className="text-green-100">
//             Empowering farmers with AI-driven insights to maximize yield and
//             sustainability.
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h3 className="font-bold text-xl mb-3">Quick Links</h3>
//           <ul className="space-y-2">
//             <li>
//               <a href="#" className="hover:text-yellow-300 transition">
//                 Home
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:text-yellow-300 transition">
//                 Dashboard
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:text-yellow-300 transition">
//                 Contact
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:text-yellow-300 transition">
//                 FAQ
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* Contact Info */}
//         <div>
//           <h3 className="font-bold text-xl mb-3">Contact Us</h3>
//           <p>Email: support@agripredict.com</p>
//           <p>Phone: +91 98765 43210</p>
//           <p>Location: Gujarat, India</p>
//         </div>
//       </div>

//       <div className="text-center text-green-200 mt-8 text-sm">
//         © {new Date().getFullYear()} AgriPredict. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;




import React from "react";
import { FaWhatsapp, FaYoutube, FaFacebook } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#097A4E] to-[#065a3a] text-white py-10 mt-16">
      <div className="container mx-auto px-4 text-center md:text-left grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-3">🌱 KishanMitra</h3>
          <p className="text-green-100">
            AI for Sustainable Farming. Empowering farmers with data-driven insights
            to make smarter crop decisions.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-3">      Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-300 transition">Home</a></li>
            <li><a href="#" className="hover:text-yellow-300 transition">About</a></li>
            <li><a href="#" className="hover:text-yellow-300 transition">FAQ</a></li>
            <li><a href="#" className="hover:text-yellow-300 transition">Contact</a></li>
          </ul>
        </div>
       


        {/* Column 3 - Disclaimer */}
        <div>
          <h3 className="text-xl font-bold mb-3">Disclaimer</h3>
          <p className="text-green-100 text-sm">
            Predictions are AI-based suggestions using soil & weather data.  
            Always consult local experts before making final farming decisions.
          </p>
        </div>

        {/* Column 4 - Community */}
        <div>
          <h3 className="text-xl font-bold mb-3">Farmer Community</h3>
          {/* <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-300 transition">WhatsApp</a></li>
            <li><a href="#" className="hover:text-yellow-300 transition">YouTube</a></li>
          </ul> */}
          <ul className="space-y-2">
      <li>
    <a
      href="#"
      className="flex items-center gap-2 hover:text-yellow-300 transition"
    >
      <FaWhatsapp /> WhatsApp
    </a>
  </li>
  <li>
    <a
      href="#"
      className="flex items-center gap-2 hover:text-yellow-300 transition"
    >
      <FaYoutube /> YouTube
    </a>
  </li>
  <li>
    <a
      href="#"
      className="flex items-center gap-2 hover:text-yellow-300 transition"
    >
      <FaFacebook /> Facebook
    </a>
  </li>
</ul>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="text-center text-green-200 mt-8 text-sm border-t border-green-500 pt-4">
        © {new Date().getFullYear()} Team SyntaxError. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
