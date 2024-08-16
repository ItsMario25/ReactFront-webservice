
//import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import leftImage from './images/cyseth.jpeg';
import rightImage from './images/logoUnillanos.png';
import iconImage from './images/user.png';
import { Navbar, Container, Row, Col, Form, Button } from 'react-bootstrap';
import './css/login.css';

function App() {
  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" style={{ height: '100px' }}>
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={leftImage}
              width="145"
              height="70"
              className="d-inline-block align-top"
              alt="Left logo"
            />
          </Navbar.Brand>
          <Navbar.Brand href="#home" className="ml-auto">
            <img
              src={rightImage}
              width="145"
              height="70"
              className="d-inline-block align-top"
              alt="Right logo"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Login Form */}
      <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: 'calc(100vh - 170px)' }} >
        <Row>
          <Col xs={12} md={12} lg={12} className="login-form">
            <Form>
              <div className="text-center">
                <img src={iconImage} alt="User Icon" className="user-icon" />
              </div>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Usuario</Form.Label>
                <Form.Control type="text" placeholder="Ingrese Usuario" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="*******" />
              </Form.Group>

              <div className="d-flex justify-content-center mt-4">
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
