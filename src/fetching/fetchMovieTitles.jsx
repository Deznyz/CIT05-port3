import React, { useState, useEffect } from 'react';

function FetchMovieTitles({url}) {
  const [data, setData] = useState({ items: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch({url});
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();  
  }, []);
}

export default FetchMovieTitles;