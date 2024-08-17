import React from 'react';
import { Navbar, Container, Button, Row, Col, Card } from 'react-bootstrap';
import docenteImage from '../images/user.png'; // Asegúrate de tener esta imagen en la carpeta correcta
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/docentes.css';

const DocentesPage = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" style={{ height: '20px' }}>
        <Container>
          <Navbar.Brand href="#home" className="ml-auto">
            <Button variant="outline-light">Salir</Button>
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Page Content */}
      <Container style={{ marginTop: '20px' }}>
        <Row>
          <Col>
            <h2>DOCENTES A EVALUAR</h2>
          </Col>
        </Row>
        <Row>
          {Array.from({ length: 9 }).map((_, index) => (
            <Col key={index} xs={12} md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={docenteImage} />
                <Card.Body>
                  <Card.Title>Docente {index + 1}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default DocentesPage;
