import React, { useState } from 'react';
import SopaDeLetras from '../components/SopaDeLetras';
import MashBombGame from '../components/MashBombGame';

const sopas = [
  {
    nombre: 'Números',
    palabras: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'],
    storageKey: 'sopa_numeros',
  },
  {
    nombre: 'Colores',
    palabras: ['red', 'blue', 'green', 'yellow', 'black', 'white', 'purple', 'orange', 'pink', 'gray', 'brown', 'cyan'],
    storageKey: 'sopa_colores',
  },
  {
    nombre: 'Vocabulario',
    palabras: ['cat', 'dog', 'house', 'school', 'book', 'friend', 'family', 'play', 'eat', 'drink', 'run', 'laugh'],
    storageKey: 'sopa_vocabulario',
  },
];

const juegosDisponibles = [
  { nombre: 'Sopa de Letras', tipo: 'sopa' },
  { nombre: 'Mash y las bombas de crema', tipo: 'mash' },
];

export default function Juegos() {
  const [seleccion, setSeleccion] = useState(0);
  const [juego, setJuego] = useState('sopa');

  const handleSeleccion = (idx) => {
    localStorage.removeItem(sopas[idx].storageKey);
    setSeleccion(idx);
    setJuego('sopa');
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-extrabold text-center text-pink-700 mb-6">Juegos</h1>
      <div className="flex justify-center gap-4 mb-6">
        {juegosDisponibles.map((j) => (
          <button
            key={j.tipo}
            className={`px-4 py-2 rounded-full font-bold border-2 transition-all duration-150 ${juego === j.tipo ? 'bg-pink-500 text-white border-pink-700' : 'bg-white text-pink-700 border-pink-300 hover:bg-pink-100'}`}
            onClick={() => setJuego(j.tipo)}
          >
            {j.nombre}
          </button>
        ))}
      </div>
      {juego === 'sopa' && (
        <>
          <div className="flex justify-center gap-4 mb-6">
            {sopas.map((s, idx) => (
              <button
                key={s.nombre}
                className={`px-4 py-2 rounded-full font-bold border-2 transition-all duration-150 ${seleccion === idx ? 'bg-pink-500 text-white border-pink-700' : 'bg-white text-pink-700 border-pink-300 hover:bg-pink-100'}`}
                onClick={() => handleSeleccion(idx)}
              >
                {s.nombre}
              </button>
            ))}
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4">
            <SopaDeLetras
              palabras={sopas[seleccion].palabras}
              size={12}
              storageKey={sopas[seleccion].storageKey}
            />
          </div>
        </>
      )}
      {juego === 'mash' && (
        <div className="bg-white rounded-xl shadow-lg p-4 min-h-[500px] flex items-center justify-center">
          <MashBombGame />
        </div>
      )}
    </div>
  );
} 