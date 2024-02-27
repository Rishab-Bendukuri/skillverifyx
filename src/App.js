import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./components/AuthenticationPage/LoginPage"
import HomePage from './components/HomePage/HomePage';
import Navbar from './components/NavBar/NavBar';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in on initial load
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    // Store the authentication token in local storage
    localStorage.setItem('authToken', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Clear the authentication token from local storage
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    // Redirect user to login page after logout
    return <Navigate to="/login" />;
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
