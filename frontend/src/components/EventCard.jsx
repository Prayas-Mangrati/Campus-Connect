import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div
        className={`event-card-new ${
          event.status === "Cancelled" ? "cancelled-event" : ""
        }`}
      >
        {/* Placeholder Banner */}
        <div className="event-banner">
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

        <div className="event-content">
          <span
            className={`event-category ${
              event.status === "Cancelled" ? "cancelled-badge" : ""
            }`}
          >
            {event.status === "Cancelled" ? "🚫 Cancelled" : event.category}
          </span>

          <h5 className="event-title">{event.title}</h5>

          <div className="event-info">
            <p>📍 {event.location}</p>

            <p>👤 Campus Community</p>
          </div>

          <Link to={`/events/${event._id}`} className="btn event-btn w-100">
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
