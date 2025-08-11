// src/api/industries.js
import axios from '../pages/axios';

const BASE_URL = '/api/industries/';

export const fetchIndustries = () => axios.get(BASE_URL);
export const createIndustry = (data) => axios.post(BASE_URL, data);
export const updateIndustry = (id, data) => axios.put(`${BASE_URL}${id}/`, data);
export const deleteIndustry = (id) => axios.delete(`${BASE_URL}${id}/`);
