import axios from "axios";

// Base URL (can be switched with env variables later)
const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json"
    }
});

// Interceptor example (optional: useful for auth tokens later)
api.interceptors.request.use((config) => {
    // If you have JWT stored in localStorage/sessionStorage
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
