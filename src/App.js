import './App.css';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Contact from './pages/Contact';
import Aboutme from './pages/Aboutme';
import Profile from './pages/Profile';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/contact">Contactos</Link>
              </li>
              <li>
              <Link to="/aboutme">About me</Link>
              </li>
              <li>
              <Link to="/profile">Profile</Link>
              </li>
            </ul>
          </div>
          <Routes>
            <Route path='/contact' element={<Contact />}></Route>
            <Route path='/aboutme' element={<Aboutme />}></Route>
            <Route path='/profile/:name' element={<Profile />}></Route>
          </Routes>
        </Router>
        <Container>
        <Row className="justify-content-center mt-5">
          <Col xs={10} sm={8} md={6}>
            <h2 className="text-center">Login</h2>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit" block>
                Submit
              </Button>
            </Form>
            <div className="mt-3 text-center">
              <a href="#">Forgot Password?</a>
            </div>
          </Col>
        </Row>
       </Container>
      </header>
    </div>
  );
}


export default App;
