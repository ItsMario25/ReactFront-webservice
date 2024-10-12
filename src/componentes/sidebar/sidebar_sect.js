import React, { useState } from 'react';
import { Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUserShield, FaCalendarAlt, FaSignOutAlt, FaBars } from 'react-icons/fa'; // Importar iconos

const Sidebar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false); // Estado para controlar el colapso del sidebar

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('client_id');
    navigate('/');
  };

  // Alternar colapso del sidebar
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div 
      className={`sidebar bg-dark text-white d-flex flex-column p-2 ${isCollapsed ? 'collapsed' : ''}`} 
      style={{ width: isCollapsed ? '80px' : '250px', minHeight: '100vh', transition: 'width 0.3s' }}
    >
      {/* Botón para colapsar el sidebar */}
      <Button variant="outline-light" className="mb-3" onClick={toggleSidebar}>
        <FaBars />
      </Button>
      
      <Nav className="flex-column">
        <Button 
          variant="outline-light" 
          className="mb-3 w-100 d-flex align-items-center" 
          onClick={() => navigate('/main_secretario_tec')}
        >
          <FaHome className="icon" style={{ minWidth: '30px' }} /> {/* El icono siempre visible */}
          {!isCollapsed && <span>Inicio</span>}
        </Button>

        <Button 
          variant="outline-light" 
          className="mb-3 w-100 d-flex align-items-center" 
          onClick={() => navigate('/secretario_tec')}
        >
          <FaCalendarAlt className="icon" style={{ minWidth: '30px' }} /> {/* El icono siempre visible */}
          {!isCollapsed && <span>Periodos</span>}
        </Button>

        <Button 
          variant="outline-light" 
          className="mb-3 w-100 d-flex align-items-center" 
          onClick={() => navigate('/configuracion_seguridad')}
        >
          <FaUserShield className="icon" style={{ minWidth: '30px' }} /> {/* El icono siempre visible */}
          {!isCollapsed && <span>Seguridad</span>}
        </Button>

        <Button 
          variant="outline-light" 
          className="w-100 d-flex align-items-center" 
          onClick={handleLogout}
        >
          <FaSignOutAlt className="icon" style={{ minWidth: '30px' }} /> {/* El icono siempre visible */}
          {!isCollapsed && <span>Cerrar Sesión</span>}
        </Button>
      </Nav>
    </div>
  );
};

export default Sidebar;
