import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from '../../imdb icon.png'
import { Link } from 'react-router-dom';



const SiteNavbar = () => {
    return (
      <>
        
          <Navbar key={false} expand={false} className="bg-body-tertiary mb-3">
            <Container fluid>
              <Navbar.Brand>
                <Link to="/">
              <img
                src={logo}
                width="70"
                height="40"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
              </Link>
              </Navbar.Brand>
  
              <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                  </Form>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-false`}
                aria-labelledby={`offcanvasNavbarLabel-expand-false`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                    Navigation
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
  
                    <Nav.Link><Link to="/top-50-movies" style={{ textDecoration: 'none', color: 'black' }}>Top 50 movies</Link></Nav.Link>
  
                    <Nav.Link><Link to="/top-50-actors" style={{ textDecoration: 'none', color: 'black' }}>Top 50 actors</Link></Nav.Link>
  
                    <Nav.Link href="genres">genres</Nav.Link>
  
                    <NavDropdown
                      title="User"
                      id={`offcanvasNavbarDropdown-expand-false`}
                    >
                      <NavDropdown.Item href="login">
                        Login
                      </NavDropdown.Item>
  
                      <NavDropdown.Divider />
  
                      <NavDropdown.Item href="create-user">
                        Create user
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
          </>
          );
          };

          export default SiteNavbar;