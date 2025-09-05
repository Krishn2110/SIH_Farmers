import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Home";
import OAuthSuccess from "./pages/Auth/OAuthSuccess";
import Prediction from "./pages/Prediction";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";

// ✅ Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // or however you store auth state

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

import Profile from "./pages/Profile";
import Dashboard from "./pages/farmer/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />

        {/* Protected Routes */}
        <Route
          path="/prediction"
          element={
            // <ProtectedRoute>
              <Prediction />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/farmer-dashboard"
          element={
            <ProtectedRoute>
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/prediction" element={<Prediction />} />
      </Routes>
    </Router>
  );
}

export default App;
