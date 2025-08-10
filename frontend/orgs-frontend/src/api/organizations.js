import axios from 'axios';

// Create instance
const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Add interceptor to inject token
API.interceptors.request.use((config) => {
  const session = JSON.parse(localStorage.getItem('session'));
  const token = session?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getOrganizations = async () => {
  const res = await API.get('/organizations/');
  return res.data;
};

export const getIndustries = async () => {
  const res = await API.get('/industries/');
  return res.data;
};

export const addOrganization = (data) => API.post('/organizations/', data);

export const updateOrganization = (id, data) => API.put(`/organizations/${id}/`, data);

export const toggleOrganizationStatus = (id, currentStatus) =>
  API.patch(`/organizations/${id}/`, { is_active: !currentStatus });
