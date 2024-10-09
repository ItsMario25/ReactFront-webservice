import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container } from 'react-bootstrap';
import Sidebar from '../../componentes/sidebar/sidebar_secac';

const MainSecretaioAcPage = () => {
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
                <Container style={{ marginTop: '20px' }}>

                </Container>
            </div>
        </div>
    )
}

export default MainSecretaioAcPage;