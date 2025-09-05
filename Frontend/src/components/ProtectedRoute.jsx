import React from "react";
import { Navigate } from "react-router-dom";

// Props: children = component to render if authenticated
const ProtectedRoute = ({ children }) => {
  // Example: check if user is logged in (from localStorage or context)
  const isAuthenticated = !!localStorage.getItem("token"); // or use context

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
