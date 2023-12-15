import React, { useState } from 'react';

const Bookmark = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
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
  );
};

export default Bookmark;
