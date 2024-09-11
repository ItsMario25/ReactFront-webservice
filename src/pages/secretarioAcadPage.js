import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import leftImage from '../images/logoUnillanos.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/docentes.css';

const AsignacionDocentesPage = () => {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [isPeriodoActivo, setIsPeriodoActivo] = useState(false);
  const [isPeriodoAc, setIsPeriodoAc] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('client_id');
    navigate('/');
  };

  // Simulación de consulta al backend para verificar si el periodo de evaluación está activo y obtener los cursos
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realiza la solicitud para verificar si el periodo de evaluación está activo
        const responsePeriodoAC = await fetch('https://localhost:8080/periodoAcactivo');
        const periodoDataC = await responsePeriodoAC.json();

        if (periodoDataC && periodoDataC.id_periodo_acad){
          setIsPeriodoAc(true)
          const responsePeriodo = await fetch('https://localhost:8080/periodoactivo');
          const periodoData = await responsePeriodo.json();

          if (periodoData && periodoData.id_periodo_evl) {
              setIsPeriodoActivo(true);
          } 
        }

        if (!isPeriodoActivo) {
          // Si no hay periodo activo, obtiene los cursos asociados a la facultad del secretario
          const responseCursos = await fetch('https://localhost:8080/cursos_facultad');
          const cursosData = await responseCursos.json();
          setCursos(cursosData);
        }
      } catch (error) {
        setError('Error al obtener los datos del servidor.');
      }
    };

    fetchData();
  }, [isPeriodoActivo]);

  // Función para redirigir al hacer clic en una tarjeta
  const handleCardClick = (idCurso) => {
    navigate(`/asignar_curso/${idCurso}`);
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
      { isPeriodoAc ? (
        <Container style={{ marginTop: '20px' }}>
        <Row>
          <Col>
            <h2>Asignación de Cursos</h2>
          </Col>
        </Row>

        {error && <Alert variant="danger">{error}</Alert>}

        {isPeriodoActivo ? (
          <Row>
            <Col>
              <Alert variant="info">
                Actualmente hay un periodo de evaluación activo. No se pueden asignar cursos en este momento.
              </Alert>
            </Col>
          </Row>
        ) : (
          <Row>
            {cursos.map((curso, index) => (
              <Col key={index} xs={12} md={4} className="mb-4">
                <Card onClick={() => handleCardClick(curso.IDCurso)} style={{ cursor: 'pointer' }}>
                  <Card.Body>
                    <Card.Title>{curso.IDCurso}</Card.Title>
                    <Card.Text>Curso: {curso.NombreCurso}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
      ) : (
      <Row>
        <Col>
          <Alert variant="info">
            Actualmente no hay un periodo academico vigente. 
          </Alert>
        </Col>
      </Row>
      )}
      
    </div>
  );
};

export default AsignacionDocentesPage;
