import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Contact Directory
        </Typography>
        <Button color="inherit" onClick={() => navigate('/organizations')}>Organizations</Button>
        <Button color="inherit" onClick={() => navigate('/contacts')}>Contacts</Button>
        <Button color="inherit" onClick={() => navigate('/industries')}>Industries</Button>
        <Button color="inherit" onClick={logout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
