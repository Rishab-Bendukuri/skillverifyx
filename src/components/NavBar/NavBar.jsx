import React from 'react';
import { Link, json, useNavigate } from 'react-router-dom';
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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={handleDefault}>
          SkillVerifyX
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn && (
              <>
                <h3>
                  Hi {JSON.parse(localStorage.getItem("user")).name}</h3>
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li> */}
                {
                  JSON.parse(localStorage.getItem("user")).role=="on"&&
                <li className="nav-item">
                  <Link className="nav-link" to="/users">View Users</Link>
                </li>}
                <li className="nav-item">
                  <Link className="nav-link" to="/newskills">Skills</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/myskills">My Skills</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/writing">Writing</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/queries">Ask queries</Link>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Signup</Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <button className="btn btn-outline-danger" onClick={handleLogoutClick}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
