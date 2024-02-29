import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { collection, getDoc, getDocs, doc } from 'firebase/firestore';
import { db } from '../../api/firebase-config';

const HomePage = () => {
  const [data, setData] = useState("");
  const getUser = async (user) => {
    try {
      const docRef = doc(db, 'users', JSON.parse(localStorage.getItem('user')).uid)
      const docSnap = await getDoc(docRef)
      setData(docSnap.exists() ? docSnap.data() : null)
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    const user = localStorage.getItem('user');
    getUser(user);
    }, [])

  const navigate = useNavigate();
  getUser();



  return (
    <div className="home-page-container">
      <h1>Welcome, {data.name}!</h1>
      <p>Email: {data.email}</p>
      <p>This is your home page for the skill verification system.</p>
      <p>Here, you can access various features related to skill verification.</p>
    </div>
  );
};

export default HomePage;
