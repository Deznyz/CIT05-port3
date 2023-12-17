import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SiteNavbar from './Components/navbar';
import MovieWidget from './Components/moviewidget';
import { Stack, Container, Row } from 'react-bootstrap';
import RatingScale from './Components/ratingscale';
import CoactorWidget from './Components/coactorwidget';
import ActorWidget from './Components/actorwidget';
import Bookmark from './Components/bookmark-button';

const Actor = () => {
  const { id } = useParams();

  const [namesData, setNamesData] = useState({ items: [] });
  const [knownforData, setKnownforData] = useState({ items: [] });



  useEffect(() => {
    // Function to fetch data from the names table from the API
    const fetchNamesData = async () => {
      try {
        const namesResponse = await fetch(`http://localhost:5001/api/names/${id}`);
        if (!namesResponse.ok) {
          throw new Error('Network response was not ok.');
        }
        const namesJsonData = await namesResponse.json();
        setNamesData(namesJsonData);
      } catch (error) {
        console.error('Error fetching names data:', error);
      }
    };
    

    fetchNamesData();

    // Function to fetch data from the knownfor table from the API
    const fetchKnownforData = async () => {
      try {
        const knownforResponse = await fetch(`http://localhost:5001/api/knownfor/nameid/${id}?page=0&pagesize=1000000`);
        if (!knownforResponse.ok) {
          throw new Error('Network response was not ok.');
        }
        const knownforJsonData = await knownforResponse.json();
        setKnownforData(knownforJsonData);
      } catch (error) {
        console.error('Error fetching knownfor data:', error);
      }
    };

    fetchKnownforData();

  }, []);


  return (
    <>
      <SiteNavbar/>
      <div className="container mt-4">
      <Bookmark type={"bookmarksname"}/>
      <h1>{namesData.name}</h1>
      <p style={{ fontSize: '1.2em', color: '#888' }}>Current rating: {namesData.avgNameRating}</p>
      <div style={{
          borderBottom: '2px solid #333',
          width: '100%', 
          marginTop: '20px',
          marginBottom: '20px'
        }}></div>
      <h2>Involved with</h2>
      <Stack>
        <Container fluid>
          <Row>
            {knownforData.items.length > 0 ? (
              <>
                {knownforData.items.map((x, idx) => (
                  <MovieWidget key={`movie_${idx}`} idx={idx} titleId={knownforData.items[idx].titleId}/>
                ))}
              </>
            ) : (
              <p>Loading...</p>
            )}
          </Row>
        </Container>
      </Stack>
      <div style={{
          borderBottom: '2px solid #333',
          width: '100%', 
          marginTop: '20px',
          marginBottom: '20px'
        }}>
      </div>
      <h2>Top 10 {namesData.name} has worked the most with:</h2>
      {namesData.name ? (
        <>
          <CoactorWidget namesData={namesData}/>
        </>
      ) : (
        <p>Loading...</p>
      )}
      </div>
    </>
  );
};

export default Actor;