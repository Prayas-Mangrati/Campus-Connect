import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

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
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card shadow">
        <h3 className="text-center mb-4 auth-title">Welcome Back</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-4"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
