// SignUpPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css'; // Import the CSS file for styling

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // For demonstration, checking if username, email, and password are not empty
    if (!formData.username || !formData.email || !formData.password) {
      setError('Username, email, and password are required.');
    } else {
      // Reset error message
      setError('');
      // Perform signup logic, e.g., send data to server
      console.log('Signup form submitted with data:', formData);
      // Navigate to another page after successful signup
      navigate('/dashboard');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
