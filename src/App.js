
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login'; 
import DocentesPage from './pages/docentesEvaluar'; 
import Evaluar from './pages/evaluacion';
import Reporte from './pages/menuSecrAcd';
import Periodo from './pages/periodoAcademico';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/docentes" element={<DocentesPage />} />
        <Route path="/evaluar" element={<Evaluar />} />
        <Route path="/reporte" element={<Reporte />} />
        <Route path="/periodo" element={<Periodo />} />
      </Routes>
    </Router>
  );
}

export default App;



