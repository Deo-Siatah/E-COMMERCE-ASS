import api from "./axios";

export const getUserProfile = async (userId,token) => {
    try {
        const response = await api.get(`/api/v1/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Get profile error:", error.response?.data?.message || error.message);
        throw error;
    }
}

export const updateUserProfile = async (userId, userData, token) => {
    try {
        const response = await api.patch(`/api/v1/users/${userId}`,userData, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data;
    } catch (error) {        
        console.error("Update profile error:", error.response?.data?.message || error.message);
        throw error;
    }
}