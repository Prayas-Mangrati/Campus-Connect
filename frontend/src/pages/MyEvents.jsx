import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

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
    <div className="container mt-5 page">
      <div style={{display:"flex",justifyContent:"center"}}>
        <h2 className="mb-4" style={{display:"inline-block",backgroundColor:"white",width:"11rem",height:"3rem",textAlign:"center",justifyContent:"center",border:"2px solid black",borderRadius:"6px"}}><b>My Events</b></h2>
      </div>

      {/* Created Events */}
      <section className="mb-5">
        <h4>~Events I Created</h4>

        {createdEvents.length === 0 ? (
          <p className="text-muted">You haven’t created any events yet.</p>
        ) : (
          <div className="row">
            {createdEvents.map(event => (
              <div key={event._id} className="col-md-4 mb-3">
                <div className="card event-card">
                  <div className="card-body">
                    <h5>{event.title}</h5>
                    <p className="text-muted">{event.location}</p>
                    <Link to={`/events/${event._id}`} className="btn btn-sm btn-primary">
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Registered Events */}
      <section>
        <h4>~Events I Registered For</h4>

        {registeredEvents.length === 0 ? (
          <p className="text-muted">You haven’t registered for any events yet.</p>
        ) : (
          <div className="row">
            {registeredEvents.map(event => (
              <div key={event._id} className="col-md-4 mb-3">
                <div className="card event-card">
                  <div className="card-body">
                    <h5>{event.title}</h5>
                    <p className="text-muted">{event.location}</p>
                    <Link to={`/events/${event._id}`} className="btn btn-sm btn-secondary">
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default MyEvents;
