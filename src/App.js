import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./components/AuthenticationPage/LoginPage";
import HomePage from "./components/HomePage/HomePage";
import SignUpPage from "./components/AuthenticationPage/SignUpPage";
import Navbar from "./components/NavBar/NavBar";
import ViewUsers from "./components/ViewUsers/ViewUsers";
import CreateUser from "./components/CreateUser/CreateUser";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./api/firebase-config";
import NewSkills from "./components/NewSkills";
import axios from "axios";
import Notification from "./components/Notifications";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("authToken", token);
    setIsLoggedIn(true);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <React.Fragment>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/newskills" element={<NewSkills />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} setUser={setUser} user={user} />}/>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/users" element={<ViewUsers />} />
        <Route path="/createuser" element={<CreateUser />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
