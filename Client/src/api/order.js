import api from "./axios"

export const placeOrder = async (orderData, token) => {
    const response = await api.post("/api/v1/orders", orderData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const getMyOrders = async (token) => {
    const response = await api.get("/api/v1/orders", {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};