// HomePage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Implement logout logic, e.g., clearing session, etc.
    // For now, let's navigate back to the login page
    
    navigate('/login');
  };

  // Placeholder data for displaying user information
  const user = {
    name: 'Rishab',
    email: 'rishab@example.com',
    // Add more user information as needed
  };

  return (
    <div className="home-page-container">
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>This is your home page for the skill verification system.</p>
      <p>Here, you can access various features related to skill verification.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
