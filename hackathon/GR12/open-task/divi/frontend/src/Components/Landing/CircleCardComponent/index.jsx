import { Container, Row, Col, Image } from 'react-bootstrap';
import './styles.css';

const CircleCardComponent = () => {
  return (
    <Container>
      <header className="title">Contributors</header>
      <Row className="contributors">
        <Col lg={2} xl={2} sm={2} md={2} xs={7} >
          <Image className="circular" src={'/images/example4.png'} fluid />
        </Col>
        <Col lg={2} xl={2} sm={2} md={2} xs={7} >
          <Image className="circular" src={'/images/example4.png'} fluid />
        </Col>
        <Col lg={2} xl={2} sm={2} md={2} xs={7} >
          <Image className="circular" src={'/images/example4.png'} fluid />
        </Col>
      </Row>
    </Container>
  );
}

export default CircleCardComponent;
