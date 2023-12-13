import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import SiteNavbar from './Components/navbar';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateUser = (e) => {
    e.preventDefault();
    // Perform user creation logic here (e.g., send data to server, etc.)
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    // Reset the form
    setUsername('');
    setEmail('');
    setPassword('');
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

          <Form.Group as={Col} xs="auto" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
