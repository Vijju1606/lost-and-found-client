import api from "./api";
export const getMatches = async(lostItemId)=>{
    const response = await api.get(`/Match/Lost/${lostItemId}`);
    return response.data;
}