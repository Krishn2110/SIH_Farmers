import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
  // Mock farmer data
  const farmer = {
    name: "Rajesh Kumar",
    title: "Organic Crop Specialist",
    location: "Punjab, India",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@agripredict.com",
    joinDate: "March 2022",
    farmsManaged: "3 farms",
    experienceYears: "15+ years",
    crops: ["Wheat", "Rice", "Cotton", "Sugarcane"],
    farmStats: {
      soilHealth: "Excellent",
      lastRecommendation: "Wheat",
      recommendationsCount: 24
    },
    loginHistory: [
      { date: "2025-09-05", time: "09:30 AM" },
      { date: "2025-09-04", time: "08:55 PM" },
      { date: "2025-09-03", time: "10:15 AM" },
      { date: "2025-09-01", time: "06:40 PM" }
    ]
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-r from-green-500 to-green-600 relative">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                <span className="text-5xl font-bold text-green-600">
                  {farmer.name.charAt(0)}
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Profile Info */}
            <div className="text-center md:text-left text-white flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{farmer.name}</h1>
              <p className="text-xl opacity-90 mb-4">{farmer.title}</p>
              <div className="flex flex-wrap gap-6 justify-center md:justify-start text-sm">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {farmer.location}
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Member since {farmer.joinDate}
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <div className="md:ml-auto">
              <Link to="/profile/edit">
                <button className="bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Profile
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Details */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Contact Information</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 w-16">Phone:</span>
                      <span className="text-gray-600">{farmer.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 w-16">Email:</span>
                      <span className="text-gray-600">{farmer.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Crops Grown */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Crops Grown</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {farmer.crops.map((crop, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800 font-medium"
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Experience Summary */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Experience Summary</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600">{farmer.experienceYears}</div>
                      <p className="text-xs text-gray-600 mt-1">Experience</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600">{farmer.farmsManaged}</div>
                      <p className="text-xs text-gray-600 mt-1">Farms Managed</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600">{farmer.farmStats.soilHealth}</div>
                      <p className="text-xs text-gray-600 mt-1">Soil Health</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600">{farmer.farmStats.recommendationsCount}</div>
                      <p className="text-xs text-gray-600 mt-1">Recommendations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Stats + Login History */}
            <div className="lg:col-span-2 space-y-8">
              {/* Farm Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-6 rounded-lg shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold">{farmer.farmStats.lastRecommendation}</p>
                  <p className="text-sm opacity-90">Last Recommendation</p>
                </div>

                <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-6 rounded-lg shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold">{farmer.farmStats.recommendationsCount}</p>
                  <p className="text-sm opacity-90">Total Recommendations</p>
                </div>

                <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-6 rounded-lg shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold">{farmer.farmStats.soilHealth}</p>
                  <p className="text-sm opacity-90">Soil Health</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                    </div>
                    <button className="text-green-600 hover:text-green-800 text-sm font-medium transition">
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {farmer.loginHistory.map((log, idx) => (
                      <div key={idx} className="flex items-center p-4 hover:bg-green-50 rounded-lg transition">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">Login Activity</p>
                          <p className="text-sm text-gray-600">{log.date} at {log.time}</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex flex-col items-center justify-center p-6 bg-green-50 hover:bg-green-100 rounded-lg transition duration-300 group">
                      <div className="w-12 h-12 rounded-full bg-green-100 group-hover:bg-green-200 flex items-center justify-center mb-3 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <span className="font-medium text-green-700">New Recommendation</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-6 bg-green-50 hover:bg-green-100 rounded-lg transition duration-300 group">
                      <div className="w-12 h-12 rounded-full bg-green-100 group-hover:bg-green-200 flex items-center justify-center mb-3 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <span className="font-medium text-green-700">View Reports</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-6 bg-green-50 hover:bg-green-100 rounded-lg transition duration-300 group">
                      <div className="w-12 h-12 rounded-full bg-green-100 group-hover:bg-green-200 flex items-center justify-center mb-3 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.5 19.5a2.5 2.5 0 01-2.5-2.5V6a2.5 2.5 0 012.5-2.5h8.5a2.5 2.5 0 012.5 2.5v11a2.5 2.5 0 01-2.5 2.5h-8.5z" />
                        </svg>
                      </div>
                      <span className="font-medium text-green-700">Notifications</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-6 bg-green-50 hover:bg-green-100 rounded-lg transition duration-300 group">
                      <div className="w-12 h-12 rounded-full bg-green-100 group-hover:bg-green-200 flex items-center justify-center mb-3 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span className="font-medium text-green-700">Settings</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Optimize Your Farm?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Get personalized recommendations and insights to maximize your crop yield with AgriPredict.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-500 text-white hover:bg-green-600 font-bold py-3 px-8 rounded-lg text-lg transition duration-300 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Get New Recommendation
            </button>
            <button className="bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg border-2 border-green-500 transition duration-300 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              View Analytics
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Profile;