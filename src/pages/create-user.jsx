import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import SiteNavbar from './Components/navbar';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    
    // Validerer brugernavn og adgangskode
    if(!username || !password){
      alert('Brugernavn og adgangskode er påkrævet');
      return;
    }
    
    setUsername('');
    setPassword('');

    try{
      const response = await fetch('http://Localhost:5001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({username, password}),
      });

      if (response.ok){
        const userData = await response.json();
        
        // Sætter cookie med userId fra JSON response
        Cookies.set('userId', userData.userId);
        Cookies.set('username', userData.username);
        navigate('../user-profile');
        
      } else {
        const errorData = await response.json();
        alert(`Fejlbesked: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Fejlbesked:', error);
      alert(`Der skete en fejl i forsøget på at oprette brugeren. Fejlbesked: ${error.message}`);
    }

  };

  return (
    <>
    <SiteNavbar/>
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{ height: '50vh' }}>
    <h1>Create user</h1>
    <div className="d-flex justify-content-center align-items-center" >
      <Form onSubmit={handleCreateUser}>
          <Form.Group as={Col} xs="auto" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          

          <Form.Group as={Col} xs="auto" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit" className="mt-3">
            Create User
          </Button>
        </div>
      </Form>
    </div>
    </div>
    </>
  );
};

export default CreateUser;
