import React, { useEffect,  useState } from 'react';
import { Navbar, Container, Button, Table, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import leftImage from '../images/logoUnillanos.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/evaluacionpage.css';

const EvaluacionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [items, setItems] = useState([]);
  const { nombreCurso, nombreDocente } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      const respuesta = await fetch('https://localhost:8080/criterios_estudiante');
      
      if (respuesta.ok) {
        const itemsrespuesta = await respuesta.json();
        console.log(itemsrespuesta)
        setItems(itemsrespuesta); // Almacenar los datos de docente y curso
      } 
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría el manejo del envío de datos al backend.
    console.log("Respuestas enviadas");
  };

  const handleReturn = () => {
    navigate('/estudiante');
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
                    />
                  </td>
                  <td>
                    <Form.Check
                      type="radio"
                      name={`radio-${index}`}
                      value="algunas_veces"
                    />
                  </td>
                  <td>
                    <Form.Check
                      type="radio"
                      name={`radio-${index}`}
                      value="casi_siempre"
                    />
                  </td>
                  <td>
                    <Form.Check
                      type="radio"
                      name={`radio-${index}`}
                      value="siempre"
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
    </div>
  );
}

export default EvaluacionPage;
