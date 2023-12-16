import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Bookmark = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() =>{
    const userCookie = Cookies.get('user');

    const parsedUserData = JSON.parse(userCookie);
    setUserData(parsedUserData);
    
  },[]);


  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    userData && (
        
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
      )
    
  );
  
};

export default Bookmark;
