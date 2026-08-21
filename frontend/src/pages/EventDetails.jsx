import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

function EventDetails({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [participantsCount, setParticipantsCount] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    api
      .get(`/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));

    api
      .get(`/events/${id}/participants/count`)
      .then((res) => setParticipantsCount(res.data.count))
      .catch(() => {});

    api
      .get("/users/me/registrations")
      .then((res) => {
        const isRegistered = res.data.some(
          (reg) => reg.event && reg.event._id === id,
        );
        setRegistered(isRegistered);
      })
      .catch(() => {});
  }, [id, navigate]);

  useEffect(() => {
    if (!event) return;

    api
      .get("/users/me")
      .then((res) => {
        if (
          res.data &&
          (event.owner === res.data._id || event.owner?._id === res.data._id)
        ) {
          setIsOwner(true);
        }
      })
      .catch(() => {});
  }, [event]);

  useEffect(() => {
    if (!isOwner) return;

    api
      .get(`/events/${id}/participants`)
      .then((res) => setParticipants(res.data))
      .catch(() => {});
  }, [isOwner, id]);

  const handleRegister = async () => {
    try {
      await api.post(`/events/${id}/register`);
      setRegistered(true);
      toast.success("Registered successfully!");
      setParticipantsCount((prev) => prev + 1);
    } catch (err) {
      toast.error("Registration failed");
    }
  };

  const handleUnregister = async () => {
    try {
      await api.delete(`/events/${id}/register`);
      setRegistered(false);
      toast.success("Unregistered successfully!");
      setParticipantsCount((prev) => prev - 1);
    } catch (err) {
      toast.error("Unregister failed");
    }
  };

  const handleDeleteEvent = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event? This action cannot be undone.",
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/events/${id}`);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.error || "Unable to delete event");
    }
  };
  const handleToggleStatus = async () => {
    try {
      const res = await api.patch(`/events/${id}/status`);

      setEvent(res.data.event);

      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.error || "Unable to update event status");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!event) return null;

  return (
    <div className="event-details-page page">
      {/* HERO */}
      <section className="event-hero-image">
        <div className="event-hero-banner">
          {event.banner ? (
            <img
              src={event.banner}
              alt={event.title}
              className="event-banner-img"
            />
          ) : (
            <span className="event-banner-text">
              <i>Campus Event</i>
            </span>
          )}
        </div>

        <div className="event-hero-content">
          <span className="event-tag">📅 {event.category}</span>

          <h1>{event.title}</h1>

          <div className="event-meta">
            <span>📍 {event.location}</span>

            <span>
              📅{" "}
              {event.date
                ? new Date(event.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Date not specified"}
            </span>

            <span>🕒 {event.time || "Time not specified"}</span>

            <span>
              👥 {participantsCount} Participant
              {participantsCount !== 1 && "s"}
            </span>
          </div>
        </div>
      </section>

      {/* DESCRIPTION */}
      {event.status === "Cancelled" && (
        <div className="alert alert-warning text-center">
          🚫 This event has been cancelled by the organizer. Registrations are
          closed.
        </div>
      )}
      <section className="event-description-card">
        <h3>About this Event</h3>

        <p>{event.description}</p>
      </section>

      {/* ACTIONS */}

      <section className="event-action-card">
        {/* Not Logged In */}
        {!user ? (
          <>
            <p className="login-message">Login to register for this event.</p>

            <button
              className="btn login-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </>
        ) : user && isOwner ? (
          <>
            <div className="owner-box">
              <div>
                <h5>👑 You're the Organizer</h5>
                <p>You can edit this event or delete it permanently.</p>
              </div>

              <div className="owner-buttons">
                <button
                  className="btn btn-success"
                  onClick={() => navigate(`/events/${id}/edit`)}
                >
                  ✏️ Edit Event
                </button>

                <button
                  className={`btn ${
                    event.status === "Cancelled" ? "btn-success" : "btn-warning"
                  }`}
                  onClick={handleToggleStatus}
                >
                  {event.status === "Cancelled"
                    ? "Reopen Event"
                    : "🚫 Cancel Event"}
                </button>

                <button className="btn btn-danger" onClick={handleDeleteEvent}>
                  🗑 Delete Event
                </button>
              </div>
            </div>
          </>
        ) : registered ? (
          <button
            className="btn btn-danger register-btn"
            onClick={handleUnregister}
          >
            Unregister
          </button>
        ) : event.status === "Cancelled" ? (
          <button className="btn btn-secondary register-btn" disabled>
            Registration Closed
          </button>
        ) : (
          <button
            className="btn btn-success register-btn"
            onClick={handleRegister}
          >
            Register Now
          </button>
        )}
      </section>

      {/* PARTICIPANTS */}

      {isOwner && (
        <section className="participants-card">
          <h3>Registered Participants</h3>

          {participants.length === 0 ? (
            <div className="empty-state">
              <h5>No participants yet</h5>
              <p>Once students register, they'll appear here.</p>
            </div>
          ) : (
            <div className="participant-list">
              {participants.map((reg) => (
                <div className="participant-item" key={reg._id}>
                  <div>
                    <h5>{reg.user.username}</h5>

                    <p>📧 {reg.user.email}</p>

                    <p>🎓 Reg. No.: {reg.user.registrationNumber || "N/A"}</p>

                    <p>🏫 Department: {reg.user.department || "N/A"}</p>

                    <p>📚 Year: {reg.user.year || "N/A"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default EventDetails;
