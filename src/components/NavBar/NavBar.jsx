import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import the CSS file for styling

const Navbar = ({ isLoggedIn, onLogout }) => {
  const handleLogoutClick = () => {
    // Call the logout function passed from the parent component
    onLogout();
  };

  return (
    <nav className="navbar">
      <div className="logo">Skill Verification System</div>
      <ul className="nav-links">
        {isLoggedIn && (
          <li>
            <Link to="/">Home</Link>
          </li>
        )}
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
        {isLoggedIn && (
          <li>
            <button onClick={handleLogoutClick}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
