import placeholder from '../../placeholder 305x160.svg';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const MovieWidget = ({ idx, data }) => {
  const movie = data.items[idx];

  if (!movie) {
    return null; // Or display an alternative content/error message
  }
  return (
    <Col>
      <Link to={`/movie/${movie.titleId}`} style={{ textDecoration: 'none' }}>
        <Card key={idx} style={{ width: '17rem' }}>
          <Card.Img variant="top" src={placeholder} />
          <Card.Body>
            <Card.Title>{movie.primaryTitle}</Card.Title>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default MovieWidget;
