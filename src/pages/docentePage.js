import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Button, Row, Col, Table, Alert } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";
import leftImage from '../images/logoUnillanos.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/docentes.css';

const EvaluacionDocentePage = () => {
  const navigate = useNavigate();
  const [isPeriodoActivo, setIsPeriodoActivo] = useState(false);
  const [error, setError] = useState('');
  const [Cursos, setCursos] = useState([]);
  const [IsEvaluate, setEvaluate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePeriodo = await fetch('https://localhost:8080/periodoactivo');
        const periodoData = await responsePeriodo.json();
        console.log(periodoData)
        if (periodoData && periodoData.id_periodo_evl) {
            setIsPeriodoActivo(true);
            const token = sessionStorage.getItem('authToken');
            const response = await fetch('https://localhost:8080/cursos_ejerciendo', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado Authorization
              }
            });

            if (response.ok) {
              const data = await response.json();
              console.log(data);
              setCursos(data)
            } else {
              setError('Error al obtener la respuesta del servidor.');  
            }

            const responsebool = await fetch('https://localhost:8080/ejerciendo', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado Authorization
              }
            });
            setEvaluate(responsebool.ok)
            

        } 
      } catch (error) {
        setError('Error al obtener los datos del servidor.');
        console.log(error)
      }
    };

    fetchData();
  }, [isPeriodoActivo]);

  const handleLogout = () => {
    sessionStorage.removeItem('authToken'); 
    sessionStorage.removeItem('client_id'); 
    navigate('/');
  };

  const handleButtonClick = () => {
    const token = sessionStorage.getItem('authToken');
    const decodedToken = jwtDecode(token);
    const nombreDocente = decodedToken.username
    navigate('/autoevaluacion', { state: { nombreDocente } }); 
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

      {error && <Alert variant="danger">{error}</Alert>}
      {/* Page Content */}
      {isPeriodoActivo ? (
            <Container style={{ marginTop: '20px' }}>
            <Row>
              <Col>
                <h2>EVALUACIÓN DOCENTE EN CURSO</h2>
              </Col>
            </Row>
            <Row>
            {Cursos.length > 0 ? (
              <Row className="mb-4">
                {IsEvaluate ? (
                  <Col>
                    <div className="button-box">
                      <Button
                        variant={"primary"} 
                        onClick={handleButtonClick}
                        block="false"
                      >
                        Realizar autoevaluación
                      </Button>
                    </div>
                  </Col>
                ) : (
                  <Col>
                    <Alert variant="info">AUTO EVALUACION REALIZADA.</Alert>
                  </Col>
                )}
            </Row>
            ) : (
              <Col>
                <Alert variant="info">NO ESTA EJERCIENDO EN EL PERIODO ACTUAL.</Alert>
              </Col>
            )}
            </Row>
            </Container>
          ) : (
            <Container style={{ marginTop: '20px' }}>
              <Row>
                <Col>
                  <Alert variant="info">
                    ACTUALMENTE NO HAY UN PERIODO DE EVALUACIÓN ACTIVO.
                  </Alert>
                </Col>
              </Row>
            </Container>
      )}

        {/* Historial de Evaluaciones */}
        <Container style={{ marginTop: '10px' }}>
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
