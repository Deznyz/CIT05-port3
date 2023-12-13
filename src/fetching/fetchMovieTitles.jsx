import React, { useState, useEffect } from 'react';

function FetchMovieTitles({url}) {
  const [data, setData] = useState({ items: [] });

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch({url});
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
  }, []); // Empty dependency array to run effect only once
}

export default FetchMovieTitles;