import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./components/AuthenticationPage/LoginPage"
import HomePage from './components/HomePage/HomePage';
import SignUpPage from "./components/AuthenticationPage/SignUpPage"
import Navbar from './components/NavBar/NavBar';
import ViewUsers from './components/ViewUsers/ViewUsers';
import CreateUser from './components/CreateUser/CreateUser';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from './api/firebase-config';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('authToken', token);
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    return <Navigate to="/login" />;
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/home" element={isLoggedIn ? <HomePage user={user} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} setUser={setUser} user={user} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/users" element={<ViewUsers />} />
        <Route path="/createuser" element={<CreateUser />} />
      </Routes>
    </Router>
  );
};

export default App;
