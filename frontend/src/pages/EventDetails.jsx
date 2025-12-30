import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

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
          (reg) => reg.event && reg.event._id === id
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
      setParticipantsCount((prev) => prev + 1);
    } catch (err) {
      alert("Registration failed");
    }
  };

  const handleUnregister = async () => {
    try {
      await api.delete(`/events/${id}/register`);
      setRegistered(false);
      setParticipantsCount((prev) => prev - 1);
    } catch (err) {
      alert("Unregister failed");
    }
  };

  const handleDeleteEvent = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/events/${id}`);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Unable to delete event");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!event) return null;

  return (
    <div className="container mt-5 page" style={{ maxWidth: "700px" }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title">{event.title}</h3>
          <p className="text-muted">📍 {event.location}</p>
          <p className="text-muted">
            👥 {participantsCount} participant{participantsCount !== 1 && "s"}
          </p>

          <hr />

          <p>{event.description}</p>

          <div className="mt-4">
            {!user && (
              <p className="text-muted">
                <span
                  style={{ cursor: "pointer", color: "#0d6efd" }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </span>{" "}
                to register for this event
              </p>
            )}

            {user && isOwner && (
              <div className="d-flex align-items-center gap-3">
                <p className="text-muted mb-0">
                  👑 You are the organizer of this event
                </p>
               <br/>
              

                <button
                  className="btn btn-success ms-auto"
                  onClick={() => navigate(`/events/${id}/edit`)}
                >
                  Edit Event
                </button>
                <button
                  className="btn btn-danger ms-auto"
                  onClick={handleDeleteEvent}
                >
                  Delete Event
                </button>
              </div>
            )}

            {user && !isOwner && registered && (
              <button className="btn btn-danger" onClick={handleUnregister}>
                Unregister
              </button>
            )}

            {user && !isOwner && !registered && (
              <button className="btn btn-success" onClick={handleRegister}>
                Register
              </button>
            )}

            {isOwner && (
              <div className="mt-5">
                <h5>Registered Participants</h5>

                {participants.length === 0 ? (
                  <p className="text-muted">No participants yet</p>
                ) : (
                  <ul className="list-group">
                    {participants.map((reg) => (
                      <li key={reg._id} className="list-group-item">
                        <strong>{reg.user.username}</strong>
                        <br />
                        <small className="text-muted">{reg.user.email}</small>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
