import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';
import {onAuthStateChanged, signInWithnameAndPassword} from "firebase/auth";
import {auth} from '../../api/firebase-config';
import axios from 'axios';
import Notification from '../Notifications';

const LoginPage = ({ onLogin, setUser, user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };  

  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMsg, setNotificationMsg] = useState("");


  const handleLogin = async(event) => {
    event.preventDefault();
    if (!formData.name || !formData.password) {
      alert("All fields are mandatory");
    } else {
      await axios.post("http://localhost:4000/users/login",formData) 
      .then((res)=>
        {
          console.log("Login data", res);
          if(res.data!=="Invalid credentials!")
          {
            localStorage.setItem("user", JSON.stringify(res.data.user))
            setNotificationTitle('Success');
            setNotificationMsg('Login successfull!');
            onLogin(res.data.token)
            setTimeout(() => navigate('/'), 2500); // Redirect after closing
          }
          else {
            setNotificationTitle("Invalid Credentials");
            setNotificationMsg('Check Credentials');
          }
        }
      )
      .catch((err)=>{
        console.log(err);
        setNotificationTitle("Error");
        setNotificationMsg('An error occurred. Please try again.');
      });
    }
    setTimeout(()=>setNotificationTitle(""), 2000)
  };

  return (
    <div className="signup-container mt-4">
      <h2>Login</h2>

      <form className="signup-form" onSubmit={handleLogin}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {notificationTitle==="Error"?<Notification title={notificationTitle}  msg={notificationMsg} color={"danger"}/>:notificationTitle==="Success"&&<Notification title={notificationTitle} msg={notificationMsg} color={"success"}/>}
    </div>
  );
};

export default LoginPage;
