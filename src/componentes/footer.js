import cysethLogo from '../images/cyseth.jpeg';
import logoUnillanos from '../images/logoUnillanos.png';
import { Container } from 'react-bootstrap';


const Footer = () => {
    return (
        <footer className="py-4 mt-auto" style={{
            backgroundColor: '#333333',  // Gris oscuro
            padding: '20px 40px', 
            color: 'white',  // Texto en blanco
            boxShadow: 'inset 0px 5px 3px rgba(255, 255, 255, 0.5)'
        }}>
            <Container className="d-flex justify-content-between">
                {/* Left Section */}
                <div style={{ marginRight: '140px' }}> 
                    <img src={cysethLogo} alt="Logo CYSETH" style={{ width: '230px', display: 'block', marginTop: '10px' }} />
                </div>

                {/* Center Section */}
                <div className="text-left" style={{ flexGrow: 1 }}>
                    <h5>PROSSED v1.0</h5>
                    <p>Prototipo de Software Seguro para Evaluación Docente</p>
                    <p style={{ fontSize: '0.9rem' }}>Derechos de autor 2024 &#169;</p>
                </div>

                {/* Right Section */}
                <div className="text-left">
                    <img src={logoUnillanos} alt="Logo Unillanos" style={{ width: '230px', display: 'block' }} />
                </div>
            </Container>
        </footer>
    );
};

export default Footer;