import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    date: "",
    time: "",
  });
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);
  const errorRef = useRef(null);

  useEffect(() => {
    api
      .get(`/events/${id}`)
      .then((res) => {
        setForm({
          title: res.data.title,
          description: res.data.description,
          location: res.data.location,
          category: res.data.category,
          date: res.data.date?.slice(0, 10),
          time: res.data.time || "",
        });
        setPreview(res.data.banner || null);
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
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("location", form.location);
      formData.append("date", form.date);
      formData.append("time", form.time);

      // Only send banner if a NEW image was selected
      if (banner) {
        formData.append("banner", banner);
      }

      await api.patch(`/events/${id}`, formData);

      toast.success("Event updated successfully!");
      navigate(`/events/${id}`);
    } catch (err) {
      const message = err.response?.data?.error || "Failed to update event";

      setError(message);
      toast.error(message);

      setTimeout(() => {
        errorRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        errorRef.current?.focus();
      }, 100);
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="events-page page">
      {/* HERO */}

      <section className="hero-section">
        <h1 className="hero-title">Edit Event</h1>

        <p className="hero-subtitle">
          Update your event details and keep participants informed.
        </p>
      </section>

      {/* MAIN LAYOUT */}

      <div className="create-event-layout">
        {/* ================= LEFT ================= */}

        <div className="create-event-card">
          {error && (
            <div ref={errorRef} tabIndex="-1" className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label">Event Title</label>

              <input
                type="text"
                name="title"
                className="form-control auth-input"
                placeholder="Hackathon 2026"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Description</label>

              <textarea
                rows="5"
                name="description"
                className="form-control auth-input"
                placeholder="Describe your event..."
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-4">
                <label className="form-label">Category</label>

                <select
                  name="category"
                  className="form-select auth-input"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>

                  <option>Tech</option>

                  <option>Workshop</option>

                  <option>Hackathon</option>

                  <option>Cultural</option>

                  <option>Sports</option>

                  <option>Seminar</option>

                  <option>Other</option>
                </select>
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label">Location</label>

                <input
                  name="location"
                  className="form-control auth-input"
                  placeholder="Main Auditorium"
                  value={form.location}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-4">
                <label className="form-label">Event Date</label>

                <input
                  type="date"
                  name="date"
                  className="form-control auth-input"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label">Event Time</label>

                <input
                  type="time"
                  name="time"
                  className="form-control auth-input"
                  value={form.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Event Banner</label>

              <label className="banner-upload-box">
                <input
                  type="file"
                  name="banner"
                  accept="image/*"
                  className="banner-input"
                  onChange={(e) => {
                    const file = e.target.files[0];

                    if (file) {
                      setBanner(file);
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />

                <div className="banner-upload-content">
                  <div className="upload-icon">🖼</div>

                  <h5>Upload Event Banner</h5>

                  <p>Click to browse or drag & drop an image</p>
                </div>
              </label>
            </div>

            <button className="btn login-btn w-100">Update Event</button>
          </form>
        </div>

        {/* ================= RIGHT ================= */}

        <div className="event-preview-card">
          <div className="preview-banner">
            {preview ? (
              <img src={preview} alt="Preview" className="preview-image" />
            ) : (
              <span>Banner Preview</span>
            )}
          </div>

          <div className="preview-content">
            <span className="event-category">
              {form.category || "Campus Event"}
            </span>

            <h3>{form.title || "Your Event Title"}</h3>

            <p>📍 {form.location || "Event Location"}</p>

            <p>📅 {form.date || "Event Date"}</p>

            <p>🕒 {form.time || "Event Time"}</p>

            <hr />

            <p className="text-muted">
              {form.description ||
                "Your event description will appear here as you type."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditEvent;
