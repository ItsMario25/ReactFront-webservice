import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Form, Card } from 'react-bootstrap';
import Sidebar from '../../componentes/sidebar/sidebar_sect';
import { useState, useEffect } from 'react';

const ConfigSecurityPage = () => {
    // Estado para los switches
    const [switchMultifactor, setSwitchMultifactor] = useState(false);
    const [switchCopiaControlada, setSwitchCopiaControlada] = useState(false);

    // Cargar valores guardados al montar el componente
    useEffect(() => {
        fetch('https://localhost:8080/switch_seguridad')  // Endpoint que retorna los valores guardados
            .then(response => response.json())
            .then(data => {
                // Establecer el estado inicial de los switches según la respuesta
                setSwitchMultifactor(data.multifactor);
                setSwitchCopiaControlada(data.copia_controlada);
            })
            .catch(error => console.error('Error al cargar los switches:', error));
    }, []);

    // Función para manejar cambios en los switches y enviar datos al backend
    const handleSwitchChange = (switchName, value) => {
        // Actualizar el estado del switch correspondiente
        if (switchName === 'multifactor') {
            setSwitchMultifactor(value);
        } else if (switchName === 'copia_controlada') {
            setSwitchCopiaControlada(value);
        }

        // Hacer la solicitud POST al backend
        fetch('https://localhost:8080/switch_seguridad', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                switch: switchName,
                estado: value,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
            console.error('Error al enviar el cambio del switch:', error);
        });
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
                            CONFIGURACIONES DE SEGURIDAD
                        </Navbar.Brand>
                    </Container>
                </Navbar>

                {/* Contenido */}
                <Container style={{ marginTop: '20px' }}>
                    {/* Switch 1: Autenticación Multifactor Administrativa */}
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
                        </Form>
                    </Card>

                    {/* Switch 2: Copia Controlada */}
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
                        </Form>
                    </Card>
                </Container>
            </div>
        </div>
    );
}

export default ConfigSecurityPage;
