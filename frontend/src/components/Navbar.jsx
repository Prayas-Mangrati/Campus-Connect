import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import toast from "react-hot-toast";
function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <nav
      className="navbar px-4 py-3 shadow-sm d-flex align-items-center"
      style={{ backgroundColor: "#0f172a", border: "2px solid orange" }}
    >
      <img
        src="/Campus_Connect_logo.png"
        alt="Logo"
        className="brand-glow-logo"
        style={{ width: "60px" }}
      />
      <Link className="navbar-brand text-white brand-link" to="/">
        <i>
          <span
            className="fw-bold brand-glow-text"
            style={{ color: "#4b8cf6" }}
          >
            Campus
          </span>
          <span
            className="fw-bold brand-glow-text"
            style={{ color: "#f97316" }}
          >
            Connect
          </span>
        </i>
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
