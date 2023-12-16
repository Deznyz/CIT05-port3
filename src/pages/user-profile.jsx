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
import MovieWidget from './Components/moviewidget'
import ActorWidget from './Components/actorwidget';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const UserProfile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    
    useEffect(() => {
      // Tjekker om user cookie findes
      const userCookie = Cookies.get('user');
      
      if (userCookie) {
        // Cookie findes. Parser JSON data fra cookie
        const parsedUserData = JSON.parse(userCookie);
        setUserData(parsedUserData);
      } else {
        // cookie findes ikke, redirect til forside
        navigate('/');
      }
    }, [navigate]);
  
    
    return (
        
      <div>
        <SiteNavbar />
        {userData ? (
          // hvis cookie findes
          <>
            <h1>User Profile Page</h1>
            <p>Welcome, {userData.username}!</p>
            
          </>
        ) : (
          // hvis cookie iikke findes (redirecting)
          <p>Loading...</p>
        )}
      </div>
    );
  };
  
  export default UserProfile;
  