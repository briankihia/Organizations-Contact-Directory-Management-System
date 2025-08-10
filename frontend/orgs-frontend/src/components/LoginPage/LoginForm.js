import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveSession } from '../../slices/sessionSlice'; // Removed saveUser
import './LoginForm.css';

function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const loginUser = async (credentials) => {
    console.log('Attempting to log in with credentials:', credentials);

    const response = await fetch('http://127.0.0.1:8000/accounts/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // if using Django cookies
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Login successful. Response data:', data);

      const { access: token, user } = data;
      console.log('Access Token:', token); // Output the access token
      console.log('User:', user);

      dispatch(saveSession({ token, user })); // Save both token and user
      return { success: true };
    } else {
      const errorData = await response.json();
      console.error('Login failed. Error response:', errorData);
      return { success: false, message: errorData.error || 'Login failed' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    console.log('Submitting login form with data:', formData);

    const result = await loginUser(formData);
    if (result.success) {
      alert('Login successful!');
      navigate('/'); // Redirect to dashboard or another page
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <a href="/forgot-password" className="forgot-password">Forgot your password?</a>
        <button type="submit" className="login-button">LOGIN</button>
      </form>
      <div className="signup-link">
        <a href="/signup">
          <span>Sign up</span>
        </a>
      </div>
    </div>
  );
}

export default LoginForm;