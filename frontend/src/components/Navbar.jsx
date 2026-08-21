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
      className="navbar navbar-expand-lg px-3 px-md-4 py-3 shadow-sm"
      style={{
        backgroundColor: "#0f172a",
        border: "2px solid orange",
      }}
    >
      <div className="container-fluid">
        {/* BRAND */}
        <div className="d-flex align-items-center">
          <img
            src="/Campus_Connect_logo.png"
            alt="Logo"
            className="brand-glow-logo"
            style={{ width: "60px" }}
          />

          <Link className="navbar-brand text-white brand-link ms-2" to="/">
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
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#campusNavbar"
          aria-controls="campusNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{
            borderColor: "white",
          }}
        >
          <span
            className="navbar-toggler-icon"
            style={{
              filter: "invert(1)",
            }}
          ></span>
        </button>

        {/* NAVIGATION */}
        <div className="collapse navbar-collapse" id="campusNavbar">
          <div className="ms-auto d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-2 mt-3 mt-lg-0">
            {user ? (
              <>
                <Link className="btn btn-primary" to="/my-events">
                  My Events
                </Link>

                <Link to="/events/new" className="btn btn-primary">
                  + Create Event
                </Link>

                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-primary" to="/login">
                  Login
                </Link>

                <Link className="btn btn-primary" to="/signup">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
