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
import ActorWidget from './Components/actorwidget';
import MovieWidget from './Components/moviewidget';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const TopFiftyActors = () => {
  const { id } = useParams();

  const [namesData, setNamesData] = useState({ items: [] });
  const [knownforData, setKnownforData] = useState({ items: [] });
  const [frontendData, setFrontendData] = useState({ items: [] });
  const [movieData, setMovieData] = useState({ items: [] });
  
  const sortByRating = (a, b) => {
    return b.avgNameRating - a.avgNameRating;
  };


  useEffect(() => {
    // Function to fetch data from the names table from the API
    const fetchNamesData = async () => {
      try {
        const namesResponse = await fetch('http://localhost:5001/api/names/?page=0&pageSize=50');
        if (!namesResponse.ok) {
          throw new Error('Network response was not ok.');
        }
        const namesJsonData = await namesResponse.json();
        setNamesData(namesJsonData); // Update state with fetched data from API 2
      } catch (error) {
        console.error('Error fetching data from API 2:', error);
      }
    };
    fetchNamesData();

    const fetchFrontendData = async () => {
      try {
        const frontendResponse = await fetch(`http://localhost:5001/api/frontend/?page=0&pageSize=50`);
        if (!frontendResponse.ok) {
          throw new Error('Network response was not ok.');
        }
        const frontendJsonData = await frontendResponse.json();
        setFrontendData(frontendJsonData); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchFrontendData();

  }, []);

  return (
    <>
        <SiteNavbar/>

<Stack gap={4}>
<Container fluid>
          <h1>Top 50 actors</h1>
          <Row>
          {namesData.length > 0 ? namesData.sort(sortByRating).map((namesData, idx) => (
                <ActorWidget key={`actor_${idx}`} idx={idx} nameId={namesData.items[idx].nameId} />
              
            )) : null
               }        
          </Row>
        </Container>
      </Stack>
    </>        
  );
};
export default TopFiftyActors;