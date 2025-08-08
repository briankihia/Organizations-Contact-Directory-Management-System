import axios from 'axios';

const API_URL = 'http://localhost:8000/accounts'; // Update with your backend URL

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login/`, { email, password });
        const { access, refresh } = response.data;

        // Store tokens in localStorage
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);

        return response.data.user; // Return user details
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Login failed');
    }
};

export const getAccessToken = () => localStorage.getItem('accessToken');

export const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${API_URL}/token/refresh/`, { refresh: refreshToken });
        const { access } = response.data;

        // Update access token in localStorage
        localStorage.setItem('accessToken', access);
        return access;
    } catch (error) {
        throw new Error('Failed to refresh access token');
    }
};

export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};