import { useState } from 'react';
import { Navbar, Container, Button, Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../../componentes/sidebar/sidebar_sect';
import Footer from '../../componentes/footer';
import '../../css/ValidarReporte.css'; // Importa un archivo CSS para estilos adicionales

const Validar_reporte = () => {
    const [file, setFile] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
            setFile(droppedFiles[0]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('pdf', file);

        fetch('https://localhost:8081/verificar_reporte', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Origen no encontrado');
            }
            return response.json();
        })
        .then(data => {
            setResponseData(data.datos);
            setError(null);
        })
        .catch(error => {
            setResponseData(null);
            setError(error.message);
        });
    };

    return (
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
            <div className="d-flex flex-grow-1">
                <Sidebar />
                <div className="main-content p-4" style={{ flexGrow: 1 }}>
                    <Navbar bg="dark" variant="dark" style={{ height: '70px' }}>
                        <Container>
                            <Navbar.Brand href="#home">VALIDAR REPORTE</Navbar.Brand>
                        </Container>
                    </Navbar>
                    <Container style={{ marginTop: '20px' }} className="d-flex justify-content-center">
                        <Form onSubmit={handleSubmit} style={{ width: 'fit-content' }} className="mx-auto">
                            <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Subir documento PDF</Form.Label>
                            <div
                                className="drop-area"
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                style={{
                                border: '2px dashed #007bff',
                                padding: '20px',
                                textAlign: 'center',
                                borderRadius: '10px',
                                }}
                            >
                                {file ? (
                                <p>{file.name}</p>
                                ) : (
                                <p>Arrastra y suelta tu archivo aquí o haz clic para seleccionar</p>
                                )}
                                <Form.Control
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }} // Ocultar el input
                                    />
                                <Button
                                    variant="primary"
                                    type="button"
                                    onClick={() => document.getElementById('formFile').click()}
                                    >
                                    Seleccionar archivo
                                </Button>
                            </div>
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={!file}>
                            Enviar
                            </Button>
                        </Form>
                    </Container>


                    <Container style={{ marginTop: '20px' }}>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {responseData && (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Generado Por</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{responseData.nombre_docente}</td>
                                        <td>{new Date(responseData.fecha).toLocaleDateString()}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        )}
                    </Container>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Validar_reporte;
