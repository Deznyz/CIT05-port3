import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import CookieContent from './Components/cookiecontent';
import SiteNavbar from './Components/navbar';

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userCookie = Cookies.get('user');

    if (userCookie) {
      const parsedUserData = JSON.parse(userCookie);
      setUserData(parsedUserData);
    } else {
      // Redirect to the home page if the user cookie is not found
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <SiteNavbar />
      <CookieContent>
        {(userData) => (
          <>
            <h1>User Profile Page</h1>
            <p>Welcome, {userData.username}!</p>
          </>
        )}
      </CookieContent>
    </div>
  );
};

export default UserProfile;
