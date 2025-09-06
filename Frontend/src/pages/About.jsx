import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import farmer1 from "../assets/farmer1.jpg";
import farmer2 from "../assets/farmer2.jpg";
import farmer3 from "../assets/farmer3.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const About = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    // Load Poppins font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/prediction");
      toast.success("Redirecting to your prediction page!");
    } else {
      navigate("/login");
      toast.info("Please login or signup to get started!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Navbar */}
      <Navbar />

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl poppins-extrabold">
              About <span className="text-[#097A4E]">AgriPredict</span>
            </h1>
            <p className="max-w-4xl mx-auto text-xl text-gray-600 poppins-light leading-relaxed">
              Empowering farmers worldwide with cutting-edge AI technology to maximize crop yields, 
              optimize resources, and build a sustainable future for agriculture.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 poppins-bold">Our Mission</h2>
              <p className="mb-6 text-lg text-gray-600 poppins-light leading-relaxed">
                At AgriPredict, we believe that every farmer deserves access to advanced technology 
                that can help them make informed decisions and maximize their harvest potential. 
                Our mission is to democratize agricultural intelligence through AI-powered predictions.
              </p>
              <p className="text-lg text-gray-600 poppins-light leading-relaxed">
                We're committed to providing accurate, data-driven insights that help farmers 
                optimize their resources, reduce waste, and increase profitability while 
                promoting sustainable farming practices.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden transition duration-500 transform rounded-lg shadow-lg hover:scale-105">
                <img src={farmer1} alt="Farmer analyzing crops" className="object-cover w-full h-64" />
              </div>
              <div className="mt-8 overflow-hidden transition duration-500 transform rounded-lg shadow-lg hover:scale-105">
                <img src={farmer2} alt="Harvest season" className="object-cover w-full h-64" />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 poppins-bold">Our Values</h2>
            <p className="max-w-3xl mx-auto mb-16 text-lg text-gray-600 poppins-light">
              These core values guide everything we do and shape our commitment to farmers worldwide.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-[#097A4E]">🌱</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 poppins-semibold">Sustainability</h3>
                <p className="text-gray-600 poppins-light text-sm">
                  Promoting eco-friendly farming practices for a better future.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-[#097A4E]">🎯</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 poppins-semibold">Precision</h3>
                <p className="text-gray-600 poppins-light text-sm">
                  Delivering accurate predictions based on real data and science.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-[#097A4E]">🤝</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 poppins-semibold">Collaboration</h3>
                <p className="text-gray-600 poppins-light text-sm">
                  Working closely with farmers to understand their needs.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-[#097A4E]">💡</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 poppins-semibold">Innovation</h3>
                <p className="text-gray-600 poppins-light text-sm">
                  Continuously improving our technology and methods.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#097A4E]">
        <div className="container px-4 mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-16 poppins-bold">Our Impact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2 poppins-bold">5,000+</div>
                <div className="text-green-200 poppins-light">Active Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2 poppins-bold">12+</div>
                <div className="text-green-200 poppins-light">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2 poppins-bold">98%</div>
                <div className="text-green-200 poppins-light">Prediction Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2 poppins-bold">25%</div>
                <div className="text-green-200 poppins-light">Average Yield Increase</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 poppins-bold">Get in Touch</h2>
            <p className="max-w-2xl mx-auto mb-12 text-lg text-gray-600 poppins-light">
              Have questions about AgriPredict? We'd love to hear from you. 
              Reach out to our team for support, partnerships, or general inquiries.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Email */}
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#097A4E] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 poppins-semibold">Email Us</h3>
                <p className="text-gray-600 poppins-light mb-2">General Inquiries</p>
                <a href="mailto:info@agripredict.com" className="text-[#097A4E] hover:text-[#065a3a] poppins-medium">
                  info@agripredict.com
                </a>
              </div>

              {/* Support */}
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#097A4E] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 poppins-semibold">Support</h3>
                <p className="text-gray-600 poppins-light mb-2">Technical Help</p>
                <a href="mailto:support@agripredict.com" className="text-[#097A4E] hover:text-[#065a3a] poppins-medium">
                  support@agripredict.com
                </a>
              </div>

              {/* Partnerships */}
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#097A4E] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 poppins-semibold">Partnerships</h3>
                <p className="text-gray-600 poppins-light mb-2">Business Inquiries</p>
                <a href="mailto:partnerships@agripredict.com" className="text-[#097A4E] hover:text-[#065a3a] poppins-medium">
                  partnerships@agripredict.com
                </a>
              </div>
            </div>

            
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 poppins-bold">Ready to Transform Your Farming?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-600 poppins-light">
              Join thousands of farmers who are already using AgriPredict to maximize their yields 
              and optimize their farming operations.
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-[#097A4E] text-white hover:bg-[#066042] font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl poppins-semibold"
            >
              Start Your Prediction Journey
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
