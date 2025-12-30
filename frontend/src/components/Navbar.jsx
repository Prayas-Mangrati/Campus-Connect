import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg px-4 shadow-sm"
     style={{backgroundColor:"black"}}>
      <Link className="navbar-brand text-white" to="/">
        <i>CampusConnect</i>
      </Link>

      <div className="ms-auto">
        {user ? (
          <>
            <Link className="btn btn-primary me-2" to="/my-events">
              My Events
            </Link>
            <Link to="/events/new" className="btn btn-primary ms-2 rm-2">
              + Create Event
            </Link>

            <button className="btn btn-danger ms-2" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-primary me-2" to="/login">
              Login
            </Link>
            <Link className="btn btn-primary" to="/signup">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
