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



const Home = () => {
  const [data1, setData1] = useState({ items: [] });
  const [data2, setData2] = useState({ items: [] });


  useEffect(() => {
    // Function to fetch data from the API
    const fetchData1 = async () => {
      try {
        const response1 = await fetch("http://localhost:5001/api/movietitles");
        if (!response1.ok) {
          throw new Error('Network response was not ok.');
        }
        const jsonData1 = await response1.json();
        setData1(jsonData1); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData1(); // Call the function when the component mounts    

    const fetchData2 = async () => {
      try {
        const response2 = await fetch('http://localhost:5001/api/names');
        if (!response2.ok) {
          throw new Error('Network response was not ok.');
        }
        const jsonData2 = await response2.json();
        setData2(jsonData2); // Update state with fetched data from API 2
      } catch (error) {
        console.error('Error fetching data from API 2:', error);
      }
    };

    fetchData2();

  }, []);




  //names api call
  
  return (
    <>
      
        <SiteNavbar/>

  <Stack gap={4}>
    <Container fluid>
      <Row>
        {Array.from({ length: 4 }).map((_, idx) => (
          <MovieWidget key={`movie_${idx}`} idx={idx} data={data1}/>
        ))}   
      </Row>
    </Container>





    <Container fluid>
      <Row>
        {Array.from({ length: 4 }).map((_, idx) => (
          <ActorWidget idx={idx} data={data2}/>
        ))}   
      </Row>
    </Container>
  </Stack>
    </>        
  );
};

export default Home;