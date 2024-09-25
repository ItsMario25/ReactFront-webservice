import React, { useEffect, useState } from 'react';
import { Navbar, Container, Button, Table, Form, Modal } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import leftImage from '../images/logoUnillanos.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/evaluacionpage.css';

const EvaluacionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { nombreCurso, nombreDocente, nombreEvaluador } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      const respuesta = await fetch('https://localhost:8080/criterios_facultad');
      
      if (respuesta.ok) {
        const itemsrespuesta = await respuesta.json();
        setItems(itemsrespuesta);
      } 
    };
    fetchData();
  }, []);

  const handleRadioChange = (index, value) => {
    setRespuestas({
      ...respuestas,
      [index]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que todos los ítems tengan una respuesta seleccionada
    const allItemsSelected = items.every((_, index) => respuestas[index]);

    if (!allItemsSelected) {
      setShowModal(true); // Mostrar el modal si faltan respuestas
      return;
    }

    // Preparar los datos para enviar
    const dataToSend = {
      nombreCurso,
      nombreDocente,
      nombreEvaluador,
      respuestas
    };

    try {
      const response = await fetch('https://localhost:8080/evaluacion_facultad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        console.log('Datos enviados correctamente');
        // Redirigir al usuario o mostrar un mensaje de éxito
        navigate('/consejo_fac');
      } else {
        console.log('Error al enviar los datos.');
      }
    } catch (error) {
      console.log('Ocurrió un error al enviar los datos.');
    }
  };

  const handleReturn = () => {
    navigate('/consejo_fac');
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
            <Button variant="outline-light" onClick={handleReturn}>Regresar</Button>
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Contenido */}
      <Container style={{ marginTop: '20px' }}>
        {/* Mostrar el nombre del docente y curso */}
        <h2>Evaluación del Docente: {nombreDocente}</h2>
        <h3>Curso: {nombreCurso}</h3>

        <Form onSubmit={handleSubmit}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Item</th>
                <th>Nunca</th>
                <th>Algunas veces</th>
                <th>Casi siempre</th>
                <th>Siempre</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="text-left">{item.Nombre_criterio}</td>
                  <td>
                    <Form.Check
                      type="radio"
                      name={`radio-${index}`}
                      value="nunca"
                      onChange={() => handleRadioChange(index, 'nunca')}
                    />
                  </td>
                  <td>
                    <Form.Check
                      type="radio"
                      name={`radio-${index}`}
                      value="algunas_veces"
                      onChange={() => handleRadioChange(index, 'algunas_veces')}
                    />
                  </td>
                  <td>
                    <Form.Check
                      type="radio"
                      name={`radio-${index}`}
                      value="casi_siempre"
                      onChange={() => handleRadioChange(index, 'casi_siempre')}
                    />
                  </td>
                  <td>
                    <Form.Check
                      type="radio"
                      name={`radio-${index}`}
                      value="siempre"
                      onChange={() => handleRadioChange(index, 'siempre')}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="primary" type="submit" className="float-right">
            Enviar
          </Button>
        </Form>
      </Container>

      {/* Modal de alerta */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Advertencia</Modal.Title>
        </Modal.Header>
        <Modal.Body>Por favor, selecciona una opción para todos los criterios antes de enviar.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      
    </div>
  );
}

export default EvaluacionPage;
