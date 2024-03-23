import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [user, setUser] = useState("");

  useEffect(()=>{
    const user = localStorage.getItem('user');
    setUser(JSON.parse(user));
    }, [])

  const navigate = useNavigate();



  return (
    <div className="home-page-container">
      {user&&<h1>Welcome, {user.name}</h1>}
      <p>This is your home page for the SkillVerifyX.</p>
      <p>Here, you can access various features related to skill verification.</p>
    </div>
  );
};

export default HomePage;
