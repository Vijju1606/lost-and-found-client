import api from "./api";
export const reportLostItem = async(formData) => {
    const response = await api.post("/LostItems",formData,{
        headers:{
            "Content-Type":"multipart/form-data",
        },
    });
    return response.data;
};

export const getMyLostItems = async() => {
    const response = await api.get("/LostItems/MyItems");
    return response.data;
};
export const deleteLostItem = async (id) => {
    const response = await api.delete(`/LostItems/${id}`);
    return response.data;
};
export const getLostItemById =async(id)=>{
    const response = await api.get(`/LostItems/${id}`);
    return response.data;
};

export const updateLostItem= async (id,formdata)=>{
    const response = await api.put(`/LostItems/${id}`,formdata,{
        headers:{"Content-Type": "multipart/formdata"}
    });
    return response.data;
};