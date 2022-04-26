import React from "react";
import { Row, Container, Col, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import './styles.css'
  
const Footer = () => {
  const sendEmail = () => {
    clearField();
    console.log('Clicked')
  }

  const clearField = () => {
    console.log('Clear email')
  }

  return (
    <div className="Box">
      <Container className="Footer-Container">
        <Row >
          <Col xs={12} md={9} className="col-9">
            <div>
              <Row className="mb-3">
                <h1 className="Title"> <strong> Get the latest updates on Divi-DAO </strong> </h1>
              </Row>
              <Row className="mb-3">
                <InputGroup className="mb-3">
                  <FormControl
                    id="Get-In"
                    placeholder="Your e-mail"
                    aria-label="Email"
                    aria-describedby="basic-addon2"
                  />
                  <InputGroup.Text 
                    id="Im-In" 
                    onClick={() => sendEmail()} 
                  > I'm In 
                  </InputGroup.Text>
                </InputGroup>
              </Row>
              <Row className="mb-3">
                <div className="Icons" >
                  <a href="https://twitter.com/divi_dao">
                    <img className="Icon" src="/images/purpleTwitter.png" alt="Logo"/>
                  </a>
                  <a href="https://twitter.com/divi_dao">
                    <img className="Icon" src="/images/purpleMedium.png"  alt="Logo" />
                  </a>
                  <a href="https://twitter.com/divi_dao">
                    <img className="Icon" src="/images/purpleDiscord.png" alt="Logo" />
                  </a>
                </div>
              </Row>
            </div>
          </Col>
          <Col xs={12} md={2} className="col-2" id="Column">
            <header className="Heading"> Resources </header>
            <a href="/explore">
              <span> About </span>
            </a>
            <a href="https://twitter.com/divi_dao">
              <span> Twitter </span>
            </a>
            <a href="/explore">
              <span> Discord </span>
            </a>
            <a href="/explore">
              <span> Explore Properties </span>
            </a>
            <a href="/explore">
              <span> Sel your property </span>
            </a>
            <a href="/explore">
              <span> Smart contract </span>
            </a>
            <a href="/explore">
              <span> Contact us </span>
            </a>
            <Dropdown.Divider />
          </Col>
          <Row>
            <div className="Policy">
              <p> Divi-DAO, All rights reserved </p>
              <p> Privacy Policy                </p>
              <p> Terms of service              </p> 
            </div>
          </Row>
        </Row>
      </Container>
    </div>
  );
};
export default Footer;