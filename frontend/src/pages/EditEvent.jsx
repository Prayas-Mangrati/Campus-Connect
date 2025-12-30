import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/events/${id}`)
      .then((res) => {
        setForm({
          title: res.data.title,
          description: res.data.description,
          location: res.data.location,
        });
      })
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.patch(`/events/${id}`, form);
      navigate(`/events/${id}`);
    } catch (err) {
      setError("Failed to update event");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5 page">
      <div className="auth-card shadow mx-auto" style={{ maxWidth: "600px" }}>
        <h3 className="auth-title text-center mb-4">Edit Event</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              name="title"
              className="form-control"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="4"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Location</label>
            <input
              name="location"
              className="form-control"
              value={form.location}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-primary w-100">
            Update Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditEvent;
