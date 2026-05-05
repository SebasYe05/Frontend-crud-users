import api from "../../lib/api";

export const getUsers    = ()         => api.get("/api/admin/users");
export const getUserById = (id)       => api.get(`/api/admin/users/${id}`);
export const createUser  = (data)     => api.post("/api/admin/users", data);
export const updateUser  = (id, data) => api.put(`/api/admin/users/${id}`, data);
export const deleteUser  = (id)       => api.delete(`/api/admin/users/${id}`);