import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SiteNavbar from './Components/navbar';
import placeholder from '../placeholder 305x160.svg';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import ActorWidget from './Components/actorwidget';
import { Row } from 'react-bootstrap';
import Bookmark from './Components/bookmark-button';
import RatingScale from './Components/ratingscale';


const Movie = () => {
  const { id } = useParams(); 
  const [movieData, setMovieData] = useState({ items: [] });
  const [frontendData, setFrontendData] = useState({ items: [] });
  const [movieratingData, setMovieratingData] = useState({ items: [] });
  const [knownforData, setKnownforData] = useState({ items: [] });



  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieResponse = await fetch(`http://localhost:5001/api/movietitles/${id}`);
        if (!movieResponse.ok) {
          throw new Error('Network response was not ok.');
        }
        const movieJsonData = await movieResponse.json();
        setMovieData(movieJsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovieData(); 
        const fetchFrontendData = async () => {
          try {
            const frontendResponse = await fetch(`http://localhost:5001/api/frontend/${id}`);
            if (!frontendResponse.ok) {
              throw new Error('Network response was not ok.');
            }
            const frontendJsonData = await frontendResponse.json();
            setFrontendData(frontendJsonData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        
        fetchFrontendData();

        const fetchMovieratingData = async () => {
          try {
            const movieratingResponse = await fetch(`http://localhost:5001/api/movieratings/${id}`);
            if (!movieratingResponse.ok) {
              throw new Error('Network response was not ok.');
            }
            const movieratingJsonData = await movieratingResponse.json();
            setMovieratingData(movieratingJsonData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchMovieratingData();

        const fetchKnownforData = async () => {
          try {
            const knownforResponse = await fetch(`http://localhost:5001/api/knownfor/titleid/${id}?page=0&pageSize=500`);
            if (!knownforResponse.ok) {
              throw new Error('Network response was not ok.');
            }
            const knownforJsonData = await knownforResponse.json();
            setKnownforData(knownforJsonData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchKnownforData();
  }, []);

  return (
    <>
      <SiteNavbar/>
      <div className="container mt-4">
      <Bookmark type={"bookmarkstitle"}/>
    <div className="row">
          <div className="col-md-4 mb-3"> 
            {frontendData.items.length > 0 && frontendData.items[0].poster ? (
              <img
               src={frontendData.items[0].poster}
               alt="Movie Poster"
               className="img-fluid"
               style={{ width: '300px', height: '300px' }}
              />
              ) : (
              <img
                src={placeholder}
                alt="Placeholder"
                className="img-fluid"
                style={{ width: '300px', height: '300px' }}
              />
            )}
          </div>
          <div className="col-md-8">
            <h2>{movieData.primaryTitle}</h2>
            <p style={{ fontSize: '1.2em', color: '#888' }}>
              Movie rating: {movieratingData.averageRating} with {movieratingData.numVotes} votes
            </p>
            <h3>Plot:</h3>
            
            {frontendData.items.length > 0 && frontendData.items[0].plot ? (
              <p>{frontendData.items[0].plot}</p>
            ) : (
              <p>Loading...</p>
            )}
            <RatingScale/>
          </div>
        </div>
        <div style={{
          borderBottom: '2px solid #333',
          width: '100%', 
          marginTop: '20px',
          marginBottom: '20px'
        }}></div>
        <h3 style={{ marginBottom: '20px' }}>Involved:</h3>
        <Stack>
          <Container fluid>
            <Row>
              {knownforData.items.length > 0 ? (
                <>
                  {knownforData.items.map((x, idx) => (
                    <ActorWidget idx={idx} nameId={knownforData.items[idx].nameId}/>
                  ))}
                </>
              ) : (
                <p>Loading...</p>
              )}
            </Row>
          </Container>
        </Stack>   
      </div>
    </>
  );
};

export default Movie;