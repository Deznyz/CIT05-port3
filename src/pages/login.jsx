import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import SiteNavbar from './Components/navbar';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validerer brugernavn og adgangskode
    if(!username || !password){
      alert('Brugernavn og adgangskode er påkrævet');
      return;
    }

    setUsername('');
    setPassword('');

    try{
      const response = await fetch('http://Localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({username, password}),
      });

      if (response.ok) {

        const userData = await response.json();
  
          // Vi laver et objekt, der indeholder både userId og username
          const userObject = {
            userId: userData.userId,
            username: userData.username,
          };
  
          // Serializer objektet som JSON og sætter det som en enkelt cookie
          Cookies.set('user', JSON.stringify(userObject), { expires: 1 / 96 }); // 1/96 svarer til 15 minutter i dage
  
          navigate('../user-profile');

        } else if (response.status === 404) {
          // håndterer hvis der kommer en "HTTP 404 Not Found"
          alert('Brugeren blev ikke fundet');
        } else {
          // Handle other server-side errors
          alert('Fejl i login oplysninger');
        }
    } catch (error) {
      console.error('Fejlbesked:', error);
      alert(`Der skete en fejl i forsøget på at logge ind. Fejlbesked: ${error.message}`);
    }

  };

  return (
    <>
    <SiteNavbar/>
    <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
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
            Login
          </Button>
        </div>
      </Form>
    </div>
    </>
  );
};

export default LoginForm;
