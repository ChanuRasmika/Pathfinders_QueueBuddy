import api from "./api";

// Signup
export const signup = async (userData) => {
    const response = await api.post("/api/users", userData);
    return response.data;
};

// Login (if you implement it later)
export const login = async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
};


