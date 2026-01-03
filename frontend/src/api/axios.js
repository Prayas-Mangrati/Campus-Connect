import axios from "axios";

const api = axios.create({
  baseURL: "new backend url here",
  withCredentials: true,
});

export default api;
