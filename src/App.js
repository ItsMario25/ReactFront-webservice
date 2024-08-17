
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login'; // Asegúrate de que la ruta sea correcta
import DocentesPage from './pages/docentesEvaluar'; // Asegúrate de que la ruta sea correcta

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/docentes" element={<DocentesPage />} />
      </Routes>
    </Router>
  );
}

export default App;



