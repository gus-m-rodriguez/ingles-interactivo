import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Tema1 from './pages/Tema1';
import Tema2 from './pages/Tema2';
import Tema3 from './pages/Tema3';
import Tema4 from './pages/Tema4';
import Final from './pages/Final';
import Bienvenida from './pages/Bienvenida';
import Puntajes from './pages/Puntajes';
import Juegos from './pages/Juegos';
import NavBar from './components/NavBar';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 font-sans">
        <NavBar />
        <Routes>
          <Route path="/" element={<Bienvenida />} />
          <Route path="/tema1" element={<Tema1 />} />
          <Route path="/tema2" element={<Tema2 />} />
          <Route path="/tema3" element={<Tema3 />} />
          <Route path="/tema4" element={<Tema4 />} />
          <Route path="/final" element={<Final />} />
          <Route path="/puntajes" element={<Puntajes />} />
          <Route path="/juegos" element={<Juegos />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
} 