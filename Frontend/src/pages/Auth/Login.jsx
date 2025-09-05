import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdLock, MdPersonOutline, MdVisibility, MdVisibilityOff, MdArrowBack, MdSms } from "react-icons/md";
import { FaLeaf, FaSeedling, FaTractor } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

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

  // normal login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { UserEmail, password ,Password: password,
  UserRole: "farmer" });
      if (res.data?.requireOtp) {
        setShowOtp(true);
      } else {
        login(res.data);
        navigate("/farmer-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // otp verify
  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/verify-otp", { UserEmail, otp });
      login(res.data);
      navigate("/farmer-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
          {forgotPasswordMode ? "Forgot Password" : showOtp ? "Verify OTP" : "Login"}
        </h1>

        {error && (
          <div className="mb-4 text-red-600 text-sm font-medium text-center">
            {error}
          </div>
        )}

        {/* login form */}
        {!forgotPasswordMode && !showOtp && (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={UserEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}

        {/* otp form */}
        {showOtp && (
          <form onSubmit={handleOtpVerify} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {/* forgot password form */}
        {forgotPasswordMode && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={UserEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        {/* extra buttons only for login screen */}
        {!forgotPasswordMode && !showOtp && (
          <>
            <div className="mt-4">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center bg-white border border-green-300 py-3 rounded-lg hover:bg-green-50 transition"
              >
                <FcGoogle className="mr-2 text-xl" />
                Login with Google
              </button>
            </div>

            <div className="text-center mt-3">
              <button
                type="button"
                onClick={() => {
                  setForgotPasswordMode(true);
                  setError("");
                  setShowOtp(false);
                }}
                className="text-sm font-semibold text-green-600 hover:text-green-700 hover:underline"
              >
                Forgot your password?
              </button>
            </div>

            <div className="pt-4 text-center border-t border-gray-200">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-bold text-green-600 hover:text-green-700 hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </>
        )}

        {/* back to login from forgot password */}
        {forgotPasswordMode && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setForgotPasswordMode(false)}
              className="text-green-600 font-semibold hover:underline"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

