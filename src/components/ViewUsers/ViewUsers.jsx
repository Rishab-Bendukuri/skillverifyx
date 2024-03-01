import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../api/firebase-config';
import { Button, Card, CardBody, CardTitle, Form, Modal } from 'react-bootstrap';
import './ViewUsers.css';
import axios, { all } from 'axios';
import { fetchedData } from '../QuizData';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const userData = await axios.get("http://localhost:4000/users/alluserids");
      const userIds = userData.data;

      const allUsers = [];
      userIds.map(async(value)=>{
        console.log("value", value);

        const skillIds = [0,1,2,3,4];
        const certi = [];
        skillIds.map(async(id)=>{
          const cert = await axios.get(`http://localhost:4000/certificate/verify/${value}/${id}`);
          console.log("Cert", cert.data);
          if(cert.data=="Valid"){
            certi.push(id);
            
            console.log(certi, "certi")
          }
        })
        const data = await axios.get(`http://localhost:4000/users/user/${value}`);

        const user = await axios.get(`http://localhost:4000/users/userbyid/${value}`)
        allUsers.push({endorsements: data.data[1], userId: value, name: user.data.name, role: user.data.role, skillIds: certi});
        console.log("DFSF", allUsers);
      })

      setTimeout(()=>        setUsers(allUsers),2000)
      setTimeout(()=>console.log("ALLUSERS", users), 3000);
    };
    getUsers();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [modalData, setModalData] = useState({name: "", role: "", userId: "", skillIds: []});

    const handleEndorsement = async(user, value)=>{
      console.log("Handle ENdorsement", {userId: user.userId, skillId: value, endorseId: JSON.parse(localStorage.getItem("user")).userId});
      const result = await axios.post("http://localhost:4000/users/endorse", {userId: user.userId, skillId: value, endorseId: JSON.parse(localStorage.getItem("user")).userId})
    };

  return (
    <div className="view-users-container">
      <Form.Group controlId="formSearch">
        <Form.Control
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Form.Group>
      <div className="user-cards">
        {filteredUsers.map((user, index) => (
          <div key={index} className="col-lg-3 col-md-6 mb-4">
          <Card className="custom-card">
            <Card.Body>
              <Card.Title>Name: {user.name}</Card.Title>
              <Card.Title>Email: xxxx@gmail.com</Card.Title>
              <Card.Title>Phone No: 90xxxxxxxx</Card.Title>
              <Button variant="primary" onClick={()=>{setShowConfirmation(true);setModalData(user)}}>View Skills</Button>
            </Card.Body>
          </Card>
        </div>
        ))}
      </div>

      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        
        <Modal.Body>
        <Modal.Title>Name: {modalData.name}</Modal.Title>

          <h5>User id: {modalData.userId}</h5>
          <h5>Role: {modalData.role=="on"?"Manager":"User"}</h5>
          {
            modalData.skillIds.map((value)=>
            {
              return(
                <>
                  <Card className='card p-2'>
                    <CardTitle>{fetchedData.skills[parseInt(value)].skillname}</CardTitle>
                    <CardBody className='ms-0'>No of Endorsements - {modalData.endorsements.length}
                    <Button className='button' onClick={()=>console.log(modalData.endorsements)}>View Endorsements</Button>
                    fsd {JSON.parse(localStorage.getItem("user")).userId}{
                      modalData.endorsements.includes(JSON.parse(localStorage.getItem("user")).userId)
                    }
                    <Button className='button' onClick={()=>handleEndorsement(modalData, value)}>Endorse skills</Button>
                    </CardBody>
                  </Card>
                  <div> | </div>
                </>
              );
            })
          }
        </Modal.Body>
          <div className='row p-3'>
          <Button variant="secondary" className='me-4 ms-3 col-5' onClick={() => setShowConfirmation(false)}>
            Cancel
          </Button>
          <Button variant="primary" className='ms-2 col-5'>
            Start Quiz
          </Button>
          </div>
      </Modal>
    </div>
  );
};

export default ViewUsers;
