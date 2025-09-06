import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Home";
import About from "./pages/About";
import Feedback from "./pages/Feedback";
import OAuthSuccess from "./pages/Auth/OAuthSuccess";
import Prediction from "./pages/Prediction";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Chatbot from "./pages/Chatbot";

function App() {
  return (
    <AuthProvider>
      <Router>
       
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/chatbot" element={<Chatbot/>}/>

          {/* Protected Routes */}
          <Route
            path="/prediction"
            element={
              <ProtectedRoute>
                <Prediction />
              </ProtectedRoute>
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
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
