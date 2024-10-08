import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import docenteImage from '../../images/user.png'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../../componentes/sidebar_ev';
import '../../css/docentes.css';
import { jwtDecode } from "jwt-decode";

const FacultadPage = () => {
  const navigate = useNavigate();
  const [isPeriodoActivo, setIsPeriodoActivo] = useState(false);
  const [error, setError] = useState('');
  const [docentes, setDocentes] = useState([]);
  const [Evaluados, setEvaluados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePeriodo = await fetch('https://localhost:8080/periodoactivo');
        const periodoData = await responsePeriodo.json();
        if (periodoData && periodoData.id_periodo_evl) {
          setIsPeriodoActivo(true);
          const token = sessionStorage.getItem('authToken');
          
          const response = await fetch('https://localhost:8080/docentes_facultad', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          });

          if (response.ok) {
            const data = await response.json();
            setDocentes(data);
          } else {
            setError('Error al obtener la respuesta del servidor.');
          }

          const respon = await fetch('https://localhost:8080/docentes_evaluados', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          });

          if (respon.ok){
            const datah = await respon.json();
            setEvaluados(datah.docentes_evaluados)
          } else {
            const datah = await respon.json();
            setEvaluados(datah || []);
            setError('Error al obtener docentes evaluados');
          }
        } 
      } catch (error) {
        setError('Error al obtener los datos del servidor.');
      }
    }
    fetchData();
  }, []);

  const handleCardClick = (nombreDocente) => {
    if (!Evaluados.includes(nombreDocente)) {
      const token = sessionStorage.getItem('authToken');
      const decodedToken = jwtDecode(token);
      const nombreEvaluador = decodedToken.username;
      navigate('/encuesta_facultad', { state: {nombreDocente, nombreEvaluador } }); 
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar /> 

      {/* Main content */}
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
              {docentes.length > 0 ? (
                docentes.map((docente, index) => (
                  <Col key={index} xs={12} md={4} className="mb-4">
                    <Card
                      onClick={() => handleCardClick(docente)}
                      style={{
                        cursor: Evaluados.includes(docente) ? 'not-allowed' : 'pointer',
                        border: Evaluados.includes(docente) ? '2px solid green' : '',
                        width: '250px',  // Ajusta el ancho
                        height: '340px', // Ajusta el alto
                      }}
                    >
                      <Card.Img variant="top" src={docenteImage} />
                      <Card.Body>
                        <Card.Title>{docente}</Card.Title>
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

export default FacultadPage;
