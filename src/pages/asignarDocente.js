import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar, Container, Button, Row, Col, Form, Alert } from 'react-bootstrap';
import leftImage from '../images/logoUnillanos.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/docentes.css';

const AsignarCursoPage = () => {
  const navigate = useNavigate();
  const { id_curso } = useParams(); // Obtener el ID del curso desde la URL
  const [curso, setCurso] = useState({});
  const [docentes, setDocentes] = useState([]);
  const [selectedDocente, setSelectedDocente] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('client_id');
    navigate('/');
  };

  // Obtener información del curso y la lista de docentes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener el curso por su ID
        const responseCurso = await fetch(`https://localhost:8080/curso/${id_curso}`);
        const cursoData = await responseCurso.json();
        console.log(cursoData)
        setCurso(cursoData);

        // Obtener los docentes
        const responseDocentes = await fetch('https://localhost:8080/docentes');
        const docentesData = await responseDocentes.json();
        console.log(docentesData)
        setDocentes(docentesData);
      } catch (error) {
        setError('Error al obtener los datos del servidor.');
      }
    };

    fetchData();
  }, [id_curso]);

  // Manejar la selección de un docente
  const handleSelectDocente = (event) => {
    setSelectedDocente(event.target.value);
  };

  // Enviar la asignación del docente al curso
  const handleSubmit = async () => {
    try {
      const response = await fetch(`https://localhost:8080/asignar_docente`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_curso: id_curso,
          id_docente: selectedDocente,
        }),
      });

      if (response.ok) {
        setSuccess('Docente asignado exitosamente al curso.');
      } else {
        setError('Error al asignar el docente al curso.');
      }
    } catch (error) {
      setError('Error al conectar con el servidor.');
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
      <Container style={{ marginTop: '20px' }}>
        <Row>
          <Col>
            <h2>Asignar Docente al Curso: {curso.NombreCurso}</h2>
          </Col>
        </Row>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Row className="mt-4">
          <Col xs={12} md={6}>
            <Form>
              <Form.Group controlId="selectDocente">
                <Form.Label>Selecciona un Docente</Form.Label>
                <Form.Control as="select" value={selectedDocente} onChange={handleSelectDocente}>
                  <option value="">Selecciona un docente</option>
                  {docentes.map((docente) => (
                    <option key={docente.IdDocente} value={docente.IdDocente}>
                      {docente.Nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Button variant="primary" onClick={handleSubmit} disabled={!selectedDocente}>
                Asignar Docente
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AsignarCursoPage;
