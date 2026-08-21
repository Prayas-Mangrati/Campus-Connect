import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer
      className="text-center py-2 footer"
      style={{
        backgroundColor: "#0f172a",
        color: "white",
        fontSize: "0.9rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.4rem",
        border: "2px solid orange",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <img
          src="/Campus_Connect_logo.png"
          alt="Logo"
          className="brand-glow-logo"
          style={{ width: "60px" }}
        />
        <Link
          className="navbar-brand text-white brand-link"
          to="/"
          style={{ fontSize: "1.25rem" }}
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
      © {new Date().getFullYear()} Campus Connect · Full-Stack MERN Project ·
      Built by Prayas &#10084;
    </footer>
  );
}

export default Footer;
