import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Form } from 'react-bootstrap';
import Sidebar from '../../componentes/sidebar/sidebar_sect';

const ConfigSecurityPage = () => {
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
                    <Form>
                        <Form.Check 
                            type="switch"
                            id="switch-multifactor"
                            label="Autenticación Multifactor Administrativa"
                        />
                        
                        {/* Switch 2: Copia Controlada */}
                        <Form.Check 
                            type="switch"
                            id="switch-copia-controlada"
                            label="Copia Controlada"
                            style={{ marginTop: '15px' }}  // Añade un margen entre los switches
                        />
                    </Form>
                </Container>
            </div>
        </div>
    )
}

export default ConfigSecurityPage;
