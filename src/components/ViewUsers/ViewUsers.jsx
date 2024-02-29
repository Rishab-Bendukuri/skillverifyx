import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "/media/rishabssj/SN5701/Skillverify/skillverifyx/src/api/firebase-config.js";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "/users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log(data);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getUsers();
  }, [])

  return (
    <div>
      {users.map((user) => {
        return (
          <div>
            {" "}
            <h1>Name: {user.name}</h1>
            <h1>Email: {user.email}</h1>
          </div>
        )
      })}
    </div>
  );
};

export default ViewUsers;