import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from '../imdb icon.png'
import placeholder from '../placeholder 305x160.svg'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import SiteNavbar from './Components/navbar';


const TopFiftyActors = () => {
  return (
    <>
      
        <SiteNavbar/>

  <Stack gap={4}>
    <container fluid>
      <Row>
        {Array.from({ length: 50 }).map((_, idx) => (
          <Col>
          <a style={{ textDecoration: 'none' }} href={idx}>
            <Card style={{ width: '17rem' }}>
              <Card.Body>
                <Card.Title>Actor {idx+1}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Rating:</Card.Subtitle>
                <Card.Text>
                  example movie<br/>
                  example movie<br/>
                  example movie<br/>
                </Card.Text>
              </Card.Body>
            </Card>
            </a>
          </Col>
        ))}   
      </Row>
    </container>
  </Stack>
    </>        
  );
};

export default TopFiftyActors;