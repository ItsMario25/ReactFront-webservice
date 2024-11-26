import { useState, useEffect } from 'react';
import { Navbar, Container, Form, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../../componentes/sidebar/sidebar_sect';
import Footer from '../../componentes/footer';
import '../../css/ConfigSecurityPage.css';
import { useNavigate } from 'react-router-dom';

const ConfigSecurityPage = () => {
    const [switchMultifactor, setSwitchMultifactor] = useState(false);
    const [switchCopiaControlada, setSwitchCopiaControlada] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8081/switch_seguridad')
            .then(response => response.json())
            .then(data => {
                setSwitchMultifactor(data.multifactor);
                setSwitchCopiaControlada(data.copia_controlada);
            })
            .catch(error => console.error('Error al cargar los switches:', error));
    }, []);

    const handleSwitchChange = (switchName, value) => {
        if (switchName === 'multifactor') {
            setSwitchMultifactor(value);
        } else if (switchName === 'copia_controlada') {
            setSwitchCopiaControlada(value);
        }

        fetch('http://localhost:8081/switch_seguridad', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ switch: switchName, estado: value }),
        })
        .then(response => response.json())
        .then(data => console.log('Respuesta del servidor:', data))
        .catch(error => console.error('Error al enviar el cambio del switch:', error));
    };

    return (
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
            <div className="d-flex flex-grow-1">
                <Sidebar />
                <div className="main-content p-4" style={{ flexGrow: 1 }}>
                    <Navbar bg="dark" variant="dark" style={{ height: '70px' }}>
                        <Container>
                            <Navbar.Brand href="#home">CONFIGURACIONES DE SEGURIDAD</Navbar.Brand>
                        </Container>
                    </Navbar>
                    <Container style={{ marginTop: '20px' }}>
                        <Card className="mb-5 shadow" style={{ padding: '40px', borderRadius: '8px' }}>
                            <Form>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span style={{ fontSize: '1.25rem' }}>Autenticación Multifactor Administrativa</span>
                                    <Form.Check 
                                        type="switch"
                                        id="switch-multifactor"
                                        checked={switchMultifactor}
                                        onChange={(e) => handleSwitchChange('multifactor', e.target.checked)}
                                    />
                                </div>
                                {switchMultifactor && (
                                    <div className="info-text fade-in mt-3 text-center">
                                        Autenticación multifactorial activada, se enviará token de validación al correo registrado.
                                    </div>
                                )}
                            </Form>
                        </Card>
                        <Card className="shadow" style={{ padding: '40px', borderRadius: '8px' }}>
                            <Form>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span style={{ fontSize: '1.25rem' }}>Copia Controlada</span>
                                    <Form.Check 
                                        type="switch"
                                        id="switch-copia-controlada"
                                        checked={switchCopiaControlada}
                                        onChange={(e) => handleSwitchChange('copia_controlada', e.target.checked)}
                                    />
                                </div>
                                {switchCopiaControlada && (
                                    <div className="info-text fade-in mt-3 text-center">
                                        Copia controlada activada, se registrará información del proceso de extracción de reportes.
                                        <p></p>
                                        <Button
                                            variant="primary"
                                            style={{ width: 'fit-content', alignSelf: 'center' }}
                                            onClick={() => navigate('/verificacion_reporte')}
                                        >
                                            Verificar reporte
                                        </Button>
                                    </div>
                                )}
                            </Form>
                        </Card>
                    </Container>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ConfigSecurityPage;
