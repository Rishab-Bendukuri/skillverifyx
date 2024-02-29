import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css'; 
import {createUserWithEmailAndPassword} from "firebase/auth";
import {collection, getDocs, addDoc, doc, setDoc} from "firebase/firestore";
import {auth, db} from "/media/rishabssj/SN5701/Skillverify/skillverifyx/src/api/firebase-config.js";
const SignUpPage = () => {
  const navigate = useNavigate();
  const [docRef, setDocRef] = useState()
  const usersCollectionRef = collection(db, "/users");
  const [uid, setUid] = useState()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [user, setUser] = useState();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setError('Username, email, and password are required.');
    } else {
      setError('');
      try{
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        ).then(cred => {
          const smt = cred.user.uid;
          setDoc(doc(db, 'users', smt), {name : formData.username, email : formData.email, role : "test"})

        })
        }
        catch(error){
          console.log(error);
        }
      console.log(user);
      
      console.log('Signup form submitted with data:', formData);
      navigate('/login');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Name:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
