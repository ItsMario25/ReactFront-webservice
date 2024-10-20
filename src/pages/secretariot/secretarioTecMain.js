import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container } from 'react-bootstrap';
import Sidebar from '../../componentes/sidebar/sidebar_sect';
import Footer from '../../componentes/footer';


const MainSecretaioTecPage = () => {
    return (
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
            <div className="d-flex flex-grow-1">
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
                        INICIO - ROL: SECRETARIO TECNICO DE EVALUACION - PREGRADO
                        </span>
                    </div>
                    </Container>
                </div>
            </div>
            {/* Footer */}
            <Footer />
        </div>
    )
}

export default MainSecretaioTecPage;