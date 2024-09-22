// src/lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true, // This is important for handling cookies
});

export default api;
