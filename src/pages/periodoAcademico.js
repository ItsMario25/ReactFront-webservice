import React, { useState } from 'react';
import { Navbar, Container, Button, Form, Row, Col } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';
import leftImage from '../images/logoUnillanos.png';
import '../css/periodoAcademico.css';

const PeriodoAcademicoPage = () => {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);

  const handleDateChange = (date) => {
    setDateRange(date);
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
              <Form.Control type="text" placeholder="Ingrese el periodo académico" />
            </Col>
            <Col className="text-right">
              <Form.Label> </Form.Label>
              <Button className="button-update" variant="primary">Subir</Button>
            </Col>
          </Row>
        </Form>

        <div style={{ marginTop: '20px' }}>
          <h4>Seleccionar rango de fechas</h4>
          <Calendar
            onChange={handleDateChange}
            value={dateRange}
            selectRange={true}
          />
        </div>
      </Container>
    </div>
  );
};

export default PeriodoAcademicoPage;
