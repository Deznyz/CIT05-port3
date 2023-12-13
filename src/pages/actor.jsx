import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SiteNavbar from './Components/navbar';
import MovieWidget from './Components/moviewidget';
import { Stack, Container, Row } from 'react-bootstrap';
import RatingScale from './Components/ratingscale';

const Actor = () => {
  const { id } = useParams();

  const [data1, setData1] = useState({ items: [] });
  const [data2, setData2] = useState({ items: [] });
  const [data3, setData3] = useState({ items: [] });



  useEffect(() => {

    const fetchData2 = async () => {
      try {
        const response2 = await fetch(`http://localhost:5001/api/names/${id}`);
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

    // Function to fetch data from the API
    const fetchData1 = async () => {
      try {
        const response1 = await fetch(`http://localhost:5001/api/knownfor/${data2.nameId}`);
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



        // Function to fetch data from the API
        const fetchData3 = async () => {
          try {
            const response3 = await fetch(`http://localhost:5001/api/knownfor/${id}`);
            if (!response3.ok) { 
              throw new Error('Network response was not ok.');
            }
            const jsonData3 = await response3.json();
            setData1(jsonData3); // Update state with fetched data
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData3(); // Call the function when the component mounts  
  }, []);


  return (
    <>
    <SiteNavbar/>
    <h1>{data2.name}</h1>
    <p>Current rating: {data2.avgNameRating}</p>
    <RatingScale/>
    <h2>Movies of {data2.name}</h2>
    <Stack gap={4}>
    <Container fluid>
      <Row>
  
      </Row>
    </Container>
    </Stack>
    </>
  );
};

export default Actor;