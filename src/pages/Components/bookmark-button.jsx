import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Bookmark = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeCookie, setActiveCookie] = useState();

  useEffect(() =>{
    const userIdCookie = Cookies.get('userId');
    console.log("userIdCookie:" + userIdCookie);
    setActiveCookie(userIdCookie);
    
  },[]);


  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    activeCookie && (
        
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
