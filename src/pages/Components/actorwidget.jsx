import placeholder from '../../placeholder 305x160.svg';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const ActorWidget = ({ idx, data }) => {
  const name = data.items[idx+5];

  if (!name) {
    return null; // Or display an alternative content/error message
  }

  return (
    <Col>
      <Link to={`/actor/${name.nameId}`} style={{ textDecoration: 'none' }}>
            <Card style={{ width: '17rem' }}>
              <Card.Body>
                <Card.Title>{name.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Rating:</Card.Subtitle>
                <Card.Text>
                  {name.avgNameRating}
                </Card.Text>
              </Card.Body>
            </Card>
            </Link>
          </Col>
  );
};

export default ActorWidget;