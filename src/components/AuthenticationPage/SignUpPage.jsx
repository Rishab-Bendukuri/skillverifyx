import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';
import axios from 'axios';
import Notification from '../Notifications';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });
  
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMsg, setNotificationMsg] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name || !formData.password) {
      alert("All fields are mandatory");
    } else {
      await axios
        .post('http://localhost:4000/users/create', formData)
        .then((res) => {
          console.log(res);
          if (res.data === "Created!") {
            setNotificationTitle('Success');
            setNotificationMsg('Account created successfully!');
            setTimeout(() => navigate('/login'), 2500); // Redirect after closing
          } else {
            setNotificationTitle("Error");
            setNotificationMsg('An error occurred. Please try again.');
          }
        })
        .catch((err) => {
          console.log("Error", err);
          setNotificationTitle("Error");
          setNotificationMsg('An error occurred. Please try again.');
        });
    }
    setTimeout(()=>setNotificationTitle(""), 2000)
  };


  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
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
        <button type="submit">Sign Up</button>
      </form>
      {notificationTitle==="Error"?<Notification title={notificationTitle}  msg={notificationMsg} color={"danger"}/>:notificationTitle==="Success"&&<Notification title={notificationTitle} msg={notificationMsg} color={"success"}/>}
      {notificationTitle}
    </div>
  );
};

export default SignUpPage;
