import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SiteNavbar from './Components/navbar';
import placeholder from '../placeholder 305x160.svg';

const Movie = () => {
  const { id } = useParams(); 

  const [data, setData] = useState({ items: [] });
  const [data2, setData2] = useState({ items: [] });


  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/movietitles/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const jsonData = await response.json();
        setData(jsonData); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the function when the component mounts  
    
    
        // Function to fetch data from the API
        const fetchData2 = async () => {
          try {
            const response2 = await fetch(`http://localhost:5001/api/frontend/${id}`);
            if (!response2.ok) {
              throw new Error('Network response was not ok.');
            }
            const jsonData2 = await response2.json();
            setData(jsonData2); // Update state with fetched data
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData2();
  }, []); // Empty dependency array to run effect only once

  


  // Render the details
  return (
    <>
    <SiteNavbar/>
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4 mb-3">
          <img src={data2.items.poster} alt="Movie Poster" className="img-fluid" style={{ width: '300px', height: '300px' }}/>
        </div>
        <div className="col-md-8">
          <h2>{data.primaryTitle}</h2>
          <p>{data2.items.plot}</p>
          <hr className="text-white" />
            <h4>Actors:</h4>
            <ul>
                <li>actor</li>
            </ul>
        </div>
      </div>
    </div>
    </>
  );
};

export default Movie;