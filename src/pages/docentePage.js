import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Button, Row, Col, Card, Table } from 'react-bootstrap';
import docenteImage from '../images/user.png'; 
import leftImage from '../images/logoUnillanos.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/docentes.css';

const EvaluacionDocentePage = () => {
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
            <h2>EVALUACIÓN DOCENTE EN CURSO</h2>
          </Col>
        </Row>
        <Row>
          {Array.from({ length: 9 }).map((_, index) => (
            <Col key={index} xs={12} md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={docenteImage} />
                <Card.Body>
                  <Card.Title>Curso {index + 1}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Historial de Evaluaciones */}
        <Row>
          <Col>
            <h2>Historial de Evaluaciones</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Periodo Académico</th>
                  <th>Fecha Finalizado</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2024-1</td>
                  <td>15/06/2024</td>
                  <td>Evaluación del primer periodo del 2024</td>
                </tr>
                <tr>
                  <td>2023-2</td>
                  <td>20/12/2023</td>
                  <td>Evaluación del segundo periodo del 2023</td>
                </tr>
                {/* Añade más filas según sea necesario */}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}


export default EvaluacionDocentePage;
