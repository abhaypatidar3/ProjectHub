import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios. create({
  baseURL: "https://projecthub-1.onrender.com/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors. request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers. Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const getCurrentUser = () => api.get('/auth/me');
export const createAdmin = (data) => api.post('/auth/create-admin', data);

// Projects
export const getProjects = () => api.get('/projects');
export const getProject = (id) => api.get(`/projects/${id}`);
export const createProject = (formData) => api.post('/projects', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateProject = (id, formData) => api.put(`/projects/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// Clients
export const getClients = () => api.get('/clients');
export const getClient = (id) => api.get(`/clients/${id}`);
export const createClient = (formData) => api.post('/clients', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateClient = (id, formData) => api.put(`/clients/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteClient = (id) => api.delete(`/clients/${id}`);

// Contacts
export const getContacts = () => api.get('/contacts');
export const createContact = (data) => api.post('/contacts', data);
export const deleteContact = (id) => api.delete(`/contacts/${id}`);

// Newsletter
export const getNewsletterSubscriptions = () => api.get('/newsletter');
export const subscribeNewsletter = (email) => api.post('/newsletter/subscribe', { email });
export const deleteNewsletterSubscription = (id) => api.delete(`/newsletter/${id}`);

// Admin Stats
export const getAdminStats = () => api.get('/admin/stats');

export default api;