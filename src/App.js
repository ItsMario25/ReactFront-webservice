
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login'; 
import FacultadPage from './pages/facultadPage';
import EstudiantePage from './pages/estudiantePage'; 
import Evaluacion from './pages/evaluacion';
import SecretarioPage from './pages/secretarioAcadPage';
import SecretarioTPage from './pages/secretarioTecPage';
import Periodo from './pages/periodoAcademico';
import Docente from './pages/docentePage';
import AsignacionDocente from './pages/asignarDocente';
import Autoevaluacion from './pages/autoevaluacion';
import ProtectedRoute from './componentes/protected_route';
import EvaluacionFacultad from './pages/evaluacionfacultad';



function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />

      {/* Rutas de estudiante */}
      <Route path="/estudiante" element={
        <ProtectedRoute requiredRole="estudiante">
          <EstudiantePage />
        </ProtectedRoute>}/>
      <Route path="/encuesta_estudiante" element={
        <ProtectedRoute requiredRole="estudiante">
          <Evaluacion />
        </ProtectedRoute>}/>
      
      {/* Rutas de docente */}
      <Route path="/docente" element={
        <ProtectedRoute requiredRole="docente">
          <Docente />
        </ProtectedRoute>} />
        <Route path="/autoevaluacion" element={
        <ProtectedRoute requiredRole="docente">
          <Autoevaluacion />
        </ProtectedRoute>} />
      
      {/* Rutas de Secretario Academico */}
      <Route path="/secretario_ac" element={
        <ProtectedRoute requiredRole="secretario_academico">
          <SecretarioPage />
        </ProtectedRoute>}/>
        <Route path="/asignar_curso/:id_curso" element={
        <ProtectedRoute requiredRole="secretario_academico">
          <AsignacionDocente />
        </ProtectedRoute>}/>
      
      {/* Rutas de secretario Tecnico */}
      <Route path="/secretario_tec" element={
        <ProtectedRoute requiredRole="secretario_tecnico">
          <SecretarioTPage />
        </ProtectedRoute>}/>
      <Route path="/periodo" element={
        <ProtectedRoute requiredRole="secretario_tecnico">
          <Periodo />
        </ProtectedRoute>}/>
      <Route path="/editarperiodo/:id" element={
        <ProtectedRoute requiredRole="secretario_tecnico">
          <Periodo />
        </ProtectedRoute>
      }/>

      {/* Rutas de miembro de consejo de Facultad */}
      <Route path="/consejo_fac" element={
        <ProtectedRoute requiredRole="consejo_facultad">
          <FacultadPage />
        </ProtectedRoute>
      }/>
      
      <Route path="/encuesta_facultad" element={
        <ProtectedRoute requiredRole="consejo_facultad">
          <EvaluacionFacultad />
        </ProtectedRoute>
      }/>

    </Routes>
  </Router>
  );
}

export default App;



