import React, { useState } from 'react';
import { Navbar, Container, Button, Form, Row, Col } from 'react-bootstrap';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';
import leftImage from '../images/logoUnillanos.png';
import '../css/periodoAcademico.css';

const PeriodoAcademicoPage = () => {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [periodoAcademico, setPeriodoAcademico] = useState('');
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setDateRange(date);
  };

  const handleSubmit = async () => {
    const [fechaInicio, fechaFinal] = dateRange;
    const data = {
      periodo: periodoAcademico,
      inicio: fechaInicio.toISOString().split('T')[0], // Formateo de fecha a 'YYYY-MM-DD'
      fin: fechaFinal.toISOString().split('T')[0],
    };

    try {
      const response = await fetch('http://localhost:8080/cargarperiodo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al cargar el periodo académico');
      }
      
      navigate('/secretario_tec')
    } catch (error) {
      console.error('Error:', error);
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
            <Button variant="outline-light">Salir</Button>
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Page Content */}
      <Container style={{ marginTop: '20px' }}>
      <Form>
        <Row className="align-items-center">
          <Form.Label>Periodo académico</Form.Label>
          <Col>
            <Form.Select
              value={periodoAcademico}
              onChange={(e) => setPeriodoAcademico(e.target.value)}
            >
              <option value="">Seleccionar periodo académico</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </Form.Select>
          </Col>
          <Col className="text-right">
            <Button className="button-update" variant="primary" onClick={handleSubmit}>
              Subir
            </Button>
          </Col>
        </Row>
      </Form>


        <div style={{ marginTop: '20px' }}>
          <h4>Seleccionar rango de fechas</h4>
          <Calendar
            onChange={handleDateChange}
            value={dateRange}
            selectRange={true}
            minDate={new Date()} // Restringir a partir de la fecha actual
          />
        </div>
      </Container>
    </div>
  );
};

export default PeriodoAcademicoPage;
