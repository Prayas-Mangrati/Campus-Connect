import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth";
import toast from "react-hot-toast";

function Signup({ setUser }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    registrationNumber: "",
    department: "",
    year: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form);
      setUser(res.data);
      navigate("/");
      toast.success("Account created successfully");
    } catch (err) {
      const message =
        err.response?.data?.error || "Signup failed. Please try again.";

      setError(message);
      toast.error(message);
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
          <div className="feature-chip">🗓️ Create Events</div>
          <div className="feature-chip">🎉 Join Activities</div>
          <div className="feature-chip">👥 Build Community</div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="login-right">
        <div className="login-card">
          <h2>Create Account 🚀</h2>

          <p className="login-subtitle">
            Join CampusConnect and start discovering amazing campus events.
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
              className="form-control mb-3 auth-input"
              type="email"
              name="email"
              placeholder="📧 Email"
              onChange={handleChange}
              required
            />
            <input
              className="form-control mb-3 auth-input"
              name="registrationNumber"
              placeholder="🆔 Registration Number"
              onChange={handleChange}
              required
            />
            <select
              className="form-control mb-3 auth-input"
              name="department"
              value={form.department}
              onChange={handleChange}
              required
            >
              <option value="">🏫 Select Department</option>
              <option value="CSE">Computer Science & Engineering</option>
              <option value="IT">Information Technology</option>
              <option value="ECE">Electronics & Communication</option>
              <option value="EE">Electrical Engineering</option>
              <option value="ME">Mechanical Engineering</option>
              <option value="CE">Civil Engineering</option>
              <option value="MBA">MBA</option>
              <option value="Other">Other</option>
            </select>
            <select
              className="form-control mb-3 auth-input"
              name="year"
              value={form.year}
              onChange={handleChange}
              required
            >
              <option value="">🎓 Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>

            <input
              className="form-control mb-4 auth-input"
              name="password"
              type="password"
              placeholder="🔒 Password"
              onChange={handleChange}
              required
            />

            <button className="btn login-btn w-100">Create Account</button>
          </form>

          <p className="signup-text">
            Already have an account?
            <span className="signup-link" onClick={() => navigate("/login")}>
              {" "}
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
