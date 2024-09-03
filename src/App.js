
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login'; 
import EstudiantePage from './pages/estudiantePage'; 
import Evaluacion from './pages/evaluacion';
import SecretarioPage from './pages/secretarioAcadPage';
import SecretarioTPage from './pages/secretarioTecPage';
import Periodo from './pages/periodoAcademico';
import Docente from './pages/docentePage';
import ProtectedRoute from './componentes/protected_route';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/estudiante" element={
          <ProtectedRoute requiredRole="estudiante">
            <EstudiantePage />
          </ProtectedRoute>}/>
        <Route path="/docente" element={
          <ProtectedRoute requiredRole="docente">
            <Docente />
          </ProtectedRoute>} />
        <Route path="/encuesta_estudiante" element={<Evaluacion />} />
        <Route path="/secretario_ac" element={<SecretarioPage />} />
        <Route path="/secretario_tec" element={<SecretarioTPage />} />
        <Route path="/periodo" element={<Periodo />} />
        
      </Routes>
    </Router>
  );
}

export default App;



