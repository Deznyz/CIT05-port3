import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import SiteNavbar from './Components/navbar';
import MovieWidget from './Components/moviewidget';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const TopFiftyMovies = () => {
  const {id} = useParams();
  const [movieData, setMovieData] = useState({ items: [] });
  const [frontendData, setFrontendData] = useState({ items: [] });

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieResponse = await fetch(`http://localhost:5001/api/movieratings?${id}&pagesize=10`);
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
        const frontendResponse = await fetch(`http://localhost:5001/api/frontend?${id}&pagesize=10`);
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
        <h1>Top 50 titles</h1>
        <Row>
      {movieData.items.map((_, idx) => (
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
    </Stack>  
    <nav aria-label="Page navigation example">
    <ul class="pagination pagination-lg">
    <li class="page-item active" aria-current="page">
      </li>
        <span class="page-item"><a class="page-link" href="http://localhost:3000/top-50-titles/page=0">1</a></span>
        <li class="page-item"><a class="page-link" href="http://localhost:3000/top-50-titles/page=1">2</a></li>
        <li class="page-item"><a class="page-link" href="http://localhost:3000/top-50-titles/page=2">3</a></li>
        <li class="page-item"><a class="page-link" href="http://localhost:3000/top-50-titles/page=3">4</a></li>
        <li class="page-item"><a class="page-link" href="http://localhost:3000/top-50-titles/page=4">5</a></li>
        <li class="page-item">
        </li>
      </ul>
    </nav>
    </div>
  </> 
  );    
};

export default TopFiftyMovies;