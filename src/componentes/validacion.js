import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import leftImage from '../images/cyseth.jpeg'; // Asegúrate de usar la ruta correcta
import rightImage from '../images/logoUnillanos.png'; // Asegúrate de usar la ruta correcta
import imgLogin from '../images/imgLogin.jpg'; 

function IngresarToken() {
  const navigate = useNavigate();
  const location = useLocation();
  const [tokens, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para mensaje de error
  const { role, token } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8081/validar_token_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: tokens }),
      });
  
      if (response.ok) {
        // Token validado correctamente
        setErrorMessage(''); // Limpia el mensaje de error en caso de éxito
        if (role === "secretario_academico") {
          sessionStorage.setItem('authToken', token);
          navigate('/main_secretario_ac');
        } else if (role === "secretario_tecnico") {
          sessionStorage.setItem('authToken', token);
          navigate('/main_secretario_tec');
        }
      } else {
        // Mostrar error si el token no es válido
        setErrorMessage('Token no válido'); // Establece el mensaje de error
      }
    } catch (error) {
      console.error('Error al verificar el token:', error);
      setErrorMessage('Error al verificar el token'); // Mensaje de error en caso de fallo de conexión
    }
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" style={{ height: '100px' }}>
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={leftImage}
              width="145"
              height="70"
              className="d-inline-block align-top"
              alt="Left logo"
            />
          </Navbar.Brand>
          <Navbar.Brand href="#home" className="ml-auto">
            <img
              src={rightImage}
              width="145"
              height="70"
              className="d-inline-block align-top"
              alt="Right logo"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>

      <div 
        style={{
          backgroundImage: `url(${imgLogin})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: 'calc(100vh - 100px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Formulario de Ingreso de Token */}
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: 'calc(100vh - 170px)' }}>
          <Row>
            <Col 
              xs={12} 
              md={12} 
              lg={12} 
              style={{ 
                boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.9)', 
                backgroundColor: '#001f3f', // Azul oscuro
                padding: '30px', // Añadir padding para separar el contenido del borde
                borderRadius: '10px' // Para un diseño más suave en los bordes
              }}
            >
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicToken">
                  <Form.Label style={{ color: 'white' }}>Ingrese el token enviado a su correo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Token"
                    value={tokens}
                    onChange={(e) => setToken(e.target.value)}
                  />
                </Form.Group>
                {errorMessage && (
                  <Alert variant="danger" className="mt-3">
                    {errorMessage}
                  </Alert>
                )}
                <div className="d-flex justify-content-center mt-4">
                  <Button variant="primary" type="submit">
                    Verificar Token
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default IngresarToken;
