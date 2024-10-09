import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import docenteImage from '../../images/user.png'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/docentes.css';
import { jwtDecode } from "jwt-decode";
import Sidebar from '../../componentes/sidebar/sidebar_est';

const DocentesPage = () => {
  const navigate = useNavigate();
  const [isPeriodoActivo, setIsPeriodoActivo] = useState(false);
  const [error, setError] = useState('');
  const [docentesCursos, setDocentesCursos] = useState([]); // Array para almacenar los datos de docente y curso
  const [Evaluados, setEvaluados] = useState([]);

  const handleCardClick = (nombreCurso, nombreDocente) => {
    const nn = nombreCurso
    if (!Evaluados.includes(nn)) {
      const token = sessionStorage.getItem('authToken');
      const decodedToken = jwtDecode(token);
      const nombreEvaluador = decodedToken.username
      navigate('/encuesta_estudiante', { state: { nombreCurso, nombreDocente, nombreEvaluador } });  
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
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
              'Authorization': `Bearer ${token}`, 
            }
          });

          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setDocentesCursos(data); 
          } else {
            setError('Error al obtener la respuesta del servidor.');
          }

          const respon = await fetch('https://localhost:8080/cursos_evaluados', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, 
            }
          });

          if (respon.ok){
            const datah = await respon.json();
            console.log(datah)
            setEvaluados(datah.cursos_evaluados)
          } else {
            const datah = await respon.json();
            setEvaluados(datah || []);
            setError('Error al obtener cursos evaluados')
          }
        } 

      } catch (error) {
        setError('Error al obtener los datos del servidor.');
      }
    }
    fetchData();
  }, []);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar /> 

      {/* Page Content */}
      <div className="main-content p-4" style={{ flexGrow: 1 }}>
        <Navbar bg="dark" variant="dark" style={{ height: '70px' }}>
            <Container>
              <Navbar.Brand href="#home">
                DOCENTES A EVALUAR
              </Navbar.Brand>
            </Container>
        </Navbar>
        <Container style={{ marginTop: '20px' }}>
          {error && <Alert variant="danger">{error}</Alert>}
          {isPeriodoActivo ? (
            <Row>
              {docentesCursos.length > 0 ? (
                docentesCursos.map((docenteCurso, index) => (
                  <Col key={index} xs={12} md={4} className="mb-4">
                    <Card onClick={() => handleCardClick(docenteCurso.nombre_curso, docenteCurso.nombre_docente)}
                      style={{
                        cursor: Evaluados.includes(docenteCurso.nombre_curso) ? 'not-allowed' : 'pointer',
                        border: Evaluados.includes(docenteCurso.nombre_curso) ? '2px solid green' : '',
                        width: '250px',  
                        height: '360px', 
                      }}
                      > {/* Manejar el click para redirigir */}
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
    </div>
  );
}

export default DocentesPage;