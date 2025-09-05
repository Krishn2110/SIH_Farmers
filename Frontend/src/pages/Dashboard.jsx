import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Mock farmer data from the profile code
  const [farmer] = useState({
    name: "Rajesh Kumar",
    title: "Organic Crop Specialist",
    location: "Punjab, India",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@agripredict.com",
    joinDate: "March 2022",
    farmsManaged: "3 farms",
    experienceYears: "15+ years",
    crops: ["Wheat", "Rice", "Cotton", "Sugarcane"],
    loginHistory: [
      { date: "2025-09-05", time: "09:30 AM" },
      { date: "2025-09-04", time: "08:55 PM" },
      { date: "2025-09-03", time: "10:15 AM" },
      { date: "2025-09-01", time: "06:40 PM" }
    ]
  });

  // Crop recommendation data with environmental factors
  const [recommendationData] = useState([
    {
      id: 1,
      date: "15/11/2023",
      crop: "Wheat",
      nitrogen: "Medium (45 ppm)",
      phosphorus: "High (60 ppm)",
      potassium: "Medium (200 ppm)",
      humidity: "65%",
      temperature: "28°C",
      ph: "6.8",
      rainfall: "45mm"
    },
    {
      id: 2,
      date: "20/07/2023",
      crop: "Rice",
      nitrogen: "High (55 ppm)",
      phosphorus: "Medium (40 ppm)",
      potassium: "High (250 ppm)",
      humidity: "75%",
      temperature: "32°C",
      ph: "6.5",
      rainfall: "120mm"
    },
    {
      id: 3,
      date: "10/03/2023",
      crop: "Corn",
      nitrogen: "Medium (50 ppm)",
      phosphorus: "High (65 ppm)",
      potassium: "Medium (210 ppm)",
      humidity: "60%",
      temperature: "30°C",
      ph: "6.7",
      rainfall: "35mm"
    }
  ]);

  // Weather data
  const [weatherData] = useState({
    current: {
      temperature: 28,
      condition: "Partly Cloudy",
      humidity: 65,
      wind: 12,
      precipitation: 10,
      feelsLike: 30
    },
    forecast: [
      { day: "Today", high: 30, low: 22, condition: "Partly Cloudy", rain: 10 },
      { day: "Tomorrow", high: 32, low: 24, condition: "Sunny", rain: 0 },
      { day: "Wed", high: 31, low: 23, condition: "Mostly Sunny", rain: 0 },
      { day: "Thu", high: 29, low: 22, condition: "Cloudy", rain: 30 },
      { day: "Fri", high: 27, low: 21, condition: "Rain", rain: 60 },
      { day: "Sat", high: 26, low: 20, condition: "Rain", rain: 70 },
      { day: "Sun", high: 28, low: 22, condition: "Partly Cloudy", rain: 20 }
    ],
    alerts: [
      { type: "rain", message: "Heavy rain expected on Friday and Saturday", level: "moderate" }
    ]
  });

  const handleLogout = () => {
    navigate("/login");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleNewRecommendation = () => {
    navigate("/recommendation");
  };

  const downloadPDF = (recommendation) => {
    // In a real app, this would generate and download a PDF
    console.log("Downloading PDF for:", recommendation);
    alert(`PDF download started for ${recommendation.crop} recommendation`);
  };

  // Function to get weather icon based on condition
  const getWeatherIcon = (condition) => {
    switch(condition.toLowerCase()) {
      case "sunny":
        return "☀️";
      case "partly cloudy":
        return "⛅";
      case "cloudy":
        return "☁️";
      case "rain":
        return "🌧️";
      case "mostly sunny":
        return "🌤️";
      default:
        return "🌡️";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Dashboard Header - No Navbar */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AgriPredict Dashboard</h1>
              <p className="text-xl text-gray-600 mt-2">Welcome back, {farmer.name}!</p>
            </div>
            <div className="flex mt-4 md:mt-0 space-x-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden bg-green-500 text-white hover:bg-green-600 font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Menu
              </button>
              <button 
                onClick={handleGoHome}
                className="bg-gray-500 text-white hover:bg-gray-600 font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                ← Home
              </button>
              <button 
                onClick={handleLogout}
                className="bg-red-500 text-white hover:bg-red-600 font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Logout
              </button>
              <button 
                onClick={handleNewRecommendation}
                className="bg-green-500 text-white hover:bg-green-600 font-bold py-2 px-6 rounded-lg transition duration-300"
              >
                New Recommendation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 flex flex-1">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-white rounded-lg shadow-md p-6 mb-6 md:mb-0 md:mr-6 h-fit`}>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Navigation</h2>
            <nav className="space-y-2">
              <button
                className={`w-full text-left py-2 px-4 rounded-lg ${activeTab === "profile" ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-100"}`}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </button>
              <button
                className={`w-full text-left py-2 px-4 rounded-lg ${activeTab === "recommendations" ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-100"}`}
                onClick={() => setActiveTab("recommendations")}
              >
                Recommendations
              </button>
              <button
                className={`w-full text-left py-2 px-4 rounded-lg ${activeTab === "weather" ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-100"}`}
                onClick={() => setActiveTab("weather")}
              >
                Weather
              </button>
              <button
                className={`w-full text-left py-2 px-4 rounded-lg ${activeTab === "market" ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-100"}`}
                onClick={() => setActiveTab("market")}
              >
                Market Prices
              </button>
            </nav>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h2>
            <button className="w-full bg-green-500 text-white hover:bg-green-600 font-bold py-2 px-4 rounded-lg transition duration-300 mb-2">
              Contact Support
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <div className="grid grid-cols-1 gap-6">
              {/* Profile Header */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Profile Image */}
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-green-100 border-4 border-white shadow-lg flex items-center justify-center">
                      <span className="text-5xl font-bold text-green-600">
                        {farmer.name.charAt(0)}
                      </span>
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="text-center md:text-left flex-1">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{farmer.name}</h2>
                    <p className="text-xl text-green-600 mb-4">{farmer.title}</p>
                    <div className="flex flex-wrap gap-6 justify-center md:justify-start text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {farmer.location}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Member since {farmer.joinDate}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 w-20">Phone:</span>
                    <span className="text-gray-600">{farmer.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 w-20">Email:</span>
                    <span className="text-gray-600">{farmer.email}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 w-20">Experience:</span>
                    <span className="text-gray-600">{farmer.experienceYears}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 w-20">Farms:</span>
                    <span className="text-gray-600">{farmer.farmsManaged}</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {farmer.loginHistory.map((log, idx) => (
                    <div key={idx} className="flex items-center p-4 hover:bg-green-50 rounded-lg transition">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Login Activity</p>
                        <p className="text-sm text-gray-600">{log.date} at {log.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "recommendations" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Crop Recommendation History</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nitrogen</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phosphorus</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Potassium</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">pH</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recommendationData.map((rec) => (
                      <tr key={rec.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rec.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rec.crop}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rec.nitrogen}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rec.phosphorus}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rec.potassium}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rec.ph}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => downloadPDF(rec)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Download PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <p className="text-sm text-gray-700">Showing 3 of 12 recommendations</p>
                <div className="flex space-x-2">
                  <button className="bg-gray-200 text-gray-700 hover:bg-gray-300 font-bold py-2 px-4 rounded-lg transition duration-300 text-sm">
                    Previous
                  </button>
                  <button className="bg-green-500 text-white hover:bg-green-600 font-bold py-2 px-4 rounded-lg transition duration-300 text-sm">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "weather" && (
            <div className="space-y-6">
              {/* Current Weather */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Current Weather</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                    <div className="text-5xl mb-2">{getWeatherIcon(weatherData.current.condition)}</div>
                    <div className="text-4xl font-bold">{weatherData.current.temperature}°C</div>
                    <div className="text-lg">{weatherData.current.condition}</div>
                    <div className="text-sm mt-2">Feels like {weatherData.current.feelsLike}°C</div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Humidity</span>
                        <span className="font-medium">{weatherData.current.humidity}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Wind</span>
                        <span className="font-medium">{weatherData.current.wind} km/h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Precipitation</span>
                        <span className="font-medium">{weatherData.current.precipitation}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Weather Alerts</h3>
                    {weatherData.alerts.length > 0 ? (
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path 
                                fillRule="evenodd" 
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                                clipRule="evenodd" 
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              {weatherData.alerts[0].message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-600">No weather alerts at this time.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* 7-Day Forecast */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">7-Day Forecast</h2>
                <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
                  {weatherData.forecast.map((day, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-lg font-medium text-gray-900">{day.day}</div>
                      <div className="text-3xl my-2">{getWeatherIcon(day.condition)}</div>
                      <div className="text-xl font-bold text-gray-900">{day.high}°</div>
                      <div className="text-gray-600">{day.low}°</div>
                      <div className="text-sm text-gray-600 mt-1">{day.condition}</div>
                      {day.rain > 0 && (
                        <div className="text-sm text-blue-600 mt-1">{day.rain}% rain</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Agricultural Weather Advice */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Agricultural Advice</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-medium text-green-800 mb-2">Irrigation Recommendation</h3>
                    <p className="text-sm text-green-700">
                      {weatherData.current.precipitation > 50 
                        ? "No irrigation needed today due to expected rainfall." 
                        : "Moderate irrigation recommended. Water in the early morning."}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-medium text-green-800 mb-2">Farming Activities</h3>
                    <p className="text-sm text-green-700">
                      {weatherData.forecast[0].rain > 30 
                        ? "Postpone field work. Focus on indoor activities." 
                        : "Good day for field work and planting activities."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "market" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Market Prices & Trends</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Wheat Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <span className="text-green-500 font-bold">W</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Wheat</h3>
                      <p className="text-sm text-gray-600">Current price</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">₹2,150/quintal</span>
                    <span className="flex items-center text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      <span>2.5%</span>
                    </span>
                  </div>
                </div>

                {/* Rice Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <span className="text-green-500 font-bold">R</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Rice</h3>
                      <p className="text-sm text-gray-600">Current price</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">₹1,890/quintal</span>
                    <span className="flex items-center text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                      <span>1.2%</span>
                    </span>
                  </div>
                </div>

                {/* Corn Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <span className="text-green-500 font-bold">C</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Corn</h3>
                      <p className="text-sm text-gray-600">Current price</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">₹1,760/quintal</span>
                    <span className="flex items-center text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      <span>3.1%</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Trends */}
              <h3 className="text-lg font-medium text-gray-900 mb-4">Price Trends</h3>
              <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;