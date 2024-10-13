import React, { useState } from 'react';
import { Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaBook, FaSignOutAlt, FaBars } from 'react-icons/fa'; // Iconos
import FondoOscuro from '../../images/Fondo_oscuro.png'; // Importa la imagen

const Sidebar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false); // Estado del colapso del sidebar

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('client_id');
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div 
      className={`sidebar bg-dark text-white d-flex flex-column p-2 ${isCollapsed ? 'collapsed' : ''}`} 
      style={{ 
        width: isCollapsed ? '80px' : '250px', 
        minHeight: '100vh', 
        transition: 'width 0.3s',
        boxShadow: '10px 0 10px rgba(0, 0, 0, 0.5)'  }}
    >

      {/* Contenedor de imagen y texto */}
      <div className="mb-3 d-flex align-items-center justify-content-center">
        <img 
          src={FondoOscuro} 
          alt="Logo" 
          style={{ width: isCollapsed ? '50px' : '50px', height: '50px', transition: 'width 0.3s, height 0.3s' }} 
        />
        {!isCollapsed && (
          <span 
            className="text-white ml-2" 
            style={{ fontWeight: 'bold', fontSize: 'calc(1rem + 4px)' }} // Negrita y 4px más grande
          >
            PROSSED
          </span>
        )}
      </div>


      <Button variant="outline-light" className="mb-3" onClick={toggleSidebar}>
        <FaBars />
      </Button>
      
      <Nav className="flex-column">
        <Button variant="outline-light" className="mb-3 w-100 d-flex align-items-center" onClick={() => navigate('/main_estudiante')}>
          <FaHome className="icon" style={{ minWidth: '30px' }} />
          {!isCollapsed && <span>Inicio</span>}
        </Button>

        <Button variant="outline-light" className="mb-3 w-100 d-flex align-items-center" onClick={() => navigate('/estudiante')}>
          <FaBook className="icon" style={{ minWidth: '30px' }} />
          {!isCollapsed && <span>Evaluación</span>}
        </Button>

        <Button variant="outline-light" className="w-100 d-flex align-items-center" onClick={handleLogout}>
          <FaSignOutAlt className="icon" style={{ minWidth: '30px' }} />
          {!isCollapsed && <span>Cerrar Sesión</span>}
        </Button>
      </Nav>
    </div>
  );
};

export default Sidebar;
