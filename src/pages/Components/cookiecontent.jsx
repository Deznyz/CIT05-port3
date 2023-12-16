import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// Definerer komponenten Cookie
const CookieContent = ({ children }) => {

  const [userData, setUserData] = useState(null); // Deklarer en state variabel til at gemme user data

  // Bruger useEffect hook til at kører kode, når komponentet kaldes/mountes
  useEffect(() => {

    const userCookie = Cookies.get('user'); // Gemmer user cookie i variablen userCookie

    if (userCookie) {
      try {
        const parsedUserData = JSON.parse(userCookie);
        setUserData(parsedUserData);
      } catch (error) {
        console.error('Der skete en fejl i forsøget på at userCookie:', error);
      }
    }
  }, []); // Den tomme array sikrer at denne effect kun kører en enkelt gang

  return userData ? children(userData) : null; // Render children (indholdet) hvis userData er true dvs. at cookie findes
};

export default CookieContent;
