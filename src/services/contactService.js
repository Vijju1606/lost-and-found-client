import api from "./api";
export const  sendContactRequest = async (data)=>{
    const response = await api.post("/ContactRequest/send",data);
    return response.data;
}

export const getPendingRequests = async () => {
    const response = await api.get("/ContactRequest/pending");
    return response.data;
};

export const getSentRequests = async () => {
    const response = await api.get("/ContactRequest/request");
    return response.data;
};

export const approveRequest = async (contactRequestId, sharedPhoneNumber) => {
    
        const response = await api.put("/ContactRequest/approve", {
            contactRequestId,
            sharedPhoneNumber
        });

        return response.data;
};


export const rejectRequest = async (ContactRequestId) => {
    const response = await api.put("/ContactRequest/reject",{
        contactRequestId: ContactRequestId
    });
    return response.data;
};
