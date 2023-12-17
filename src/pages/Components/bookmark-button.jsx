import React, { useState, useEffect } from 'react';
import CookieContent from './cookiecontent';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';



const Bookmark = () => {
  const {id} = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userData, setUserData] = useState(null);

  const toggleBookmark = () => {
    if(!isBookmarked){
        postBookmarksTitle();
    }else if(isBookmarked){

    }
    setIsBookmarked(!isBookmarked);
    
  };

  //get function
  useEffect(() => {
    const userCookie = Cookies.get('user');

    if (userCookie) {
      const parsedUserData = JSON.parse(userCookie);
      setUserData(parsedUserData);
    }
  }, []);

  useEffect(() => {
    const fetchBookmarkTitleData = async () => {
      try {
        if (userData && userData.userId) { // Check if userData and userId exist
          const movieResponse = await fetch(`http://localhost:5001/api/bookmarkstitle/${userData.userId}/${id}`);
          if (!movieResponse.ok) {
            throw new Error('Network response was not ok.');
          }
          const movieJsonData = await movieResponse.json();

          // Check if there's data fetched and set isBookmarked accordingly
          if (movieJsonData && Object.keys(movieJsonData).length > 0) {
            setIsBookmarked(true);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBookmarkTitleData();
  }, [id, userData]);

  //post function
  const postBookmarksTitle = async (e) => {
    if(!userData.userId){
        return;
    }
    
    const userId = userData.userId;
    const titleId = id;

    try{
      const response = await fetch('http://localhost:5001/api/bookmarkstitle', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
            UserId : userId, 
            TitleId: titleId}),
      });

      if (response.ok) {

        const bookmarkData = await response.json();
  
          // Vi laver et objekt, der indeholder både userId og titleId
          const bookmarkObject = {
            userId: userId,
            titleId: titleId,
          };
        }
    } catch (error) {
      console.error('Fejlbesked:', error);
      alert(`Der skete en fejl i forsøget på at sætte bookmark. Fejlbesked: ${error.message}`);
    }

  };



  return (
    <CookieContent>
      {(userData) => (
        <button
          onClick={toggleBookmark}
          style={{
            float: 'right',
            backgroundColor: isBookmarked ? 'green' : 'red',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </button>
      )}
    </CookieContent>
  );
};

export default Bookmark;
