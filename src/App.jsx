import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Tema1 from './pages/Tema1';
import Tema2 from './pages/Tema2';
import Tema3 from './pages/Tema3';
import Tema4 from './pages/Tema4';
import Tema5 from './pages/Tema5';
import Tema6 from './pages/Tema6';
import Tema7 from './pages/Tema7';
import Tema8 from './pages/Tema8';
import Tema9 from './pages/Tema9';
import Final from './pages/Final';
import Bienvenida from './pages/Bienvenida';
import Puntajes from './pages/Puntajes';
import Cuestionarios from './pages/Cuestionarios';
import Juegos from './pages/Juegos';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import FinalII from './pages/FinalII';

export default function App() {
  const [logueado, setLogueado] = useState(() => localStorage.getItem('login_ok') === '1');

  useEffect(() => {
    setLogueado(localStorage.getItem('login_ok') === '1');
  }, []);

  const handleLogin = () => setLogueado(true);
  const handleLogout = () => {
    localStorage.removeItem('login_ok');
    setLogueado(false);
  };

  if (!logueado) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 font-sans">
        <NavBar onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Bienvenida />} />
          <Route path="/tema1" element={<Tema1 />} />
          <Route path="/tema2" element={<Tema2 />} />
          <Route path="/tema3" element={<Tema3 />} />
          <Route path="/tema4" element={<Tema4 />} />
          <Route path="/tema5" element={<Tema5 />} />
          <Route path="/tema6" element={<Tema6 />} />
          <Route path="/tema7" element={<Tema7 />} />
          <Route path="/tema8" element={<Tema8 />} />
          <Route path="/tema9" element={<Tema9 />} />
          <Route path="/final" element={<Final />} />
          <Route path="/final-ii" element={<FinalII />} />
          <Route path="/cuestionarios" element={<Cuestionarios />} />
          <Route path="/puntajes" element={<Puntajes />} />
          <Route path="/juegos" element={<Juegos />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
} 