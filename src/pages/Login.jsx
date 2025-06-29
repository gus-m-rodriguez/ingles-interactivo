import React, { useState } from 'react';

// Hash SHA-256 real de 'MeGustaLeerMangaYverAnime'
const HASH = '33625e0a99c158e3a87e74bc0fcd8f24bd41bfff49cb790170d84514a64d4f4f';

function toSha256(str) {
  // Devuelve una promesa con el hash en hex
  return window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(str))
    .then(buf => Array.from(new Uint8Array(buf)).map(x => x.toString(16).padStart(2, '0')).join(''));
}

export default function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const hash = await toSha256(password);
    if (usuario.trim().toLowerCase() === 'agustina' && hash === HASH) {
      localStorage.setItem('login_ok', '1');
      onLogin();
    } else {
      setError('Usuario o contraseña incorrectos');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-blue-100">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4 min-w-[320px]">
        <h2 className="text-2xl font-bold text-pink-600 mb-2">Iniciar sesión</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-pink-400"
          autoFocus
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-pink-400"
        />
        <button
          type="submit"
          className="bg-pink-500 text-white font-bold rounded py-2 hover:bg-pink-700 transition"
          disabled={loading}
        >
          {loading ? 'Verificando...' : 'Entrar'}
        </button>
        {error && <div className="text-red-600 font-bold text-center">{error}</div>}
      </form>
    </div>
  );
} 