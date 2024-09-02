
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login'; 
import EstudiantePage from './pages/estudiantePage'; 
import Evaluacion from './pages/evaluacion';
import SecretarioPage from './pages/secretarioAcadPage';
import Periodo from './pages/periodoAcademico';
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
        <Route path="/encuesta_estudiante" element={<Evaluacion />} />
        <Route path="/reportes" element={
          <ProtectedRoute requiredRole="secretario_academico">
            <SecretarioPage />
          </ProtectedRoute>
          } />
        <Route path="/periodo" element={<Periodo />} />
      </Routes>
    </Router>
  );
}

export default App;



