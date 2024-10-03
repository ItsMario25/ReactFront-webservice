import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Button, Row, Col, Card, Alert, Table } from 'react-bootstrap';
import leftImage from '../images/logoUnillanos.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/docentes.css';

const AsignacionDocentesPage = () => {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [cursosAsignados, setCursosAsignados] = useState([]);
  const [isPeriodoActivo, setIsPeriodoActivo] = useState(false);
  const [isPeriodoAc, setIsPeriodoAc] = useState(false);
  const [error, setError] = useState('');
  const [reportData, setReportData] = useState([]);


  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('client_id');
    navigate('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
       // Realiza la solicitud para verificar si el periodo académico está activo
        const token = sessionStorage.getItem('authToken');
        const dataa = await fetch('https://localhost:8080/periodos_facultad', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          },
        });
        const responsePeriodoAC = await fetch('https://localhost:8080/periodoAcactivo');
        const periodoDataC = await responsePeriodoAC.json();

        if (dataa.ok){
          const formattedData = await dataa.json();
          console.log(formattedData)
          setReportData(formattedData);
        }

        if (periodoDataC && periodoDataC.id_periodo_acad){
          setIsPeriodoAc(true)
          // Verifica si hay un periodo de evaluación activo
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

        const responseAsignados = await fetch('https://localhost:8080/cursos_asignados');
        const cursosAsignadosData = await responseAsignados.json();
        
        
        
        if (cursosAsignadosData){
          console.log(cursosAsignadosData.cursos_asignados)
          setCursosAsignados(cursosAsignadosData.cursos_asignados);
        } else {
          setCursosAsignados(cursosAsignadosData.cursos_asignados || []);
        }
      } catch (error) {
        setError('Error al obtener los datos del servidor.');
      }
    };

    fetchData();
  }, [isPeriodoActivo]);

  // Función para redirigir al hacer clic en una tarjeta
  const handleCardClick = (idCurso) => {
    if (!cursosAsignados.includes(idCurso)) {
      navigate(`/asignar_curso/${idCurso}`);
    }
  };

  const handleEnviarReporte = async (periodo) => {
    try {
      const token = sessionStorage.getItem('authToken');
      const response = await fetch('https://localhost:8080/reporte_general', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({ periodo_academico: periodo}) 
      });
  
      if (response.ok) {
        const blob = await response.blob(); // Recibir el archivo como un blob (PDF)

        // Crear una URL para el archivo PDF
        const url = window.URL.createObjectURL(blob);
        
        // Crear un enlace <a> invisible para descargar el archivo
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Reporte_individual_evaluacion.pdf'; // Nombre del archivo que se descargará
        document.body.appendChild(a);
        a.click();

        // Limpiar la URL y remover el enlace
        window.URL.revokeObjectURL(url);
        a.remove();

        console.log("Reporte descargado exitosamente.");
      } else {
        setError('Error al generar el reporte.');
      }
    } catch (error) {
      setError('Error al conectarse al servidor.');
      console.log(error);
    }
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
      {isPeriodoAc ? (
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
                  <Card
                    onClick={() => handleCardClick(curso.IDCurso)}
                    style={{
                      cursor: cursosAsignados.includes(curso.IDCurso) ? 'not-allowed' : 'pointer',
                      border: cursosAsignados.includes(curso.IDCurso) ? '2px solid red' : ''
                    }}
                  >
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
              Actualmente no hay un periodo académico vigente.
            </Alert>
          </Col>
        </Row>
      )}
      {/* Reports Section */}
      <Container style={{ marginTop: '20px' }}>
      <h2>Historial</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Periodo evaluacion</th>
              <th>Fecha de inicio</th>
              <th>Fecha final</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((report, index) => (
              <tr key={index}>
                <td>{report.id_periodo_evl}</td>
                <td>{new Date(report.fecha_inicio).toLocaleDateString()}</td>
                <td>{new Date(report.fecha_final).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="primary"
                      onClick={() => handleEnviarReporte(report.id_periodo_evl)}
                  >
                    Descargar Reporte
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default AsignacionDocentesPage;