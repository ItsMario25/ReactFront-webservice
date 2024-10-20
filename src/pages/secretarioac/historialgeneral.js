import React, { useState, useEffect } from 'react';
import { Navbar, Container, Button, Table } from 'react-bootstrap';
import Sidebar from '../../componentes/sidebar/sidebar_secac';
import Footer from '../../componentes/footer';


const HistorialGeneralPage = () => {
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState('');

  // Función para obtener los datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        const response = await fetch('https://localhost:8080/periodos_facultad', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          },
        });

        if (response.ok) {
          const formattedData = await response.json();
          setReportData(formattedData);
        } else {
          setError('Error al obtener los datos del servidor.');
        }
      } catch (error) {
        setError('Error al conectarse al servidor.');
      }
    };

    fetchData();
  }, []); // El array vacío [] asegura que esto solo se ejecute una vez cuando el componente se monte

  // Función para enviar el reporte
  const handleEnviarReporte = async (periodo) => {
    try {
      const token = sessionStorage.getItem('authToken');
      const response = await fetch('https://localhost:8080/reporte_general', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({ periodo_academico: periodo }) 
      });

      if (response.ok) {
        const blob = await response.blob(); // Recibir el archivo como un blob (PDF)

        // Crear una URL para el archivo PDF
        const url = window.URL.createObjectURL(blob);
        
        // Crear un enlace <a> invisible para descargar el archivo
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Reporte_individual_evaluacion.pdf'; // Nombre del archivo que se descargará
        document.body.appendChild(a);
        a.click();

        // Limpiar la URL y remover el enlace
        window.URL.revokeObjectURL(url);
        a.remove();

        console.log("Reporte descargado exitosamente.");
      } else {
        setError('Error al generar el reporte.');
      }
    } catch (error) {
      setError('Error al conectarse al servidor.');
    }
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="main-content p-4" style={{ flexGrow: 1 }}>
          {/* Page Content */}
          <Container style={{ marginTop: '20px' }}>
          <Navbar bg="dark" variant="dark" style={{ height: '70px' }}>
            <Container>
              <Navbar.Brand href="#home">
                HISTORIAL DE EVALUACIONES
              </Navbar.Brand>
            </Container>
          </Navbar>
          </Container>
          {/* Reports Section */}
          <Container style={{ marginTop: '20px' }}>
            {error && <p className="text-danger">{error}</p>}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Periodo evaluación</th>
                  <th>Fecha de inicio</th>
                  <th>Fecha final</th>
                  <th>Reportes</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((report, index) => (
                  <tr key={index}>
                    <td>{report.id_periodo_evl}</td>
                    <td>{new Date(report.fecha_inicio).toLocaleDateString()}</td>
                    <td>{new Date(report.fecha_final).toLocaleDateString()}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleEnviarReporte(report.id_periodo_evl)}
                      >
                        Descargar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HistorialGeneralPage;
