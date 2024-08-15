
//import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
//import Contact from './pages/Contact';
//import Aboutme from './pages/Aboutme';
//import Profile from './pages/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Row, Col, Form, Button } from 'react-bootstrap';


function App() {
  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" style={{ height: '20px' }}>
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="path_to_left_image.png"
              width="20"
              height="20"
              className="d-inline-block align-top"
              alt="Left logo"
            />
          </Navbar.Brand>
          <Navbar.Brand href="#home" className="ml-auto">
            <img
              src="path_to_right_image.png"
              width="20"
              height="20"
              className="d-inline-block align-top"
              alt="Right logo"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Login Form */}
      <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: 'calc(100vh - 20px)' }}>
        <Row>
          <Col xs={12}>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}


export default App;
