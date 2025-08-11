import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  fetchContacts,
  createContact,
  updateContact,
} from '../api/contacts';

import { getOrganizations } from '../api/organizations';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedOrgFilter, setSelectedOrgFilter] = useState('');

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
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session?.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${session.token}`;
      setUser(session.user);
    } else {
      alert('You must be logged in to view contacts');
      window.location.href = '/login';
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadContacts();
      loadOrganizations();
    }
  }, [user]);

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
      resetForm();
    } catch (err) {
      console.error('Error saving contact:', err);
    }
  };

  const resetForm = () => {
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
    setShowForm(false);
  };

  const handleEdit = (contact) => {
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
    setShowForm(true);
  };

  // Toggle active status
  const handleToggleActive = async (contact) => {
    try {
      const updatedContact = { ...contact, is_active: !contact.is_active };
      await updateContact(contact.id, updatedContact);
      loadContacts();
    } catch (err) {
      console.error('Error toggling contact status:', err);
    }
  };

  const isAdmin = user?.role?.toLowerCase() === 'admin';

  const filteredContacts = contacts.filter((contact) => {
    if (!isAdmin && !contact.is_active) {
      return false;
    }
    if (selectedOrgFilter && String(contact.organization) !== selectedOrgFilter) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <h2>Contacts</h2>

      {/* Organization filter - available for all users */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="orgFilter">Filter by Organization: </label>
        <select
          id="orgFilter"
          value={selectedOrgFilter}
          onChange={(e) => setSelectedOrgFilter(e.target.value)}
        >
          <option value="">-- All Organizations --</option>
          {orgs.map((org) => (
            <option key={org.id} value={String(org.id)}>
              {org.name}
            </option>
          ))}
        </select>
      </div>

      {/* Admin-only Add Contact button */}
      {isAdmin && !showForm && (
        <button onClick={() => setShowForm(true)}>Add Contact</button>
      )}

      {/* Admin-only Add/Edit Form */}
      {isAdmin && showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
          <select
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            required
          >
            <option value="">-- Select an Organization --</option>
            {orgs.map((org) => (
              <option key={org.id} value={String(org.id)}>
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

          <div>
            <button type="submit">{editing ? 'Update' : 'Create'} Contact</button>
            <button type="button" onClick={resetForm} style={{ marginLeft: 8 }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Contact List */}
      <ul>
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            <strong>
              {contact.first_name} {contact.last_name}
            </strong>{' '}
            - {contact.job_title || 'N/A'} - Status:{' '}
            {contact.is_active ? 'Active' : 'Inactive'} - Company:{' '}
            {orgs.find((org) => org.id === contact.organization)?.name || 'N/A'}

            {/* Admin-only Edit/Activate/Deactivate */}
            {isAdmin && (
              <>
                <button onClick={() => handleEdit(contact)} style={{ marginLeft: 8 }}>
                  Edit
                </button>
                <button
                  onClick={() => handleToggleActive(contact)}
                  style={{ marginLeft: 4 }}
                  title={contact.is_active ? "Deactivate contact" : "Activate contact"}
                >
                  {contact.is_active ? "Deactivate" : "Activate"}
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
