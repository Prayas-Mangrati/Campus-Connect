import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function CreateEvent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/events", form);
      navigate(`/events/${res.data._id}`);
    } catch (err) {
      setError("Failed to create event");
    }
  };

  return (
    <div className="container mt-5 page">
      <div
        className="auth-card shadow mx-auto"
        style={{ maxWidth: "600px" }}
      >
        <h3 className="text-center mb-4 auth-title">
          Create Event
        </h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              name="title"
              className="form-control"
              required
              value={form.title}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="4"
              required
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Location</label>
            <input
              name="location"
              className="form-control"
              required
              value={form.location}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary w-100">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
