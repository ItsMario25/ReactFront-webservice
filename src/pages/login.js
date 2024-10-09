import React, { useState } from 'react';
import { Navbar, Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'; // Import Alert
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';
import leftImage from '../images/cyseth.jpeg';
import rightImage from '../images/logoUnillanos.png';
import iconImage from '../images/user.png';
import imgLogin from '../images/imgLogin.jpg'; // Imagen de fondo
import '../css/login.css';

function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newClientId = uuidv4();
    sessionStorage.setItem('client_id', newClientId);
    
    const data = { usuario, contrasena, client_id: newClientId };

    fetch('https://localhost:8080/verificar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      const token = data.token;
      if (token) {
        const role = data.rol;

        if (role === "docente") {
          sessionStorage.setItem('authToken', token);
          navigate('/main_docente');
        } else if (role === "estudiante") {
          sessionStorage.setItem('authToken', token);
          navigate('/main_estudiante');
        } else if (role === "secretario_academico" || role === "secretario_tecnico") {
          navigate('/ingresar-token', { state: { role, token } });
        } else if (role === "consejo_facultad") {
          sessionStorage.setItem('authToken', token);
          navigate('/main_facultad');
        } else {
          navigate('/');
        }
      } else {
        // Mostrar mensaje de error si no hay token
        setErrorMessage('Usuario o Contraseña incorrectos');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setErrorMessage('Error en la conexión, por favor intenta de nuevo.');
    });
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" style={{ height: '100px' }}>
      <Container className="d-flex justify-content-between">
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

      {/* Background Image */}
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
        {/* Login Form */}
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{ padding: '20px', borderRadius: '10px' }}>
          <Row>
            <Col 
              xs={12} 
              md={12} 
              lg={12} 
              className="login-form" 
              style={{ boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.9)' }}
            >
              <Form onSubmit={handleSubmit}>
                <div className="text-center">
                  <img src={iconImage} alt="User Icon" className="user-icon" />
                </div>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Ingrese Usuario" 
                    value={usuario} 
                    onChange={(e) => setUsuario(e.target.value)} 
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="*******" 
                    value={contrasena} 
                    onChange={(e) => setContrasena(e.target.value)} 
                  />
                </Form.Group>

                {/* Mostrar el mensaje de error si existe */}
                {errorMessage && (
                  <Alert variant="danger" className="mt-3 text-center">
                    {errorMessage}
                  </Alert>
                )}


                <div className="d-flex justify-content-center mt-4">
                  <Button variant="primary" type="submit">
                    Login
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

export default Login;

