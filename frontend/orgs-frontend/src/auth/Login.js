// import React, { useState } from "react";
// import axios from "../api/axios";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/token/", { username, password });

//       localStorage.setItem("access", res.data.access);
//       localStorage.setItem("refresh", res.data.refresh);

//       // Optional: Fetch user role
//       const profile = await axios.get("/profile/");
//       localStorage.setItem("role", profile.data.role);

//       // Redirect based on role
//       if (profile.data.role === "admin") {
//         navigate("/admin-dashboard");
//       } else {
//         navigate("/organizations");
//       }
//     } catch (err) {
//       setError("Invalid username or password");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </form>
//     </div>
//   );
// }


import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const res = await axios.post('/token/', { username, password });
//       localStorage.setItem('access', res.data.access);
//       localStorage.setItem('refresh', res.data.refresh);
      
//       // Navigate after storing tokens
//       setTimeout(() => navigate('/organizations'), 100);
//     } catch (err) {
//       alert("Login failed!");
//     }
//   };

    const handleLogin = async (e) => {
    e.preventDefault();
    try {
        console.log('Attempting to log in with username:', username, 'and password:', password);
        const res = await axios.post("/token/", { username, password });
        console.log('Received response from server:', res);
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        console.log('Stored access and refresh tokens in local storage');
        // Optional: Fetch user role
        const profile = await axios.get("/profile/");
        console.log('Received profile data from server:', profile);
        localStorage.setItem("role", profile.data.role);
        console.log('Stored user role in local storage');
        // Redirect based on role
        if (profile.data.role === "admin") {
        navigate("/admin-dashboard");
        } else {
        navigate("/organizations");
        }
        console.log('Redirecting to:', profile.data.role === "admin" ? "/admin-dashboard" : "/organizations");
    } catch (err) {
        console.error('Error logging in:', err);
        setError("Invalid username or password");
    }
    };



  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onSubmit={handleLogin}>
        <TextField fullWidth margin="normal" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField fullWidth margin="normal" type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>Login</Button>
      </form>
    </Container>
  );
};

export default Login;
