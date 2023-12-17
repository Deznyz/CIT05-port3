import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from '../../imdb icon.png';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SiteNavbar = () => {
  const [searchText, setSearchText] = useState('');
  const [userCookie, setUserCookie] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim() !== '') {
      navigate(`../search-result/${searchText}`);
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

  useEffect(() => {
    // Tjekker om user cookie findes
    const userCookieData = Cookies.get('user');

    if (userCookieData) {
      // Parse the JSON data from the cookie and store it
      const parsedUserCookie = JSON.parse(userCookieData);
      setUserCookie(parsedUserCookie);
    }
  }, []);

  const handleLogout = () => {
    // Fjerner user cookie
    Cookies.remove('user');
    navigate('/');
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary mb-3 fixed-top" style={{ marginBottom: '56px' }}>
        <Container fluid>
          <Navbar.Brand>
            <Link to="/">
              <img src={logo} width="70" height="40" className="d-inline-block align-top" alt="React Bootstrap logo" />
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              {userCookie ? (
                <>
                  <Nav.Link>
                    <Link to="/user-profile" style={{ textDecoration: 'none', color: 'black' }}>
                      User profile
                    </Link>
                  </Nav.Link>
                  <Button variant="outline-danger" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <NavDropdown title="User" id="offcanvasNavbarDropdown-expand-false">
                  <NavDropdown.Item>
                    <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
                      Login
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/create-user" style={{ textDecoration: 'none', color: 'black' }}>
                      Create user
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              )}

              <Nav.Link>
                <Link to="/top-50-titles/page=0" style={{ textDecoration: 'none', color: 'black' }}>
                  Top 50 titles
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/top-50-people" style={{ textDecoration: 'none', color: 'black' }}>
                  Top 50 people
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Form
            onSubmit={handleSearch}
            className="d-flex"
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              maxWidth: '300px', // Limit maximum width
            }}
          >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchText}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              style={{ width: '100%' }}
            />
          </Form>
        </Container>
      </Navbar>
      <div style={{ height: '56px' }}></div>
    </>
  );
};

export default SiteNavbar;
