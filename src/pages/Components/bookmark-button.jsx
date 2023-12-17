import React, { useState } from 'react';
import CookieContent from './cookiecontent';

const Bookmark = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
<<<<<<< Updated upstream
=======
    if(!isBookmarked){
        postBookmarksTitle();
    }else if(isBookmarked){
        deleteBookmarksTitle();
    }
>>>>>>> Stashed changes
    setIsBookmarked(!isBookmarked);
  };

// to lmabda funciton post and delete bookmarks

// toggle on = psot
// toggle off = delete

<<<<<<< Updated upstream
// Hent titleId fra URL
=======
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

  //delete function
  const deleteBookmarksTitle = async () => {
    if (!userData?.userId || !id) {
      return;
    }
  
    const userId = userData.userId;
  
    try {
      const response = await fetch(`http://localhost:5001/api/bookmarkstitle/${userId}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (response.ok) {
        // Bookmark successfully deleted, handle as needed
      } else {
        // Handle non-OK responses here if required
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`An error occurred while deleting the bookmark: ${error.message}`);
    }
  };
  

>>>>>>> Stashed changes

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
