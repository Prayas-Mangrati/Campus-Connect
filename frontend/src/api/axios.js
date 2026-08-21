import axios from "axios";

const api = axios.create({
   baseURL: "https://campus-connect-7yuv.onrender.com",
  //baseURL:"http://localhost:3000",
  withCredentials: true,
});

export default api;
