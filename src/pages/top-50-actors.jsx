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



  useEffect(() => {
    // Function to fetch data from the names table from the API
    const fetchNamesData = async () => {
      try {
        const namesResponse = await fetch(`http://localhost:5001/api/names/?${id}&pagesize=10`);
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

    // Function to fetch data from the knownfor table from the API
    const fetchKnownforData = async () => {
      try {
        const knownforResponse = await fetch(`http://localhost:5001/api/knownfor/?${id}&pagesize=10`);
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


    const fetchFrontendData = async () => {
      try {
        const frontendResponse = await fetch(`http://localhost:5001/api/frontend/?${id}&pagesize=10`);
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
          <h1>Top 50 people</h1>
          <Row>
            {Array.from({ length: 10 }).map((_, idx) => (
              namesData.items[idx] ? (
                <ActorWidget key={`actor_${idx}`} idx={idx} nameId={namesData.items[idx].nameId} />
              ) : (
                <p key={`actor_placeholder_${idx}`}>Loading...</p> // Or display a loading message or placeholder
              )
            ))
               }        
          </Row>
        </Container>
      </Stack>
      <nav aria-label="Page navigation example">
    <ul class="pagination pagination-lg">
    <li class="page-item active" aria-current="page">
      </li>
        <li class="page-item"><a class="page-link" href="http://localhost:3000/top-50-people/page=0">1</a></li>
        <li class="page-item"><a class="page-link" href="http://localhost:3000/top-50-people/page=1">2</a></li>
        <li class="page-item"><a class="page-link" href="http://localhost:3000/top-50-people/page=2">3</a></li>
        <li class="page-item"><a class="page-link" href="http://localhost:3000/top-50-people/page=3">4</a></li>
        <li class="page-item"><a class="page-link" href="http://localhost:3000/top-50-people/page=4">5</a></li>
        <li class="page-item">
        </li>
      </ul>
    </nav>
  </>        
  );
};
export default TopFiftyActors;