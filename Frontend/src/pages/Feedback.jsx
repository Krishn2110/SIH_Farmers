import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Feedback = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    rating: 0,
    message: "",
    experience: "",
    suggestions: "",
    contactPreference: "email"
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load Poppins font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Pre-fill form if user is logged in
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || user.UserName || "",
        email: user.email || user.UserEmail || ""
      }));
    }
  }, [isAuthenticated, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating: rating
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch("http://localhost:5000/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success(data.message || "Thank you for your feedback!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        rating: 0,
        message: "",
        experience: "",
        suggestions: "",
        contactPreference: "email",
      });
    } else {
      toast.error(data.message || "Failed to submit feedback");
    }
  } catch (error) {
    toast.error("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const categories = [
    "General Feedback",
    "Bug Report",
    "Feature Request",
    "User Experience",
    "Performance",
    "Support",
    "Partnership",
    "Other"
  ];

  const experiences = [
    "Excellent",
    "Good",
    "Average",
    "Poor",
    "Very Poor"
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl poppins-extrabold">
              Share Your <span className="text-[#097A4E]">Feedback</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 poppins-light leading-relaxed">
              Your feedback helps us improve AgriPredict and make it better for farmers worldwide. 
              We value your input and suggestions.
            </p>
          </div>
        </div>
      </section>

      {/* Feedback Form Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto max-w-4xl">
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 poppins-bold">Tell Us What You Think</h2>
              <p className="text-lg text-gray-600 poppins-light">
                Help us improve by sharing your experience and suggestions
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 poppins-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#097A4E] focus:border-transparent poppins-light"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 poppins-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#097A4E] focus:border-transparent poppins-light"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* Subject and Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 poppins-medium">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#097A4E] focus:border-transparent poppins-light"
                    placeholder="Brief description of your feedback"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 poppins-medium">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#097A4E] focus:border-transparent poppins-light"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4 poppins-medium">
                  Overall Rating *
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      className={`text-3xl ${star <= formData.rating
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2 poppins-light">
                  {formData.rating === 0 && "Click to rate"}
                  {formData.rating === 1 && "Poor"}
                  {formData.rating === 2 && "Fair"}
                  {formData.rating === 3 && "Good"}
                  {formData.rating === 4 && "Very Good"}
                  {formData.rating === 5 && "Excellent"}
                </p>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 poppins-medium">
                  How would you rate your overall experience? *
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#097A4E] focus:border-transparent poppins-light"
                >
                  <option value="">Select your experience</option>
                  {experiences.map((exp) => (
                    <option key={exp} value={exp}>
                      {exp}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 poppins-medium">
                  Detailed Feedback *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#097A4E] focus:border-transparent poppins-light"
                  placeholder="Please provide detailed feedback about your experience with AgriPredict..."
                />
              </div>

              {/* Suggestions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 poppins-medium">
                  Suggestions for Improvement
                </label>
                <textarea
                  name="suggestions"
                  value={formData.suggestions}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#097A4E] focus:border-transparent poppins-light"
                  placeholder="Any suggestions or ideas for improving AgriPredict?"
                />
              </div>

              {/* Contact Preference */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4 poppins-medium">
                  How would you like us to follow up?
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contactPreference"
                      value="email"
                      checked={formData.contactPreference === "email"}
                      onChange={handleInputChange}
                      className="mr-3 text-[#097A4E] focus:ring-[#097A4E]"
                    />
                    <span className="poppins-light">Email</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contactPreference"
                      value="phone"
                      checked={formData.contactPreference === "phone"}
                      onChange={handleInputChange}
                      className="mr-3 text-[#097A4E] focus:ring-[#097A4E]"
                    />
                    <span className="poppins-light">Phone Call</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contactPreference"
                      value="none"
                      checked={formData.contactPreference === "none"}
                      onChange={handleInputChange}
                      className="mr-3 text-[#097A4E] focus:ring-[#097A4E]"
                    />
                    <span className="poppins-light">No follow-up needed</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#097A4E] text-white font-bold py-4 px-12 rounded-lg text-lg shadow-lg poppins-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Submit Feedback"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 poppins-bold">What Our Users Say</h2>
            <p className="text-lg text-gray-600 poppins-light">
              Real feedback from farmers who use AgriPredict
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#097A4E] flex items-center justify-center mr-4 text-white font-bold poppins-bold">
                  R
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 poppins-semibold">Rajesh Kumar</h4>
                  <p className="text-sm text-gray-600 poppins-light">Wheat Farmer, Punjab</p>
                </div>
              </div>
              <p className="text-gray-700 poppins-light italic">
                "AgriPredict's predictions helped me increase my yield by 30%. The interface is user-friendly and the support team is very responsive to feedback."
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#097A4E] flex items-center justify-center mr-4 text-white font-bold poppins-bold">
                  P
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 poppins-semibold">Priya Sharma</h4>
                  <p className="text-sm text-gray-600 poppins-light">Rice Farmer, Tamil Nadu</p>
                </div>
              </div>
              <p className="text-gray-700 poppins-light italic">
                "The weather predictions are incredibly accurate. I've been able to plan my planting and harvesting much better. Great tool for modern farming!"
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#097A4E] flex items-center justify-center mr-4 text-white font-bold poppins-bold">
                  A
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 poppins-semibold">Amit Patel</h4>
                  <p className="text-sm text-gray-600 poppins-light">Cotton Farmer, Gujarat</p>
                </div>
              </div>
              <p className="text-gray-700 poppins-light italic">
                "Excellent customer support and continuous improvements based on user feedback. The team really listens to farmers' needs."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#097A4E]">
        <div className="container px-4 mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-16 poppins-bold">Your Feedback Matters</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2 poppins-bold">95%</div>
                <div className="text-green-200 poppins-light">User Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2 poppins-bold">24h</div>
                <div className="text-green-200 poppins-light">Average Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2 poppins-bold">500+</div>
                <div className="text-green-200 poppins-light">Feedback Received</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2 poppins-bold">80%</div>
                <div className="text-green-200 poppins-light">Suggestions Implemented</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 poppins-bold">Have More to Share?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-600 poppins-light">
            We're always looking for ways to improve. Your feedback helps us build better tools for farmers.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/about")}
              className="bg-[#097A4E] text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg poppins-semibold"
            >
              Learn More About Us
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-[#097A4E] text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg poppins-semibold"
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Feedback;