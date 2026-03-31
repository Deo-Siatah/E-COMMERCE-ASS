import api from "./axios";

export const signup = async (userData) => {
    try {
        const response = await api.post("/api/v1/signup", userData);
        return response.data;
    } catch (error) {
        console.error("Signup error:", error.response?.data?.message || error.message);
        throw error;
    } 
}

export const login = async (userData) => {
    try {
    const response = await api.post("/api/v1/login", userData);
    return response.data;
    } catch (error) {
        console.error("Login error:", error.response?.data?.message || error.message);
    }
};