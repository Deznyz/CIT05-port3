import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const RatingScale = () => {
  const [rating, setRating] = useState(null);

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Rate the Actor</Card.Title>
        <Card.Text>
          {rating ? `You rated: ${rating}` : 'Please rate this actor:'}
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
  );
};

export default RatingScale;
