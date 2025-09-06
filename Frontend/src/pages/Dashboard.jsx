// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Transition } from "@headlessui/react";
// import axios from "axios";
// import LiveMap from "../pages/farmer/Map";
// import { useAuth } from "../context/AuthContext";
// import { toast } from "react-toastify"; // Ensure toast is imported

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated, user, loading: authLoading } = useAuth();
//   const [activeTab, setActiveTab] = useState("profile");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isVisible, setIsVisible] = useState({
//     profile: true,
//     recommendations: false,
//     weather: false,
//     market: false,
//   });

//   // Weather data state
//   const [weatherData, setWeatherData] = useState(null);
//   const [loadingWeather, setLoadingWeather] = useState(true);
//   const [weatherError, setWeatherError] = useState(null);

//   // Market data state
//   const [marketPrices, setMarketPrices] = useState([]);
//   const [loadingMarket, setLoadingMarket] = useState(true);
//   const [selectedState, setSelectedState] = useState("");
//   const [selectedDistrict, setSelectedDistrict] = useState("");
//   const [selectedCommodity, setSelectedCommodity] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [states, setStates] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [commodities, setCommodities] = useState([]);
//   const [loadingFilters, setLoadingFilters] = useState(true);
//   const [filterError, setFilterError] = useState("");
//   const [marketError, setMarketError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { error } = useAuth();

//   // Mock recommendation data (unchanged)
//   const [recommendationData] = useState([
//     {
//       id: 1,
//       date: "15/11/2023",
//       crop: "Wheat",
//       nitrogen: "Medium (45 ppm)",
//       phosphorus: "High (60 ppm)",
//       potassium: "Medium (200 ppm)",
//       humidity: "65%",
//       temperature: "28°C",
//       ph: "6.8",
//       rainfall: "45mm",
//     },
//     {
//       id: 2,
//       date: "20/07/2023",
//       crop: "Rice",
//       nitrogen: "High (55 ppm)",
//       phosphorus: "Medium (40 ppm)",
//       potassium: "High (250 ppm)",
//       humidity: "75%",
//       temperature: "32°C",
//       ph: "6.5",
//       rainfall: "120mm",
//     },
//     {
//       id: 3,
//       date: "10/03/2023",
//       crop: "Corn",
//       nitrogen: "Medium (50 ppm)",
//       phosphorus: "High (65 ppm)",
//       potassium: "Medium (210 ppm)",
//       humidity: "60%",
//       temperature: "30°C",
//       ph: "6.7",
//       rainfall: "35mm",
//     },
//   ]);

//   // Helper functions
//   const formatDate = (dateStr) => {
//     if (!dateStr) return "";
//     const d = new Date(dateStr);
//     const day = String(d.getDate()).padStart(2, "0");
//     const month = String(d.getMonth() + 1).padStart(2, "0");
//     const year = d.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const today = new Date();

//   const handleClick = () => {
//       setLoading(true);
  
//       setTimeout(() => {
//         if (isAuthenticated) {
//           navigate("/prediction");
//           toast.success("Redirecting to your prediction page!");
//         } else {
//           navigate("/login");
//           toast.info("Please login or signup to get started!");
//         }
//         setLoading(false);
//       }, 500);
//     };

//   const handleLogout = () => {
//     navigate("/login");
//   };

//   const handleGoHome = () => {
//     navigate("/");
//   };

//   const handleNewRecommendation = () => {
//     navigate("/recommendation");
//   };

//   const downloadPDF = (recommendation) => {
//     console.log("Downloading PDF for:", recommendation);
//     toast.info(`PDF download started for ${recommendation.crop} recommendation`);
//   };

//   const getWeatherIcon = (condition) => {
//     switch (condition?.toLowerCase()) {
//       case "sunny":
//         return "☀️";
//       case "partly cloudy":
//         return "⛅";
//       case "cloudy":
//         return "☁️";
//       case "rainy":
//         return "🌧️";
//       case "mostly sunny":
//         return "🌤️";
//       default:
//         return "🌡️";
//     }
//   };

//   // Weather data fetching (unchanged)
//   useEffect(() => {
//     const fetchWeather = async (lat, lon) => {
//       try {
//         setWeatherError(null);
//         const res = await axios.get(
//           `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
//         );
//         const data = res.data;
//         const mappedWeather = {
//           current: {
//             temperature: data.hourly.temperature_2m[0],
//             condition: data.hourly.precipitation[0] > 0 ? "Rainy" : "Partly Cloudy",
//             humidity: data.hourly.relative_humidity_2m[0],
//             wind: data.hourly.windspeed_10m ? data.hourly.windspeed_10m[0] : 10,
//             precipitation: data.hourly.precipitation[0],
//             feelsLike: data.hourly.temperature_2m[0] + 2,
//           },
//           forecast: data.daily.time.slice(0, 7).map((day, idx) => ({
//             day: idx === 0 ? "Today" : new Date(day).toLocaleDateString("en-US", { weekday: "short" }),
//             high: data.daily.temperature_2m_max[idx],
//             low: data.daily.temperature_2m_min[idx],
//             condition: data.daily.precipitation_sum[idx] > 0 ? "Rainy" : "Cloudy",
//             rain: data.daily.precipitation_sum[idx],
//           })),
//         };
//         setWeatherData(mappedWeather);
//         setLoadingWeather(false);
//       } catch (err) {
//         console.error("Error fetching weather:", err);
//         setWeatherError("Failed to load weather data. Please try again later.");
//         setLoadingWeather(false);
//         setWeatherData({
//           current: {
//             temperature: 28,
//             condition: "Partly Cloudy",
//             humidity: 65,
//             wind: 12,
//             precipitation: 0,
//             feelsLike: 30,
//           },
//           forecast: [
//             { day: "Today", high: 30, low: 22, condition: "Partly Cloudy", rain: 0 },
//             { day: "Tue", high: 31, low: 23, condition: "Sunny", rain: 0 },
//             { day: "Wed", high: 29, low: 21, condition: "Cloudy", rain: 0.5 },
//             { day: "Thu", high: 28, low: 20, condition: "Rainy", rain: 2.3 },
//             { day: "Fri", high: 27, low: 19, condition: "Rainy", rain: 1.8 },
//             { day: "Sat", high: 29, low: 20, condition: "Cloudy", rain: 0.2 },
//             { day: "Sun", high: 30, low: 21, condition: "Sunny", rain: 0 },
//           ],
//         });
//       }
//     };
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           fetchWeather(latitude, longitude);
//         },
//         (err) => {
//           console.error("Geolocation error:", err);
//           setWeatherError("Location access denied. Using default location.");
//           fetchWeather(31.1471, 75.3412);
//         }
//       );
//     } else {
//       setWeatherError("Geolocation not supported. Using default location.");
//       fetchWeather(31.1471, 75.3412);
//     }
//   }, []);

//   // Market data functions (using mock data as per your update)
//   const fetchStates = async () => {
//     try {
//       const mockStates = ["Maharashtra", "Punjab", "Haryana", "Uttar Pradesh", "Karnataka"];
//       return mockStates;
//     } catch (err) {
//       console.error("Error fetching states:", err);
//       throw err;
//     }
//   };

//   const fetchDistricts = async (state) => {
//     try {
//       const districtMap = {
//         Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
//         Punjab: ["Amritsar", "Ludhiana", "Jalandhar", "Patiala"],
//         Haryana: ["Faridabad", "Gurgaon", "Panipat", "Ambala"],
//         "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi"],
//         Karnataka: ["Bangalore", "Mysore", "Hubli", "Mangalore"],
//       };
//       return districtMap[state] || ["Select district"];
//     } catch (err) {
//       console.error("Error fetching districts:", err);
//       throw err;
//     }
//   };

//   const fetchCommodities = async () => {
//     try {
//       return ["Onion", "Wheat", "Rice", "Cotton", "Sugarcane", "Tomato", "Potato"];
//     } catch (err) {
//       console.error("Error fetching commodities:", err);
//       throw err;
//     }
//   };

//   const fetchMarketPrices = async () => {
//     setLoadingMarket(true);
//     setMarketError("");
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       const mockPrices = [
//         {
//           Commodity: selectedCommodity || "Onion",
//           Market: `${selectedDistrict || "Pune"} Market`,
//           Modal_x0020_Price: Math.floor(Math.random() * 2000) + 1000,
//           Arrival_Date: formatDate(selectedDate) || "15/09/2023",
//         },
//         {
//           Commodity: selectedCommodity || "Onion",
//           Market: "Wholesale Market",
//           Modal_x0020_Price: Math.floor(Math.random() * 2000) + 1000,
//           Arrival_Date: formatDate(selectedDate) || "15/09/2023",
//         },
//         {
//           Commodity: selectedCommodity || "Onion",
//           Market: "Local Market",
//           Modal_x0020_Price: Math.floor(Math.random() * 2000) + 1000,
//           Arrival_Date: formatDate(selectedDate) || "15/09/2023",
//         },
//       ];
//       setMarketPrices(mockPrices);
//     } catch (err) {
//       console.error("Error fetching market prices:", err);
//       setMarketError("Failed to fetch market prices. Please try again.");
//       setMarketPrices([]);
//     } finally {
//       setLoadingMarket(false);
//     }
//   };

//   // Initialize filters
//   useEffect(() => {
//     const initFilters = async () => {
//       setLoadingFilters(true);
//       setFilterError("");
//       try {
//         const fetchedStates = await fetchStates();
//         setStates(fetchedStates);
//         if (fetchedStates.length === 0) {
//           setFilterError("No states available. Using mock data.");
//           return;
//         }
//         const defaultState = fetchedStates[0];
//         setSelectedState(defaultState);
//         const fetchedDistricts = await fetchDistricts(defaultState);
//         setDistricts(fetchedDistricts);
//         if (fetchedDistricts.length > 0) {
//           setSelectedDistrict(fetchedDistricts[0]);
//         }
//         const fetchedCommodities = await fetchCommodities();
//         setCommodities(fetchedCommodities);
//         if (fetchedCommodities.length > 0) {
//           setSelectedCommodity(fetchedCommodities[0]);
//         }
//       } catch (err) {
//         setFilterError("Failed to load filter options. Using mock data.");
//         setStates(["Maharashtra", "Punjab", "Haryana"]);
//         setDistricts(["Mumbai", "Pune", "Nagpur"]);
//         setCommodities(["Onion", "Wheat", "Rice"]);
//         setSelectedState("Maharashtra");
//         setSelectedDistrict("Pune");
//         setSelectedCommodity("Onion");
//       } finally {
//         setLoadingFilters(false);
//       }
//     };
//     initFilters();
//   }, []);

//   // Update districts when state changes
//   useEffect(() => {
//     if (selectedState) {
//       fetchDistricts(selectedState)
//         .then(setDistricts)
//         .catch((err) => {
//           console.error("Error fetching districts:", err);
//           setDistricts(["Select district"]);
//         });
//     }
//   }, [selectedState]);

//   // Auto-fetch market prices
//   useEffect(() => {
//     if (selectedState && selectedCommodity && selectedDate) {
//       fetchMarketPrices();
//     }
//   }, [selectedState, selectedDistrict, selectedCommodity, selectedDate]);

//   // Animation on tab change
//   useEffect(() => {
//     setIsVisible({
//       profile: activeTab === "profile",
//       recommendations: activeTab === "recommendations",
//       weather: activeTab === "weather",
//       market: activeTab === "market",
//     });
//   }, [activeTab]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col font-poppins">
//       {/* Dashboard Header */}
//       <div className="bg-[#097A4E] shadow-lg">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-white">AgriPredict Dashboard</h1>
//               {authLoading ? (
//                 <p className="text-lg text-white/90 mt-1">Loading user data...</p>
//               ) : (
//                 <p className="text-lg text-white/90 mt-1">Welcome back, {user?.name || "User"}!</p>
//               )}
//             </div>
//             <div className="flex mt-4 md:mt-0 space-x-3">
//               <button
//                 onClick={() => setSidebarOpen(!sidebarOpen)}
//                 className="md:hidden bg-white text-[#097A4E] hover:bg-green-50 font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
//               >
//                 Menu
//               </button>
//               <button
//                 onClick={handleClick}
//                 className="bg-white text-[#097A4E] hover:bg-green-50 font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
                
//               >
//                 New Prediction
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-6 flex flex-1">
//         {/* Sidebar */}
//         <Transition
//           show={sidebarOpen || window.innerWidth >= 768}
//           enter="transition-all duration-300 ease-in-out"
//           enterFrom="opacity-0 -translate-x-full"
//           enterTo="opacity-100 translate-x-0"
//           leave="transition-all duration-300 ease-in-out"
//           leaveFrom="opacity-100 translate-x-0"
//           leaveTo="opacity-0 -translate-x-full"
//           as="div"
//           className={`fixed md:static w-full md:w-64 bg-white rounded-lg shadow-xl p-6 mb-6 md:mb-0 md:mr-6 h-fit z-40 ${sidebarOpen ? "block" : "hidden md:block"}`}
//         >
//           <div>
//             <h2 className="text-lg font-bold text-gray-900 mb-4">Navigation</h2>
//             <nav className="space-y-2">
//               {[
//                 { id: "profile", label: "Profile", icon: "👤" },
//                 { id: "recommendations", label: "Recommendations", icon: "📊" },
//                 { id: "weather", label: "Weather", icon: "🌤️" },
//                 { id: "market", label: "Market Prices", icon: "📈" },
//               ].map((item) => (
//                 <button
//                   key={item.id}
//                   className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-300 flex items-center ${
//                     activeTab === item.id
//                       ? "bg-[#097A4E] text-white shadow-md transform scale-[1.02]"
//                       : "text-gray-600 hover:bg-green-50 hover:text-[#097A4E]"
//                   }`}
//                   onClick={() => {
//                     setActiveTab(item.id);
//                     setSidebarOpen(false);
//                   }}
//                 >
//                   <span className="text-xl mr-3">{item.icon}</span>
//                   <span className="font-medium">{item.label}</span>
//                 </button>
//               ))}
//             </nav>
//           </div>
//           <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
//             <button
//               onClick={handleGoHome}
//               className="w-full bg-gradient-to-r from-[#097A4E] to-[#0B8C5A] text-white hover:from-[#0B8C5A] hover:to-[#097A4E] font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center group"
//             >
//               <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
//               Back to Home
//             </button>
//             <button
//               onClick={handleLogout}
//               className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center group"
//             >
//               <span className="mr-2 group-hover:rotate-12 transition-transform">↗</span>
//               Logout
//               <span className="ml-2 group-hover:-rotate-12 transition-transform">↗</span>
//             </button>
//           </div>
//         </Transition>

//         {/* Dashboard Content */}
//         <div className="flex-1">
//           {/* Profile Section */}
//           <Transition
//             show={isVisible.profile}
//             enter="transition-all duration-500 ease-in-out"
//             enterFrom="opacity-0 translate-y-5"
//             enterTo="opacity-100 translate-y-0"
//             leave="transition-all duration-300 ease-in-out"
//             leaveFrom="opacity-100 translate-y-0"
//             leaveTo="opacity-0 -translate-y-5"
//             as="div"
//             className="space-y-6"
//           >
//             {activeTab === "profile" && (
//   <>
//     {authLoading ? (
//       <div className="bg-white rounded-xl shadow-lg p-6 flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#097A4E]"></div>
//         <span className="ml-4 text-gray-600">Loading profile data...</span>
//       </div>
//     ) : error ? (
//       <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
//         <p>{error}. Please try logging in again.</p>
//       </div>
//     ) : !user ? (
//       <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
//         <p>Failed to load user profile. Please log in again.</p>
//       </div>
//     ) : (
//       <>
//         {/* Profile Header */}
//         <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
//           <div className="flex flex-col md:flex-row items-center gap-8">
//             <div className="relative">
//               <div className="w-32 h-32 rounded-full bg-green-100 border-4 border-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105">
//                 {user.profileImage ? (
//                   <img
//                     src={`http://localhost:5000${user.profileImage}`}
//                     alt="Profile"
//                     className="w-full h-full rounded-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-5xl font-bold text-[#097A4E]">
//                     {(user.name || "User").charAt(0)}
//                   </span>
//                 )}
//               </div>
//             </div>
//             <div className="text-center md:text-left flex-1">
//               <h2 className="text-3xl font-bold text-gray-900 mb-2">{user.name || "User"}</h2>
//               <p className="text-xl text-[#097A4E] mb-4">{user.title || "Farmer"}</p>
//               <button
//                 onClick={() => navigate("/profile/edit")}
//                 className="bg-[#097A4E] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#0B8C5A] transition-all duration-300"
//               >
//                 Edit Profile
//               </button>
//               <div className="flex flex-wrap gap-6 justify-center md:justify-start text-sm">
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   </svg>
//                   {user.location || "India"}
//                 </div>
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                     />
//                   </svg>
//                   Member since {user.joinDate || "Unknown"}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Contact Information */}
//         <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
//           <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="flex items-center p-3 rounded-lg hover:bg-green-50 transition-colors duration-300">
//               <span className="font-medium text-gray-700 w-20">Phone:</span>
//               <span className="text-gray-600">{user.phone || "N/A"}</span>
//             </div>
//             <div className="flex items-center p-3 rounded-lg hover:bg-green-50 transition-colors duration-300">
//               <span className="font-medium text-gray-700 w-20">Email:</span>
//               <span className="text-gray-600">{user.email || "N/A"}</span>
//             </div>
//             <div className="flex items-center p-3 rounded-lg hover:bg-green-50 transition-colors duration-300">
//               <span className="font-medium text-gray-700 w-20">Experience:</span>
//               <span className="text-gray-600">{user.experienceYears || "1+ years"}</span>
//             </div>
//             <div className="flex items-center p-3 rounded-lg hover:bg-green-50 transition-colors duration-300">
//               <span className="font-medium text-gray-700 w-20">Farms:</span>
//               <span className="text-gray-600">{user.farmsManaged || "1 farm"}</span>
//             </div>
//           </div>
//         </div>
//         {/* Crop Specialization */}
//         <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
//           <h3 className="text-xl font-bold text-gray-900 mb-4">Crop Specialization</h3>
//           <div className="flex flex-wrap gap-3">
//             {Array.isArray(user.crops) && user.crops.length > 0 ? (
//               user.crops.map((crop, index) => (
//                 <span
//                   key={index}
//                   className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:from-green-200 hover:to-green-300"
//                 >
//                   {crop}
//                 </span>
//               ))
//             ) : (
//               <p className="text-gray-600">No crop specializations specified.</p>
//             )}
//           </div>
//         </div>
//         {/* Recent Activity */}
//         <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
//           <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
//           <div className="space-y-4">
//             {Array.isArray(user.loginHistory) && user.loginHistory.length > 0 ? (
//               user.loginHistory.map((log, idx) => (
//                 <div
//                   key={idx}
//                   className="flex items-center p-4 hover:bg-green-50 rounded-lg transition-all duration-300 transform hover:scale-[1.01]"
//                   style={{ animationDelay: `${idx * 0.1}s` }}
//                 >
//                   <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 text-[#097A4E]"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                       />
//                     </svg>
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-medium text-gray-900">Login Activity</p>
//                     <p className="text-sm text-gray-600">{log.date} at {log.time}</p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-600">No recent login activity.</p>
//             )}
//           </div>
//         </div>
//       </>
//     )}
//   </>
// )}
//           </Transition>

//           {/* Other Sections (Recommendations, Weather, Market) */}
//           <Transition
//             show={isVisible.recommendations}
//             enter="transition-all duration-500 ease-in-out"
//             enterFrom="opacity-0 translate-y-5"
//             enterTo="opacity-100 translate-y-0"
//             leave="transition-all duration-300 ease-in-out"
//             leaveFrom="opacity-100 translate-y-0"
//             leaveTo="opacity-0 -translate-y-5"
//             as="div"
//           >
//             {activeTab === "recommendations" && (
//               <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-xl font-bold text-gray-900">Crop Recommendation History</h2>
//                 </div>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-green-50">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-[#097A4E] uppercase tracking-wider">Date</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-[#097A4E] uppercase tracking-wider">Crop</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-[#097A4E] uppercase tracking-wider">Nitrogen</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-[#097A4E] uppercase tracking-wider">Phosphorus</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-[#097A4E] uppercase tracking-wider">Potassium</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-[#097A4E] uppercase tracking-wider">pH</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-[#097A4E] uppercase tracking-wider">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {recommendationData.map((rec, index) => (
//                         <tr
//                           key={rec.id}
//                           className="transition-all duration-300 hover:bg-green-50 transform hover:scale-[1.005]"
//                           style={{ animationDelay: `${index * 0.05}s` }}
//                         >
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rec.date}</td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rec.crop}</td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rec.nitrogen}</td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rec.phosphorus}</td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rec.potassium}</td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rec.ph}</td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                             <button
//                               onClick={() => downloadPDF(rec)}
//                               className="text-[#097A4E] hover:text-[#0B8C5A] transition-colors duration-300 flex items-center"
//                             >
//                               <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={2}
//                                   d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                                 />
//                               </svg>
//                               Download PDF
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//                 <div className="mt-6 flex justify-between items-center">
//                   <p className="text-sm text-gray-700">Showing 3 of 12 recommendations</p>
//                   <div className="flex space-x-2">
//                     <button className="bg-gray-200 text-gray-700 hover:bg-gray-300 font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm">
//                       Previous
//                     </button>
//                     <button className="bg-[#097A4E] text-white hover:bg-[#0B8C5A] font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm">
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </Transition>

//           {/* Weather Section */}
//           <Transition
//             show={isVisible.weather}
//             enter="transition-all duration-500 ease-in-out"
//             enterFrom="opacity-0 translate-y-5"
//             enterTo="opacity-100 translate-y-0"
//             leave="transition-all duration-300 ease-in-out"
//             leaveFrom="opacity-100 translate-y-0"
//             leaveTo="opacity-0 -translate-y-5"
//             as="div"
//           >
//             {activeTab === "weather" && (
//               <div className="space-y-6">
//                 {loadingWeather ? (
//                   <div className="bg-white rounded-xl shadow-lg p-6 flex justify-center items-center h-64">
//                     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#097A4E]"></div>
//                     <span className="ml-4 text-gray-600">Fetching live weather data...</span>
//                   </div>
//                 ) : weatherData ? (
//                   <>
//                     {weatherError && (
//                       <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
//                         <p>{weatherError}</p>
//                       </div>
//                     )}
//                     <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
//                       <h2 className="text-xl font-bold text-gray-900 mb-6">Current Weather</h2>
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                         <div className="bg-gradient-to-br from-[#097A4E] to-[#0B8C5A] text-white p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
//                           <div className="text-5xl mb-2">{getWeatherIcon(weatherData.current.condition)}</div>
//                           <div className="text-4xl font-bold">{weatherData.current.temperature}°C</div>
//                           <div className="text-lg">{weatherData.current.condition}</div>
//                           <div className="text-sm mt-2">Feels like {weatherData.current.feelsLike}°C</div>
//                         </div>
//                         <div className="bg-white border border-gray-200 rounded-lg p-6 transition-all duration-300 transform hover:scale-[1.01]">
//                           <h3 className="text-lg font-medium text-gray-900 mb-4">Details</h3>
//                           <div className="space-y-3">
//                             <div className="flex justify-between">
//                               <span className="text-gray-600">Humidity</span>
//                               <span className="font-medium">{weatherData.current.humidity}%</span>
//                             </div>
//                             <div className="flex justify-between">
//                               <span className="text-gray-600">Wind</span>
//                               <span className="font-medium">{weatherData.current.wind} km/h</span>
//                             </div>
//                             <div className="flex justify-between">
//                               <span className="text-gray-600">Precipitation</span>
//                               <span className="font-medium">{weatherData.current.precipitation} mm</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
//                       <h2 className="text-xl font-bold text-gray-900 mb-6">Your Location</h2>
//                       <LiveMap />
//                     </div>
//                     <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
//                       <h2 className="text-xl font-bold text-gray-900 mb-6">7-Day Forecast</h2>
//                       <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
//                         {weatherData.forecast.map((day, index) => (
//                           <div
//                             key={index}
//                             className="text-center p-4 bg-green-50 rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-green-100"
//                             style={{ animationDelay: `${index * 0.1}s` }}
//                           >
//                             <div className="text-lg font-medium text-gray-900">{day.day}</div>
//                             <div className="text-3xl my-2">{getWeatherIcon(day.condition)}</div>
//                             <div className="text-xl font-bold text-gray-900">{day.high}°</div>
//                             <div className="text-gray-600">{day.low}°</div>
//                             <div className="text-sm text-gray-600 mt-1">{day.condition}</div>
//                             {day.rain > 0 && (
//                               <div className="text-sm text-blue-600 mt-1">{day.rain} mm rain</div>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   <div className="bg-white rounded-xl shadow-lg p-6 text-center">
//                     <p className="text-red-500">Could not load weather data.</p>
//                   </div>
//                 )}
//               </div>
//             )}
//           </Transition>

//           {/* Market Prices Section */}
//           <Transition
//             show={isVisible.market}
//             enter="transition-all duration-500 ease-in-out"
//             enterFrom="opacity-0 translate-y-5"
//             enterTo="opacity-100 translate-y-0"
//             leave="transition-all duration-300 ease-in-out"
//             leaveFrom="opacity-100 translate-y-0"
//             leaveTo="opacity-0 -translate-y-5"
//             as="div"
//           >
//             {activeTab === "market" && (
//               <div className="space-y-6">
//                 <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
//                   <h2 className="text-lg font-bold text-gray-900 mb-4">Filter Market Prices</h2>
//                   {loadingFilters ? (
//                     <div className="flex justify-center items-center py-8">
//                       <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#097A4E]"></div>
//                       <span className="ml-3 text-gray-600">Loading filter options...</span>
//                     </div>
//                   ) : filterError ? (
//                     <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded mb-4">
//                       <p>{filterError}</p>
//                     </div>
//                   ) : null}
//                   <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                     <select
//                       value={selectedState}
//                       onChange={(e) => setSelectedState(e.target.value)}
//                       className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#097A4E] focus:outline-none transition-colors duration-300"
//                     >
//                       <option value="">Select State</option>
//                       {states.map((state) => (
//                         <option key={state} value={state}>
//                           {state}
//                         </option>
//                       ))}
//                     </select>
//                     <select
//                       value={selectedDistrict}
//                       onChange={(e) => setSelectedDistrict(e.target.value)}
//                       className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#097A4E] focus:outline-none transition-colors duration-300"
//                       disabled={!selectedState}
//                     >
//                       <option value="">Select District</option>
//                       {districts.map((district) => (
//                         <option key={district} value={district}>
//                           {district}
//                         </option>
//                       ))}
//                     </select>
//                     <select
//                       value={selectedCommodity}
//                       onChange={(e) => setSelectedCommodity(e.target.value)}
//                       className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#097A4E] focus:outline-none transition-colors duration-300"
//                     >
//                       <option value="">Select Commodity</option>
//                       {commodities.map((commodity) => (
//                         <option key={commodity} value={commodity}>
//                           {commodity}
//                         </option>
//                       ))}
//                     </select>
//                     <input
//                       type="date"
//                       value={selectedDate}
//                       max={today.toISOString().split("T")[0]}
//                       onChange={(e) => setSelectedDate(e.target.value)}
//                       className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#097A4E] focus:outline-none transition-colors duration-300"
//                     />
//                   </div>
//                   <button
//                     onClick={fetchMarketPrices}
//                     className="mt-4 bg-[#097A4E] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#0B8C5A] transition-all duration-300 transform hover:scale-105 shadow-md"
//                     disabled={!selectedState || !selectedCommodity}
//                   >
//                     Search
//                   </button>
//                 </div>
//                 {marketError && (
//                   <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
//                     <p>{marketError}</p>
//                   </div>
//                 )}
//                 {loadingMarket ? (
//                   <div className="bg-white rounded-xl shadow-lg p-6 flex justify-center items-center h-64">
//                     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#097A4E]"></div>
//                     <span className="ml-4 text-gray-600">Fetching market prices...</span>
//                   </div>
//                 ) : marketPrices.length > 0 ? (
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                     {marketPrices.map((item, idx) => (
//                       <div
//                         key={idx}
//                         className="bg-white border border-gray-200 rounded-xl p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
//                         style={{ animationDelay: `${idx * 0.1}s` }}
//                       >
//                         <div className="flex items-center mb-4">
//                           <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
//                             <span className="text-[#097A4E] font-bold">{item.Commodity.charAt(0)}</span>
//                           </div>
//                           <div>
//                             <h3 className="font-medium text-gray-900">{item.Commodity}</h3>
//                             <p className="text-sm text-gray-600">{item.Market}</p>
//                           </div>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span className="text-xl font-bold text-gray-900">₹{item.Modal_x0020_Price} /quintal</span>
//                           <span className="text-sm text-gray-500">{item.Arrival_Date}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   !loadingMarket && (
//                     <div className="bg-white rounded-xl shadow-lg p-6 text-center">
//                       <p className="text-gray-500">No market price data available. Try adjusting the filters and searching again.</p>
//                     </div>
//                   )
//                 )}
//               </div>
//             )}
//           </Transition>
//         </div>
//       </div>
//       <style>
//         {`
//           @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
//           .font-poppins {
//             font-family: 'Poppins', sans-serif;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Dashboard;






// src/components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Transition } from "@headlessui/react";
import axios from "axios";
import LiveMap from "../pages/farmer/Map";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading: authLoading, error } = useAuth(); // Consolidated destructuring
  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({
    profile: true,
    recommendations: false,
    weather: false,
    market: false,
  });

  // Weather and market states (unchanged)
  const [weatherData, setWeatherData] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [weatherError, setWeatherError] = useState(null);
  const [marketPrices, setMarketPrices] = useState([]);
  const [loadingMarket, setLoadingMarket] = useState(true);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [commodities, setCommodities] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(true);
  const [filterError, setFilterError] = useState("");
  const [marketError, setMarketError] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock recommendation data (unchanged)
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
      rainfall: "45mm",
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
      rainfall: "120mm",
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
      rainfall: "35mm",
    },
  ]);

  // Helper functions
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const today = new Date();

  const handleClick = () => {
      setLoading(true);
  
      setTimeout(() => {
        if (isAuthenticated) {
          navigate("/prediction");
          toast.success("Redirecting to your prediction page!");
        } else {
          navigate("/login");
          toast.info("Please login or signup to get started!");
        }
        setLoading(false);
      }, 500);
    };

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
    console.log("Downloading PDF for:", recommendation);
    toast.info(`PDF download started for ${recommendation.crop} recommendation`);
  };

  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case "sunny":
        return "☀️";
      case "partly cloudy":
        return "⛅";
      case "cloudy":
        return "☁️";
      case "rainy":
        return "🌧️";
      case "mostly sunny":
        return "🌤️";
      default:
        return "🌡️";
    }
  };

  // Weather data fetching (unchanged)
  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        setWeatherError(null);
        const res = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
        );
        const data = res.data;
        const mappedWeather = {
          current: {
            temperature: data.hourly.temperature_2m[0],
            condition: data.hourly.precipitation[0] > 0 ? "Rainy" : "Partly Cloudy",
            humidity: data.hourly.relative_humidity_2m[0],
            wind: data.hourly.windspeed_10m ? data.hourly.windspeed_10m[0] : 10,
            precipitation: data.hourly.precipitation[0],
            feelsLike: data.hourly.temperature_2m[0] + 2,
          },
          forecast: data.daily.time.slice(0, 7).map((day, idx) => ({
            day: idx === 0 ? "Today" : new Date(day).toLocaleDateString("en-US", { weekday: "short" }),
            high: data.daily.temperature_2m_max[idx],
            low: data.daily.temperature_2m_min[idx],
            condition: data.daily.precipitation_sum[idx] > 0 ? "Rainy" : "Cloudy",
            rain: data.daily.precipitation_sum[idx],
          })),
        };
        setWeatherData(mappedWeather);
        setLoadingWeather(false);
      } catch (err) {
        console.error("Error fetching weather:", err);
        setWeatherError("Failed to load weather data. Please try again later.");
        setLoadingWeather(false);
        setWeatherData({
          current: {
            temperature: 28,
            condition: "Partly Cloudy",
            humidity: 65,
            wind: 12,
            precipitation: 0,
            feelsLike: 30,
          },
          forecast: [
            { day: "Today", high: 30, low: 22, condition: "Partly Cloudy", rain: 0 },
            { day: "Tue", high: 31, low: 23, condition: "Sunny", rain: 0 },
            { day: "Wed", high: 29, low: 21, condition: "Cloudy", rain: 0.5 },
            { day: "Thu", high: 28, low: 20, condition: "Rainy", rain: 2.3 },
            { day: "Fri", high: 27, low: 19, condition: "Rainy", rain: 1.8 },
            { day: "Sat", high: 29, low: 20, condition: "Cloudy", rain: 0.2 },
            { day: "Sun", high: 30, low: 21, condition: "Sunny", rain: 0 },
          ],
        });
      }
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchWeather(latitude, longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setWeatherError("Location access denied. Using default location.");
          fetchWeather(31.1471, 75.3412);
        }
      );
    } else {
      setWeatherError("Geolocation not supported. Using default location.");
      fetchWeather(31.1471, 75.3412);
    }
  }, []);

  // Market data functions (using mock data as per your update)
  const fetchStates = async () => {
    try {
      const mockStates = ["Maharashtra", "Punjab", "Haryana", "Uttar Pradesh", "Karnataka"];
      return mockStates;
    } catch (err) {
      console.error("Error fetching states:", err);
      throw err;
    }
  };

  const fetchDistricts = async (state) => {
    try {
      const districtMap = {
        Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
        Punjab: ["Amritsar", "Ludhiana", "Jalandhar", "Patiala"],
        Haryana: ["Faridabad", "Gurgaon", "Panipat", "Ambala"],
        "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi"],
        Karnataka: ["Bangalore", "Mysore", "Hubli", "Mangalore"],
      };
      return districtMap[state] || ["Select district"];
    } catch (err) {
      console.error("Error fetching districts:", err);
      throw err;
    }
  };

  const fetchCommodities = async () => {
    try {
      return ["Onion", "Wheat", "Rice", "Cotton", "Sugarcane", "Tomato", "Potato"];
    } catch (err) {
      console.error("Error fetching commodities:", err);
      throw err;
    }
  };

  const fetchMarketPrices = async () => {
    setLoadingMarket(true);
    setMarketError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockPrices = [
        {
          Commodity: selectedCommodity || "Onion",
          Market: `${selectedDistrict || "Pune"} Market`,
          Modal_x0020_Price: Math.floor(Math.random() * 2000) + 1000,
          Arrival_Date: formatDate(selectedDate) || "15/09/2023",
        },
        {
          Commodity: selectedCommodity || "Onion",
          Market: "Wholesale Market",
          Modal_x0020_Price: Math.floor(Math.random() * 2000) + 1000,
          Arrival_Date: formatDate(selectedDate) || "15/09/2023",
        },
        {
          Commodity: selectedCommodity || "Onion",
          Market: "Local Market",
          Modal_x0020_Price: Math.floor(Math.random() * 2000) + 1000,
          Arrival_Date: formatDate(selectedDate) || "15/09/2023",
        },
      ];
      setMarketPrices(mockPrices);
    } catch (err) {
      console.error("Error fetching market prices:", err);
      setMarketError("Failed to fetch market prices. Please try again.");
      setMarketPrices([]);
    } finally {
      setLoadingMarket(false);
    }
  };

  // Initialize filters
  useEffect(() => {
    const initFilters = async () => {
      setLoadingFilters(true);
      setFilterError("");
      try {
        const fetchedStates = await fetchStates();
        setStates(fetchedStates);
        if (fetchedStates.length === 0) {
          setFilterError("No states available. Using mock data.");
          return;
        }
        const defaultState = fetchedStates[0];
        setSelectedState(defaultState);
        const fetchedDistricts = await fetchDistricts(defaultState);
        setDistricts(fetchedDistricts);
        if (fetchedDistricts.length > 0) {
          setSelectedDistrict(fetchedDistricts[0]);
        }
        const fetchedCommodities = await fetchCommodities();
        setCommodities(fetchedCommodities);
        if (fetchedCommodities.length > 0) {
          setSelectedCommodity(fetchedCommodities[0]);
        }
      } catch (err) {
        setFilterError("Failed to load filter options. Using mock data.");
        setStates(["Maharashtra", "Punjab", "Haryana"]);
        setDistricts(["Mumbai", "Pune", "Nagpur"]);
        setCommodities(["Onion", "Wheat", "Rice"]);
        setSelectedState("Maharashtra");
        setSelectedDistrict("Pune");
        setSelectedCommodity("Onion");
      } finally {
        setLoadingFilters(false);
      }
    };
    initFilters();
  }, []);

  // Update districts when state changes
  useEffect(() => {
    if (selectedState) {
      fetchDistricts(selectedState)
        .then(setDistricts)
        .catch((err) => {
          console.error("Error fetching districts:", err);
          setDistricts(["Select district"]);
        });
    }
  }, [selectedState]);

  // Auto-fetch market prices
  useEffect(() => {
    if (selectedState && selectedCommodity && selectedDate) {
      fetchMarketPrices();
    }
  }, [selectedState, selectedDistrict, selectedCommodity, selectedDate]);

  // Animation on tab change
  useEffect(() => {
    setIsVisible({
      profile: activeTab === "profile",
      recommendations: activeTab === "recommendations",
      weather: activeTab === "weather",
      market: activeTab === "market",
    });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col font-poppins">
      {/* Dashboard Header */}
      <div className="bg-[#097A4E] shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">AgriPredict Dashboard</h1>
              {authLoading ? (
                <p className="text-lg text-white/90 mt-1">Loading user data...</p>
              ) : (
                <p className="text-lg text-white/90 mt-1">Welcome back, {user?.name || "User"}!</p>
              )}
            </div>
            <div className="flex mt-4 md:mt-0 space-x-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden bg-white text-[#097A4E] hover:bg-green-50 font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Menu
              </button>
              <button
                onClick={handleClick}
                className="bg-white text-[#097A4E] hover:bg-green-50 font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                New Prediction
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 flex flex-1">
        {/* Sidebar */}
        <Transition
          show={sidebarOpen || window.innerWidth >= 768}
          enter="transition-all duration-300 ease-in-out"
          enterFrom="opacity-0 -translate-x-full"
          enterTo="opacity-100 translate-x-0"
          leave="transition-all duration-300 ease-in-out"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 -translate-x-full"
          as="div"
          className={`fixed md:static w-full md:w-64 bg-white rounded-lg shadow-xl p-6 mb-6 md:mb-0 md:mr-6 h-fit z-40 ${sidebarOpen ? "block" : "hidden md:block"}`}
        >
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Navigation</h2>
            <nav className="space-y-2">
              {[
                { id: "profile", label: "Profile", icon: "👤" },
                { id: "recommendations", label: "Recommendations", icon: "📊" },
                { id: "weather", label: "Weather", icon: "🌤️" },
                { id: "market", label: "Market Prices", icon: "📈" },
              ].map((item) => (
                <button
                  key={item.id}
                  className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-300 flex items-center ${
                    activeTab === item.id
                      ? "bg-[#097A4E] text-white shadow-md transform scale-[1.02]"
                      : "text-gray-600 hover:bg-green-50 hover:text-[#097A4E]"
                  }`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                >
                  <span className="text-xl mr-3">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
            <button
              onClick={handleGoHome}
              className="w-full bg-gradient-to-r from-[#097A4E] to-[#0B8C5A] text-white hover:from-[#0B8C5A] hover:to-[#097A4E] font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center group"
            >
              <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
              Back to Home
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center group"
            >
              <span className="mr-2 group-hover:rotate-12 transition-transform">↗</span>
              Logout
              <span className="ml-2 group-hover:-rotate-12 transition-transform">↗</span>
            </button>
          </div>
        </Transition>

        {/* Dashboard Content */}
        <div className="flex-1">
          {/* Profile Section */}
          <Transition
            show={isVisible.profile}
            enter="transition-all duration-500 ease-in-out"
            enterFrom="opacity-0 translate-y-5"
            enterTo="opacity-100 translate-y-0"
            leave="transition-all duration-300 ease-in-out"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-5"
            as="div"
            className="space-y-6"
          >
            {activeTab === "profile" && (
              <>
                {authLoading ? (
                  <div className="bg-white rounded-xl shadow-lg p-6 flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#097A4E]"></div>
                    <span className="ml-4 text-gray-600">Loading profile data...</span>
                  </div>
                ) : error ? (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                    <p>{error}. Please try logging in again.</p>
                  </div>
                ) : !user ? (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                    <p>Failed to load user profile. Please log in again.</p>
                  </div>
                ) : (
                  <>
                    {/* Profile Header */}
                    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                      <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="relative">
                          <div className="w-32 h-32 rounded-full bg-green-100 border-4 border-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105">
                            {user.profileImage ? (
                              <img
                                src={`http://localhost:5000${user.profileImage}`}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <span className="text-5xl font-bold text-[#097A4E]">
                                {(user.name || "User").charAt(0)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-center md:text-left flex-1">
                          <h2 className="text-3xl font-bold text-gray-900 mb-2">{user.name || "User"}</h2>
                          <p className="text-xl text-[#097A4E] mb-4">{user.title || "Farmer"}</p>
                          <button
                            onClick={() => navigate("/profile/edit")}
                            className="bg-[#097A4E] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#0B8C5A] transition-all duration-300"
                          >
                            Edit Profile
                          </button>
                          <div className="flex flex-wrap gap-6 justify-center md:justify-start text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              {user.location || "India"}
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              Member since {user.joinDate || "Unknown"}
                            </div>
                            {user.lastLogin && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                Last Login: {new Date(user.lastLogin).toLocaleString("en-US", {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Contact Information */}
                    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center p-3 rounded-lg hover:bg-green-50 transition-colors duration-300">
                          <span className="font-medium text-gray-700 w-20">Phone:</span>
                          <span className="text-gray-600">{user.phone || "N/A"}</span>
                        </div>
                        <div className="flex items-center p-3 rounded-lg hover:bg-green-50 transition-colors duration-300">
                          <span className="font-medium text-gray-700 w-20">Email:</span>
                          <span className="text-gray-600">{user.email || "N/A"}</span>
                        </div>
                        <div className="flex items-center p-3 rounded-lg hover:bg-green-50 transition-colors duration-300">
                          <span className="font-medium text-gray-700 w-20">Experience:</span>
                          <span className="text-gray-600">{user.experienceYears || "1+ years"}</span>
                        </div>
                        <div className="flex items-center p-3 rounded-lg hover:bg-green-50 transition-colors duration-300">
                          <span className="font-medium text-gray-700 w-20">Farms:</span>
                          <span className="text-gray-600">{user.farmsManaged || "1 farm"}</span>
                        </div>
                      </div>
                    </div>
                    {/* Crop Specialization */}
                    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Crop Specialization</h3>
                      <div className="flex flex-wrap gap-3">
                        {Array.isArray(user.crops) && user.crops.length > 0 ? (
                          user.crops.map((crop, index) => (
                            <span
                              key={index}
                              className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:from-green-200 hover:to-green-300"
                            >
                              {crop}
                            </span>
                          ))
                        ) : (
                          <p className="text-gray-600">No crop specializations specified.</p>
                        )}
                      </div>
                    </div>
                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
                      <div className="space-y-4">
                        {Array.isArray(user.loginHistory) && user.loginHistory.length > 0 ? (
                          user.loginHistory.map((log, idx) => (
                            <div
                              key={idx}
                              className="flex items-center p-4 hover:bg-green-50 rounded-lg transition-all duration-300 transform hover:scale-[1.01]"
                              style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-[#097A4E]"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
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
                          ))
                        ) : (
                          <p className="text-gray-600">No recent login activity.</p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </Transition>

          <Transition
            show={isVisible.recommendations}
            enter="transition-all duration-500 ease-in-out"
            enterFrom="opacity-0 translate-y-5"
            enterTo="opacity-100 translate-y-0"
            leave="transition-all duration-300 ease-in-out"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-5"
            as="div"
          >
            {activeTab === "recommendations" && (
              <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Crop Recommendation History</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-green-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#097A4E] uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#097A4E] uppercase tracking-wider">Crop</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#097A4E] uppercase tracking-wider">Nitrogen</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#097A4E] uppercase tracking-wider">Phosphorus</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#097A4E] uppercase tracking-wider">Potassium</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#097A4E] uppercase tracking-wider">pH</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#097A4E] uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recommendationData.map((rec, index) => (
                        <tr
                          key={rec.id}
                          className="transition-all duration-300 hover:bg-green-50 transform hover:scale-[1.005]"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rec.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rec.crop}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rec.nitrogen}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rec.phosphorus}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rec.potassium}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rec.ph}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => downloadPDF(rec)}
                              className="text-[#097A4E] hover:text-[#0B8C5A] transition-colors duration-300 flex items-center"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
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
                    <button className="bg-gray-200 text-gray-700 hover:bg-gray-300 font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm">
                      Previous
                    </button>
                    <button className="bg-[#097A4E] text-white hover:bg-[#0B8C5A] font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Transition>

          {/* Weather Section */}
          <Transition
            show={isVisible.weather}
            enter="transition-all duration-500 ease-in-out"
            enterFrom="opacity-0 translate-y-5"
            enterTo="opacity-100 translate-y-0"
            leave="transition-all duration-300 ease-in-out"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-5"
            as="div"
          >
            {activeTab === "weather" && (
              <div className="space-y-6">
                {loadingWeather ? (
                  <div className="bg-white rounded-xl shadow-lg p-6 flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#097A4E]"></div>
                    <span className="ml-4 text-gray-600">Fetching live weather data...</span>
                  </div>
                ) : weatherData ? (
                  <>
                    {weatherError && (
                      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
                        <p>{weatherError}</p>
                      </div>
                    )}
                    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                      <h2 className="text-xl font-bold text-gray-900 mb-6">Current Weather</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-[#097A4E] to-[#0B8C5A] text-white p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                          <div className="text-5xl mb-2">{getWeatherIcon(weatherData.current.condition)}</div>
                          <div className="text-4xl font-bold">{weatherData.current.temperature}°C</div>
                          <div className="text-lg">{weatherData.current.condition}</div>
                          <div className="text-sm mt-2">Feels like {weatherData.current.feelsLike}°C</div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-6 transition-all duration-300 transform hover:scale-[1.01]">
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
                              <span className="font-medium">{weatherData.current.precipitation} mm</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                      <h2 className="text-xl font-bold text-gray-900 mb-6">Your Location</h2>
                      <LiveMap />
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                      <h2 className="text-xl font-bold text-gray-900 mb-6">7-Day Forecast</h2>
                      <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
                        {weatherData.forecast.map((day, index) => (
                          <div
                            key={index}
                            className="text-center p-4 bg-green-50 rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-green-100"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <div className="text-lg font-medium text-gray-900">{day.day}</div>
                            <div className="text-3xl my-2">{getWeatherIcon(day.condition)}</div>
                            <div className="text-xl font-bold text-gray-900">{day.high}°</div>
                            <div className="text-gray-600">{day.low}°</div>
                            <div className="text-sm text-gray-600 mt-1">{day.condition}</div>
                            {day.rain > 0 && (
                              <div className="text-sm text-blue-600 mt-1">{day.rain} mm rain</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <p className="text-red-500">Could not load weather data.</p>
                  </div>
                )}
              </div>
            )}
          </Transition>

          {/* Market Prices Section */}
          <Transition
            show={isVisible.market}
            enter="transition-all duration-500 ease-in-out"
            enterFrom="opacity-0 translate-y-5"
            enterTo="opacity-100 translate-y-0"
            leave="transition-all duration-300 ease-in-out"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-5"
            as="div"
          >
            {activeTab === "market" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Filter Market Prices</h2>
                  {loadingFilters ? (
                    <div className="flex justify-center items-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#097A4E]"></div>
                      <span className="ml-3 text-gray-600">Loading filter options...</span>
                    </div>
                  ) : filterError ? (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded mb-4">
                      <p>{filterError}</p>
                    </div>
                  ) : null}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#097A4E] focus:outline-none transition-colors duration-300"
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    <select
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#097A4E] focus:outline-none transition-colors duration-300"
                      disabled={!selectedState}
                    >
                      <option value="">Select District</option>
                      {districts.map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                    <select
                      value={selectedCommodity}
                      onChange={(e) => setSelectedCommodity(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#097A4E] focus:outline-none transition-colors duration-300"
                    >
                      <option value="">Select Commodity</option>
                      {commodities.map((commodity) => (
                        <option key={commodity} value={commodity}>
                          {commodity}
                        </option>
                      ))}
                    </select>
                    <input
                      type="date"
                      value={selectedDate}
                      max={today.toISOString().split("T")[0]}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#097A4E] focus:outline-none transition-colors duration-300"
                    />
                  </div>
                  <button
                    onClick={fetchMarketPrices}
                    className="mt-4 bg-[#097A4E] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#0B8C5A] transition-all duration-300 transform hover:scale-105 shadow-md"
                    disabled={!selectedState || !selectedCommodity}
                  >
                    Search
                  </button>
                </div>
                {marketError && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                    <p>{marketError}</p>
                  </div>
                )}
                {loadingMarket ? (
                  <div className="bg-white rounded-xl shadow-lg p-6 flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#097A4E]"></div>
                    <span className="ml-4 text-gray-600">Fetching market prices...</span>
                  </div>
                ) : marketPrices.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {marketPrices.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-gray-200 rounded-xl p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <span className="text-[#097A4E] font-bold">{item.Commodity.charAt(0)}</span>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{item.Commodity}</h3>
                            <p className="text-sm text-gray-600">{item.Market}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-gray-900">₹{item.Modal_x0020_Price} /quintal</span>
                          <span className="text-sm text-gray-500">{item.Arrival_Date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  !loadingMarket && (
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                      <p className="text-gray-500">No market price data available. Try adjusting the filters and searching again.</p>
                    </div>
                  )
                )}
              </div>
            )}
          </Transition>
        </div>
      </div>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          .font-poppins {
            font-family: 'Poppins', sans-serif;
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
