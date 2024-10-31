import React, { useState, useEffect } from 'react';
import { Navbar, Container, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../componentes/sidebar/sidebar_secac';
import Footer from '../../componentes/footer';

const HistorialPrograma = () => {
    const navigate = useNavigate();
    const [reportData, setReportData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = sessionStorage.getItem('authToken');
            const response = await fetch('https://localhost:8080/programas_facultad', {
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
    }, []);


    const handleEnviarReporte = async (nombrePrograma) => {
        navigate('/historial_secretario', { state: { nombrePrograma } }); 
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
                PROGRAMAS
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
                  <th>Programa</th>
                  <th>Reportes</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((report, index) => (
                  <tr key={index}>
                    <td>{report.nombre_programa}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleEnviarReporte(report.nombre_programa)}
                      >
                        Revisar
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

export default HistorialPrograma;