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
  const [movieData, setMovieData] = useState({ items: [] });
  const [namesData, setNamesData] = useState({ items: [] });
  const [frontendData, setFrontendData] = useState({ items: [] });


  useEffect(() => {
    // Function to fetch data from the API
    const fetchMovieData = async () => {
      try {
        const movieResponse = await fetch("http://localhost:5001/api/movietitles");
        if (!movieResponse.ok) {
          throw new Error('Network response was not ok.');
        }
        const movieJsonData = await movieResponse.json();
        setMovieData(movieJsonData); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovieData();

    const fetchNamesData = async () => {
      try {
        const namesResponse = await fetch('http://localhost:5001/api/names');
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
        const frontendResponse = await fetch(`http://localhost:5001/api/frontend/`);
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
      <div className="container mt-4">
      <Stack gap={4}>
        <Container fluid>
          <h1>Selection of movies</h1>
          <Row>
            {Array.from({ length: 6 }).map((_, idx) => (
              <>
                {movieData.items.length > 0 ? (
                  <>
                    <MovieWidget key={`movie_${idx}`} idx={idx} titleId={movieData.items[idx].titleId}/>
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </>
            ))}   
          </Row>
        </Container>
        <div style={{
          borderBottom: '2px solid #333',
          width: '100%', 
          marginTop: '20px',
          marginBottom: '20px'
        }}>
      </div>
        <Container fluid>
          <h1>Selection of people</h1>
          <Row>
            {Array.from({ length: 6 }).map((_, idx) => (
              namesData.items[idx] ? (
                <ActorWidget key={`actor_${idx}`} idx={idx} nameId={namesData.items[idx].nameId} />
              ) : (
                <p key={`actor_placeholder_${idx}`}>Loading...</p> // Or display a loading message or placeholder
              )
            ))}
          </Row>
        </Container>
      </Stack>
      </div>
    </>        
  );
};

export default Home;