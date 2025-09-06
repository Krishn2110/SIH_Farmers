import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
  MdPerson,
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdPhone,
  MdSms,
} from "react-icons/md";
import { FaLeaf, FaSeedling, FaTractor } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import loginImage from "../../assets/images/loginimg.jpg";

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

  // Floating background animation
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
        toast.success("OTP sent to your email. Please verify to complete signup.");
        setShowOtp(true);
      } else {
        await api.post("/auth/send-phone-otp", { phone: formData.phone });
        toast.success("OTP sent to your phone.");
        setShowOtp(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification - UPDATED FOR AUTO LOGIN
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
        
        toast.success("Account created successfully!");
        
        // AUTO LOGIN AFTER SUCCESSFUL SIGNUP
        if (res.data.token && res.data.user) {
          login(res.data.user, res.data.token);
          navigate("/farmer-dashboard");
        } else {
          // If backend doesn't return user data, create a minimal user object
          const userData = {
            name: formData.name,
            email: formData.email,
            UserName: formData.name
          };
          login(userData, res.data.token);
          navigate("/farmer-dashboard");
        }

      } else {
        // Phone OTP
        const res = await api.post("/auth/verify-phone-otp", {
          phone: formData.phone,
          otp,
          UserName: formData.name,
          password: formData.password,
        });
        
        toast.success("Account created successfully!");
        
        // AUTO LOGIN AFTER SUCCESSFUL SIGNUP
        if (res.data.token && res.data.user) {
          login(res.data.user, res.data.token);
        } else {
          // If backend doesn't return user data, create a minimal user object
          const userData = {
            name: formData.name,
            phone: formData.phone,
            UserName: formData.name
          };
          login(userData, res.data.token);
        }
        navigate("/farmer-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // Google signup
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="relative h-screen overflow-hidden bg-white">

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
          {/* Left Section - Signup Form */}
          <div className="flex items-center justify-center flex-1 p-0">
            <div className="w-full p-6 overflow-hidden border-white/30 rounded-2xl">
              <div className="relative z-10 mb-4 text-center">
                <div className="inline-flex items-center justify-center mb-3 shadow-lg w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                  <FaSeedling className="text-xl text-white" />
                </div>
                <h1 className="mb-1 text-2xl font-bold text-gray-800 poppins-bold">
                  Join the Farming Revolution
                </h1>
                <p className="text-sm text-gray-600 poppins-semibold">
                  Create your account and start your journey
                </p>
              </div>

              {/* Toggle Email/Phone */}
              {!showOtp && (
                <div className="relative z-10 mb-4 poppins-semibold">
                  <div className="flex p-1 bg-gray-100 rounded-xl">
                    <button
                      type="button"
                      onClick={() => {
                        setSignupMethod("email");
                        setShowOtp(false);
                        setError("");
                      }}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        signupMethod === "email"
                          ? "bg-white text-green-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        <MdEmail className="mr-1 text-base poppins-semibold" /> Email
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSignupMethod("phone");
                        setShowOtp(false);
                        setError("");
                      }}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        signupMethod === "phone"
                          ? "bg-white text-green-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        <MdPhone className="mr-1 text-base" /> Phone
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Form */}
              <form
                className="relative z-10 space-y-4 poppins-semibold"
                onSubmit={showOtp ? handleOtpVerify : handleSignup}
              >
                {/* Full Name */}
                <div>
                  <label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">
                    Full Name
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3">
                      <MdPerson
                        className={`text-lg ${
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
                      className="w-full py-2 pl-10 pr-3 text-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                </div>

                {/* Email / Phone */}
                {!showOtp && (
                  <div>
                    <label className="text-xs tracking-wide text-gray-700 uppercase poppins-semibold">
                      {signupMethod === "email" ? "Email Address" : "Phone Number"}
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3">
                        {signupMethod === "email" ? (
                          <MdEmail
                            className={`text-lg ${
                              focusedField === "email"
                                ? "text-green-600"
                                : "text-gray-400"
                            }`}
                          />
                        ) : (
                          <MdPhone
                            className={`text-lg ${
                              focusedField === "phone"
                                ? "text-green-600"
                                : "text-gray-400"
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
                        value={
                          signupMethod === "email"
                            ? formData.email
                            : formData.phone
                        }
                        onChange={handleChange}
                        onFocus={() =>
                          setFocusedField(
                            signupMethod === "email" ? "email" : "phone"
                          )
                        }
                        onBlur={() => setFocusedField("")}
                        maxLength={signupMethod === "phone" ? 10 : undefined}
                        className="w-full py-2 pl-10 pr-3 text-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* OTP */}
                {showOtp && (
                  <div>
                    <label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">
                      Verification Code
                    </label>
                    <div className="relative poppins-semibold group">
                      <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3">
                        <MdSms
                          className={`text-lg ${
                            focusedField === "otp"
                              ? "text-green-600"
                              : "text-gray-400"
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
                        className="w-full py-2 pl-10 pr-3 text-lg tracking-widest text-center border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    <p className="text-xs text-center text-gray-500">
                      Code sent to <span className="font-semibold">+91 {formData.phone}</span>
                    </p>
                  </div>
                )}

                {/* Password */}
                {!showOtp && (
                  <div>
                    <label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3">
                        <MdLock
                          className={`text-lg ${
                            focusedField === "password"
                              ? "text-green-600"
                              : "text-gray-400"
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
                        className="w-full py-2 pl-10 pr-10 text-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
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
                )}

                {/* Profile Image */}
                {!showOtp && (
                  <div>
                    <label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">
                      Profile Image (Optional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block w-full text-sm text-gray-600 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                    />
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="p-2 border-2 border-red-200 bg-red-50 rounded-xl">
                    <p className="text-xs font-medium text-center text-red-600">
                      {error}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-6 text-sm poppins-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
                >
                  {loading
                    ? "Processing..."
                    : showOtp
                    ? "Verify & Create Account"
                    : "Create Account"}
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
                    className="w-full px-4 py-2 text-xs font-semibold text-green-600 border-2 border-green-200 bg-green-50 rounded-xl hover:bg-green-100"
                  >
                    ← Back to Phone Number
                  </button>
                )}
              </form>

              {/* Google & Login */}
              {!showOtp && (
                <div className="relative z-10 mt-4 space-y-3">
                  <button
                    onClick={handleGoogleLogin}
                    className="w-full py-2.5 px-6 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 flex items-center justify-center shadow-md hover:shadow-lg"
                  >
                    <FcGoogle className="mr-2 text-xl poppins-semibold" />
                    Continue with Google
                  </button>
                  <div className="pt-3 text-center border-t border-gray-200">
                    <p className="text-xs text-gray-600">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="font-bold text-green-600 hover:text-green-700 hover:underline"
                      >
                        Login
                      </Link>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="flex-1 p-0">
            <img
                          src={loginImage}
                          alt="Farming Illustration"
                          className="object-cover w-full h-full"
                        />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;