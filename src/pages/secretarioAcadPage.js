import React from 'react';
import { Navbar, Container, Button, Row, Col, Form } from 'react-bootstrap';
import leftImage from '../images/logoUnillanos.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/docentes.css';

const AsignacionDocentesPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('authToken'); 
    sessionStorage.removeItem('client_id'); 
    navigate('/');
  };

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
            <Button variant="outline-light" onClick={handleLogout}>Salir</Button>
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Page Content */}
      <Container style={{ marginTop: '20px' }}>
        <Row>
          <Col>
            <h2>Asignación de Docentes</h2>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={4}>
            <Form.Group controlId="docenteSelect">
              <Form.Label>Seleccione Docente</Form.Label>
              <Form.Control as="select">
                <option>Docente 1</option>
                <option>Docente 2</option>
                <option>Docente 3</option>
                {/* Añade más opciones según sea necesario */}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="estudianteSelect">
              <Form.Label>Seleccione Estudiante</Form.Label>
              <Form.Control as="select">
                <option>Estudiante 1</option>
                <option>Estudiante 2</option>
                <option>Estudiante 3</option>
                {/* Añade más opciones según sea necesario */}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="cursoSelect">
              <Form.Label>Seleccione Curso</Form.Label>
              <Form.Control as="select">
                <option>Curso 1</option>
                <option>Curso 2</option>
                <option>Curso 3</option>
                {/* Añade más opciones según sea necesario */}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AsignacionDocentesPage;
