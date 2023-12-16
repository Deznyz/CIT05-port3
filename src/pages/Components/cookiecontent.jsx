import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// Definerer komponenten Cookie
const CookieContent = ({ children }) => {

  // Deklarer en state variabel til at gemme user data
  const [userData, setUserData] = useState(null);

  // Bruger useEffect hook til at kører kode, når komponentet kaldes/mountes
  useEffect(() => {

    // Gemmer user cookie i variablen userCookie
    const userCookie = Cookies.get('user');

    if (userCookie) {
      try {
        // Parser JSON dataene fra userCookie og gemmer dem i parsedUserData
        const parsedUserData = JSON.parse(userCookie);
        
        // Sætter userData staten
        setUserData(parsedUserData);
      } catch (error) {
        console.error('Der skete en fejl i forsøget på at prase userCookie:', error);
      }
    }
  }, []); // Den tomme array sikrer at denne effect kun kører en enkelt gang

  // Render children (indholdet) hvis userData er true dvs. at cookie findes
  return userData ? children : null;
};

export default CookieContent;
