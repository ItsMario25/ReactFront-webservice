import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Row, Col, Card, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/docentes.css';
import Sidebar from '../../componentes/sidebar/sidebar_secac';
import Footer from '../../componentes/footer';

const AsignacionDocentesPage = () => {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [cursosAsignados, setCursosAsignados] = useState([]);
  const [isPeriodoActivo, setIsPeriodoActivo] = useState(false);
  const [isPeriodoAc, setIsPeriodoAc] = useState(false);
  const [error, setError] = useState('');
  

  useEffect(() => {
    const fetchData = async () => {
      try {
       // Realiza la solicitud para verificar si el periodo académico está activo
        const responsePeriodoAC = await fetch('http://localhost:8081/periodoAcactivo');
        const periodoDataC = await responsePeriodoAC.json();

        if (periodoDataC && periodoDataC.id_periodo_acad){
          setIsPeriodoAc(true)
          // Verifica si hay un periodo de evaluación activo
          const responsePeriodo = await fetch('http://localhost:8081/periodoactivo');
          const periodoData = await responsePeriodo.json();
          if (periodoData && periodoData.id_periodo_evl) {
              setIsPeriodoActivo(true);
          } 
        }

        if (!isPeriodoActivo) {
          // Si no hay periodo activo, obtiene los cursos asociados a la facultad del secretario
          const responseCursos = await fetch('http://localhost:8081/cursos_facultad');
          const cursosData = await responseCursos.json();
          setCursos(cursosData);
        }

        const responseAsignados = await fetch('http://localhost:8081/cursos_asignados');
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

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <Sidebar />


        {/* Main Content */}
        <div className="main-content p-4" style={{ flexGrow: 1 }}>
          
        {/* Page Content */}
        {isPeriodoAc ? (
          <Container style={{ marginTop: '20px' }}>
            <Navbar bg="dark" variant="dark" style={{ height: '70px' }}>
              <Container>
                <Navbar.Brand href="#home">
                  ASIGNACION DE CURSOS
                </Navbar.Brand>
              </Container>
            </Navbar>
            <Container style={{ marginTop: '20px' }}>
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
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AsignacionDocentesPage;
