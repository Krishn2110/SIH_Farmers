import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Transition } from "@headlessui/react";

const Dashboard = ({
  baseUrl = import.meta.env.VITE_API_BASE_URL || "",
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [farmer, setFarmer] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [weather, setWeather] = useState({ current: null, forecast: [], alerts: [] });
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState({
    profile: true,
    recommendations: true,
    weather: true,
    market: true,
  });
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const token = localStorage.getItem("token") || "";

  // Show notification function
  const showNotification = (message, type = "info") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 5000);
  };

  useEffect(() => {
    const controller = new AbortController();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const fetchJson = async (url, setter, loaderKey) => {
      try {
        const res = await fetch(url, { headers, signal: controller.signal });
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`${res.status} ${res.statusText} ${text}`);
        }
        const data = await res.json().catch(() => null);
        setter(data);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Fetch error:", url, err);
        setError((prev) => `${prev ? prev + " | " : ""}${loaderKey}: ${err.message}`);
        showNotification(`Failed to load ${loaderKey}`, "error");
      } finally {
        setLoading((s) => ({ ...s, [loaderKey]: false }));
      }
    };

    if (baseUrl) {
      fetchJson(`${baseUrl}/api/profile`, setFarmer, "profile");
      fetchJson(`${baseUrl}/api/recommendations`, setRecommendations, "recommendations");
      fetchJson(`${baseUrl}/api/weather`, setWeather, "weather");
      fetchJson(`${baseUrl}/api/market`, setMarketData, "market");
    } else {
      setLoading({ profile: false, recommendations: false, weather: false, market: false });
    }

    return () => controller.abort();
  }, [baseUrl, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    showNotification("Logged out successfully", "success");
    setTimeout(() => navigate("/login"), 1000);
  };

  const handleNewRecommendation = () => navigate("/recommendation");

  const handleAddCrop = () => navigate("/add-crop");

  const handleUpdateFarm = () => navigate("/update-farm");

  const downloadPDF = async (recommendation) => {
    if (!baseUrl) {
      showNotification("Download unavailable: backend not configured", "error");
      return;
    }
    try {
      const id = recommendation.id || recommendation._id;
      const res = await fetch(`${baseUrl}/api/recommendations/${id}/pdf`, {
        method: "GET",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${recommendation.crop || "recommendation"}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showNotification("PDF downloaded successfully", "success");
    } catch (err) {
      console.error("Download error:", err);
      showNotification("Failed to download PDF", "error");
    }
  };

  const getWeatherIcon = (condition) => {
    if (!condition) return "🌡️";
    switch (condition.toLowerCase()) {
      case "sunny": return "☀️";
      case "partly cloudy": return "⛅";
      case "cloudy": return "☁️";
      case "rain": return "🌧️";
      case "mostly sunny": return "🌤️";
      case "thunderstorm": return "⛈️";
      case "snow": return "❄️";
      case "windy": return "💨";
      default: return "🌡️";
    }
  };

  const safe = (v, fallback = "—") => (v === undefined || v === null || v === "" ? fallback : v);

  const formatCurrency = (value) => {
    if (!value) return "—";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const isValidDate = (date) => {
    return date && !isNaN(new Date(date).getTime());
  };

  const hasContactInfo = () => {
    return (
      farmer?.phoneNumber ||
      farmer?.email ||
      farmer?.experienceYears ||
      farmer?.farmsManaged
    );
  };

  const mockAlerts = [
    { id: 1, message: "Pest alert: Aphids detected in your area", type: "warning" },
    { id: 2, message: "Fertilizer prices dropping this week", type: "info" },
  ];

  return (
    <div className="flex min-h-screen bg-[#ffffff] font-inter">
      {/* Notification */}
      <Transition
        show={notification.show}
        enter="transition-all duration-300 ease-out"
        enterFrom="opacity-0 -translate-y-10"
        enterTo="opacity-100 translate-y-0"
        leave="transition-all duration-300 ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-10"
        className="fixed z-50 w-full max-w-sm top-4 right-4"
      >
        <div
          className={`p-4 rounded-lg border-l-4 ${
            notification.type === "error"
              ? "bg-red-100 text-red-800 border-red-500"
              : notification.type === "success"
              ? "bg-green-100 text-green-800 border-[#097A4E]"
              : "bg-blue-100 text-blue-800 border-blue-500"
          }`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {notification.type === "error" ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : notification.type === "success" ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
          </div>
        </div>
      </Transition>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200
          md:static md:block md:w-72 md:min-w-[18rem]
          transform transition-all duration-500 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        aria-label="Main navigation"
      >
        <Transition
          show={sidebarOpen || window.innerWidth >= 768}
          enter="transform transition ease-in-out duration-500"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-500"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="flex flex-col min-h-screen bg-white">
            <div className="flex items-center justify-between p-6 bg-[#097A4E]">
              <div className="flex items-center gap-3">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm1-13h-2v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
                <h2 className="text-2xl font-extrabold tracking-tight text-white">AgriPredict</h2>
              </div>
              <button
                className="p-2 rounded-full md:hidden hover:bg-[#0B8C5A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#097A4E]"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close sidebar"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 p-6 space-y-2">
              {[
                { name: "Dashboard", tab: "dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
                { name: "Profile", tab: "profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
                { name: "Recommendations", tab: "recommendations", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
                { name: "Weather", tab: "weather", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" },
                { name: "Market Prices", tab: "market", icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" },
                { name: "Logout", tab: "logout", icon: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" },
              ].map((item) => (
                <button
                  key={item.tab}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                    activeTab === item.tab
                      ? "bg-[#097A4E] text-white"
                      : "text-gray-700 hover:bg-[#E6F3E9] hover:text-[#097A4E]"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#097A4E]`}
                  onClick={() => {
                    if (item.tab === "logout") {
                      handleLogout();
                    } else {
                      setActiveTab(item.tab);
                      setSidebarOpen(false);
                    }
                  }}
                  aria-current={activeTab === item.tab ? "page" : undefined}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  <span className="text-sm font-medium">{item.name}</span>
                </button>
              ))}
            </nav>
            <div className="p-6 mt-auto">
              <button
                className="w-full px-4 py-3 text-white bg-[#097A4E] rounded-lg hover:bg-[#0B8C5A] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#097A4E]"
                onClick={handleLogout}
                aria-label="Logout"
              >
                Logout
              </button>
            </div>
          </div>
        </Transition>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="bg-[#097A4E] border-b border-gray-200">
          <div className="container flex items-center justify-between px-6 py-2.5 mx-auto">
            <div className="flex items-center gap-4">
              <button
                className="p-2 rounded-full md:hidden hover:bg-[#0B8C5A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-white">AgriPredict Dashboard</h1>
                <p className="text-lg font-medium text-white">{getGreeting()}, {safe(farmer?.name, "Farmer")}!</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
                  <span className="text-lg font-extrabold text-[#097A4E]">{farmer?.name ? farmer.name.charAt(0) : "F"}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container flex-1 px-6 py-8 mx-auto">
          {error && (
            <div className="p-4 mb-6 text-red-700 bg-white border-l-4 border-red-500 rounded-lg animate-pulse" role="alert">
              {error}
            </div>
          )}

          {/* Dashboard Section */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="p-6 transition-all duration-500 bg-white border border-gray-200 rounded-xl animate-fade-in-up">
                <div className="flex flex-col items-center gap-6 md:flex-row">
                  <div className="relative">
                    {farmer?.profilePicture ? (
                      <img
                        src={farmer.profilePicture}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-2 border-[#E6F3E9] object-cover transition-all duration-300 hover:scale-[1.05]"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-24 h-24 bg-[#097A4E] border-2 border-[#E6F3E9] rounded-full transition-all duration-300 hover:scale-[1.05]">
                        <span className="text-4xl font-extrabold text-white">{farmer?.name ? farmer.name.charAt(0) : "F"}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-extrabold text-gray-900">{safe(farmer?.name)}</h2>
                    <p className="text-lg font-medium text-[#097A4E]">{safe(farmer?.role, "Farmer")}</p>
                    <div className="flex flex-wrap justify-center gap-4 mt-4 md:justify-start">
                      {farmer?.location && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {safe(farmer.location)}
                        </div>
                      )}
                      {isValidDate(farmer?.createdAt) && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Member since {safe(new Date(farmer?.createdAt).toLocaleDateString())}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleUpdateFarm}
                    className="px-4 py-2 text-white bg-[#097A4E] rounded-lg hover:bg-[#0B8C5A] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#097A4E]"
                    aria-label="Update farm info"
                  >
                    Update Farm Info
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                <div
                  className="p-6 rounded-2xl bg-white shadow-[0_4px_12px_rgba(9,122,78,0.2)] hover:shadow-[0_6px_18px_rgba(9,122,78,0.3)] transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#097A4E] rounded-t-2xl"></div>
                  <h3 className="text-lg font-semibold text-[#097A4E] tracking-wide">Farms Managed</h3>
                  <p className="mt-3 text-3xl font-bold text-[#097A4E]">{safe(farmer?.farmsManaged, 0)}</p>
                </div>
                <div
                  className="p-6 rounded-2xl bg-white shadow-[0_4px_12px_rgba(9,122,78,0.2)] hover:shadow-[0_6px_18px_rgba(9,122,78,0.3)] transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#097A4E] rounded-t-2xl"></div>
                  <h3 className="text-lg font-semibold text-[#097A4E] tracking-wide">Crops Planted</h3>
                  <p className="mt-3 text-3xl font-bold text-[#097A4E]">{safe(farmer?.crops?.length, 0)}</p>
                </div>
                <div
                  className="p-6 rounded-2xl bg-white shadow-[0_4px_12px_rgba(9,122,78,0.2)] hover:shadow-[0_6px_18px_rgba(9,122,78,0.3)] transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#097A4E] rounded-t-2xl"></div>
                  <h3 className="text-lg font-semibold text-[#097A4E] tracking-wide">Current Weather</h3>
                  <p className="mt-3 text-3xl font-bold text-[#097A4E]">{weather?.current ? `${safe(weather.current.temperature, "--")}°C` : "—"}</p>
                </div>
                <div
                  className="p-6 rounded-2xl bg-white shadow-[0_4px_12px_rgba(9,122,78,0.2)] hover:shadow-[0_6px_18px_rgba(9,122,78,0.3)] transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#097A4E] rounded-t-2xl"></div>
                  <h3 className="text-lg font-semibold text-[#097A4E] tracking-wide">Upcoming Recommendations</h3>
                  <p className="mt-3 text-3xl font-bold text-[#097A4E]">{safe(recommendations?.length, 0)}</p>
                </div>
              </div>

              {/* Alerts/Notifications */}
              <div className="p-6 transition-all duration-500 bg-white border border-gray-200 rounded-xl animate-fade-in-up">
                <h3 className="mb-4 text-xl font-bold text-gray-900">Alerts</h3>
                {mockAlerts.length > 0 ? (
                  <div className="space-y-4">
                    {mockAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-4 border-l-4 rounded-lg ${
                          alert.type === "warning" ? "border-yellow-400 bg-yellow-50" : "border-blue-500 bg-blue-50"
                        }`}
                      >
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg className={`w-5 h-5 ${alert.type === "warning" ? "text-yellow-400" : "text-blue-500"}`} fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className={`text-sm font-medium ${alert.type === "warning" ? "text-yellow-800" : "text-blue-800"}`}>{alert.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No alerts at this time.</p>
                )}
              </div>

              {/* Recommendations Snapshot */}
              <div className="p-6 transition-all duration-500 bg-white border border-gray-200 rounded-xl animate-fade-in-up">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Latest Recommendations</h3>
                  <button
                    onClick={() => setActiveTab("recommendations")}
                    className="text-[#097A4E] hover:text-[#0B8C5A] transition-all duration-300"
                    aria-label="View all recommendations"
                  >
                    See All
                  </button>
                </div>
                {loading.recommendations ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, idx) => (
                      <div key={idx} className="h-12 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : recommendations.length === 0 ? (
                  <div className="text-center">
                    <p className="text-gray-600">No recommendations yet.</p>
                    <button
                      onClick={handleNewRecommendation}
                      className="mt-4 px-4 py-2 text-white bg-[#097A4E] rounded-lg hover:bg-[#0B8C5A] transition-all duration-300"
                      aria-label="Create new recommendation"
                    >
                      Create Your First Recommendation
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recommendations.slice(0, 3).map((rec, index) => (
                      <div
                        key={rec.id || rec._id}
                        className="p-4 bg-[#E6F3E9] rounded-lg transition-all duration-300 hover:bg-green-100"
                        style={{ animation: "fadeIn 0.5s ease-in", animationDelay: `${index * 0.1}s`, animationFillMode: "both" }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{safe(rec.crop)}</p>
                            <p className="text-sm text-gray-600">{safe(rec.date)}</p>
                          </div>
                          <button
                            onClick={() => downloadPDF(rec)}
                            className="text-[#097A4E] hover:text-[#0B8C5A] transition-all duration-300"
                            aria-label={`Download PDF for ${rec.crop} recommendation`}
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Weather Snapshot */}
              <div className="p-6 transition-all duration-500 bg-white border border-gray-200 rounded-xl animate-fade-in-up">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Weather Today</h3>
                  <button
                    onClick={() => setActiveTab("weather")}
                    className="text-[#097A4E] hover:text-[#0B8C5A] transition-all duration-300"
                    aria-label="View full weather"
                  >
                    See Full Forecast
                  </button>
                </div>
                {loading.weather ? (
                  <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
                ) : !weather?.current ? (
                  <p className="text-gray-600">Weather data not available.</p>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{getWeatherIcon(weather.current.condition)}</div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{safe(weather.current.temperature, "--")}°C</p>
                      <p className="text-gray-600">{safe(weather.current.condition)}</p>
                      <p className="text-sm text-gray-600">Rain: {safe(weather.current.precipitation, "0")}%</p>
                      {weather.alerts?.length > 0 && (
                        <p className="text-sm text-yellow-600">Alert: {weather.alerts[0].message}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Market Prices Snapshot */}
              <div className="p-6 transition-all duration-500 bg-white border border-gray-200 rounded-xl animate-fade-in-up">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Market Prices</h3>
                  <button
                    onClick={() => setActiveTab("market")}
                    className="text-[#097A4E] hover:text-[#0B8C5A] transition-all duration-300"
                    aria-label="View all market prices"
                  >
                    See All
                  </button>
                </div>
                {loading.market ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, idx) => (
                      <div key={idx} className="h-12 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : marketData.length === 0 ? (
                  <p className="text-gray-600">No market data available.</p>
                ) : (
                  <div className="space-y-4">
                    {marketData.slice(0, 3).map((m, index) => (
                      <div
                        key={m.id || m.crop}
                        className="p-4 bg-[#E6F3E9] rounded-lg transition-all duration-300 hover:bg-green-100"
                        style={{ animation: "fadeIn 0.5s ease-in", animationDelay: `${index * 0.1}s`, animationFillMode: "both" }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{m.crop}</p>
                            <p className="text-sm text-gray-600">{formatCurrency(m.price)}</p>
                          </div>
                          <span className={`flex items-center ${m.change && m.change < 0 ? "text-red-500" : "text-[#097A4E]"}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={m.change && m.change < 0 ? "M19 14l-7 7m0 0l-7-7m7 7V3" : "M5 10l7-7m0 0l7 7m-7-7v18"} />
                            </svg>
                            <span>{safe(m.changePercent ?? m.change, "0%")}</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Profile Section */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="p-6 transition-all duration-500 bg-white border border-gray-200 rounded-xl animate-fade-in-up">
                <div className="flex flex-col items-center gap-6 md:flex-row">
                  <div className="relative">
                    {farmer?.profilePicture ? (
                      <img
                        src={farmer.profilePicture}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-2 border-[#E6F3E9] object-cover transition-all duration-300 hover:scale-[1.05]"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-24 h-24 bg-[#097A4E] border-2 border-[#E6F3E9] rounded-full transition-all duration-300 hover:scale-[1.05]">
                        <span className="text-4xl font-extrabold text-white">{farmer?.name ? farmer.name.charAt(0) : "F"}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-extrabold text-gray-900">{safe(farmer?.name)}</h2>
                    <p className="text-lg font-medium text-[#097A4E]">{safe(farmer?.role, "Farmer")}</p>
                    <div className="flex flex-wrap justify-center gap-4 mt-4 md:justify-start">
                      {farmer?.location && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {safe(farmer.location)}
                        </div>
                      )}
                      {isValidDate(farmer?.createdAt) && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Member since {safe(new Date(farmer?.createdAt).toLocaleDateString())}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleUpdateFarm}
                    className="px-4 py-2 text-white bg-[#097A4E] rounded-lg hover:bg-[#0B8C5A] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#097A4E]"
                    aria-label="Update farm info"
                  >
                    Update Farm Info
                  </button>
                </div>
              </div>

              {hasContactInfo() && (
                <div className="p-6 transition-all duration-500 bg-white border border-gray-200 rounded-xl animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                  <h3 className="mb-4 text-xl font-bold text-gray-900">Contact Information</h3>
                  {loading.profile ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {[...Array(4)].map((_, idx) => (
                        <div key={idx} className="h-6 bg-gray-200 rounded animate-pulse"></div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {farmer?.phoneNumber && (
                        <div className="flex items-center">
                          <span className="w-24 font-medium text-gray-700">Phone:</span>
                          <span className="text-gray-600">{safe(farmer.phoneNumber)}</span>
                        </div>
                      )}
                      {farmer?.email && (
                        <div className="flex items-center">
                          <span className="w-24 font-medium text-gray-700">Email:</span>
                          <span className="text-gray-600">{safe(farmer.email)}</span>
                        </div>
                      )}
                      {farmer?.experienceYears && (
                        <div className="flex items-center">
                          <span className="w-24 font-medium text-gray-700">Experience:</span>
                          <span className="text-gray-600">{safe(farmer.experienceYears)} years</span>
                        </div>
                      )}
                      {farmer?.farmsManaged && (
                        <div className="flex items-center">
                          <span className="w-24 font-medium text-gray-700">Farms:</span>
                          <span className="text-gray-600">{safe(farmer.farmsManaged)}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {farmer?.crops?.length > 0 ? (
                <div className="p-6 transition-all duration-500 bg-white border border-gray-200 rounded-xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  <h3 className="mb-4 text-xl font-bold text-gray-900">Crops</h3>
                  {loading.profile ? (
                    <div className="flex flex-wrap gap-2">
                      {[...Array(3)].map((_, idx) => (
                        <div key={idx} className="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {farmer.crops.map((crop, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-sm font-medium text-white bg-[#097A4E] rounded-full hover:bg-[#0B8C5A] transition-all duration-300"
                        >
                          {crop}
                        </span>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={handleAddCrop}
                    className="mt-4 px-4 py-2 text-white bg-[#097A4E] rounded-lg hover:bg-[#0B8C5A] transition-all duration-300"
                    aria-label="Add new crop"
                  >
                    Add New Crop
                  </button>
                </div>
              ) : (
                <div className="p-6 text-center transition-all duration-500 bg-white border border-gray-200 rounded-xl animate-fade-in-up">
                  <p className="text-gray-600">No crops listed yet.</p>
                  <button
                    onClick={handleAddCrop}
                    className="mt-4 px-4 py-2 text-white bg-[#097A4E] rounded-lg hover:bg-[#0B8C5A] transition-all duration-300"
                    aria-label="Add new crop"
                  >
                    Add Your First Crop
                  </button>
                </div>
              )}

              <div className="p-6 transition-all duration-500 bg-white border border-gray-200 rounded-xl animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <h3 className="mb-4 text-xl font-bold text-gray-900">Recent Activity</h3>
                {loading.profile ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, idx) => (
                      <div key={idx} className="flex items-center p-4 bg-gray-100 rounded-lg animate-pulse">
                        <div className="w-10 h-10 mr-4 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                          <div className="w-1/3 h-3 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : farmer?.loginHistory?.length > 0 ? (
                  <div className="space-y-4">
                    {farmer.loginHistory.slice(0, 5).map((log, idx) => (
                      <div
                        key={idx}
                        className="flex items-center p-4 rounded-lg hover:bg-[#E6F3E9] transition-all duration-300"
                      >
                        <div className="flex items-center justify-center w-10 h-10 mr-4 bg-[#097A4E] rounded-full">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">Login Activity</p>
                          <p className="text-sm text-gray-600">{safe(log.date)} at {safe(log.time)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-600">No recent activity. Get started by adding a farm or crop!</p>
                    <div className="flex justify-center gap-4 mt-4">
                      <button
                        onClick={handleUpdateFarm}
                        className="px-4 py-2 text-white bg-[#097A4E] rounded-lg hover:bg-[#0B8C5A] transition-all duration-300"
                        aria-label="Add new farm"
                      >
                        Add Farm
                      </button>
                      <button
                        onClick={handleAddCrop}
                        className="px-4 py-2 text-white bg-[#097A4E] rounded-lg hover:bg-[#0B8C5A] transition-all duration-300"
                        aria-label="Add new crop"
                      >
                        Add Crop
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Recommendations Section */}
          {activeTab === "recommendations" && (
            <div className="p-6 transition-all duration-500 bg-white border border-gray-200 rounded-xl animate-fade-in-up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Crop Recommendation History</h2>
              </div>
              {loading.recommendations ? (
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                  <div className="space-y-2">
                    {[...Array(5)].map((_, idx) => (
                      <div key={idx} className="h-12 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                </div>
              ) : recommendations.length === 0 ? (
                <div className="text-center">
                  <p className="text-gray-600">No recommendations found.</p>
                  <button
                    onClick={handleNewRecommendation}
                    className="mt-4 px-4 py-2 text-white bg-[#097A4E] rounded-lg hover:bg-[#0B8C5A] transition-all duration-300"
                    aria-label="Create new recommendation"
                  >
                    Create Your First Recommendation
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#E6F3E9]">
                      <tr>
                        {["Date", "Crop", "Nitrogen", "Phosphorus", "Potassium", "pH", "Actions"].map((header) => (
                          <th key={header} className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recommendations.map((rec, index) => (
                        <tr
                          key={rec.id || rec._id}
                          className="transition-all duration-300 hover:bg-[#E6F3E9]"
                          style={{ animation: "fadeIn 0.5s ease-in", animationDelay: `${index * 0.05}s`, animationFillMode: "both" }}
                        >
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{safe(rec.date)}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{safe(rec.crop)}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{safe(rec.nitrogen)}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{safe(rec.phosphorus)}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{safe(rec.potassium)}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{safe(rec.ph)}</td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            <button
                              onClick={() => downloadPDF(rec)}
                              className="text-[#097A4E] hover:text-[#0B8C5A] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#097A4E]"
                              aria-label={`Download PDF for ${rec.crop} recommendation`}
                            >
                              Download PDF
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-gray-700">
                  Showing {recommendations.length} recommendation{recommendations.length !== 1 ? "s" : ""}
                </p>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 text-gray-700 transition-all duration-300 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                    aria-label="Previous page"
                  >
                    Previous
                  </button>
                  <button
                    className="px-4 py-2 text-white bg-[#097A4E] rounded-lg hover:bg-[#0B8C5A] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#097A4E]"
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Weather Section */}
          {activeTab === "weather" && (
            <div className="space-y-6">
              <div className="p-6 transition-all duration-500 bg-white border border-gray-200 rounded-xl animate-fade-in-up">
                <h2 className="mb-6 text-xl font-bold text-gray-900">Current Weather</h2>
                {loading.weather ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {[...Array(3)].map((_, idx) => (
                      <div key={idx} className="h-40 bg-gray-200 rounded-lg animate-pulse"></div>
                    ))}
                  </div>
                ) : !weather?.current ? (
                  <p className="text-gray-600">Weather data not available.</p>
                ) : (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="p-6 text-white rounded-lg bg-[#097A4E] transition-all duration-300 hover:scale-[1.02]">
                      <div className="mb-2 text-5xl">{getWeatherIcon(weather.current.condition)}</div>
                      <div className="text-4xl font-extrabold">{safe(weather.current.temperature, "--")}°C</div>
                      <div className="text-lg font-medium">{safe(weather.current.condition)}</div>
                      <div className="mt-2 text-sm">Feels like {safe(weather.current.feelsLike, "--")}°C</div>
                    </div>
                    <div className="p-6 transition-all duration-300 bg-white border border-gray-200 rounded-lg">
                      <h3 className="mb-4 text-lg font-bold text-gray-900">Details</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Humidity</span>
                          <span className="font-medium">{safe(weather.current.humidity, "--")}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Wind</span>
                          <span className="font-medium">{safe(weather.current.wind, "--")} km/h</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Precipitation</span>
                          <span className="font-medium">{safe(weather.current.precipitation, "--")}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 transition-all duration-300 bg-white border border-gray-200 rounded-lg">
                      <h3 className="mb-4 text-lg font-bold text-gray-900">Weather Alerts</h3>
                      {weather.alerts && weather.alerts.length > 0 ? (
                        <div className="p-4 border-l-4 border-yellow-400 rounded-lg bg-yellow-50">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-yellow-700">{weather.alerts[0].message}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-600">No weather alerts at this time.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6 transition-all duration-500 bg-white border border-gray-200 rounded-xl animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <h2 className="mb-6 text-xl font-bold text-gray-900">7-Day Forecast</h2>
                {loading.weather ? (
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-7">
                    {[...Array(7)].map((_, idx) => (
                      <div key={idx} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
                    ))}
                  </div>
                ) : weather.forecast?.length ? (
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-7">
                    {weather.forecast.map((day, index) => (
                      <div
                        key={index}
                        className="p-4 text-center bg-white border border-gray-200 rounded-lg hover:bg-[#E6F3E9] transition-all duration-300"
                        style={{ animation: "fadeIn 0.5s ease-in", animationDelay: `${index * 0.1}s`, animationFillMode: "both" }}
                      >
                        <div className="text-lg font-medium text-gray-900">{safe(day.day)}</div>
                        <div className="my-2 text-3xl">{getWeatherIcon(day.condition)}</div>
                        <div className="text-xl font-bold text-gray-900">{safe(day.high, "--")}°</div>
                        <div className="text-gray-600">{safe(day.low, "--")}°</div>
                        <div className="mt-1 text-sm text-gray-600">{safe(day.condition)}</div>
                        {day.rain > 0 && <div className="mt-1 text-sm text-blue-600">{day.rain}% rain</div>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No forecast data available.</p>
                )}
              </div>
            </div>
          )}

          {/* Market Section */}
          {activeTab === "market" && (
            <div className="p-6 transition-all duration-500 bg-white border border-gray-200 rounded-xl animate-fade-in-up">
              <h2 className="mb-6 text-xl font-bold text-gray-900">Market Prices & Trends</h2>
              {loading.market ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {[...Array(3)].map((_, idx) => (
                    <div key={idx} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              ) : marketData?.length ? (
                <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
                  {marketData.map((m, index) => (
                    <div
                      key={m.id || m.crop}
                      className="p-4 bg-white border border-gray-200 rounded-lg transition-all duration-300 hover:bg-[#E6F3E9]"
                      style={{ animation: "fadeIn 0.5s ease-in", animationDelay: `${index * 0.1}s`, animationFillMode: "both" }}
                    >
                      <div className="flex items-center mb-4">
                        <div className="flex items-center justify-center w-10 h-10 mr-3 bg-[#097A4E] rounded-full">
                          <span className="font-extrabold text-white">{(m.crop || "C").charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{m.crop}</h3>
                          <p className="text-sm text-gray-600">Current price</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-900">{formatCurrency(m.price)}</span>
                        <span className={`flex items-center ${m.change && m.change < 0 ? "text-red-500" : "text-[#097A4E]"}`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={m.change && m.change < 0 ? "M19 14l-7 7m0 0l-7-7m7 7V3" : "M5 10l7-7m0 0l7 7m-7-7v18"} />
                          </svg>
                          <span>{safe(m.changePercent ?? m.change, "0%")}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No market data available.</p>
              )}
              <h3 className="mb-4 text-lg font-bold text-gray-900">Price Trends</h3>
              <div className="flex items-center justify-center h-64 bg-[#E6F3E9] rounded-lg">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
            </div>
          )}
        </main>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeIn 0.5s ease-in both;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;


































// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Transition } from "@headlessui/react";

// const Dashboard = ({
//   baseUrl = import.meta.env.VITE_API_BASE_URL || "",
// }) => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("overview");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [farmer, setFarmer] = useState(null);
//   const [recommendations, setRecommendations] = useState([]);
//   const [weather, setWeather] = useState({ current: null, forecast: [], alerts: [] });
//   const [marketData, setMarketData] = useState([]);
//   const [loading, setLoading] = useState({
//     profile: true,
//     recommendations: true,
//     weather: true,
//     market: true,
//   });
//   const [error, setError] = useState(null);
//   const [notification, setNotification] = useState({ show: false, message: "", type: "" });
//   const token = localStorage.getItem("token") || "";

//   // Mock data for demonstration
//   const mockFarmer = {
//     name: "John Farmer",
//     title: "Professional Grower",
//     location: "Springfield, IL",
//     phoneNumber: "+1 (555) 123-4567",
//     email: "john.farmer@example.com",
//     experienceYears: 12,
//     farmsManaged: 3,
//     crops: ["Corn", "Soybeans", "Wheat"],
//     joinDate: "2021-05-15T00:00:00.000Z",
//     loginHistory: [
//       { date: "2023-10-15", time: "08:30 AM" },
//       { date: "2023-10-14", time: "09:15 AM" },
//       { date: "2023-10-13", time: "08:45 AM" }
//     ]
//   };

//   const mockRecommendations = [
//     { id: 1, date: "2023-10-10", crop: "Corn", nitrogen: 85, phosphorus: 42, potassium: 60, ph: 6.8 },
//     { id: 2, date: "2023-09-25", crop: "Soybeans", nitrogen: 45, phosphorus: 38, potassium: 52, ph: 6.5 },
//     { id: 3, date: "2023-09-12", crop: "Wheat", nitrogen: 72, phosphorus: 35, potassium: 48, ph: 6.7 }
//   ];

//   const mockWeather = {
//     current: {
//       temperature: 72,
//       condition: "Partly Cloudy",
//       feelsLike: 75,
//       humidity: 65,
//       wind: 8,
//       precipitation: 10,
//       pressure: 1015,
//       visibility: 10
//     },
//     forecast: [
//       { day: "Mon", condition: "Sunny", high: 75, low: 58, rain: 0 },
//       { day: "Tue", condition: "Partly Cloudy", high: 78, low: 60, rain: 10 },
//       { day: "Wed", condition: "Cloudy", high: 72, low: 59, rain: 30 },
//       { day: "Thu", condition: "Rain", high: 68, low: 56, rain: 80 },
//       { day: "Fri", condition: "Mostly Sunny", high: 70, low: 55, rain: 20 },
//       { day: "Sat", condition: "Sunny", high: 74, low: 57, rain: 0 },
//       { day: "Sun", condition: "Clear", high: 76, low: 59, rain: 0 }
//     ],
//     alerts: []
//   };

//   const mockMarketData = [
//     { crop: "Corn", price: 5.42, change: 0.15, changePercent: "2.8%" },
//     { crop: "Soybeans", price: 12.85, change: -0.32, changePercent: "-2.4%" },
//     { crop: "Wheat", price: 6.73, change: 0.08, changePercent: "1.2%" },
//     { crop: "Cotton", price: 0.85, change: 0.03, changePercent: "3.7%" }
//   ];

//   // Show notification function
//   const showNotification = (message, type = "info") => {
//     setNotification({ show: true, message, type });
//     setTimeout(() => setNotification({ show: false, message: "", type: "" }), 5000);
//   };

//   useEffect(() => {
//     const controller = new AbortController();
//     const headers = token ? { Authorization: `Bearer ${token}` } : {};

//     const fetchJson = async (url, setter, loaderKey) => {
//       try {
//         const res = await fetch(url, { headers, signal: controller.signal });
//         if (!res.ok) {
//           const text = await res.text().catch(() => "");
//           throw new Error(`${res.status} ${res.statusText} ${text}`);
//         }
//         const data = await res.json().catch(() => null);
//         setter(data);
//       } catch (err) {
//         if (err.name === "AbortError") return;
//         console.error("Fetch error:", url, err);
//         // Use mock data if API fails
//         if (loaderKey === "profile") setter(mockFarmer);
//         if (loaderKey === "recommendations") setter(mockRecommendations);
//         if (loaderKey === "weather") setter(mockWeather);
//         if (loaderKey === "market") setter(mockMarketData);
//         showNotification(`Using demo data for ${loaderKey}`, "info");
//       } finally {
//         setLoading((s) => ({ ...s, [loaderKey]: false }));
//       }
//     };

//     if (baseUrl) {
//       fetchJson(`${baseUrl}/api/profile`, setFarmer, "profile");
//       fetchJson(`${baseUrl}/api/recommendations`, setRecommendations, "recommendations");
//       fetchJson(`${baseUrl}/api/weather`, setWeather, "weather");
//       fetchJson(`${baseUrl}/api/market`, setMarketData, "market");
//     } else {
//       // Use mock data if no baseUrl
//       setFarmer(mockFarmer);
//       setRecommendations(mockRecommendations);
//       setWeather(mockWeather);
//       setMarketData(mockMarketData);
//       setLoading({ profile: false, recommendations: false, weather: false, market: false });
//       showNotification("Using demo data", "info");
//     }

//     return () => controller.abort();
//   }, [baseUrl, token]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     showNotification("Logged out successfully", "success");
//     setTimeout(() => navigate("/login"), 1000);
//   };

//   const downloadPDF = async (recommendation) => {
//     showNotification("Downloading PDF...", "info");
//     // Simulate download delay
//     setTimeout(() => showNotification("PDF downloaded successfully", "success"), 1500);
//   };

//   const getWeatherIcon = (condition) => {
//     if (!condition) return "🌡️";
//     switch (condition.toLowerCase()) {
//       case "sunny": return "☀️";
//       case "partly cloudy": return "⛅";
//       case "cloudy": return "☁️";
//       case "rain": return "🌧️";
//       case "mostly sunny": return "🌤️";
//       case "thunderstorm": return "⛈️";
//       case "snow": return "❄️";
//       case "windy": return "💨";
//       case "clear": return "✨";
//       default: return "🌡️";
//     }
//   };

//   const safe = (v, fallback = "—") => (v === undefined || v === null || v === "" ? fallback : v);

//   // Format currency
//   const formatCurrency = (value) => {
//     if (!value) return "—";
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 2
//     }).format(value);
//   };

//   // Get greeting based on time of day
//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good morning";
//     if (hour < 18) return "Good afternoon";
//     return "Good evening";
//   };

//   // Format date properly
//   const formatDate = (dateString) => {
//     if (!dateString) return "—";
//     try {
//       const date = new Date(dateString);
//       return isNaN(date.getTime()) ? "—" : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
//     } catch {
//       return "—";
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-green-100">
//       {/* Notification */}
//       <Transition
//         show={notification.show}
//         enter="transition-all duration-300 ease-out"
//         enterFrom="opacity-0 -translate-y-10"
//         enterTo="opacity-100 translate-y-0"
//         leave="transition-all duration-300 ease-in"
//         leaveFrom="opacity-100 translate-y-0"
//         leaveTo="opacity-0 -translate-y-10"
//         className="fixed z-50 w-full max-w-sm top-4 right-4"
//       >
//         <div className={`p-4 rounded-lg shadow-lg ${
//           notification.type === "error" 
//             ? "bg-red-100 text-red-800 border-l-4 border-red-500" 
//             : notification.type === "success"
//             ? "bg-green-100 text-green-800 border-l-4 border-green-500"
//             : "bg-blue-100 text-blue-800 border-l-4 border-blue-500"
//         }`}>
//           <div className="flex items-start">
//             <div className="flex-shrink-0">
//               {notification.type === "error" ? (
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//               ) : notification.type === "success" ? (
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                 </svg>
//               ) : (
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                 </svg>
//               )}
//             </div>
//             <div className="ml-3">
//               <p className="text-sm font-medium">{notification.message}</p>
//             </div>
//           </div>
//         </div>
//       </Transition>

//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed inset-y-0 left-0 z-40 w-72 bg-[#097A4E] shadow-2xl
//           md:static md:block md:w-72
//           transform transition-all duration-500 ease-in-out
//           ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
//         `}
//       >
//         <Transition
//           show={sidebarOpen || window.innerWidth >= 768}
//           enter="transform transition ease-in-out duration-500"
//           enterFrom="-translate-x-full"
//           enterTo="translate-x-0"
//           leave="transform transition ease-in-out duration-300"
//           leaveFrom="translate-x-0"
//           leaveTo="-translate-x-full"
//         >
//           <div className="flex flex-col h-full p-6">
//             <div className="flex items-center justify-between mb-8">
//               <div className="flex items-center">
//                 <div className="flex items-center justify-center w-10 h-10 mr-3 bg-white rounded-lg">
//                   <svg className="w-6 h-6 text-[#097A4E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
//                   </svg>
//                 </div>
//                 <h2 className="text-xl font-bold text-white">AgriPredict</h2>
//               </div>
//               <button
//                 className="p-2 rounded-md md:hidden hover:bg-green-700"
//                 onClick={() => setSidebarOpen(false)}
//               >
//                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//             <nav className="flex-1 space-y-2">
//               {[
//                 { name: "Overview", tab: "overview", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
//                 { name: "Profile", tab: "profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
//                 { name: "Recommendations", tab: "recommendations", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
//                 { name: "Weather", tab: "weather", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" },
//                 { name: "Market Prices", tab: "market", icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" },
//               ].map((item) => (
//                 <button
//                   key={item.tab}
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
//                     activeTab === item.tab
//                       ? "bg-white text-[#097A4E] shadow-lg transform scale-105"
//                       : "text-green-100 hover:bg-green-700 hover:text-white hover:shadow-md"
//                   }`}
//                   onClick={() => {
//                     setActiveTab(item.tab);
//                     setSidebarOpen(false);
//                   }}
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
//                   </svg>
//                   <span className="font-medium">{item.name}</span>
//                 </button>
//               ))}
              
//               {/* Logout Button */}
//               <button
//                 className="flex items-center w-full gap-3 px-4 py-3 mt-8 text-left text-green-100 transition-all duration-300 rounded-xl hover:bg-red-500 hover:text-white hover:shadow-md"
//                 onClick={handleLogout}
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                 </svg>
//                 <span className="font-medium">Logout</span>
//               </button>
//             </nav>
//           </div>
//         </Transition>
//       </aside>

//       {/* Main Content */}
//       <div className="flex flex-col flex-1 overflow-hidden">
//         {/* Header */}
//         <header className="z-30 bg-[#097A4E] shadow-lg">
//           <div className="container flex items-center justify-between px-6 py-4 mx-auto">
//             <div className="flex items-center gap-4">
//               <button
//                 className="p-2 rounded-md md:hidden hover:bg-gray-100"
//                 onClick={() => setSidebarOpen(true)}
//               >
//                 <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               </button>
//               <div>
//                 <h1 className="text-2xl font-bold text-white">AgriPredict Dashboard</h1>
//                 <p className="text-lg text-black">{getGreeting()}, {safe(farmer?.name, "Farmer")}! 👋</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               {/* <button
//                 onClick={() => navigate("/recommendation")}
//                 className="px-4 py-2 text-white transition-all duration-300 bg-[#097A4E] rounded-lg hover:bg-green-700 transform hover:scale-[1.05] shadow-md flex items-center gap-2"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 New Recommendation
//               </button> */}
//             </div>
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="container flex-1 px-6 py-8 mx-auto overflow-auto">
//           {error && (
//             <div className="p-4 mb-6 text-red-700 bg-red-100 border-l-4 border-red-500 rounded-xl">
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//                 <span>{error}</span>
//               </div>
//             </div>
//           )}

//           {/* Overview Section */}
//           {activeTab === "overview" && (
//             <div className="space-y-6">
//               {/* Quick Stats */}
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//                 <div className="p-6 transition-all duration-300 transform bg-white shadow-xl rounded-2xl hover:shadow-2xl">
//                   <div className="flex items-center">
//                     <div className="flex items-center justify-center w-12 h-12 mr-4 bg-green-100 rounded-xl">
//                       <svg className="w-6 h-6 text-[#097A4E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-4 0H9m4 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10m4 0h4m-4 0V7" />
//                       </svg>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-600">Farms Managed</p>
//                       <p className="text-2xl font-bold text-gray-900">{safe(farmer?.farmsManaged, 0)}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="p-6 transition-all duration-300 transform bg-white shadow-xl rounded-2xl hover:shadow-2xl">
//                   <div className="flex items-center">
//                     <div className="flex items-center justify-center w-12 h-12 mr-4 bg-green-100 rounded-xl">
//                       <svg className="w-6 h-6 text-[#097A4E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
//                       </svg>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-600">Active Crops</p>
//                       <p className="text-2xl font-bold text-gray-900">{farmer?.crops?.length || 0}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="p-6 transition-all duration-300 transform bg-white shadow-xl rounded-2xl hover:shadow-2xl">
//                   <div className="flex items-center">
//                     <div className="flex items-center justify-center w-12 h-12 mr-4 bg-green-100 rounded-xl">
//                       <svg className="w-6 h-6 text-[#097A4E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                       </svg>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-600">Recommendations</p>
//                       <p className="text-2xl font-bold text-gray-900">{recommendations.length}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="p-6 transition-all duration-300 transform bg-white shadow-xl rounded-2xl hover:shadow-2xl">
//                   <div className="flex items-center">
//                     <div className="flex items-center justify-center w-12 h-12 mr-4 bg-green-100 rounded-xl">
//                       <svg className="w-6 h-6 text-[#097A4E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-600">Current Temp</p>
//                       <p className="text-2xl font-bold text-gray-900">{safe(weather?.current?.temperature, "--")}°F</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//                 {/* Weather Snapshot */}
//                 <div className="p-6 transition-all duration-300 transform bg-white shadow-xl rounded-2xl hover:shadow-2xl">
//                   <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-900">
//                     <svg className="w-5 h-5 text-[#097A4E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
//                     </svg>
//                     Weather Today
//                   </h3>
//                   {weather?.current ? (
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <div className="text-5xl">{getWeatherIcon(weather.current.condition)}</div>
//                         <div className="mt-2 text-2xl font-bold">{safe(weather.current.temperature)}°F</div>
//                         <div className="text-gray-600">{safe(weather.current.condition)}</div>
//                       </div>
//                       <div className="text-right">
//                         <div className="text-gray-600">Humidity: {safe(weather.current.humidity)}%</div>
//                         <div className="text-gray-600">Wind: {safe(weather.current.wind)} mph</div>
//                         <div className="text-gray-600">Rain: {safe(weather.current.precipitation)}%</div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="py-8 text-center text-gray-500">Weather data not available</div>
//                   )}
//                 </div>

//                 {/* Market Snapshot */}
//                 <div className="p-6 transition-all duration-300 transform bg-white shadow-xl rounded-2xl hover:shadow-2xl">
//                   <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-900">
//                     <svg className="w-5 h-5 text-[#097A4E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
//                     </svg>
//                     Market Prices
//                   </h3>
//                   {marketData.length > 0 ? (
//                     <div className="space-y-4">
//                       {marketData.slice(0, 3).map((item, index) => (
//                         <div key={index} className="flex items-center justify-between">
//                           <span className="font-medium">{item.crop}</span>
//                           <span className="font-bold">{formatCurrency(item.price)}</span>
//                           <span className={`px-2 py-1 rounded-full text-xs ${item.change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                             {item.change >= 0 ? '↑' : '↓'} {item.changePercent}
//                           </span>
//                         </div>
//                       ))}
//                       <button 
//                         onClick={() => setActiveTab('market')}
//                         className="w-full mt-4 text-center text-[#097A4E] hover:text-green-700 font-medium"
//                       >
//                         View all market data →
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="py-8 text-center text-gray-500">Market data not available</div>
//                   )}
//                 </div>
//               </div>

//               {/* Recent Recommendations */}
//               <div className="p-6 transition-all duration-300 transform bg-white shadow-xl rounded-2xl hover:shadow-2xl">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900">
//                     <svg className="w-5 h-5 text-[#097A4E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                     </svg>
//                     Recent Recommendations
//                   </h3>
//                   <button 
//                     onClick={() => setActiveTab('recommendations')}
//                     className="text-[#097A4E] hover:text-green-700 font-medium"
//                   >
//                     View All →
//                   </button>
//                 </div>
//                 {recommendations.length > 0 ? (
//                   <div className="space-y-4">
//                     {recommendations.slice(0, 3).map((rec, index) => (
//                       <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
//                         <div>
//                           <div className="font-medium">{rec.crop}</div>
//                           <div className="text-sm text-gray-500">{rec.date}</div>
//                         </div>
//                         <button 
//                           onClick={() => downloadPDF(rec)}
//                           className="px-3 py-1 text-sm bg-green-100 text-[#097A4E] rounded-lg hover:bg-green-200"
//                         >
//                           View
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="py-8 text-center">
//                     <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                     </svg>
//                     <p className="mt-4 text-gray-600">No recommendations yet</p>
//                     <button 
//                       onClick={() => navigate("/recommendation")}
//                       className="mt-4 px-4 py-2 bg-[#097A4E] text-white rounded-lg hover:bg-green-700"
//                     >
//                       Create Your First Recommendation
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Alerts Section */}
//               <div className="p-6 transition-all duration-300 transform bg-white shadow-xl rounded-2xl hover:shadow-2xl">
//                 <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-900">
//                   <svg className="w-5 h-5 text-[#097A4E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                   </svg>
//                   Alerts & Notifications
//                 </h3>
//                 <div className="space-y-3">
//                   <div className="p-4 border-l-4 border-yellow-400 rounded bg-yellow-50">
//                     <div className="flex items-center">
//                       <svg className="w-5 h-5 mr-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                       </svg>
//                       <div>
//                         <p className="font-medium text-yellow-800">Pest alert in your area</p>
//                         <p className="text-sm text-yellow-700">Increased corn borer activity reported nearby</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-4 border-l-4 border-blue-400 rounded bg-blue-50">
//                     <div className="flex items-center">
//                       <svg className="w-5 h-5 mr-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                       </svg>
//                       <div>
//                         <p className="font-medium text-blue-800">Fertilizer prices dropping</p>
//                         <p className="text-sm text-blue-700">Nitrogen prices down 5% this week</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Profile Section */}
//           {activeTab === "profile" && (
//             <div className="space-y-6">
//               <div className="p-6 transition-all duration-300 transform bg-white shadow-xl rounded-2xl hover:shadow-2xl">
//                 <div className="flex flex-col items-center gap-6 md:flex-row">
//                   <div className="relative">
//                     <div className="flex items-center justify-center w-24 h-24 border-4 border-white rounded-full shadow-lg bg-gradient-to-br from-green-100 to-green-200 ring-4 ring-green-50">
//                       <span className="text-4xl font-bold text-[#097A4E]">
//                         {farmer?.name ? farmer.name.charAt(0) : "F"}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex-1 text-center md:text-left">
//                     <h2 className="text-2xl font-bold text-gray-900">{safe(farmer?.name)}</h2>
//                     <p className="text-lg text-[#097A4E]">{safe(farmer?.title, "Farmer")}</p>
//                     <div className="flex flex-wrap justify-center gap-4 mt-4 md:justify-start">
//                       <div className="flex items-center gap-2 text-gray-600">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                         </svg>
//                         {safe(farmer?.location)}
//                       </div>
//                       {farmer?.joinDate && (
//                         <div className="flex items-center gap-2 text-gray-600">
//                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                           </svg>
//                           Member since {formatDate(farmer.joinDate)}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 {farmer?.phoneNumber && (
//                   <div className="p-6 transition-all duration-300 transform bg-white shadow-xl rounded-2xl hover:shadow-2xl">
//                     <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-900">
//                       <svg className="w-5 h-5 text-[#097A4E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                       </svg>
//                       Contact Information
//                     </h3>
//                     <div className="space-y-4">
//                       {farmer.phoneNumber && (
//                         <div className="flex items-center">
//                           <span className="w-24 font-medium text-gray-700">Phone:</span>
//                           <span className="text-gray-600">{farmer.phoneNumber}</span>
//                         </div>
//                       )}
//                       {farmer.email && (
//                         <div className="flex items-center">
//                           <span className="w-24 font-medium text-gray-700">Email:</span>
//                           <span className="text-gray-600">{farmer.email}</span>
//                         </div>
//                       )}
//                       {farmer.experienceYears && (
//                         <div className="flex items-center">
//                           <span className="w-24 font-medium text-gray-700">Experience:</span>
//                           <span className="text-gray-600">{farmer.experienceYears} years</span>
//                         </div>
//                       )}
//                       {farmer.farmsManaged && (
//                         <div className="flex items-center">
//                           <span className="w-24 font-medium text-gray-700">Farms:</span>
//                           <span className="text-gray-600">{farmer.farmsManaged}</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {farmer?.crops?.length > 0 && (
//                   <div className="p-6 transition-all duration-300 transform bg-white shadow-xl rounded-2xl hover:shadow-2xl">
//                     <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-900">
//                       <svg className="w-5 h-5 text-[#097A4E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
//                       </svg>
//                       Crops
//                     </h3>
//                     <div className="flex flex-wrap gap-2">
//                       {farmer.crops.map((crop, idx) => (
//                         <span
//                           key={idx}
//                           className="px-3 py-1 text-sm font-medium text-[#097A4E] transition-all duration-300 bg-green-100 rounded-full hover:bg-green-200 transform hover:scale-[1.05]"
//                         >
//                           {crop}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {farmer?.loginHistory?.length > 0 && (
//                 <div className="p-6 transition-all duration-300 transform bg-white shadow-xl rounded-2xl hover:shadow-2xl">
//                   <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-900">
//                     <svg className="w-5 h-5 text-[#097A4E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     Recent Activity
//                   </h3>
//                   <div className="space-y-4">
//                     {farmer.loginHistory.slice(0, 5).map((log, idx) => (
//                       <div
//                         key={idx}
//                         className="flex items-center p-4 transition-all duration-300 rounded-xl hover:bg-green-50 transform hover:scale-[1.01]"
//                       >
//                         <div className="flex items-center justify-center w-10 h-10 mr-4 bg-green-100 rounded-full">
//                           <svg className="w-5 h-5 text-[#097A4E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                         </div>
//                         <div className="flex-1">
//                           <p className="font-medium text-gray-900">Login Activity</p>
//                           <p className="text-sm text-gray-600">{safe(log.date)} at {safe(log.time)}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Recommendations Section */}
//           {activeTab === "recommendations" && (
//             <div className="p-6 transition-all duration-300 transform bg-white shadow-xl rounded-2xl hover:shadow-2xl">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-bold text-gray-900">Crop Recommendation History</h2>
//                 <div className="text-sm text-gray-500">
//                   {recommendations.length} recommendation{recommendations.length !== 1 ? "s" : ""}
//                 </div>
//               </div>
//               {recommendations.length === 0 ? (
//                 <div className="py-12 text-center">
//                   <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                   <p className="mt-4 text-gray-600">No recommendations found.</p>
//                   <button
//                     onClick={() => navigate("/recommendation")}
//                     className="mt-4 px-4 py-2 text-white transition-all duration-300 bg-[#097A4E] rounded-lg hover:bg-green-700 transform hover:scale-[1.05] shadow-md"
//                   >
//                     Create Your First Recommendation
//                   </button>
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         {["Date", "Crop", "Nitrogen", "Phosphorus", "Potassium", "pH", "Actions"].map((header) => (
//                           <th key={header} className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
//                             {header}
//                           </th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {recommendations.map((rec, index) => (
//                         <tr 
//                           key={rec.id || rec._id} 
//                           className="transition-all duration-300 hover:bg-green-50 transform hover:scale-[1.005]"
//                           style={{ animationDelay: `${index * 0.05}s` }}
//                         >
//                           <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{safe(rec.date)}</td>
//                           <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{safe(rec.crop)}</td>
//                           <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{safe(rec.nitrogen)}</td>
//                           <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{safe(rec.phosphorus)}</td>
//                           <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{safe(rec.potassium)}</td>
//                           <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{safe(rec.ph)}</td>
//                           <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
//                             <button
//                               onClick={() => downloadPDF(rec)}
//                               className="text-[#097A4E] transition-all duration-300 hover:text-green-800 transform hover:scale-[1.05] flex items-center gap-1"
//                             >
//                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                               </svg>
//                               Download
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//               <div className="flex items-center justify-between mt-6">
//                 <p className="text-sm text-gray-700">
//                   Showing {recommendations.length} of {recommendations.length} recommendations
//                 </p>
//                 <div className="flex gap-2">
//                   <button className="px-4 py-2 text-gray-700 transition-all duration-300 bg-gray-200 rounded-lg hover:bg-gray-300 transform hover:scale-[1.05]">
//                     Previous
//                   </button>
//                   <button className="px-4 py-2 text-white transition-all duration-300 bg-[#097A4E] rounded-lg hover:bg-green-700 transform hover:scale-[1.05]">
//                     Next
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Weather Section */}
//           {activeTab === "weather" && (
//             <div className="space-y-6">
//               <div className="p-6 transition-all duration-300 transform bg-white shadow-xl rounded-2xl hover:shadow-2xl">
//                 <h2 className="mb-6 text-xl font-bold text-gray-900">Current Weather</h2>
//                 {!weather?.current ? (
//                   <div className="py-12 text-center">
//                     <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
//                     </svg>
//                     <p className="mt-4 text-gray-600">Weather data not available.</p>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//                     <div className="p-6 text-white rounded-xl shadow-lg bg-gradient-to-br from-[#097A4E] to-green-700 transform transition-all duration-300 hover:scale-[1.02]">
//                       <div className="mb-2 text-5xl">{getWeatherIcon(weather.current.condition)}</div>
//                       <div className="text-4xl font-bold">{safe(weather.current.temperature, "--")}°F</div>
//                       <div className="text-lg">{safe(weather.current.condition)}</div>
//                       <div className="mt-2 text-sm">Feels like {safe(weather.current.feelsLike, "--")}°F</div>
//                     </div>
//                     <div className="p-6 bg-white border border-gray-200 rounded-xl transform transition-all duration-300 hover:scale-[1.01]">
//                       <h3 className="mb-4 text-lg font-medium text-gray-900">Details</h3>
//                       <div className="space-y-3">
//                         <div className="flex justify-between">
//                           <span className="text-gray-600">Humidity</span>
//                           <span className="font-medium">{safe(weather.current.humidity, "--")}%</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-600">Wind</span>
//                           <span className="font-medium">{safe(weather.current.wind, "--")} mph</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-600">Precipitation</span>
//                           <span className="font-medium">{safe(weather.current.precipitation, "--")}%</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-600">Pressure</span>
//                           <span className="font-medium">{safe(weather.current.pressure, "--")} hPa</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-600">Visibility</span>
//                           <span className="font-medium">{safe(weather.current.visibility, "--")} mi</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="p-6 bg-white border border-gray-200 rounded-xl transform transition-all duration-300 hover:scale-[1.01]">
//                       <h3 className="mb-4 text-lg font-medium text-gray-900">Weather Alerts</h3>
//                       {weather.alerts && weather.alerts.length > 0 ? (
//                         <div className="p-4 border-l-4 border-yellow-400 rounded-lg bg-yellow-50">
//                           <div className="flex">
//                             <div className="flex-shrink-0">
//                               <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                                 <path
//                                   fillRule="evenodd"
//                                   d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
//                                   clipRule="evenodd"
//                                 />
//                               </svg>
//                             </div>
//                             <div className="ml-3">
//                               <p className="text-sm font-medium text-yellow-800">Weather Alert</p>
//                               <p className="mt-1 text-sm text-yellow-700">{weather.alerts[0].message}</p>
//                             </div>
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="py-4 text-center">
//                           <svg className="w-12 h-12 mx-auto text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                           <p className="mt-2 text-gray-600">No weather alerts at this time.</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <div className="p-6 transition-all duration-300 transform bg-white shadow-xl rounded-2xl hover:shadow-2xl">
//                 <h2 className="mb-6 text-xl font-bold text-gray-900">7-Day Forecast</h2>
//                 {weather.forecast?.length ? (
//                   <div className="grid grid-cols-2 gap-4 md:grid-cols-7">
//                     {weather.forecast.map((day, index) => (
//                       <div
//                         key={index}
//                         className="p-4 text-center transition-all duration-300 rounded-xl bg-gray-50 hover:bg-gray-100 transform hover:scale-[1.05]"
//                         style={{ animationDelay: `${index * 0.1}s` }}
//                       >
//                         <div className="text-lg font-medium text-gray-900">{safe(day.day)}</div>
//                         <div className="my-2 text-3xl">{getWeatherIcon(day.condition)}</div>
//                         <div className="text-xl font-bold text-gray-900">{safe(day.high, "--")}°</div>
//                         <div className="text-gray-600">{safe(day.low, "--")}°</div>
//                         <div className="mt-1 text-sm text-gray-600">{safe(day.condition)}</div>
//                         {day.rain > 0 && <div className="mt-1 text-sm text-blue-600">{day.rain}% rain</div>}
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="py-12 text-center">
//                     <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
//                     </svg>
//                     <p className="mt-4 text-gray-600">No forecast data available.</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Market Section */}
//           {activeTab === "market" && (
//             <div className="p-6 transition-all duration-300 transform bg-white shadow-xl rounded-2xl hover:shadow-2xl">
//               <h2 className="mb-6 text-xl font-bold text-gray-900">Market Prices & Trends</h2>
//               {marketData?.length ? (
//                 <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
//                   {marketData.map((m, index) => (
//                     <div 
//                       key={m.id || m.crop} 
//                       className="p-4 transition-all duration-300 bg-white border border-gray-200 rounded-xl hover:shadow-md transform hover:scale-[1.02]"
//                       style={{ animationDelay: `${index * 0.1}s` }}
//                     >
//                       <div className="flex items-center mb-4">
//                         <div className="flex items-center justify-center w-10 h-10 mr-3 bg-green-100 rounded-full">
//                           <span className="font-bold text-[#097A4E]">{(m.crop || "C").charAt(0)}</span>
//                         </div>
//                         <div>
//                           <h3 className="font-medium text-gray-900">{m.crop}</h3>
//                           <p className="text-sm text-gray-600">Current price</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-xl font-bold text-gray-900">{formatCurrency(m.price)}</span>
//                         <span className={`flex items-center ${m.change && m.change < 0 ? "text-red-500" : "text-[#097A4E]"}`}>
//                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={m.change && m.change < 0 ? "M19 14l-7 7m0 0l-7-7m7 7V3" : "M5 10l7-7m0 0l7 7m-7-7v18"} />
//                           </svg>
//                           <span>{safe(m.changePercent ?? m.change, "0%")}</span>
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="py-12 text-center">
//                   <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
//                   </svg>
//                   <p className="mt-4 text-gray-600">No market data available.</p>
//                 </div>
//               )}
//               <h3 className="mb-4 text-lg font-medium text-gray-900">Price Trends</h3>
//               <div className="flex items-center justify-center h-64 bg-gray-100 rounded-xl">
//                 <div className="text-center">
//                   <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
//                   </svg>
//                   <p className="mt-2 text-gray-500">Price chart will be displayed here</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;