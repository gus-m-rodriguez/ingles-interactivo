import React, { useState } from 'react';

const temas = [
  { key: 'tema1', label: 'Tema 1: Greetings & Introductions', total: 12 },
  { key: 'tema2', label: 'Tema 2: Personal Information', total: 12 },
  { key: 'tema3', label: 'Tema 3: Countries & Nationalities', total: 12 },
  { key: 'tema4', label: 'Tema 4: Colours & Days', total: 12 },
  { key: 'final', label: 'Desafío Final', total: 20 },
];

function getPuntajes() {
  let total = 0;
  let totalMax = 0;
  const porTema = temas.map(t => {
    const puntos = Number(localStorage.getItem(`puntaje_${t.key}`)) || 0;
    total += puntos;
    totalMax += t.total;
    return { ...t, puntaje: puntos, porcentaje: t.total ? Math.round((puntos / t.total) * 100) : 0 };
  });
  return { porTema, total, totalMax };
}

export default function Puntajes() {
  const [showPwd, setShowPwd] = useState({});
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');
  const [actualizado, setActualizado] = useState('');
  const [temaReiniciar, setTemaReiniciar] = useState(null);
  const { porTema, total, totalMax } = getPuntajes();

  const handleReiniciar = (key) => {
    setShowPwd({ [key]: true });
    setError('');
    setPwd('');
    setTemaReiniciar(key);
  };

  const confirmarReinicio = () => {
    if (pwd === 'AgusIngles2015' && temaReiniciar) {
      localStorage.removeItem(`respuestas_${temaReiniciar}`);
      localStorage.removeItem(`puntaje_${temaReiniciar}`);
      setShowPwd({});
      setActualizado(temaReiniciar);
      setTimeout(() => setActualizado(''), 2000);
      setTemaReiniciar(null);
      setTimeout(() => window.location.reload(), 500);
    } else {
      setError('Contraseña incorrecta');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-6 bg-white rounded-lg shadow text-center">
      <h1 className="text-3xl font-bold text-pink-600 mb-6 flex items-center justify-center gap-2">
        <span role="img" aria-label="puntajes">📊</span> Puntajes Obtenidos
      </h1>
      <table className="w-full mb-6">
        <thead>
          <tr className="text-lg text-pink-700">
            <th className="py-2">Tema</th>
            <th className="py-2">Puntaje</th>
            <th className="py-2">Total</th>
            <th className="py-2">% Alcanzado</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {porTema.map(t => (
            <tr key={t.key} className="border-b last:border-b-0">
              <td className="py-2 text-left">{t.label}</td>
              <td className="py-2 font-bold text-xl text-pink-700">{t.puntaje}</td>
              <td className="py-2 font-bold text-md">{t.total}</td>
              <td className="py-2 font-bold text-md">{t.porcentaje}%</td>
              <td className="py-2">
                <button
                  className="bg-pink-500 text-white px-3 py-1 rounded-lg font-bold hover:bg-pink-600 transition text-sm"
                  onClick={() => handleReiniciar(t.key)}
                >
                  Reiniciar
                </button>
                {showPwd[t.key] && (
                  <div className="mt-2 flex flex-col items-center">
                    <input
                      type="password"
                      className="border px-2 py-1 rounded mb-1 text-sm"
                      placeholder="Contraseña"
                      value={pwd}
                      onChange={e => setPwd(e.target.value)}
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm"
                        onClick={confirmarReinicio}
                      >
                        Confirmar
                      </button>
                      <button
                        className="text-gray-500 hover:underline text-sm"
                        onClick={() => setShowPwd({})}
                      >
                        Cancelar
                      </button>
                    </div>
                    {error && <div className="text-red-600 mt-1 text-xs">{error}</div>}
                  </div>
                )}
                {actualizado === t.key && <div className="text-green-600 text-xs mt-1">¡Reiniciado!</div>}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-pink-100">
            <td className="py-2 font-bold text-right">Total</td>
            <td className="py-2 font-bold text-2xl text-pink-700">{total}</td>
            <td className="py-2 font-bold text-md">{totalMax}</td>
            <td className="py-2 font-bold text-md">{totalMax ? Math.round((total / totalMax) * 100) : 0}%</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
} 