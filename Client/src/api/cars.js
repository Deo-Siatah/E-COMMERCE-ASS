import api from "./axios"

export const createCar = async(data,token) => {
    try {
        const response = await api.post("/api/v1/cars", data, {
            headers: {Authorization: `Bearer ${token}` }
        });
        return response.data    
    } catch(error) {
        console.error("Create car error:", error.response?.data?.message || error.message);
        throw error;
    }
}

export const getCarById = async(id) => {
    try {
        const response = await api.get(`/api/v1/cars/${id}`);
        return response.data;
    } catch (error) {
        console.error("Get car error:", error.response?.data?.message || error.message);
        throw error;
    }
}

export const getAllCars = async (params = {}) => {
    try {
        const response = await api.get("/api/v1/cars", { params });
        return response.data;
    } catch (error) {
        console.error("Get all cars error:", error.response?.data?.message || error.message);
        throw error.response?.data?.message || "Failed to fetch inventory";
    }
};

// Get only the 3 latest cars for the Homepage
export const getLatestCars = async () => {
    try {
        const response = await api.get("/api/v1/cars?latest=true");
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error fetching latest cars";
    }
};

// Update an existing car listing
export const updateCar = async (id, data,token) => {
    try {
        const response = await api.patch(`/api/v1/cars/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error updating car";
    }
};

// Delete a car listing
export const deleteCar = async (id, token) => {
    try {
        const response = await api.delete(`/api/v1/cars/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error deleting car";
    }
};