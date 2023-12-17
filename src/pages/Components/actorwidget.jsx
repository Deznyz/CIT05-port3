import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


const ActorWidget = ({ idx, nameId }) => {
  const [namesData, setNamesData] = useState(null);

  useEffect(() => {
    const fetchNamesData = async () => {
      try {
        const namesResponse = await fetch(`http://localhost:5001/api/names/${nameId}`);
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
  }, [nameId])


  if (!namesData) {
    return null;
  }

  return (
    <Col style={{ marginBottom: '20px' }}>
      <Card style={{ width: '17rem', textDecoration: 'none' }}>
        <Link to={`/actor/${namesData.nameId}`} style={{ textDecoration: 'none' }}>
          <Card.Body style={{ color: 'black' }}>
            {namesData.name ? (
              <Card.Title>{namesData.name}</Card.Title>
            ) : (
              <Card.Title>PLACEHOLDER {idx+1}</Card.Title>                )}
              <Card.Subtitle className="mb-2 text-muted">Rating: {namesData.avgNameRating}</Card.Subtitle>
          </Card.Body>
        </Link>
      </Card>        
    </Col>
  );
};

export default ActorWidget;