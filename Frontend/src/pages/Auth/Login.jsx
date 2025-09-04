import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdLock, MdPersonOutline } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

function Login() {
  const [UserEmail, setUserEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [UserRole, setUserRole] = useState("farmer");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // 🔹 Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        UserEmail,
        Password, 
        UserRole,
      });

      if (UserRole === "farmer") {
        await api.post("/auth/send-otp", { UserEmail }); 
        setShowOtp(true);
      } else {
        await login(response.data.token, UserRole);
        navigate(UserRole === "admin" ? "/admin-dashboard" : "/farmer-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle OTP verification
  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/verify-otp", { UserEmail, otp });
      login(response.data.token, "farmer");
      navigate("/farmer-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle forgot password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/forgotPassword", { UserEmail });
      alert("Password reset link sent to your email.");
      setForgotPasswordMode(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 border border-green-200">
        <h2 className="text-3xl font-bold text-center text-green-900 mb-8">
          {forgotPasswordMode ? "Reset Password" : showOtp ? "Verify OTP" : "Welcome Back 🌾"}
        </h2>

        <form
          className="space-y-4"
          onSubmit={
            forgotPasswordMode
              ? handleForgotPassword
              : showOtp
              ? handleOtpVerify
              : handleLogin
          }
        >
          {/* Email */}
          <div className="relative">
            <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 text-2xl" />
            <input
              type="email"
              placeholder="Enter your email"
              value={UserEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full pl-12 pr-3 py-4 border border-green-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 text-xl"
              required
            />
          </div>

          {/* Password + Role */}
          {!forgotPasswordMode && !showOtp && (
            <>
              <div className="relative">
                <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 text-2xl" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-3 py-4 border border-green-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 text-xl"
                  required
                />
              </div>

              <div className="relative">
                <MdPersonOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 text-2xl" />
                <select
                  value={UserRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="w-full pl-12 pr-3 py-4 border border-green-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 text-xl"
                >
                  <option value="farmer">Farmer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </>
          )}

          {/* OTP */}
          {showOtp && (
            <div className="relative">
              <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 text-base" />
              <input
                type="text"
                placeholder="Enter OTP sent to your email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                required
              />
            </div>
          )}

          {/* Error */}
          {error && <p className="text-red-600 text-center text-xs">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition duration-200 font-medium text-xl disabled:opacity-50"
          >
            {loading
              ? "Processing..."
              : forgotPasswordMode
              ? "Send Reset Link"
              : showOtp
              ? "Verify OTP"
              : "Login"}
          </button>
        </form>

        {/* Extra actions */}
        {!forgotPasswordMode && !showOtp && (
          <>
            <div className="mt-4">
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center bg-white border border-green-300 py-4 rounded-lg hover:bg-green-50 transition duration-200 font-medium text-xl"
              >
                <FcGoogle className="mr-2 text-2xl" />
                Login with Google
              </button>
            </div>

            <p className="mt-3 text-center text-gray-600 text-xs">
              <button
                onClick={() => setForgotPasswordMode(true)}
                className="text-green-700 font-medium hover:underline text-xl"
              >
                Forgot Password?
              </button>
            </p>

            <p className="mt-3 text-center text-gray-600 text-xl">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-green-700 font-medium hover:underline">
                Sign Up
              </Link>
            </p>
          </>
        )}

        {forgotPasswordMode && (
          <p className="mt-3 text-center text-gray-600 text-xl">
            <button
              onClick={() => setForgotPasswordMode(false)}
              className="text-green-700 font-medium hover:underline"
            >
              Back to Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;

