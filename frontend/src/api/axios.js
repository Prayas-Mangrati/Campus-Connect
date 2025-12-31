import axios from "axios";

const api = axios.create({
  baseURL: "/https://campus-connect-backend-8qdj.onrender.com",
  withCredentials: true, // 🔥 REQUIRED for sessions
});

export default api;
