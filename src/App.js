import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import DefaultPage from './components/DefaultPage/DefaultPage';
import Navbar from './components/NavBar/NavBar';
import SignUpPage from './components/AuthenticationPage/SignUpPage';
import LoginPage from './components/AuthenticationPage/LoginPage';
import HomePage from './components/HomePage/HomePage';

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
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout}/>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
