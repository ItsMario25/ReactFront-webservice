import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Button, Table, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/reporte.css';
import Sidebar from '../../componentes/sidebar/sidebar_sect';

const ReportsPage = () => {
  const navigate = useNavigate();
  
  const [reportData, setReportData] = useState([]);
  const [periodoActivo, setPeriodoActivo] = useState(null);
  const [isEdit, setIsEdit] = useState(false); // Define si estamos en modo edición

  useEffect(() => {
    fetch('https://localhost:8080/periodos_evl')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(report => ({
          ...report,
          inicio: formatDate(report.inicio),
          fin: formatDate(report.fin),
        }));
        setReportData(formattedData);
      })
      .catch(error => console.error('Error fetching periodos:', error));

    fetch('https://localhost:8080/periodoactivo')
      .then(response => response.json())
      .then(data => {
        if (data && data.id_periodo_evl) {
          setPeriodoActivo(data);
          setIsEdit(true);
        }
      })
      .catch(() => {
        setIsEdit(false);
      });
  }, []);

  // Función para redirigir a la página de creación o modificación
  const handleButtonClick = () => {
    if (isEdit) {
      navigate(`/editarperiodo/${periodoActivo.id_periodo_evl}`);
    } else {
      navigate('/periodo');
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('es-ES'); // Formato de fecha en español
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content p-4" style={{ flexGrow: 1 }}>
        <Navbar bg="dark" variant="dark" style={{ height: '70px' }}>
          <Container>
            <Navbar.Brand href="#home">
              PERIODOS DE EVALUACION
            </Navbar.Brand>
          </Container>
        </Navbar>
      {/* Page Content */}
      <Container style={{ marginTop: '20px' }}>
        {/* Conditionally show if there's an active evaluation period */}
        {isEdit && (
          <Alert variant="warning">
            <strong>PERIODO DE EVALUACIÓN EN PROCESO</strong>
          </Alert>
        )}

        {/* Buttons Row */}
        <Row className="mb-4">
          <Col>
            <div className="button-box">
              <Button
                variant={isEdit ? "warning" : "primary"} // Cambiar el color del botón según el estado
                onClick={handleButtonClick}
                block="false"
              >
                {isEdit ? "Modificar fecha de finalización" : "Realizar periodo de evaluación"}
              </Button>
            </div>
          </Col>
        </Row>

        {/* Reports Section */}
        <h2>Historial</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Periodo evaluacion</th>
              <th>Fecha de inicio</th>
              <th>Fecha final</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((report, index) => (
              <tr key={index}>
                <td>{report.id_periodo_evl}</td>
                <td>{new Date(report.fecha_inicio).toLocaleDateString()}</td>
                <td>{new Date(report.fecha_final).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      </div>
    </div>
  );
};

export default ReportsPage;