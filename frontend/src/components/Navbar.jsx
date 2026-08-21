import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import toast from "react-hot-toast";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setMenuOpen(false);
    navigate("/login");
    toast.success("Logged out successfully");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav
      className="navbar px-3 px-md-4 py-3 shadow-sm"
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

          <Link
            className="navbar-brand text-white brand-link ms-2"
            to="/"
            onClick={closeMenu}
          >
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

        {/* HAMBURGER */}
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* MENU */}
        <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
          <div className="navbar-actions">
            {user ? (
              <>
                <Link
                  className="btn btn-primary"
                  to="/my-events"
                  onClick={closeMenu}
                >
                  My Events
                </Link>

                <Link
                  className="btn btn-primary"
                  to="/events/new"
                  onClick={closeMenu}
                >
                  + Create Event
                </Link>

                <button
                  className="btn btn-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  className="btn btn-primary"
                  to="/login"
                  onClick={closeMenu}
                >
                  Login
                </Link>

                <Link
                  className="btn btn-primary"
                  to="/signup"
                  onClick={closeMenu}
                >
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