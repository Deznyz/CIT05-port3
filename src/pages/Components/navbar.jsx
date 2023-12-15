import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from '../../imdb icon.png'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';



const SiteNavbar = () => {

  
    const [searchText, setSearchText] = useState('');
    const [hasActiveCookie, setCookie] = useState();
    const navigate = useNavigate();
    const handleSearch = (e) => {
      e.preventDefault();
      if (searchText.trim() !== '') {
        navigate(`/search-result/${searchText}`);
      }
    };
  
    const handleInputChange = (e) => {
      setSearchText(e.target.value);
    };
  
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSearch(e);
      }
    };
    

  //const hasActiveCookie = Cookies.get('UserId'); // henter cookie her
  //console.log('Value of the cookie:', hasActiveCookie);

  


  useEffect(() => {
      // Tjekker om cookie findes med userId
      const userIdCookie = Cookies.get('userId');
      console.log('Value of the cookie:', userIdCookie);
      
      setCookie(userIdCookie);
    }, [])
  

  // Define the handleLogout function
  const handleLogout = () => {
    Cookies.remove('userId'); // sletter cookie efter der er logget ud
    navigate('/');
  };

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
  
              <Form onSubmit={handleSearch} className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        value={searchText}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
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
                <Nav.Link><Link to="/top-50-titles" style={{ textDecoration: 'none', color: 'black' }}>Top 50 titles</Link></Nav.Link>
                <Nav.Link><Link to="/top-50-people" style={{ textDecoration: 'none', color: 'black' }}>Top 50 people</Link></Nav.Link>

                {hasActiveCookie ? ( // cookie
                  <>
                    <Nav.Link><Link to="/user-profile" style={{ textDecoration: 'none', color: 'black' }}>User profile</Link></Nav.Link>
                    <Button variant="outline-danger" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
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
                )}
              </Nav>
            </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
          </>
          );
          };

          export default SiteNavbar;