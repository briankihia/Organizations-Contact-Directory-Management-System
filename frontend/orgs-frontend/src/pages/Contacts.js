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
    organization: '',
    first_name: '',
    last_name: '',
    job_title: '',
    department: '',
    is_primary_contact: false,
    notes: '',
    email: '',
    office_phone_number: '',
    mobile_phone_number: '',
    is_active: true,
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
      const orgList = await getOrganizations();
      const activeOrgs = orgList.filter((org) => org.is_active);
      setOrgs(activeOrgs);
    } catch (err) {
      console.error('Error loading organizations:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
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
        organization: '',
        first_name: '',
        last_name: '',
        job_title: '',
        department: '',
        is_primary_contact: false,
        notes: '',
        email: '',
        office_phone_number: '',
        mobile_phone_number: '',
        is_active: true,
      });
      setEditing(false);
    } catch (err) {
      console.error('Error saving contact:', err);
    }
  };

  const handleEdit = (contact) => {
    // Adjust backend response keys if needed here
    setFormData({
      id: contact.id,
      organization: contact.organization,
      first_name: contact.first_name,
      last_name: contact.last_name,
      job_title: contact.job_title || '',
      department: contact.department || '',
      is_primary_contact: contact.is_primary_contact || false,
      notes: contact.notes || '',
      email: contact.email,
      office_phone_number: contact.office_phone_number || '',
      mobile_phone_number: contact.mobile_phone_number || '',
      is_active: contact.is_active !== undefined ? contact.is_active : true,
    });
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

        <input
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          name="job_title"
          value={formData.job_title}
          onChange={handleChange}
          placeholder="Job Title"
        />
        <input
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
        />

        <label>
          Primary Contact:
          <input
            type="checkbox"
            name="is_primary_contact"
            checked={formData.is_primary_contact}
            onChange={handleChange}
          />
        </label>

        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Notes"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="office_phone_number"
          value={formData.office_phone_number}
          onChange={handleChange}
          placeholder="Office Phone Number"
        />
        <input
          name="mobile_phone_number"
          value={formData.mobile_phone_number}
          onChange={handleChange}
          placeholder="Mobile Phone Number"
        />

        <label>
          Active:
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
          />
        </label>

        <button type="submit">{editing ? 'Update' : 'Create'} Contact</button>
      </form>

      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <strong>{contact.first_name} {contact.last_name}</strong> - {contact.email} - {contact.mobile_phone_number} - Org: {contact.organization_name || contact.organization}
            <button onClick={() => handleEdit(contact)}>Edit</button>
            <button onClick={() => handleDelete(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
