import { useState, useEffect } from "react";

// Create a custom hook for authentication
const useAuth = () => {
  const [user, setUser] = useState(null);     // store logged-in user
  const [loading, setLoading] = useState(true); // track loading state

  // Load user info from localStorage (or cookies) when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return { user, loading, login, logout };
};

export default useAuth;
