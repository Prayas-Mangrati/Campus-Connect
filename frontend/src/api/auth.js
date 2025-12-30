import api from "./axios";

export const signup = (data) => api.post("/users/signup", data);
export const login = (data) => api.post("/users/login", data);
export const logout = () => api.post("/users/logout");
export const getCurrentUser = () => api.get("/users/me");
