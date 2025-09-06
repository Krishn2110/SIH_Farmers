import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdLock, MdPersonOutline, MdVisibility, MdVisibilityOff, MdArrowBack, MdSms } from "react-icons/md";
import { FaLeaf, FaSeedling, FaTractor } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import loginImage from "../../assets/images/loginimg.jpg";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [UserEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // normal login - UPDATED FOR PROPER LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { UserEmail, password, Password: password, UserRole: "farmer" });
      if (res.data?.requireOtp) {
        setShowOtp(true);
      } else {
        login(res.data);
        navigate("/farmer-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  // otp verify - UPDATED FOR PROPER LOGIN
  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/verify-otp", { UserEmail, otp });
      
      // Ensure we have both user data and token
      if (res.data.token) {
        login(res.data.user || { 
          email: UserEmail,
          name: res.data.name || "User"
        }, res.data.token);
        navigate("/farmer-dashboard");
      } else {
        throw new Error("OTP verification response missing token");
      }
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  

  // forgot password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/forgotPassword", { UserEmail });
      alert(res.data.message || "Password reset email sent");
      setForgotPasswordMode(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  // google login
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="relative h-screen overflow-hidden bg-white">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-32 h-32 bg-transparent rounded-full top-20 right-20"></div>
        <div className="absolute w-24 h-24 bg-transparent rounded-full bottom-20 left-20"></div>
        <div className="absolute w-16 h-16 bg-transparent rounded-full top-1/2 left-10"></div>

        <FaLeaf className="absolute text-6xl text-green-200 top-32 right-1/3 opacity-10" />
        <FaSeedling className="absolute text-5xl bottom-40 left-1/4 text-emerald-200 opacity-15" />
        <FaTractor className="absolute text-4xl text-green-200 top-1/3 left-1/2 opacity-10" />
      </div>

      {/* Main Container */}
      <div className="flex items-center justify-center h-full">
        <div className="flex w-4/5 h-full">
          {/* Left Section - Image */}
          <div className="flex-1 p-0">
            <img
              src={loginImage}
              alt="Farming Illustration"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Right Section - Login Form */}
          <div className="flex items-center justify-center flex-1 p-0">
            <div className="w-full p-6 overflow-hidden border-white/30 rounded-2xl">
              <div className="relative z-10 mb-4 text-center">
                <div className="inline-flex items-center justify-center mb-3 shadow-lg w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                  <FaSeedling className="text-xl text-white" />
                </div>
                <h1 className="mb-1 text-2xl poppins-bold font-bold text-gray-800">
                  {forgotPasswordMode ? "Forgot Password" : showOtp ? "Verify OTP" : "Welcome Back"}
                </h1>
                <p className="text-sm text-gray-600 poppins-semibold">
                  {forgotPasswordMode ? "Reset your password" : showOtp ? "Enter your OTP" : "Login to continue your journey"}
                </p>
              </div>

              {error && (
                <div className="p-2 mb-4 border-2 border-red-200 bg-red-50 rounded-xl">
                  <p className="text-xs font-medium text-center text-red-600">
                    {error}
                  </p>
                </div>
              )}

              {/* Login Form */}
              {!forgotPasswordMode && !showOtp && (
                <form onSubmit={handleLogin} className="relative z-10 space-y-4">
                  <div>
                    <label className="text-xs poppins-semibold font-semibold tracking-wide text-gray-700 uppercase">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3">
                        <MdEmail
                          className={`text-lg ${
                            focusedField === "email" ? "text-green-600" : "text-gray-400"
                          }`}
                        />
                      </div>
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        value={UserEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField("")}
                        required
                        className="w-full poppins-regular py-2 pl-10 pr-3 text-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs poppins-semibold tracking-wide text-gray-700 uppercase">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3">
                        <MdLock
                          className={`text-lg ${
                            focusedField === "password" ? "text-green-600" : "text-gray-400"
                          }`}
                        />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField("")}
                        required
                        className="w-full py-2 poppins-regular pl-10 pr-10 text-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 z-10 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-6 poppins-semibold text-sm font-bold text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </form>
              )}

              {/* OTP Form */}
              {showOtp && (
                <form onSubmit={handleOtpVerify} className="relative z-10 space-y-4">
                  <div>
                    <label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">
                      Verification Code
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3">
                        <MdSms
                          className={`text-lg ${
                            focusedField === "otp" ? "text-green-600" : "text-gray-400"
                          }`}
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        onFocus={() => setFocusedField("otp")}
                        onBlur={() => setFocusedField("")}
                        required
                        className="w-full py-2 pl-10 pr-3 text-lg tracking-widest text-center border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-6 text-sm font-bold text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </form>
              )}

              {/* Forgot Password Form */}
              {forgotPasswordMode && (
                <form onSubmit={handleForgotPassword} className="relative z-10 space-y-4">
                  <div>
                    <label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3">
                        <MdEmail
                          className={`text-lg ${
                            focusedField === "email" ? "text-green-600" : "text-gray-400"
                          }`}
                        />
                      </div>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={UserEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField("")}
                        required
                        className="w-full py-2 pl-10 pr-3 text-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-6 text-sm font-bold text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>
                </form>
              )}

              {/* Extra Buttons for Login Screen */}
              {!forgotPasswordMode && !showOtp && (
                <div className="relative z-10 mt-4 space-y-3">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full poppins-semibold py-2.5 px-6 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 flex items-center justify-center shadow-md hover:shadow-lg"
                  >
                    <FcGoogle className="mr-2 text-xl" />
                    Login with Google
                  </button>
                  <div className="pt-3 text-center border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => {
                        setForgotPasswordMode(true);
                        setError("");
                        setShowOtp(false);
                      }}
                      className="text-sm poppins-semibold text-green-600 hover:text-green-700 hover:underline"
                    >
                      Forgot your password?
                    </button>
                  </div>
                  <div className="pt-4 text-center border-t border-gray-200">
                    <p className="text-xs text-gray-600">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="poppins-semibold text-green-600 hover:text-green-700 hover:underline"
                      >
                        Create Account
                      </Link>
                    </p>
                  </div>
                </div>
              )}

              {/* Back to Login from Forgot Password */}
              {forgotPasswordMode && (
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => setForgotPasswordMode(false)}
                    className="poppins-semibold text-green-600 hover:underline"
                  >
                    Back to Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

