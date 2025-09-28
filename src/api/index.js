import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://reqres.in/api',
    headers: {
        "x-api-key": "reqres-free-v1"
    }
});

// API Functions
export const apiLogin = (credentials) => apiClient.post('/login', credentials);
export const apiFetchUsers = (page) => apiClient.get(`/users?page=${page}`);
export const apiCreateUser = (data) => apiClient.post('/users', data);
export const apiUpdateUser = (id, data) => apiClient.put(`/users/${id}`, data);
export const apiDeleteUser = (id) => apiClient.delete(`/users/${id}`);