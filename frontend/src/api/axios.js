import axios from "axios";

const api = axios.create({
  baseURL: "https://campus-connect-7yuv.onrender.com",
  withCredentials: true,
});

export default api;
