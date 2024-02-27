// LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // Perform login logic here, e.g., validate credentials
    // For demonstration, let's assume successful login if email and password are not empty
    if (!formData.email || !formData.password) {
      setError('Email and password are required.');
    } else {
      // Reset error message
      setError('');
      // Set isLoggedIn state to true
      setIsLoggedIn(true);
      // Navigate to the home page
      navigate('/home');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
        </div>
        {error && <div>{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
