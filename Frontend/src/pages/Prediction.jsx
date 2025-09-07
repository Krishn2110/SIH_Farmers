import React, { useState } from 'react'; 
import { Apple, Banana, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// ✅ Import crop images
// Crop images
import mango from "../assets/photos-crop/Mango.jpeg";
import apple from "../assets/photos-crop/Apple.jpeg";
import banana from "../assets/photos-crop/Banana.jpeg";
import blackgram from "../assets/photos-crop/Blackgram.jpeg";
import chickpea from "../assets/photos-crop/ChickPea.jpeg";
import coconut from "../assets/photos-crop/Coconut.jpeg";
import coffee from "../assets/photos-crop/Coffee.jpeg";
import cotton from "../assets/photos-crop/Cotton.jpeg";
import grapes from "../assets/photos-crop/Grapes.jpeg";
import jute from "../assets/photos-crop/Jute.jpeg";
import kidneybeans from "../assets/photos-crop/KidneyBeans.jpeg";
import lentil from "../assets/photos-crop/Lentil.jpeg";
import maize from "../assets/photos-crop/Maize.jpeg";
import mothbeans from "../assets/photos-crop/MothBeans.jpeg";
import mungbean from "../assets/photos-crop/MungBean.jpeg";
import muskmelon from "../assets/photos-crop/Muskmelon.jpeg";
import orange from "../assets/photos-crop/Orange.jpeg";
import papaya from "../assets/photos-crop/Papaya.jpeg";
import pigeonpeas from "../assets/photos-crop/PigeonPeas.jpeg";
import pomegranate from "../assets/photos-crop/Pomegranate.jpeg";
import rice from "../assets/photos-crop/Rice.jpeg";
import watermelon from "../assets/photos-crop/Watermelon.jpeg";


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
  const [result, setResult] = useState("");   // for prediction result
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fontFamily = {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  // ✅ Crop → Image mapping
 const cropImages = {
  mango: mango,
  apple: apple,
  banana: banana,
  blackgram: blackgram,
  chickpea: chickpea,
  coconut: coconut,
  coffee: coffee,
  Cotton: cotton,
  grapes: grapes,
  jute: jute,
  kidneybeans: kidneybeans,
  lentil: lentil,
  maize: maize,
  mothBeans: mothbeans,
  mungBean: mungbean,
  muskmelon: muskmelon,
  orange: orange,
  papaya: papaya,
  PigeonPeas: pigeonpeas,
  Pomegranate: pomegranate,
  rice: rice,
  watermelon: watermelon,
};


  // Function to call Flask API
  const handlePredict = async () => {
    if (soilType === 'Select Soil Type' || previousCrop === 'Select Previous Crop') {
      setResult("Please select soil type and previous crop");
      return;
    }
    
    if (!soilPh || !temperature || !rainfall || !humidity || !phosphorus || !nitrogen || !phosphorous || !previousYield) {
      setResult("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        soilType,
        previousCrop,
        soilPh: parseFloat(soilPh),
        temperature: parseFloat(temperature),
        rainfall: parseFloat(rainfall),
        humidity: parseFloat(humidity),
        phosphorus: parseFloat(phosphorus),
        nitrogen: parseFloat(nitrogen),
        phosphorous: parseFloat(phosphorous),
        previousYield: parseFloat(previousYield)
      });
      setResult(response.data.prediction);
    } catch (error) {
      console.error("Error predicting:", error);
      if (error.response) {
        setResult(`Error: ${error.response.data.error || 'Server error'}`);
      } else if (error.request) {
        setResult("Error: Cannot connect to server. Make sure Flask is running on port 5000");
      } else {
        setResult("Error: Something went wrong");
      }
    } finally {
      setLoading(false);
    }
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
        <p className="text-gray-600/70 text-lg" style={fontFamily}>
          Enter your farm's data to get an accurate yield prediction.
        </p>
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
                  <label className="block text-m font-semibold text-gray-700 mb-3">Soil Type</label>
                  <div className="relative">
                    <select 
                      className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl appearance-none bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-all duration-300 hover:border-green-300 group-hover:shadow-md"
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
                  <label className="block text-m font-semibold text-gray-700 mb-3">Phosphorus (K)</label>
                  <input
                    type="text"
                    placeholder="e.g., 120"
                    className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl"
                    value={phosphorus}
                    onChange={(e) => setPhosphorus(e.target.value)}
                  />
                </div>

                {/* Nitrogen (N) */}
                <div className="group">
                  <label className="block text-m font-semibold text-gray-700 mb-3">Nitrogen (N)</label>
                  <input
                    type="text"
                    placeholder="e.g. 50"
                    className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl"
                    value={nitrogen}
                    onChange={(e) => setNitrogen(e.target.value)}
                  />
                </div>

                {/* Phosphorous (P) */}
                <div className="group">
                  <label className="block text-m font-semibold text-gray-700 mb-3">Phosphorous (P)</label>
                  <input
                    type="text"
                    placeholder="e.g. 50"
                    className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl"
                    value={phosphorous}
                    onChange={(e) => setPhosphorous(e.target.value)}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Soil pH */}
                <div className="group">
                  <label className="block text-m font-semibold text-gray-700 mb-3">Soil pH</label>
                  <input
                    type="text"
                    placeholder="e.g., 6.5"
                    className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl"
                    value={soilPh}
                    onChange={(e) => setSoilPh(e.target.value)}
                  />
                </div>

                {/* Average Temperature */}
                <div className="group">
                  <label className="block text-m font-semibold text-gray-700 mb-3">Average Temperature (°C)</label>
                  <input
                    type="text"
                    placeholder="e.g., 25"
                    className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                  />
                </div>

                {/* Rainfall */}
                <div className="group">
                  <label className="block text-m font-semibold text-gray-700 mb-3">Rainfall (mm)</label>
                  <input
                    type="text"
                    placeholder="e.g., 500"
                    className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl"
                    value={rainfall}
                    onChange={(e) => setRainfall(e.target.value)}
                  />
                </div>

                {/* Humidity */}
                <div className="group">
                  <label className="block text-m font-semibold text-gray-700 mb-3">Humidity (%)</label>
                  <input
                    type="text"
                    placeholder="e.g., 60"
                    className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl"
                    value={humidity}
                    onChange={(e) => setHumidity(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Crop History Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Crop History</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Previous Crop */}
                <div className="group">
                  <label className="block text-m font-semibold text-gray-700 mb-3">Previous Crop</label>
                  <div className="relative">
                    <select 
                      className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl"
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
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  </div>
                </div>

                {/* Yield of Previous Crop */}
                <div className="group">
                  <label className="block text-m font-semibold text-gray-700 mb-3">Yield of Previous Crop (tons/hectare)</label>
                  <input
                    type="text"
                    placeholder="e.g., 3.5"
                    className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl"
                    value={previousYield}
                    onChange={(e) => setPreviousYield(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Buttons Row */}
            <div className="flex justify-between items-center mt-12">
              <button
                onClick={() => navigate('/')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-full"
              >
                Back
              </button>

              <button 
                onClick={handlePredict}
                disabled={loading}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold px-12 py-4 rounded-full disabled:opacity-50"
              >
                {loading ? "Predicting..." : "Predict Yield"}
              </button>
            </div>

            {/* Show prediction result + image */}
            {result && (
            // {(
              <div className="mt-10 text-center">
                <h2 className="text-2xl font-bold text-green-600">
                  Predicted Crop: {result}
                </h2>
                {cropImages[result] && (
                // { (
                  <div className="mt-6 flex justify-center">
                    <img 
                      src={cropImages[result]} 
                      // src={[mango]} 
                      alt={result} 
                      className="w-64 h-64 object-cover rounded-2xl shadow-xl border border-gray-200" 
                    />
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
