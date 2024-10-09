import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Button, Row, Col, Table, Alert, Form } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/docentes.css';
import Sidebar from '../../componentes/sidebar/sidebar_doc';

const EvaluacionDocentePage = () => {
  const navigate = useNavigate();
  const [isPeriodoActivo, setIsPeriodoActivo] = useState(false);
  const [error, setError] = useState('');
  const [Cursos, setCursos] = useState([]);
  const [IsEvaluate, setEvaluate] = useState(false);
  const [filtroPeriodo, setFiltroPeriodo] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [evaluaciones, setEvaluaciones] = useState([]);
 
  // Manejar los cambios en los filtros
  const handleFiltroPeriodo = (e) => {
    setFiltroPeriodo(e.target.value);
  };

  const handleFiltroTipo = (e) => {
    setFiltroTipo(e.target.value);
  };

  // Filtrar los datos basados en los filtros seleccionados
  const evaluacionesFiltradas = evaluaciones.filter((evaluacion) => {
    const periodoAcademico = evaluacion.periodo_academico || ''; // Asignar cadena vacía si es undefined
    const coincidePeriodo = periodoAcademico.includes(filtroPeriodo);
    const coincideTipo = filtroTipo === '' || evaluacion.tipo_docente === filtroTipo;
    return coincidePeriodo && coincideTipo;
  });
  

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

        const token = sessionStorage.getItem('authToken');
        const responseval = await fetch('https://localhost:8080/reportes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado Authorization
          }
        });

        if (responseval.ok){
          const dataevl = await responseval.json();
          console.log(dataevl);
          setEvaluaciones(dataevl)
        } else {
          setError('Error al obtener la respuesta del servidor.');  
        }
        

      } catch (error) {
        setError('Error al obtener los datos del servidor.');
        console.log(error)
      }
    };

    fetchData();
  }, [isPeriodoActivo]);

  const handleButtonClick = () => {
    const token = sessionStorage.getItem('authToken');
    const decodedToken = jwtDecode(token);
    const nombreDocente = decodedToken.username
    navigate('/autoevaluacion', { state: { nombreDocente } }); 
  };

  const handleEnviarReporte = async (periodo, vincula) => {
    try {
      const token = sessionStorage.getItem('authToken');
      const response = await fetch('https://localhost:8080/reporte_individual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado Authorization
        },
        body: JSON.stringify({ periodo_academico: periodo, vinculacion: vincula}) // Enviar el periodo de la fila
      });
  
      if (response.ok) {
        const blob = await response.blob(); // Recibir el archivo como un blob (PDF)

        // Crear una URL para el archivo PDF
        const url = window.URL.createObjectURL(blob);
        
        // Crear un enlace <a> invisible para descargar el archivo
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reporte_evaluacion.pdf'; // Nombre del archivo que se descargará
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
    <div className="d-flex">
      {/* Navbar */}
      <Sidebar />

      {/* Main content */}
      <div className="main-content p-4" style={{ flexGrow: 1 }}>
        <Navbar bg="dark" variant="dark" style={{ height: '70px' }}>
        <Container>
              <Navbar.Brand href="#home">
              <div style={{ color: 'white', marginLeft: 'auto', textAlign: 'left' }}>
                <h3 style={{ fontSize: '25px', margin: '0' }}>Evaluaciones</h3>
              </div>
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

              {/* Filtros */}
              <Form className="mb-4">
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="filtroPeriodo">
                      <Form.Label>Filtrar por Periodo Académico</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ejemplo: 2023-1"
                        value={filtroPeriodo}
                        onChange={handleFiltroPeriodo}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="filtroTipo">
                      <Form.Label>Filtrar por Tipo de Vinculacion</Form.Label>
                      <Form.Control as="select" value={filtroTipo} onChange={handleFiltroTipo}>
                        <option value="">Todos</option>
                        <option value="Planta">Planta</option>
                        <option value="Ocasional">Ocasional</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>

              {/* Tabla de Evaluaciones */}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Periodo Académico</th>
                    <th>Fecha Finalizado</th>
                    <th>Tipo de Vinculacion</th>
                    <th>Reporte</th> 
                  </tr>
                </thead>
                <tbody>
                  {evaluacionesFiltradas.length > 0 ? (
                    evaluacionesFiltradas.map((evaluacion, index) => (
                      <tr key={index}>
                        <td>{evaluacion.periodo_academico}</td>
                        <td>{new Date(evaluacion.fecha_final).toLocaleDateString()}</td>
                        <td>{evaluacion.tipo_docente}</td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={() => handleEnviarReporte(evaluacion.periodo_academico, evaluacion.tipo_docente)}
                          >
                            Descargar
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No se encontraron evaluaciones.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
        </div>
    </div>
  );
}


export default EvaluacionDocentePage;
