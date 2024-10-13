import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container } from 'react-bootstrap';
import Sidebar from '../../componentes/sidebar/sidebar_est';

const MainEstudiantePage = () => {
    return (
        <div className="d-flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="main-content p-4" style={{ flexGrow: 1 }}>
                <Navbar bg="dark" variant="dark" style={{ height: '70px' }}>
                    <Container>
                    <Navbar.Brand href="#home">
                        BIENVENIDO
                    </Navbar.Brand>
                    </Container>
                </Navbar>

                {/* Contenido */}
                <Container style={{ marginTop: '80px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center' }}>
                    INICIO - ROL: ESTUDIANTE - PREGRADO
                    </span>
                </div>
                </Container>
            </div>
        </div>
    )
}

export default MainEstudiantePage;