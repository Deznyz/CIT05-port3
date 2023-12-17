import React, { useState, useEffect } from 'react';
import CookieContent from './cookiecontent';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';



const Bookmark = ({type}) => {
  const {id} = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userData, setUserData] = useState(null);


  const toggleBookmark = () => {
    if(!isBookmarked){
      postBookmarksTitle();
    }else if(isBookmarked){
      deleteBookmarksTitle();
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
          const movieResponse = await fetch(`http://localhost:5001/api/${type}/${userData.userId}/${id}`);
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


    try{
      if(type=="bookmarkstitle"){
      const response = await fetch(`http://localhost:5001/api/bookmarkstitle`, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
            UserId : userId, 
            TitleId: id}),
      });
    }else if(type=="bookmarksname"){
      const response = await fetch(`http://localhost:5001/api/bookmarksname`, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
            UserId : userId, 
            NameId: id}),
      });
    }
    } catch (error) {
      console.error('Fejlbesked:', error);
      alert(`Der skete en fejl i forsøget på at sætte bookmark. Fejlbesked: ${error.message}`);
    }

  };

  //delete function
  const deleteBookmarksTitle = async () => {
    if (!userData.userId) {
      return;
    }
  
    const userId = userData.userId;
  
    try {
      if(type =="bookmarkstitle"){
      const response = await fetch(`http://localhost:5001/api/bookmarkstitle/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          UserId : userId, 
          TitleId: id}),
      });
    }else if(type=="bookmarksname"){
      const response = await fetch(`http://localhost:5001/api/bookmarksname`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          UserId : userId, 
          NameId: id}),
      });
    }
    } catch (error) {
      console.error('Error:', error);
      alert(`Der skete en fejl i forsøget på at slette bookmark. Fejlbesked: ${error.message}`);
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
