import React, { useState, useEffect } from 'react';
import placeholder from '../../movie_placeholder.jpg';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const MovieWidget = ({ idx, titleId}) => {

  const [movieData, setMovieData] = useState({ items: [] });
  const [frontendData, setFrontendData] = useState({ items: [] });


  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieResponse = await fetch(`http://localhost:5001/api/movietitles/${titleId}`);
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
        const frontendResponse = await fetch(`http://localhost:5001/api/frontend/${titleId}`);
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

  }, []);

  if (!titleId) {
    return null;
  }
  return (
    <Col style={{ marginBottom: '20px' }}>
      <Card key={idx} style={{ width: '17rem' }}>
        <Link to={`/movie/${movieData.titleId}`} style={{ textDecoration: 'none' }}>
          {frontendData.items.length > 0 && frontendData.items[0].poster ? (
              <Card.Img
               src={frontendData.items[0].poster}
               alt="Movie Poster"
               className="img-fluid"
               style={{ width: '300px', height: '300px' }}
              />
              ) : (
              <Card.Img
                src={placeholder}
                alt="Placeholder"
                className="img-fluid"
                style={{ width: '300px', height: '300px' }}
              />
            )}
          <Card.Body>
            <Card.Title style={{height: '70px', color: 'black' }}>
              {movieData.primaryTitle ?(
                <>
                  {movieData.primaryTitle}
                </>
              ):(
                <p>
                  Unknown title
                </p>
              )}
            </Card.Title>
          </Card.Body>
        </Link>
      </Card>
    </Col>
  );
};

export default MovieWidget;
