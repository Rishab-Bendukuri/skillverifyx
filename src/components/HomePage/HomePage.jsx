// HomePage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
  const navigate = useNavigate();

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
    </div>
  );
};

export default HomePage;
