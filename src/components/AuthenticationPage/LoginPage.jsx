import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import {onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from '../../api/firebase-config';

const LoginPage = ({ onLogin, setUser, user }) => {
  const navigate = useNavigate();
  const [failMessage, setFailMessage] = useState();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  onAuthStateChanged(auth, (currentUser) => {
    localStorage.setItem('user', JSON.stringify(currentUser));
;
    console.log(currentUser);
    setUser(currentUser);
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async(event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Email and password are required.');
    } else {
      setError('');
      try{
        let ruser = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        )
        console.log(ruser)
        setUser(ruser)
        const token = ruser;
        onLogin(token);
        navigate('/home');
        }
        catch(error){
          console.log(error);
          setError("Invalid Credentials")
          setFailMessage("Invalid Credentials")
          setTimeout(() => {
            setFormData({
              email: '',
              password: '',
            });
            setUser(null)
            setError("")
            setFailMessage('');
          }, 10000);
        }    
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <div className="fail-message">{error}</div>}
    </div>
  );
};

export default LoginPage;
