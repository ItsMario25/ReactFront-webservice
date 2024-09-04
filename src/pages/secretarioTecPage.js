import React, { useEffect, useState } from 'react';
import { Navbar, Container, Button, Table, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import leftImage from '../images/logoUnillanos.png';
import '../css/reporte.css'; 

const ReportsPage = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/periodos_evl')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const formattedData = data.map(report => ({
          ...report,
          inicio: formatDate(report.inicio),
          fin: formatDate(report.fin)
        }));
        setReportData(formattedData);
      })
      .catch(error => console.error('Error fetching periodos:', error));
  }, []);
  
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('es-ES'); // Formato de fecha en español
  };
  const handleButtonClick = () => {
    window.location.href = 'http://localhost:8000/periodo';
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
        {/* Buttons Row */}
        <Row className="mb-4">
          <Col>
            <div className="button-box">
            <Button variant="primary" onClick={handleButtonClick} block="true">
              Realizar periodo de evaluación
            </Button>
            </div>
          </Col>
        </Row>

        {/* Reports Section */}
        <h2>Reportes</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Periodo académico</th>
              <th>Fecha de inicio</th>
              <th>Fecha final</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((report, index) => (
              <tr key={index}>
                <td>{report.IDPeriodo}</td>
                <td>{report.Inicio}</td>
                <td>{report.Fin}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ReportsPage;