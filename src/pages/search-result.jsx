import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SiteNavbar from './Components/navbar';
import ActorWidget from './Components/actorwidget';
import MovieWidget from './Components/moviewidget';
import { useParams } from 'react-router-dom';




const SearchResult = () => {
    const { id } = useParams(); 


    const [movieSearchData, setMovieSearchData] = useState({ items: [] });
    const [namesSearchData, setNamesSearchData] = useState({ items: [] });  
  
    useEffect(() => {
      const fetchMovieSearchData = async () => {
        try {
          const movieSearchResponse = await fetch(`http://localhost:5001/api/search/${id}?page=0&pagesize=10`);
          if (!movieSearchResponse.ok) {
            throw new Error('Network response was not ok.');
          }
          const movieSearchJsonData = await movieSearchResponse.json();
          setMovieSearchData(movieSearchJsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchMovieSearchData();
  
      const fetchNamesSearchData = async () => {
        try {
          const namesSearchResponse = await fetch(`http://localhost:5001/api/actors/${id}?page=0&pagesize=40`);
          if (!namesSearchResponse.ok) {
            throw new Error('Network response was not ok.');
          }
          const namesSearchJsonData = await namesSearchResponse.json();
          setNamesSearchData(namesSearchJsonData);
        } catch (error) {
          console.error('Error fetching data from API 2:', error);
        }
      };
  
      fetchNamesSearchData();  
    }, []);


  return (
    <>
        <SiteNavbar/>
        <Container fluid>
  <Row className="justify-content-center">
    <Col xs="auto" className="pr-4" style={{ borderRight: '1px solid #ccc' }}>
        <h1>People</h1>
        {namesSearchData && namesSearchData.length > 0 && namesSearchData.map((data, idx) => (
            <ActorWidget key={`actor_${idx}`} nameId={data.nameId} />
        ))}
    </Col>
    <Col xs="auto">
        <h1>Titles:</h1>
        {movieSearchData && movieSearchData.length > 0 && movieSearchData.map((data, idx) => (
            <MovieWidget key={`actor_${idx}`} titleId={data.titleId} />
        ))}
    </Col>
  </Row>
</Container>
    </>     
  );
};

export default SearchResult;