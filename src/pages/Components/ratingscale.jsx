import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CookieContent from './cookiecontent';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';

const RatingScale = () => {
  const { id } = useParams(); 
  const [rating, setRating] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userCookie = Cookies.get('user');

    if (userCookie) {
      const parsedUserData = JSON.parse(userCookie);
      setUserData(parsedUserData);
    } else {
      // There is no user cookie
      console.log('There is no user cookie');
    }
  }, []);

  const handleRating = async (ratingValue) => {
    setRating(ratingValue);

    try {
      const response = await fetch('http://localhost:5001/api/userratings', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          UserRating: ratingValue,
          UserId: userData.userId,
          TitleId: id
        })
      });

      if (response.ok) {
        console.log('Alt er gået fint');
      } else {
        // Handle other server-side errors
        alert('Der skete en fejl');
      }
    } catch (error) {
      console.error('Fejlbesked:', error);
      alert(`Der skete en fejl i forsøget på at logge ind. Fejlbesked: ${error.message}`);
    }
  };

  return (
    <CookieContent>
      {(userData) => (
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Rate the title</Card.Title>
            <Card.Text>
              {rating ? `You rated: ${rating}` : 'Please rate this title:'}
            </Card.Text>
            <div>
              {[...Array(10)].map((_, index) => (
                <Button
                  key={index + 1}
                  variant={rating === index + 1 ? 'primary' : 'outline-secondary'}
                  onClick={() => handleRating(index + 1)}
                  style={{ margin: '5px' }}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </Card.Body>
        </Card>
      )}
    </CookieContent>
  );
};

export default RatingScale;
