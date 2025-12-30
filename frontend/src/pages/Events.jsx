import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/events")
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-5 page">
      <div style={{display:"flex",justifyContent:"center"}}><h2 className="mb-4" style={{textAlign:"center", display:"inline-block",width:"20rem",backgroundColor:"white",border:"2px solid black",borderRadius:"5px"}}>Upcoming Events...</h2></div>
    
      <br/>

      {events.length === 0 && <p>No events found</p>}

      <div className="row">
        {events.map(event => (
          <div key={event._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm event-card">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text text-muted">
                  📍 {event.location}
                </p>

                <div className="mt-auto">
                  <Link
                    to={`/events/${event._id}`}
                    className="btn btn-primary w-100"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
