import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import EventCard from "../components/EventCard";

function Events() {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    api
      .get("/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  }, []);
  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  return (
    <div className="events-page page">
      {/* HERO SECTION */}

      <section className="hero-section">
        <h1 className="hero-title">Discover Campus Events</h1>

        <p className="hero-subtitle">
          Explore workshops, hackathons, seminars, competitions and student
          activities happening around your campus.
        </p>

        <div className="category-list">
          <span
            className={`category-chip ${selectedCategory === "All" ? "active" : ""}`}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </span>

          <span
            className={`category-chip ${selectedCategory === "Tech" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Tech")}
          >
            💻 Tech
          </span>

          <span
            className={`category-chip ${selectedCategory === "Workshop" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Workshop")}
          >
            🎓 Workshop
          </span>
          <span
            className={`category-chip ${selectedCategory === "Hackathon" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Hackathon")}
          >
            🏆 Hackathon
          </span>

          <span
            className={`category-chip ${selectedCategory === "Cultural" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Cultural")}
          >
            🎉 Cultural
          </span>

          <span
            className={`category-chip ${selectedCategory === "Sports" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Sports")}
          >
            ⚽ Sports
          </span>
          <span
            className={`category-chip ${selectedCategory === "Seminar" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Seminar")}
          >
            📚 Seminar
          </span>
          <span
            className={`category-chip ${selectedCategory === "Other" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Other")}
          >
            📌 Others
          </span>
        </div>
      </section>

      {/* EVENTS */}

      <section className="events-section">
        <h2 className="events-heading">Upcoming Events</h2>

        {filteredEvents.length === 0 && (
          <div className="empty-state">
            <h4>📅 No Events Available</h4>
            <p>Check back later for upcoming campus events.</p>
          </div>
        )}

        <div className="row mt-4">
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Events;
