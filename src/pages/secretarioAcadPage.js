import React from 'react';
import { Navbar, Container, Button, Table, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import leftImage from '../images/logoUnillanos.png';
import '../css/reporte.css'; 

const ReportsPage = () => {
  const reportData = [
    { periodo: '2024-1', inicio: '01/01/2024', fin: '30/06/2024' },
    { periodo: '2023-2', inicio: '01/07/2023', fin: '31/12/2023' },
    { periodo: '2023-1', inicio: '01/01/2023', fin: '30/06/2023' },
  ];

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
              <Button variant="primary" block>
                Realizar periodo de evaluación
              </Button>
            </div>
          </Col>
          <Col>
            <div className="button-box">
              <Button variant="secondary" block>
                Reclamaciones
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
                <td>{report.periodo}</td>
                <td>{report.inicio}</td>
                <td>{report.fin}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ReportsPage;
