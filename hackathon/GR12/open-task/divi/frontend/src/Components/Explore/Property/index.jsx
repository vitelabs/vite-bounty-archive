import { Container, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './styles.css'

const ExploreCard = (props) => {
  const navigate = useNavigate();

  const exploreView = () => {
    navigate(`/property/${props.propertyId}`)
  }

  return (
    <div className="Property">
      <Card onClick={() => exploreView()}  style={{ width: '18rem', borderRadius: "10%", cursor: "pointer" }}>
        <Card.Img className="Card-Image" src={ props.image } />
        <Container>
          <Col>
            <Row className="md-5">
              <div style={{display: "flex", marginTop: "1rem"}}>
                <Card.Title className="Overflow-Main-Text" > 
                  { props.title }
                </Card.Title>
                <Card.Text className="Overflow-Main-Text">  
                  { props.price  } 
                </Card.Text>
              </div>
            </Row>
            <Row className="md-5">
              <div style={{display: "flex"}}>
                <span className="Overflow-Second-Text">  
                  { props.text  } 
                </span>
                <span className="Overflow-Second-Text">  
                  { props.rooms  } 
                </span>
              </div>
            </Row>
          </Col>
        </Container>
      </Card>
    </div>
  );
}

export default ExploreCard;
