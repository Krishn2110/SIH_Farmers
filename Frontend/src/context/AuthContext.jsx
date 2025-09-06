// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from "react";

// Create Context
export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores logged-in user data
  const [loading, setLoading] = useState(true); // For auto-login check
  const [token, setToken] = useState(null); // Store JWT token

  // Load user and token from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user && !!token;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout, 
      loading, 
      isAuthenticated: isAuthenticated() 
    }}>
      {children}
    </AuthContext.Provider>
  );
};






// import { createContext, useState, useEffect, useContext } from "react";
// import api from "../services/api";
// import { toast } from "react-toastify";

// export const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState(null);
//   const [error, setError] = useState(null);

//   const fetchProfile = async () => {
//     try {
//       console.log("Fetching profile with token:", localStorage.getItem("token"));
//       const res = await api.get("/auth/profile");
//       console.log("Profile API response:", res.data);
//       setUser(res.data);
//       localStorage.setItem("user", JSON.stringify(res.data));
//       setError(null);
//     } catch (err) {
//       console.error("Profile fetch failed:", err.response?.data || err.message);
//       setError(err.response?.data?.message || "Failed to load user profile");
//       setUser(null);
//       setToken(null);
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedToken = localStorage.getItem("token");
//     if (storedUser && storedToken) {
//       console.log("Restoring user from localStorage:", JSON.parse(storedUser));
//       setUser(JSON.parse(storedUser));
//       setToken(storedToken);
//       fetchProfile();
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const login = (userData, authToken) => {
//     console.log("Login called with userData:", userData, "authToken:", authToken);
//     setUser(userData);
//     setToken(authToken);
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", authToken);
//     setError(null);
//     fetchProfile();
//   };

//   const verifyOtp = async (email, otp) => {
//     try {
//       console.log("Verifying OTP for:", { UserEmail: email, otp });
//       const res = await api.post("/auth/verify-otp", { UserEmail: email, otp });
//       console.log("OTP verification response:", res.data);
//       setToken(res.data.token);
//       setUser(res.data.user);
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       toast.success(res.data.message);
//       await fetchProfile();
//       return { success: true, message: res.data.message };
//     } catch (err) {
//       console.error("OTP verification failed:", err.response?.data || err.message);
//       setError(err.response?.data?.message || "OTP verification failed");
//       toast.error(err.response?.data?.message || "OTP verification failed");
//       throw err;
//     }
//   };

//   const logout = async () => {
//     try {
//       await api.post("/auth/logout");
//       setUser(null);
//       setToken(null);
//       setError(null);
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//       toast.success("Logged out successfully");
//     } catch (err) {
//       console.error("Logout failed:", err.response?.data || err.message);
//       setError("Logout failed");
//       toast.error("Logout failed");
//     }
//   };

//    const isAuthenticated = () => {
//     return !!user && !!token;
//   };

//    return (
//     <AuthContext.Provider value={{ 
//       user, 
//       token, 
//       login, 
//       logout, 
//       loading, 
//       isAuthenticated: isAuthenticated() 
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };