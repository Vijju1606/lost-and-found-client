import api from "./api";

export const getAdminDashboard = () => api.get("/Admin/dashboard");
export const getAdminUsers = () => api.get("/Admin/users");
export const deleteAdminUser = (userId) => api.delete(`/Admin/users/${userId}`);
export const updateUserRole = (userId, role) => api.put(`/Admin/users/${userId}/role`, { role });
export const getAdminLostItems = () => api.get("/Admin/lost-items");
export const getAdminFoundItems = () => api.get("/Admin/found-items");
export const deleteAdminLostItem = (id) => api.delete(`/Admin/lost-Item/${id}`);
export const deleteAdminFoundItem = (id) => api.delete(`/Admin/found-item/${id}`);
export const getAdminContactRequests = () => api.get("/Admin/contact-requests");
