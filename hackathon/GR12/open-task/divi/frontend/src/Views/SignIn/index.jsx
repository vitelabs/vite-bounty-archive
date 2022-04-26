import {
  Form,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import './styles.css';

const Login = () => {
  // integration
}

const CircleCardComponent = () => {
  return (
    <div className="Container">
      <Row className="mb-4">
        <div className="SignIn-Header">
          <h3> Sign In </h3>
        </div>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-5" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button onClick={() => Login()} className="Button" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default CircleCardComponent;
