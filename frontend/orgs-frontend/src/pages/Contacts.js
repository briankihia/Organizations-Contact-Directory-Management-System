import React, { useEffect, useState } from 'react';
import {
  fetchContacts,
  createContact,
  updateContact,
  deleteContact,
} from '../api/contacts';

import { getOrganizations } from '../api/organizations';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    email: '',
    phone: '',
    organization: '', // Set to empty for dropdown
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadContacts();
    loadOrganizations();
  }, []);

  const loadContacts = async () => {
    try {
      const res = await fetchContacts();
      setContacts(res.data);
    } catch (err) {
      console.error('Error loading contacts:', err);
    }
  };

  const loadOrganizations = async () => {
    try {
      const orgList = await getOrganizations(); // Already returns res.data
      const activeOrgs = orgList.filter((org) => org.is_active);
      setOrgs(activeOrgs);
    } catch (err) {
      console.error('Error loading organizations:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await updateContact(formData.id, formData);
      } else {
        await createContact(formData);
      }

      loadContacts();
      setFormData({
        id: null,
        name: '',
        email: '',
        phone: '',
        organization: '',
      });
      setEditing(false);
    } catch (err) {
      console.error('Error saving contact:', err);
    }
  };

  const handleEdit = (contact) => {
    setFormData(contact);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      loadContacts();
    } catch (err) {
      console.error('Error deleting contact:', err);
    }
  };

  return (
    <div>
      <h2>Contacts</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
        />
        <select
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          required
        >
          <option value="">-- Select an Organization --</option>
          {orgs.map((org) => (
            <option key={org.id} value={org.id}>
              {org.name}
            </option>
          ))}
        </select>
        <button type="submit">{editing ? 'Update' : 'Create'} Contact</button>
      </form>

      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <strong>{contact.name}</strong> - {contact.email} - {contact.phone} - Org: {contact.organization_name || contact.organization}
            <button onClick={() => handleEdit(contact)}>Edit</button>
            <button onClick={() => handleDelete(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
