import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function OAuthSuccess() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    // Parse URL query params
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");
    const role = params.get("role");

    if (token && email && name && role) {
      // Store token in your auth context
      login(token, role);

      // Redirect based on role
      if (role === "admin") navigate("/admin-dashboard");
      else if (role === "farmer") navigate("/farmer-dashboard");
      else navigate("/");

      // Optional: clear URL query
      window.history.replaceState({}, document.title, "/");
    } else {
      // If missing token or user info, redirect to login
      navigate("/login");
    }
  }, [login, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-2xl font-semibold text-green-700">
        Logging you in via Google...
      </h2>
    </div>
  );
}

export default OAuthSuccess;
