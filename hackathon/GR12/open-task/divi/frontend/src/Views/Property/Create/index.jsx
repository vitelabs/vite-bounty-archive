import { Container, Button, Row, Col, Form, InputGroup, Image } from 'react-bootstrap';
import { useState } from 'react';
import './styles.css';
import Web3 from "web3";
import contract from '../../../contract/contract.json';

function PropertyCreate() {
  const [image, setImage] = useState("");
  const [validated, setValidated] = useState(false);
  const [price, setPrice] = useState(0);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    // call the smart contract to create the property on chain.
    console.log('Creating new Property with Smart Contract')
    const web3 = new Web3(Web3.givenProvider)// || "https://localhost:3000") //TODO: understand this or switch to alchemy
    console.log('current provider: ', web3.currentProvider)
    const accounts = await web3.eth.getAccounts()
    console.log('accounts" ', accounts)
    console.log('using account: ', accounts[0])
    const diviContract = new web3.eth.Contract(contract.abi, contract.address)
    console.log('contract: ', diviContract)
    await diviContract.methods.createProperty(price).send({from: accounts[0]}) //TODO: allow floats to be inputed here.

    //test
    setValidated(true); //TODO: not okay to have setValidated to true after call to smart contract, but otherwise
                        // the smart contract is not being called.
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
   }

  return (
    <Container fluid>
      <Row>
        <div className="Property-header">
          <h3> Create Property </h3>
        </div>
      </Row>
      <Row>
        <Col id="Image" className="col-6" lg={6} md={12} xs={12}>
          <Image style={{ width: "70%", height: "auto" }} 
            fluid
            src={ image }
            className="Property-Image"
          />
          <Form className="form" noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-4">
              <Form.Group md="5" controlId="formFile">
                <Form.Label> Image </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control 
                    required
                    type="file"
                    multiple
                    onChange={ onImageChange }
                  />
                  <Form.Control.Feedback type="invalid">
                    Required Field.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
          </Form>
        </Col>
        <Col lg={6} md={12} xs={12} >
          <Form className="form" noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-4">
              <Form.Group md="10" controlId="validationCustom01">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Price"
                  onChange={(event) => setPrice(event.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                    Required Field.
                  </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group md="10" controlId="validationCustom02">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Location"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                    Required Field.
                  </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group md="10" controlId="validationCustomNumberOfBeds">
                <Form.Label>Number Of Beds</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="Number Of Beds"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Required Field.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group md="10" controlId="validationCustom03">
                <Form.Label>Number Of Baths</Form.Label>
                <Form.Control type="text" placeholder="Number Of Baths" required />
                <Form.Control.Feedback type="invalid">
                  Required Field.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="mb-4">
              <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
            <Button type="submit">Submit form</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default PropertyCreate;
