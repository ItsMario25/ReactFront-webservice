import React, { useEffect, useState } from 'react';
import { Navbar, Container, Button, Table, Form, Modal } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/evaluacionpage.css';
import Sidebar from '../../componentes/sidebar/sidebar_doc';
import Footer from '../../componentes/footer';


const EvaluacionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { nombreDocente} = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      const respuesta = await fetch('https://localhost:8080/criterios_docente');
      
      if (respuesta.ok) {
        const itemsrespuesta = await respuesta.json();
        console.log(itemsrespuesta)
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
      nombreDocente,
      respuestas
    };

    try {
      const response = await fetch('https://localhost:8080/autoevaluacion_docente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        console.log('Datos enviados correctamente');
        navigate('/docente');
      } else {
        console.log('Error al enviar los datos.');
      }
    } catch (error) {
      console.log('Ocurrió un error al enviar los datos.');
    }
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <div className="d-flex flex-grow-1">
      {/* Navbar */}
      <Sidebar />

      {/* Contenido */}
      <div className="main-content p-4" style={{ flexGrow: 1 }}>
        <Navbar bg="dark" variant="dark" style={{ height: '70px' }}>
        <Container>
              <Navbar.Brand href="#home">
              <div style={{ color: 'white', marginLeft: 'auto', textAlign: 'left' }}>
                <h3 style={{ fontSize: '25px', margin: '0' }}>Evaluación del Docente: {nombreDocente}</h3>
              </div>
              </Navbar.Brand>
            </Container>
        </Navbar>
      <Container style={{ marginTop: '20px' }}>
        {/* Mostrar el nombre del docente y curso */}
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
                  <td className="text-start">{item.Nombre_criterio}</td>
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
    </div>
    {/* Footer */}
    <Footer />
    </div>
  );
}

export default EvaluacionPage;
