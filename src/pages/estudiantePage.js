import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import docenteImage from '../images/user.png'; 
import leftImage from '../images/logoUnillanos.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/docentes.css';
import { jwtDecode } from "jwt-decode";

const DocentesPage = () => {
  const navigate = useNavigate();
  const [isPeriodoActivo, setIsPeriodoActivo] = useState(false);
  const [error, setError] = useState('');
  const [docentesCursos, setDocentesCursos] = useState([]); // Array para almacenar los datos de docente y curso

  const handleLogout = () => {
    sessionStorage.removeItem('authToken'); 
    sessionStorage.removeItem('client_id'); 
    navigate('/');
  };

  const handleCardClick = (nombreCurso, nombreDocente) => {
    const token = sessionStorage.getItem('authToken');
    const decodedToken = jwtDecode(token);
    const nombreEvaluador = decodedToken.username
    navigate('/encuesta_estudiante', { state: { nombreCurso, nombreDocente, nombreEvaluador } });  
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Verifica si hay un periodo de evaluación activo
        const responsePeriodo = await fetch('https://localhost:8080/periodoactivo');
        const periodoData = await responsePeriodo.json();
        console.log(periodoData);
        if (periodoData && periodoData.id_periodo_evl) {
          setIsPeriodoActivo(true);
          const token = sessionStorage.getItem('authToken');
          const response = await fetch('https://localhost:8080/docentes_asignados', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado Authorization
            }
          });

          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setDocentesCursos(data); // Almacenar los datos de docente y curso
          } else {
            setError('Error al obtener la respuesta del servidor.');
          }
        } 

      } catch (error) {
        setError('Error al obtener los datos del servidor.');
      }
    }
    fetchData();
  }, []);

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
            <h2>DOCENTES A EVALUAR</h2>
          </Col>
        </Row>
        {error && <Alert variant="danger">{error}</Alert>}
        {isPeriodoActivo ? (
          <Row>
            {docentesCursos.length > 0 ? (
              docentesCursos.map((docenteCurso, index) => (
                <Col key={index} xs={12} md={4} className="mb-4">
                  <Card onClick={() => handleCardClick(docenteCurso.nombre_curso, docenteCurso.nombre_docente)}> {/* Manejar el click para redirigir */}
                    <Card.Img variant="top" src={docenteImage} />
                    <Card.Body>
                      <Card.Title>{docenteCurso.nombre_docente}</Card.Title>
                      <Card.Text>{docenteCurso.nombre_curso}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <Alert variant="info">No hay docentes asignados actualmente.</Alert>
              </Col>
            )}
          </Row>
        ) : (
          <Row>
              <Col>
                <Alert variant="info">
                  Actualmente no hay un periodo de evaluación activo.
                </Alert>
              </Col>
            </Row>
        )}
      </Container>
    </div>
  );
}

export default DocentesPage;