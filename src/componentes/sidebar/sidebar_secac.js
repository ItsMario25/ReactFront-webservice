import React, { useState } from 'react';
import { Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaBook, FaSignOutAlt, FaBars } from 'react-icons/fa'; // Iconos

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
      style={{ width: isCollapsed ? '80px' : '250px', minHeight: '100vh', transition: 'width 0.3s' }}
    >
      <Button variant="outline-light" className="mb-3" onClick={toggleSidebar}>
        <FaBars />
      </Button>
      
      <Nav className="flex-column">
        <Button variant="outline-light" className="mb-3 w-100 d-flex align-items-center" onClick={() => navigate('/main_secretario_ac')}>
          <FaHome className="icon" style={{ minWidth: '30px' }} />
          {!isCollapsed && <span>Inicio</span>}
        </Button>

        <Button variant="outline-light" className="mb-3 w-100 d-flex align-items-center" onClick={() => navigate('/secretario_ac')}>
          <FaBook className="icon" style={{ minWidth: '30px' }} />
          {!isCollapsed && <span>Cursos</span>}
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
