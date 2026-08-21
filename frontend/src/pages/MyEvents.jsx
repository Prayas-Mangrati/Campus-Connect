import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import EventCard from "../components/EventCard";

function MyEvents() {
  const [createdEvents, setCreatedEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/events/mine/created"),
      api.get("/users/me/registered-events"),
    ])
      .then(([createdRes, registeredRes]) => {
        setCreatedEvents(createdRes.data);
        setRegisteredEvents(registeredRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="events-page page">
      {/* HERO */}

      <section className="hero-section">
        <h1 className="hero-title">My Dashboard</h1>

        <p className="hero-subtitle">
          Manage the events you've created and keep track of the events you've
          registered for.
        </p>
      </section>

      {/* CREATED EVENTS */}

      <section className="events-section">
        <div className="section-header">
          <h2 className="events-heading">📅 Events I Created</h2>

          <span className="event-count">
            {createdEvents.length} Event
            {createdEvents.length !== 1 && "s"}
          </span>
        </div>

        {createdEvents.length === 0 ? (
          <div className="empty-state">
            <h4>No Events Created</h4>
            <p>Create your first campus event.</p>
          </div>
        ) : (
          <div className="row mt-4">
            {createdEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* REGISTERED EVENTS */}

      <section className="events-section mt-5">
        <div className="section-header">
          <h2 className="events-heading">🎟 Registered Events</h2>

          <span className="event-count">
            {registeredEvents.length} Event
            {registeredEvents.length !== 1 && "s"}
          </span>
        </div>

        {registeredEvents.length === 0 ? (
          <div className="empty-state">
            <h4>No Registrations Yet</h4>
            <p>Register for events to see them here.</p>
          </div>
        ) : (
          <div className="row mt-4">
            {registeredEvents.map((event) => (
              <EventCard key={event._id} event={event}/>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default MyEvents;
