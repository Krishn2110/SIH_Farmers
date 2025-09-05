import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#097A4E] to-[#065a3a] text-white py-10 mt-16">
      <div className="container mx-auto px-4 text-center md:text-left grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="font-bold text-xl mb-3">AgriPredict</h3>
          <p className="text-green-100">
            Empowering farmers with AI-driven insights to maximize yield and
            sustainability.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-xl mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-yellow-300 transition">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition">
                Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-bold text-xl mb-3">Contact Us</h3>
          <p>Email: support@agripredict.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Gujarat, India</p>
        </div>
      </div>

      <div className="text-center text-green-200 mt-8 text-sm">
        © {new Date().getFullYear()} AgriPredict. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
