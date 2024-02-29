import React, { useState, useEffect } from 'react';
import './CreateUser.css';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from '../../api/firebase-config';

const CreateUser = () => {
  const usersCollectionRef = collection(db, "/users");
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rePassword: '',
    role: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted successfully:', formData);
      setFormData({
        name: '',
        email: '',
        password: '',
        rePassword: ''
      });
      await addDoc(usersCollectionRef, { name: formData.name, email: formData.email, password: formData.password, role: formData.role })
      setSuccessMessage('User added successfully!');
    }
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        password: '',
        rePassword: ''
      });
      setSuccessMessage('');
    }, 3000);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }
    if (formData.password !== formData.rePassword) {
      errors.rePassword = 'Passwords do not match';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="create-users-container">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="rePassword">Re-enter Password:</label>
          <input type="password" id="rePassword" name="rePassword" value={formData.rePassword} onChange={handleChange} />
          {errors.rePassword && <span className="error">{errors.rePassword}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="role">Enter Role:</label>
          <input type="text" id="role" name="role" value={formData.role} onChange={handleChange} />
        </div>
        <button type="submit">Register</button>
      </form>
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default CreateUser;
