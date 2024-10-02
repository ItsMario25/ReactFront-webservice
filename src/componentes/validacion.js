
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Container, Form, Button, Row, Col } from 'react-bootstrap';
import leftImage from '../images/cyseth.jpeg'; // Asegúrate de usar la ruta correcta
import rightImage from '../images/logoUnillanos.png'; // Asegúrate de usar la ruta correcta

function IngresarToken() {
  const navigate = useNavigate();
  const location = useLocation();
  const [tokens, setToken] = useState('');
  const { role, token } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://localhost:8080/validar_token_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({token: tokens }),
      });
  
      const data = await response.json();
      if (response.ok) {
        // Token validado correctamente
        if (role === "secretario_academico") {
          sessionStorage.setItem('authToken', token);
          navigate('/secretario_ac');
        } else if (role === "secretario_tecnico") {
          sessionStorage.setItem('authToken', token);
          navigate('/secretario_tec');
        }
      } else {
        // Mostrar error si el token no es válido
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error al verificar el token:', error);
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

      {/* Formulario de Ingreso de Token */}
      <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: 'calc(100vh - 170px)' }}>
        <Row>
          <Col xs={12} md={12} lg={12}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicToken">
                <Form.Label>Ingrese el token enviado a su correo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Token"
                  value={tokens}
                  onChange={(e) => setToken(e.target.value)}
                />
              </Form.Group>
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
  );
}

export default IngresarToken;
