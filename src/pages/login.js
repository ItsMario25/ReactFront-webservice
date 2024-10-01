import React, { useState } from 'react';
import { Navbar, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
//import { jwtDecode } from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';
import leftImage from '../images/cyseth.jpeg';
import rightImage from '../images/logoUnillanos.png';
import iconImage from '../images/user.png';
import '../css/login.css';

function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

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
          navigate('/docente'); 
        } else if (role === "estudiante") {
          sessionStorage.setItem('authToken', token);
          navigate('/estudiante'); 
        } else if (role === "secretario_academico") {
          navigate('/ingresar-token', { state: { role, token } }); 
        } else if (role === "secretario_tecnico") {
          navigate('/ingresar-token', { state: { role, token } }); 
        } else if (role === "consejo_facultad") {
          sessionStorage.setItem('authToken', token);
          navigate('/consejo_fac'); 
        } else {
          navigate('/'); 
        }
      } else {
        console.error('Token no recibido');
      }
    })
      .catch(error => {
        console.error('Error:', error);
      });
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

      {/* Login Form */}
      <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: 'calc(100vh - 170px)' }} >
        <Row>
          <Col xs={12} md={12} lg={12} className="login-form">
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
  );
}

export default Login;
