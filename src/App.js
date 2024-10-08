
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login'; 
import FacultadPage from './pages/consejo/facultadPage';
import EvaluacionFacultad from './pages/consejo/evaluacionfacultad';

import EstudiantePage from './pages/estudiante/estudiantePage'; 
import Evaluacion from './pages/estudiante/evaluacion';

import SecretarioPage from './pages/secretarioac/secretarioAcadPage';
import AsignacionDocente from './pages/secretarioac/asignarDocente';

import SecretarioTPage from './pages/secretariot/secretarioTecPage';
import Periodo from './pages/secretariot/periodoAcademico';

import Docente from './pages/docente/docentePage';
import Autoevaluacion from './pages/docente/autoevaluacion';

import ProtectedRoute from './componentes/protected_route';
import IngresarToken from './componentes/validacion';


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/ingresar-token" element={<IngresarToken />} />

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



