// src/pages/Industries.js
import React, { useEffect, useState } from 'react';
import {
  fetchIndustries, createIndustry, updateIndustry, deleteIndustry,
} from '../api/industries';

const Industries = () => {
  const [industries, setIndustries] = useState([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchIndustries().then(res => setIndustries(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateIndustry(editingId, { name });
    } else {
      await createIndustry({ name });
    }
    setName('');
    setEditingId(null);
    const res = await fetchIndustries();
    setIndustries(res.data);
  };

  const handleEdit = (industry) => {
    setName(industry.name);
    setEditingId(industry.id);
  };

  const handleDelete = async (id) => {
    await deleteIndustry(id);
    setIndustries((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div>
      <h2>Industry Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Industry name"
          required
        />
        <button type="submit">{editingId ? 'Update' : 'Create'}</button>
      </form>
      <ul>
        {industries.map((i) => (
          <li key={i.id}>
            {i.name}
            <button onClick={() => handleEdit(i)}>Edit</button>
            <button onClick={() => handleDelete(i.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Industries;
