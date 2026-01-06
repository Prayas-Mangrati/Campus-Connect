import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import MyEvents from "./pages/MyEvents";
import NotFound from "./pages/NotFound";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import Footer from "./components/Footer";

import api from "./api/axios";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/users/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar user={user} setUser={setUser} />

        <div className="app-content">
          <Routes>
            <Route path="/" element={<Events />} />

            <Route
              path="/login"
              element={
                <PublicRoute user={user}>
                  <Login setUser={setUser} />
                </PublicRoute>
              }
            />

            <Route
              path="/signup"
              element={
                <PublicRoute user={user}>
                  <Signup setUser={setUser} />
                </PublicRoute>
              }
            />

            <Route
              path="/my-events"
              element={
                <ProtectedRoute user={user}>
                  <MyEvents />
                </ProtectedRoute>
              }
            />

            <Route path="/events/:id" element={<EventDetails user={user} />} />

            <Route
              path="/events/:id/edit"
              element={
                <ProtectedRoute user={user}>
                  <EditEvent />
                </ProtectedRoute>
              }
            />

            <Route
              path="/events/new"
              element={
                <ProtectedRoute user={user}>
                  <CreateEvent />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
