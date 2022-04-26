import { Row, Button, Container, Carousel, Image, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Form, InputGroup } from 'react-bootstrap';
import Icon from '@mdi/react';  
import { mdiArrowLeft } from '@mdi/js';
import routes from '../../../router/routeList';
import './styles.css';

const PropertyView = () => {

  const purchaseProperty = () => {
    console.log('Clicked')
  }

  return (
    <Container fluid>
      <Row>
        <div className="Property-header">
            <Link className="link" to={routes.explore} > 
              <Icon className="Icon" path={mdiArrowLeft} size={1.8} />
            </Link>
            <mdiFilter />
            <Button onClick={() => purchaseProperty()}> Buy Now <mdiPlusCircleOutline /></Button>
        </div>
      </Row>
      <Row>
        <Col id="Image" className="col-6" lg={6} md={12} xs={12}>
        <Carousel className="Carousel">
            <Carousel.Item>
              <Image
                className="d-block w-100"
                src={'/images/example5.png'}
                alt="First slide"
                id="Image-View"
                thumbnail
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                className="d-block w-100"
                src={'/images/example4.png'}
                alt="Second slide"
                id="Image-View"
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                className="d-block w-100"
                src={'/images/example5.png'}
                alt="Third slide"
                id="Image-View"
              />
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col className="description" lg={6} md={12} xs={12} >
          <Card.Title className="Overflow-Main-Text-View" >
            Miami Penthouse - San Salvador
          </Card.Title>
          <Card.Text className="Overflow-Main-Text-View">
            Miami, FL- USA
          </Card.Text>
          <Card.Text className="Overflow-Second-Text-View">
            186.87 ETH/Night
          </Card.Text>
          <Card.Text className="Overflow-Second-Text-View">
            5 bed rooms
          </Card.Text>
          <Card.Text className="Overflow-Second-Text-View">
            3/12 Baths
          </Card.Text>
        </Col>
      </Row>
    </Container>
  );
}

export default PropertyView;
