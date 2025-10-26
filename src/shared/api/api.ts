import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const userJson = localStorage.getItem("user");
    if (userJson && config.headers) {
      try {
        const { token } = JSON.parse(userJson);
        config.headers.Authorization = `Bearer ${token}`;
      } catch {}
    }
    return config;
  },
  (error) => Promise.reject(error)
);
