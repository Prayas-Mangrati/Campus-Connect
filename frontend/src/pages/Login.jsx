import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import toast from "react-hot-toast";

function Login({ setUser }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      setUser(res.data);
      navigate("/");
      toast.success("Logged in successfully");
    } catch (err) {
      setError("Invalid username or password");
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-page">
      {/* LEFT PANEL */}
      <div className="login-left">
        
       

        <h1>
          Connect.
          <br />
          Discover.
          <br />
          Participate.
        </h1>

        <p className="login-description">
          CampusConnect helps students discover exciting campus events,
          participate in activities, and enables organizers to manage everything
          from one place.
        </p>

        <div className="feature-list">
          <div className="feature-chip">📅 Create Events</div>
          <div className="feature-chip">🎉 Join Activities</div>
          <div className="feature-chip">👥 Build Community</div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="login-right">
        <div className="login-card">
          <h2>Welcome Back 👋</h2>

          <p className="login-subtitle">
            Sign in to discover, create and manage campus events.
          </p>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-3 auth-input"
              name="username"
              placeholder="👤 Username"
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-4 auth-input"
              name="password"
              type="password"
              placeholder="🔒 Password"
              onChange={handleChange}
              required
            />

            <button className="btn login-btn w-100">Login</button>
          </form>

          <p className="signup-text">
            Don't have an account?
            <span onClick={() => navigate("/signup")} className="signup-link">
              {" "}
              Create Account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
