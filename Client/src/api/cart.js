import api from "./axios";

export const getCart = async (token) => {
    try {
        const response = await api.get("/api/v1/carts", {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const addToCart = async (carId, token) => {
    try {
        const response = await api.post("/api/v1/carts", { carId }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        
        throw error.response?.data?.message || "Failed to add to cart";
    }
};

export const removeFromCart = async (carId, token) => {
    try {
        const response = await api.delete(`/api/v1/carts/${carId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to remove item";
    }
};

export const clearCart = async (token) => {
    try {
        const response = await api.delete("/api/v1/carts", {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to clear cart";
    }
};