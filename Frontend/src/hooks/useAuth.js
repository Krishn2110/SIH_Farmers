import { useState, useEffect } from "react";

// Create a custom hook for authentication
const useAuth = () => {
  const [user, setUser] = useState(null);     // store logged-in user
  const [token, setToken] = useState(null);   // store JWT token
  const [loading, setLoading] = useState(true); // track loading state

  // Load user info and token from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  // Login function with token support
  const login = (userData, authToken) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
    setUser(userData);
    setToken(authToken);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user && !!token;
  };

  // Get authentication headers for API calls
  const getAuthHeaders = () => {
    if (token) {
      return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
    }
    return {};
  };

  return { 
    user, 
    token, 
    loading, 
    login, 
    logout, 
    isAuthenticated: isAuthenticated(),
    getAuthHeaders 
  };
};

export default useAuth;