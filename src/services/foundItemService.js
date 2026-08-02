import api from "./api";

export const reportFoundItem = async (formData) => {
    const response = await api.post("/FoundItem", formData);
    return response.data;
};

export const getFoundItems= async() => {
    const response = await api.get("/FoundItem");
    return response.data;
}

export const getFoundItemById=async(id)=>{
    const response =await api.get(`/FoundItem/${id}`);
    return response.data;
}

export const getMyFoundItems = async () => {
    const response = await api.get("/FoundItem/MyItems");
    return response.data;
};

// The API expects the complete found-item form (including Image when changed).
export const updateFoundItem = async (id, formData) => {
    const response = await api.put(`/FoundItem/${id}`, formData);
    return response.data;
};

export const deleteFoundItem = async (id) => {
    const response = await api.delete(`/FoundItem/${id}`);
    return response.data;
};

export const markFoundItemReturned = async (id) => {
    const response = await api.put(`/FoundItem/${id}/return`);
    return response.data;
};
