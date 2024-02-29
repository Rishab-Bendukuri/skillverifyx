import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    onLogout();
  };

  const handleDefault = () => {
    if (isLoggedIn) {
      navigate("/home")
    }
    else {
      navigate("/login")
    }
  }

  return (
    <nav className="navbar">
      <div className="logo" onClick={handleDefault}>Skill Verification System</div>
      <ul className="nav-links">
        {isLoggedIn && (
          <li>
            <Link to="/">Home</Link>
            <Link to="/endorse">Endorse</Link>
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
