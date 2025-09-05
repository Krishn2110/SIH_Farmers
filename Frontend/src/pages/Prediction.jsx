import React, { useState } from 'react'; 
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Prediction = () => {
  const [soilType, setSoilType] = useState('Select Soil Type');
  const [previousCrop, setPreviousCrop] = useState('Select Previous Crop');
  const [soilPh, setSoilPh] = useState('');
  const [temperature, setTemperature] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [humidity, setHumidity] = useState('');
  const [phosphorus, setPhosphorus] = useState('');
  const [nitrogen, setNitrogen] = useState('');
  const [phosphorous, setPhosphorous] = useState('');
  const [previousYield, setPreviousYield] = useState('');

  const navigate = useNavigate();

  const fontFamily = {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50" style={fontFamily}>
      {/* Page Title */}
      <div className="text-center pt-12 pb-8">
        <h1 
            className="text-5xl font-bold mb-3 px-6 py-2 inline-block rounded-lg bg-white-500 text-green-500" 
            style={fontFamily}>
            CROP YIELD Prediction
        </h1>
        <p className="text-gray-600/70 text-lg" style={fontFamily}>Enter your farm's data to get an accurate yield prediction.</p>
      </div>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto px-2 pb-12">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="p-12">
            
            {/* Form Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Soil Type */}
                <div className="group">
                  <label className="block text-m font-semibold text-gray-700 mb-3" style={fontFamily}>Soil Type</label>
                  <div className="relative">
                    <select 
                      className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl appearance-none bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-all duration-300 hover:border-green-300 group-hover:shadow-md"
                      style={fontFamily}
                      value={soilType}
                      onChange={(e) => setSoilType(e.target.value)}
                    >
                      <option className="text-gray-400">Select Soil Type</option>
                      <option>Clay</option>
                      <option>Sandy</option>
                      <option>Loam</option>
                      <option>Silt</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none transition-transform group-hover:scale-110" />
                  </div>
                </div>

                {/* Phosphorus (K) */}
                <div className="group">
                  <label className="block text-m font-semibold text-gray-700 mb-3" style={fontFamily}>Phosphorus (K)</label>
                  <input
                    type="text"
                    placeholder="e.g., 120"
                    className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-all duration-300 hover:border-green-300 group-hover:shadow-md placeholder-gray-400"
                    style={fontFamily}
                    value={phosphorus}
                    onChange={(e) => setPhosphorus(e.target.value)}
                  />
                </div>

                {/* Nitrogen (N) */}
                <div className="group">
                  <label className="block text-m font-semibold text-gray-700 mb-3" style={fontFamily}>Nitrogen (N)</label>
                  <input
                    type="text"
                    placeholder="e.g. 50"
                    className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-all duration-300 hover:border-green-300 group-hover:shadow-md placeholder-gray-400"
                    style={fontFamily}
                    value={nitrogen}
                    onChange={(e) => setNitrogen(e.target.value)}
                  />
                </div>

                {/* Phosphorous (P) */}
                <div className="group">
                  <label className="block text-m font-semibold text-gray-700 mb-3" style={fontFamily}>Phosphorous (P)</label>
                  <input
                    type="text"
                    placeholder="e.g. 50"
                    className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-all duration-300 hover:border-green-300 group-hover:shadow-md placeholder-gray-400"
                    style={fontFamily}
                    value={phosphorous}
                    onChange={(e) => setPhosphorous(e.target.value)}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Soil pH */}
                <div className="group">
                  <label className="block text-m font-semibold text-gray-700 mb-3" style={fontFamily}>Soil pH</label>
                  <input
                    type="text"
                    placeholder="e.g., 6.5"
                    className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 hover:border-blue-300 group-hover:shadow-md placeholder-gray-400"
                    style={fontFamily}
                    value={soilPh}
                    onChange={(e) => setSoilPh(e.target.value)}
                  />
                </div>

                {/* Average Temperature */}
                <div className="group">
                  <label className="block text-m font-semibold text-gray-700 mb-3" style={fontFamily}>Average Temperature (°C)</label>
                  <input
                    type="text"
                    placeholder="e.g., 25"
                    className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 hover:border-blue-300 group-hover:shadow-md placeholder-gray-400"
                    style={fontFamily}
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                  />
                </div>

                {/* Rainfall */}
                <div className="group">
                  <label className="block text-m font-semibold text-gray-700 mb-3" style={fontFamily}>Rainfall (mm)</label>
                  <input
                    type="text"
                    placeholder="e.g., 500"
                    className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 hover:border-blue-300 group-hover:shadow-md placeholder-gray-400"
                    style={fontFamily}
                    value={rainfall}
                    onChange={(e) => setRainfall(e.target.value)}
                  />
                </div>

                {/* Humidity */}
                <div className="group">
                  <label className="block text-m font-semibold text-gray-700 mb-3" style={fontFamily}>Humidity (%)</label>
                  <input
                    type="text"
                    placeholder="e.g., 60"
                    className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 hover:border-blue-300 group-hover:shadow-md placeholder-gray-400"
                    style={fontFamily}
                    value={humidity}
                    onChange={(e) => setHumidity(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Crop History Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center" style={fontFamily}>
                <div className="w-2 h-8 bg-gradient-to-b rounded-full mr-3"></div>
                Crop History
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Previous Crop */}
                <div className="group">
                  <label className="block text-m font-semibold text-gray-700 mb-3" style={fontFamily}>Previous Crop</label>
                  <div className="relative">
                    <select 
                      className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl appearance-none bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300 hover:border-purple-300 group-hover:shadow-md"
                      style={fontFamily}
                      value={previousCrop}
                      onChange={(e) => setPreviousCrop(e.target.value)}
                    >
                      <option className="text-gray-400">Select Previous Crop</option>
                      <option>Wheat</option>
                      <option>Rice</option>
                      <option>Corn</option>
                      <option>Soybean</option>
                      <option>Cotton</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none transition-transform group-hover:scale-110" />
                  </div>
                </div>

                {/* Yield of Previous Crop */}
                <div className="group">
                  <label className="block text-m font-semibold text-gray-700 mb-3" style={fontFamily}>Yield of Previous Crop (tons/hectare)</label>
                  <input
                    type="text"
                    placeholder="e.g., 3.5"
                    className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300 hover:border-purple-300 group-hover:shadow-md placeholder-gray-400"
                    style={fontFamily}
                    value={previousYield}
                    onChange={(e) => setPreviousYield(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Buttons Row */}
            <div className="flex justify-between items-center mt-12">
              {/* Back Button */}
              <button
                onClick={() => navigate('/')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-200"
                style={fontFamily}
              >
                Back
              </button>

              {/* Predict Button */}
              <button 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-12 py-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-200 transform hover:scale-105 hover:shadow-xl shadow-lg" 
                style={fontFamily}
              >
                Predict Yield
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
