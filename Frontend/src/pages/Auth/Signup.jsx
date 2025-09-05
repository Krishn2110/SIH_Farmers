import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  MdPerson,
  MdEmail,
  MdLock,
  MdImage,
  MdVisibility,
  MdVisibilityOff,
  MdPhone,
  MdSms,
} from "react-icons/md";
import { FaLeaf, FaSeedling, FaTractor } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [signupMethod, setSignupMethod] = useState("email"); // "email" or "phone"
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  // Floating animation for background elements
  useEffect(() => {
    const interval = setInterval(() => {
      const elements = document.querySelectorAll(".floating");
      elements.forEach((el, index) => {
        const delay = index * 2000;
        setTimeout(() => {
          el.style.transform = `translateY(${Math.random() * 20 - 10}px)`;
        }, delay);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (signupMethod === "email") {
        const data = new FormData();
        data.append("UserName", formData.name);
        data.append("UserEmail", formData.email);
        data.append("Password", formData.password);
        if (profileImage) data.append("profileImage", profileImage);

        await api.post("/auth/signup", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        await api.post("/auth/send-otp", { UserEmail: formData.email });
        alert("OTP sent to your email. Please verify to complete signup.");
        // navigate("/login");
        setShowOtp(true);
      } else {
        await api.post("/auth/send-phone-otp", { phone: formData.phone });
        

        setShowOtp(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };


const handleOtpVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (signupMethod === "email") {
        // Email OTP
        const res = await api.post("/auth/verify-otp", {
          UserEmail: formData.email,
          otp,
        });
        alert("Account created successfully!");
        // Optionally, auto-login
        login(res.data.token, res.data.user);
      } else {
        // Phone OTP
        await api.post("/auth/verify-phone-otp", {
          phone: formData.phone,
          otp,
          Name: formData.name,
          Password: formData.password,
        });
        alert("Account created successfully!");
      }
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };


  // Google signup
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-32 h-32 rounded-full top-20 right-20 bg-gradient-to-br from-green-200/10 to-emerald-300/30 blur-xl"></div>
        <div className="absolute w-24 h-24 rounded-full bottom-20 left-20 bg-gradient-to-br from-teal-200/30 to-green-300/30 blur-xl"></div>
        <div className="absolute w-16 h-16 rounded-full top-1/2 left-10 bg-gradient-to-br from-emerald-200/20 to-teal-300/20 blur-lg"></div>

        <FaLeaf className="absolute text-6xl text-green-200 top-32 right-1/3 opacity-10" />
        <FaSeedling className="absolute text-5xl bottom-40 left-1/4 text-emerald-200 opacity-15" />
        <FaTractor className="absolute text-4xl text-green-200 top-1/3 left-1/2 opacity-10" />
      </div>

      {/* Main Form */}
      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="relative p-6 overflow-hidden border shadow-2xl backdrop-blur-lg bg-white/90 border-white/30 rounded-2xl">
            <div className="relative z-10 mb-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                <FaSeedling className="text-2xl text-white" />
              </div>
              <h1 className="mb-2 text-3xl font-bold text-gray-800">
                Join the Farming Revolution
              </h1>
              <p className="text-gray-600">
                Create your account and start your agricultural journey
              </p>
            </div>

            {/* Toggle Email/Phone */}
            <div className="relative z-10 mb-6">
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => {
                    setSignupMethod("email");
                    setShowOtp(false);
                    setError("");
                  }}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                    signupMethod === "email"
                      ? "bg-white text-green-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <MdEmail className="mr-2 text-lg" /> Email
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSignupMethod("phone");
                    setShowOtp(false);
                    setError("");
                  }}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                    signupMethod === "phone"
                      ? "bg-white text-green-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <MdPhone className="mr-2 text-lg" /> Phone
                  </div>
                </button>
              </div>
            </div>

            {/* Form */}
            <form
              className="relative z-10 space-y-5"
              onSubmit={showOtp ? handleOtpVerify : handleSignup}
            >
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold tracking-wide text-gray-700 uppercase">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-4">
                    <MdPerson
                      className={`text-xl transition-colors duration-200 ${
                        focusedField === "name" ? "text-green-600" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField("")}
                    className="w-full py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 transition-all duration-200 bg-transparent border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 backdrop-blur-sm"
                    required
                  />
                </div>
              </div>

              {/* Email / Phone */}
              {!showOtp && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold tracking-wide text-gray-700 uppercase">
                    {signupMethod === "email" ? "Email Address" : "Phone Number"}
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-4">
                      {signupMethod === "email" ? (
                        <MdEmail
                          className={`text-xl transition-colors duration-200 ${
                            focusedField === "email" ? "text-green-600" : "text-gray-400"
                          }`}
                        />
                      ) : (
                        <MdPhone
                          className={`text-xl transition-colors duration-200 ${
                            focusedField === "phone" ? "text-green-600" : "text-gray-400"
                          }`}
                        />
                      )}
                    </div>
                    <input
                      type={signupMethod === "email" ? "email" : "tel"}
                      name={signupMethod === "email" ? "email" : "phone"}
                      placeholder={
                        signupMethod === "email"
                          ? "Enter your email address"
                          : "Enter your 10-digit phone number"
                      }
                      value={signupMethod === "email" ? formData.email : formData.phone}
                      onChange={handleChange}
                      onFocus={() =>
                        setFocusedField(signupMethod === "email" ? "email" : "phone")
                      }
                      onBlur={() => setFocusedField("")}
                      maxLength={signupMethod === "phone" ? 10 : undefined}
                      className="w-full py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 transition-all duration-200 bg-transparent border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 backdrop-blur-sm"
                      required
                    />
                  </div>
                </div>
              )}

              {/* OTP */}
              {showOtp && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold tracking-wide text-gray-700 uppercase">
                    Verification Code
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-4">
                      <MdSms
                        className={`text-xl transition-colors duration-200 ${
                          focusedField === "otp" ? "text-green-600" : "text-gray-400"
                        }`}
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      onFocus={() => setFocusedField("otp")}
                      onBlur={() => setFocusedField("")}
                      maxLength="6"
                      className="w-full py-4 pl-12 pr-4 font-mono text-2xl tracking-widest text-center text-gray-900 placeholder-gray-400 transition-all duration-200 border-2 border-gray-200 bg-white/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 backdrop-blur-sm"
                      required
                    />
                  </div>
                  <p className="text-xs text-center text-gray-500">
                    Code sent to <span className="font-semibold text-gray-700">+91 {formData.phone}</span>
                  </p>
                </div>
              )}

              {/* Password */}
              {!showOtp && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold tracking-wide text-gray-700 uppercase">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-4">
                      <MdLock
                        className={`text-xl transition-colors duration-200 ${
                          focusedField === "password" ? "text-green-600" : "text-gray-400"
                        }`}
                      />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField("")}
                      className="w-full py-4 pl-12 pr-12 text-gray-900 placeholder-gray-400 transition-all duration-200 bg-transparent border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 backdrop-blur-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 z-10 flex items-center pr-4 text-gray-400 transition-colors duration-200 hover:text-gray-600"
                    >
                      {showPassword ? <MdVisibilityOff className="text-xl" /> : <MdVisibility className="text-xl" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Profile Image */}
              {!showOtp && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold tracking-wide text-gray-700 uppercase">
                    Profile Image (Optional)
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-4">
                      <MdImage
                        className={`text-xl transition-colors duration-200 ${
                          focusedField === "image" ? "text-green-600" : "text-gray-400"
                        }`}
                      />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      onFocus={() => setFocusedField("image")}
                      onBlur={() => setFocusedField("")}
                      className="w-full py-4 pl-12 pr-4 text-gray-900 transition-all duration-200 bg-transparent border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 backdrop-blur-sm file:bg-green-100 file:border-0 file:rounded file:px-3 file:py-2 file:text-green-700 file:font-medium file:text-sm file:mr-4"
                    />
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="p-4 border-2 border-red-200 bg-red-50 rounded-xl">
                  <p className="text-sm font-medium text-center text-red-600">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 text-lg font-bold text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    Processing...
                  </div>
                ) : showOtp ? (
                  "Verify & Create Account"
                ) : (
                  "Create Account"
                )}
              </button>

              {/* Back from OTP */}
              {showOtp && (
                <button
                  type="button"
                  onClick={() => {
                    setShowOtp(false);
                    setOtp("");
                    setError("");
                  }}
                  className="w-full py-3 px-6 text-sm font-semibold text-green-600 bg-green-50 border-2 border-green-200 rounded-xl hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
                >
                  ← Back to Phone Number
                </button>
              )}
            </form>

            {/* Google / Login */}
            {!showOtp && (
              <div className="relative z-10 mt-6 space-y-4">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full py-4 px-6 text-gray-700 bg-white/80 border-2 border-gray-200 rounded-xl hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <FcGoogle className="mr-3 text-2xl" />
                  <span className="font-semibold">Continue with Google</span>
                </button>
                <div className="pt-4 text-center border-t border-gray-200">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-bold text-green-600 transition-colors duration-200 hover:text-green-700 hover:underline"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
