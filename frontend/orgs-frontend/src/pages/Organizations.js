import React, { useEffect, useState } from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Button, TextField, Dialog, DialogTitle, DialogContent,
  DialogActions, FormControl, InputLabel, Select, MenuItem, Typography
} from '@mui/material';
import {
  getOrganizations, getIndustries,
  addOrganization, updateOrganization, toggleOrganizationStatus
} from '../api/organizations';
import axios from 'axios';

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState(null);
  const [form, setForm] = useState({
    name: '', description: '', website: '',
    logo_url: '', founded_date: '', tax_id: '',
    industry: ''
  });

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load session from localStorage
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session?.token) {
      setToken(session.token);
      setUser(session.user);
      // set token for axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${session.token}`;
    } else {
      alert('You must be logged in to view organizations');
      window.location.href = '/login';
    }
  }, []);

  const fetchData = async () => {
    try {
      const orgs = await getOrganizations();
      const inds = await getIndustries();
      setOrganizations(orgs);
      setIndustries(inds);
    } catch (err) {
      console.error(err);
      alert('Failed to load data');
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const handleOpen = (org = null) => {
    if (org) {
      setEditingOrg(org);
      setForm({
        name: org.name,
        description: org.description,
        website: org.website,
        logo_url: org.logo_url,
        founded_date: org.founded_date,
        tax_id: org.tax_id,
        industry: org.industry,
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingOrg(null);
    setForm({ name: '', description: '', website: '', logo_url: '', founded_date: '', tax_id: '', industry: '' });
  };

  const handleSubmit = async () => {
    try {
      if (editingOrg) {
        await updateOrganization(editingOrg.id, form);
      } else {
        await addOrganization(form);
      }
      fetchData();
      handleClose();
    } catch (err) {
      alert("Error saving organization");
    }
  };

  const handleToggleStatus = async (org) => {
    await toggleOrganizationStatus(org.id, org.is_active);
    fetchData();
  };

  const filtered = organizations.filter(org =>
    org.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Typography variant="h4" gutterBottom>Organizations</Typography>

      {/* Changed is_superuser check to role check */}
      {user?.role === 'admin' && (
        <Button variant="contained" onClick={() => handleOpen()}>Add Organization</Button>
      )}

      <TextField
        label="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ m: 2, width: '300px' }}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Industry</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((org) => (
            <TableRow key={org.id}>
              <TableCell>{org.name}</TableCell>
              <TableCell>{org.industry}</TableCell>
              <TableCell>{org.is_active ? 'Active' : 'Inactive'}</TableCell>
              <TableCell>
                {/* Changed is_superuser check to role check */}
                {user?.role === 'admin' && (
                  <>
                    <Button onClick={() => handleOpen(org)}>Edit</Button>
                    <Button onClick={() => handleToggleStatus(org)}>
                      {org.is_active ? 'Deactivate' : 'Activate'}
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal Form */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingOrg ? 'Edit Organization' : 'Add Organization'}</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Name" margin="dense" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <TextField fullWidth label="Description" margin="dense" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <TextField fullWidth label="Website" margin="dense" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
          <TextField fullWidth label="Logo URL" margin="dense" value={form.logo_url} onChange={(e) => setForm({ ...form, logo_url: e.target.value })} />
          <TextField fullWidth label="Founded Date" type="date" margin="dense" value={form.founded_date} onChange={(e) => setForm({ ...form, founded_date: e.target.value })} InputLabelProps={{ shrink: true }} />
          <TextField fullWidth label="Tax ID" margin="dense" value={form.tax_id} onChange={(e) => setForm({ ...form, tax_id: e.target.value })} />
          
          <FormControl fullWidth margin="dense">
            <InputLabel>Industry</InputLabel>
            <Select value={form.industry} label="Industry" onChange={(e) => setForm({ ...form, industry: e.target.value })}>
              {industries.map(ind => (
                <MenuItem key={ind.id} value={ind.id}>{ind.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Organizations;
