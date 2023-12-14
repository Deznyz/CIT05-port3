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
import MovieWidget from './Components/moviewidget';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TopFiftyMovies = () => {
  const [movieData, setMovieData] = useState({ items: [] });
  const [frontendData, setFrontendData] = useState({ items: [] });

  useEffect(() => {
    // Function to fetch data from the API
    const fetchMovieData = async () => {
      try {
        const movieResponse = await fetch(`http://localhost:5001/api/movietitles/?page=0&pageSize=50`);
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
    <div className="container mt-4">
    <Stack gap={4}>
      <Container fluid>
        <h1>Top 50 movies</h1>
        <Row>
      {Array.from({ length: 50 }).map((_, idx) => (
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
          <Card.Body>
            <Card.Title style={{height: '70px', color: 'black' }}>
              {movieData.primaryTitle ?(
                <>
                  {movieData.primaryTitle}
                </>
              ): (
                <p>Loading...</p>
              )}
            </Card.Title>
          </Card.Body>   
      </Row>
    </Container>
    </Stack>  
    </div>
  </> 
  );    
};

export default TopFiftyMovies;