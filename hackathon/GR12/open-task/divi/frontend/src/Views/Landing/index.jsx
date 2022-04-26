import { Container, Row, Col, Button } from 'react-bootstrap';
import routes from '../../router/routeList';
import { Link } from 'react-router-dom';
import './styles.css'

const App = () => {
  return (
    <Container>
      <Row className="mb-5">
        <Col xs={12} md={6} className="col-5" id="Landing-Right">
          <Row className="mb-5">
          <p className="Paragraph">
              <strong> Real Estate Needs
                <span style={{ color: "blue" }}> Disruption </span>
              </strong>
            </p>
          </Row>
          <Row className="mb-5">
            <p className="Second-Paragraph"> Fractionalized, on-chain ownership disrupts hard. Find out what’s now possible </p>
            <div style={{ display: "flex" }}>
              <Button id="Landing-Button" size="sm">
                <Link to={routes.explore} >        Buy Property </Link> 
              </Button>
              <Button id="Landing-Button" size="sm"> 
                <Link to={routes.propertyCreate} > Sell Property </Link> 
              </Button>
            </div>
          </Row>
        </Col>
        <Col id="Landing-Left" md={4} className="col-4">
          <Row style={{display: "flex", justifyContent: "center", alignContent: "center"}}>
            <Button style={{
              color: "white",
              border: "1px solid white",
              borderRadius: "30px",
              width: "70%",
              marginTop: "1rem"
            }} className="Landing-Connect" href={routes.signIn}> Connect With Metamask </Button >
          </Row>
          <img className="Landing-Photo" src="/images/landingImage.png" alt="Logo" />
        </Col>
      </Row>
    </Container>
  ); 
}

export default App;
 