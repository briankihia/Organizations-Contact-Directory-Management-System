import React, { useEffect, useState } from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Button, TextField, Dialog, DialogTitle, DialogContent,
  DialogActions, FormControl, InputLabel, Select, MenuItem,
  Typography, Box
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
  const [industryFilter, setIndustryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [open, setOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState(null);
  const [form, setForm] = useState({
    name: '', description: '', website: '',
    logo_url: '', founded_date: '', tax_id: '',
    industry: ''
  });
  const [errors, setErrors] = useState({}); // For inline validation errors

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load session from localStorage
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session?.token) {
      setToken(session.token);
      setUser(session.user);
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
    } else {
      setForm({
        name: '', description: '', website: '',
        logo_url: '', founded_date: '', tax_id: '',
        industry: ''
      });
    }
    setErrors({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingOrg(null);
    setForm({
      name: '', description: '', website: '',
      logo_url: '', founded_date: '', tax_id: '',
      industry: ''
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.founded_date) newErrors.founded_date = 'Founded Date is required';
    if (!form.tax_id.trim()) newErrors.tax_id = 'Tax ID is required';
    if (!form.industry) newErrors.industry = 'Industry is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // valid if no errors
  };

  const handleSubmit = async () => {
    if (!validate()) return;

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

  const isAdmin = user?.role === 'admin';

  // Filter organizations by name, industry, and status,
  // but hide inactive organizations from normal users
  const filtered = organizations.filter(org => {
    const matchesName = org.name.toLowerCase().includes(search.toLowerCase());
    const matchesIndustry = industryFilter ? org.industry === industryFilter : true;

    if (!isAdmin) {
      // Normal users see only active orgs
      return matchesName && matchesIndustry && org.is_active;
    }

    // Admin can filter by status
    const matchesStatus = statusFilter
      ? (statusFilter === 'active' ? org.is_active : !org.is_active)
      : true;

    return matchesName && matchesIndustry && matchesStatus;
  });

  return (
    <>
      <Typography variant="h4" gutterBottom>Organizations</Typography>

      {isAdmin && (
        <Button variant="contained" onClick={() => handleOpen()}>Add Organization</Button>
      )}

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2, mb: 2 }}>
        <TextField
          label="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: '300px' }}
        />
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Filter by Industry</InputLabel>
          <Select
            value={industryFilter}
            label="Filter by Industry"
            onChange={(e) => setIndustryFilter(e.target.value)}
          >
            <MenuItem value="">All Industries</MenuItem>
            {industries.map(ind => (
              <MenuItem key={ind.id} value={ind.id}>{ind.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
            disabled={!isAdmin} // disable for non-admins
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Industry</TableCell>
            <TableCell>Status</TableCell>
            {isAdmin && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((org) => (
            <TableRow key={org.id}>
              <TableCell>{org.name}</TableCell>
              <TableCell>{industries.find(ind => ind.id === org.industry)?.name || 'N/A'}</TableCell>
              <TableCell>{org.is_active ? 'Active' : 'Inactive'}</TableCell>
              {isAdmin && (
                <TableCell>
                  <Button onClick={() => handleOpen(org)}>Edit</Button>
                  <Button onClick={() => handleToggleStatus(org)}>
                    {org.is_active ? 'Deactivate' : 'Activate'}
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingOrg ? 'Edit Organization' : 'Add Organization'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name *"
            margin="dense"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            label="Description *"
            margin="dense"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            error={!!errors.description}
            helperText={errors.description}
          />
          <TextField
            fullWidth
            label="Website"
            margin="dense"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
          />
          <TextField
            fullWidth
            label="Logo URL"
            margin="dense"
            value={form.logo_url}
            onChange={(e) => setForm({ ...form, logo_url: e.target.value })}
          />
          <TextField
            fullWidth
            label="Founded Date *"
            type="date"
            margin="dense"
            value={form.founded_date}
            onChange={(e) => setForm({ ...form, founded_date: e.target.value })}
            InputLabelProps={{ shrink: true }}
            error={!!errors.founded_date}
            helperText={errors.founded_date}
          />
          <TextField
            fullWidth
            label="Tax ID *"
            margin="dense"
            value={form.tax_id}
            onChange={(e) => setForm({ ...form, tax_id: e.target.value })}
            error={!!errors.tax_id}
            helperText={errors.tax_id}
          />
          <FormControl fullWidth margin="dense" error={!!errors.industry}>
            <InputLabel>Industry *</InputLabel>
            <Select
              value={form.industry}
              label="Industry *"
              onChange={(e) => setForm({ ...form, industry: e.target.value })}
            >
              {industries.map(ind => (
                <MenuItem key={ind.id} value={ind.id}>{ind.name}</MenuItem>
              ))}
            </Select>
            {errors.industry && <Typography color="error" variant="caption">{errors.industry}</Typography>}
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
