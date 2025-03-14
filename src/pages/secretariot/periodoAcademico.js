import React, { useState, useEffect } from 'react';
import { Navbar, Container, Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';
import '../../css/periodoAcademico.css';
import Sidebar from '../../componentes/sidebar/sidebar_sect';
import Footer from '../../componentes/footer';


const PeriodoAcademicoPage = () => {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [periodoAcademico, setPeriodoAcademico] = useState('');
  const [isEdit, setIsEdit] = useState(false); 
  const [existingPeriodo, setExistingPeriodo] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8081/periodoactivo')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data && data.id_periodo_evl) {
          setIsEdit(true); // Si hay un periodo activo, estamos en modo edición
          setExistingPeriodo(data); // Guardamos el periodo existente
          setPeriodoAcademico(data.id_periodo_evl); // Prellenamos el campo de periodo
          setDateRange([new Date(data.fecha_inicio), new Date(data.fecha_final)]); // Prellenamos las fechas
        }
      })
      .catch(error => console.error('Error fetching active period:', error));
  }, []);

  const handleDateChange = (date) => {
    setDateRange(date);
  };

  const handleSubmit = async () => {
    const [fechaInicio, fechaFinal] = dateRange;
    const data = {
      periodo: periodoAcademico,
      inicio: fechaInicio.toISOString().split('T')[0],
      fin: fechaFinal.toISOString().split('T')[0],
    };

    try {
      const endpoint = isEdit ? `http://localhost:8081/editarperiodo/${existingPeriodo.id_periodo_evl}` : 'https://localhost:8081/cargarperiodo';
      const method = isEdit ? 'PUT' : 'POST'; // Cambia el método según si es edición o creación
      console.log(data)
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(isEdit ? 'Error al modificar el periodo académico' : 'Error al crear el periodo académico');
      }
      navigate('/secretario_tec');
    } catch (error) {
      console.error('Error:', error);
      alert(isEdit ? 'Hubo un problema al modificar el periodo académico' : 'Hubo un problema al cargar el periodo académico');
    }
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <div className="d-flex flex-grow-1">
      {/* Sidebar */}
      <Sidebar />


      {/* Main Content */}
      <div className="main-content p-4" style={{ flexGrow: 1 }}>
        <Navbar bg="dark" variant="dark" style={{ height: '70px' }}>
          <Container>
            <Navbar.Brand href="#home">
              PERIODO DE EVALUACION
            </Navbar.Brand>
          </Container>
        </Navbar>

      {/* Page Content */}
      <Container style={{ marginTop: '20px' }}>
        <Form>
          <Row className="align-items-center">
            <Form.Label>Periodo académico</Form.Label>
            <Col>
              {isEdit ? (
                <Form.Control
                  type="text"
                  placeholder="Ingrese el periodo académico"
                  value={periodoAcademico}
                  onChange={(e) => setPeriodoAcademico(e.target.value)}
                  disabled
                />
              ) : (
                <Form.Control
                  as="select"
                  value={periodoAcademico}
                  onChange={(e) => setPeriodoAcademico(e.target.value)}
                >
                  <option value="">Seleccione</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </Form.Control>
              )}
            </Col>
            <Col className="text-right">
              <Button className="button-update" variant="primary" onClick={handleSubmit}>
                {isEdit ? 'Modificar' : 'Subir'}
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
    </div>
    {/* Footer */}
    <Footer />
  </div>
  );
};

export default PeriodoAcademicoPage;
