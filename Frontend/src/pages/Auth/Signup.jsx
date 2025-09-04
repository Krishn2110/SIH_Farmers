

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdPerson, MdEmail, MdLock, MdImage } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

function Signup() {
  const [formData, setFormData] = useState({
    UserName: "",
    UserEmail: "",
    Password: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };


  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const data = new FormData();
    data.append("UserName", formData.UserName);
    data.append("UserEmail", formData.UserEmail);
    data.append("Password", formData.Password);
    if (profileImage) {
      data.append("profileImage", profileImage);
    }

    try {
      const response = await api.post("/auth/signup", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.success) {
        alert("Signup successful! Please check your email for OTP.");
        setOtpStep(true); 
      } else {
        setError(response.data?.message || "Signup failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/verify-otp", {
        UserEmail: formData.UserEmail, 
        otp,
      });

      if (response.data?.success) {
        alert("OTP verified successfully! You can now login.");
        navigate("/login");
      } else {
        setError(response.data?.message || "OTP verification failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google"; 
  };

  return (
    <div className="min-h-screen bg-transparent from-green-100 via-green-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 border border-green-200">
        <h1 className="text-2xl font-bold text-center text-green-900 mb-8">
          {otpStep ? "Verify OTP 🔑" : "Join the Farming Revolution 🌾"}
        </h1>

        {!otpStep ? (
         
          <form className="space-y-4" onSubmit={handleSignup}>
            <div className="relative">
              <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 text-2xl" />
              <input
                type="text"
                name="UserName"
                placeholder="Enter your full name"
                value={formData.UserName}
                onChange={handleChange}
                className="w-full pl-12 pr-3 py-4 border border-green-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-gray-900 placeholder-gray-400 text-xl"
                required
              />
            </div>

            <div className="relative">
              <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 text-base" />
              <input
                type="email"
                name="UserEmail"
                placeholder="Enter your email"
                value={formData.UserEmail}
                onChange={handleChange}
                className="w-full pl-12 pr-3 py-4 border border-green-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-gray-900 placeholder-gray-400 text-xl"
                required
              />
            </div>

            <div className="relative">
              <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 text-base" />
              <input
                type="password"
                name="Password"
                placeholder="Enter your password"
                value={formData.Password}
                onChange={handleChange}
                className="w-full pl-12 pr-3 py-4 border border-green-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-gray-900 placeholder-gray-400 text-xl"
                required
              />
            </div>

            <div className="relative">
              <MdImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 text-base" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full pl-12 pr-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-gray-900 text-sm file:bg-green-100 file:border-0 file:rounded file:px-2 file:py-1 file:text-green-700 file:font-medium file:text-xl"
              />
            </div>

            {error && <p className="text-red-600 text-center text-xs">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200 font-medium text-xl disabled:opacity-50"
            >
              {loading ? "Processing..." : "Sign Up"}
            </button>
          </form>
        ) : (
          
          <form className="space-y-4" onSubmit={handleVerifyOtp}>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-4 border border-green-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-gray-900 text-xl"
              required
            />

            {error && <p className="text-red-600 text-center text-xs">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200 font-medium text-xl disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {!otpStep && (
          <div className="mt-4">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center bg-white border border-green-300 text-gray-800 py-2 rounded-lg hover:bg-green-50 transition duration-200 font-medium text-xl"
            >
              <FcGoogle className="mr-2 text-base" />
              Sign Up with Google
            </button>
          </div>
        )}

        <p className="mt-3 text-center text-gray-600 text-xl">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

