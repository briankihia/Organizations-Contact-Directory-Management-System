// // src/api/contacts.js
// import axios from './axios'; // Corrected import path

// export const fetchContacts = () => axios.get('/api/contacts/');
// export const createContact = (data) => axios.post('/api/contacts/', data);
// export const updateContact = (id, data) => axios.put(`/api/contacts/${id}/`, data);
// export const deleteContact = (id) => axios.delete(`/api/contacts/${id}/`);
// export const updateContact = (id, data) => axios.put(`${BASE_URL}${id}/`, data);
// export const deleteContact = (id) => axios.delete(`${BASE_URL}${id}/`);


import axios from './axios'; // Make sure this is configured with baseURL

export const fetchContacts = () => axios.get('/contacts/');
export const createContact = (data) => axios.post('/contacts/', data);
export const updateContact = (id, data) => axios.put(`/contacts/${id}/`, data);
export const deleteContact = (id) => axios.delete(`/contacts/${id}/`);
