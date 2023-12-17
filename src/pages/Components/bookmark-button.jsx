import React, { useState } from 'react';
import CookieContent from './cookiecontent';

const Bookmark = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

// to lmabda funciton post and delete bookmarks

// toggle on = psot
// toggle off = delete

// Hent titleId fra URL

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
