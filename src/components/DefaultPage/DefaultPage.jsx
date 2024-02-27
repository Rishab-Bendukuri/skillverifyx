import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DefaultPage.css'; // Import the CSS file for styling

const DefaultPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="default-page-container">
      <h1>Welcome to SkillVerifyX</h1>
      <p>Please select an option:</p>
      <div>
        <button onClick={handleLoginClick}>Login</button>
        <button onClick={handleSignupClick}>Signup</button>
      </div>
    </div>
  );
};

export default DefaultPage;
