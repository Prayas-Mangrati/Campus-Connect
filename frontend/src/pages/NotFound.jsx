import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="auth-page">
      <div className="auth-card shadow text-center">
        <h3 className="auth-title mb-3">404</h3>
        <p className="text-muted mb-4">
          The page you are looking for does not exist.
        </p>

        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
