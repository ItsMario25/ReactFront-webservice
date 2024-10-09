import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('client_id');
    navigate('/');
  };

  return (
    <div className="sidebar bg-dark text-white p-4" style={{ width: '250px', minHeight: '100vh' }}>
        <Nav className="flex-column">
            <h4 className="mb-4">Dashboard</h4>
            <Button variant="outline-light" className="mb-3 w-100" onClick={() => navigate('/main_estudiante')}>Inicio</Button>
            <Button variant="outline-light" className="mb-3 w-100" onClick={() => navigate('/estudiante')}>Evaluación</Button>
            <Button variant="outline-light" className="w-100" onClick={handleLogout}>Cerrar Sesión</Button>
        </Nav>
    </div>
  );
};

export default Sidebar;