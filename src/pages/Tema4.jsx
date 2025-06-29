import React, { useState, useEffect } from 'react';
import Feedback from '../components/Feedback';

const personajeEmoji = {
  'Harry Potter': '🧙‍♂️',
  'Hermione Granger': '📚',
  'Ron Weasley': '🦁',
  'Luna Lovegood': '🌙',
  'Draco Malfoy': '🐍',
  'Hagrid': '🌳',
  'Dumbledore': '⭐',
  'Nene Yashiro': '🌸',
  'Hanako-kun': '👻',
  'Kou Minamoto': '🔶',
  'Tsukasa Yugi': '😈',
  'Sakura Nanamine': '🌺',
  'Mashle': '💪',
  'Finn Ames': '🧢',
  'Dot Barrett': '⚡',
  'Lance Crown': '💎',
  'Lemon Irvine': '🍋',
  'Tanjiro Kamado': '🗡️',
  'Nezuko Kamado': '🌸',
  'Zenitsu Agatsuma': '⚡',
  'Inosuke Hashibira': '🐗',
  'Kanao Tsuyuri': '🌷',
  'Shinobu Kocho': '🦋',
};

const actividades = [
  {
    tipo: 'opcion',
    pregunta: '¿Cuál de estos es un color?',
    opciones: ['Red', 'Monday', 'Argentina', 'Cat'],
    respuesta: 'Red',
    personaje: 'Shinobu Kocho',
  },
  {
    tipo: 'opcion',
    pregunta: 'Seleccioná el día correcto en inglés para "miércoles"',
    opciones: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
    respuesta: 'Wednesday',
    personaje: 'Draco Malfoy',
  },
  {
    tipo: 'opcion',
    pregunta: '¿Cómo se dice "azul" en inglés?',
    opciones: ['Blue', 'Green', 'Yellow', 'Pink'],
    respuesta: 'Blue',
    personaje: 'Mashle',
  },
  {
    tipo: 'opcion',
    pregunta: '¿Cuál de estos NO es un día de la semana?',
    opciones: ['Saturday', 'Dog', 'Tuesday', 'Thursday'],
    respuesta: 'Dog',
    personaje: 'Kou Minamoto',
  },
  {
    tipo: 'completar',
    pregunta: 'Completá: "The sky is _____" (azul)',
    respuesta: 'blue',
    personaje: 'Lance Crown',
  },
  {
    tipo: 'opcion',
    pregunta: '¿Qué significa "Green"?',
    opciones: ['Verde', 'Azul', 'Rojo', 'Amarillo'],
    respuesta: 'Verde',
    personaje: 'Tanjiro Kamado',
  },
  {
    tipo: 'completar',
    pregunta: 'Completá: "Today is _____" (lunes)',
    respuesta: 'monday',
    personaje: 'Hermione Granger',
  },
  {
    tipo: 'opcion',
    pregunta: '¿Cuál es el primer día de la semana en inglés?',
    opciones: ['Monday', 'Sunday', 'Tuesday', 'Friday'],
    respuesta: 'Monday',
    personaje: 'Hanako-kun',
  },
  {
    tipo: 'completar',
    pregunta: 'Completá: "The grass is _____" (verde)',
    respuesta: 'green',
    personaje: 'Finn Ames',
  },
  {
    tipo: 'opcion',
    pregunta: '¿Qué significa "Yellow"?',
    opciones: ['Amarillo', 'Verde', 'Rojo', 'Azul'],
    respuesta: 'Amarillo',
    personaje: 'Nene Yashiro',
  },
  {
    tipo: 'completar',
    pregunta: 'Completá: "Tomorrow is _____" (viernes)',
    respuesta: 'friday',
    personaje: 'Nezuko Kamado',
  },
  {
    tipo: 'opcion',
    pregunta: '¿Cuál es el último día de la semana en inglés?',
    opciones: ['Saturday', 'Sunday', 'Friday', 'Thursday'],
    respuesta: 'Sunday',
    personaje: 'Dot Barrett',
  },
];

const STORAGE_KEY = 'respuestas_tema4';
const PUNTAJE_KEY = 'puntaje_tema4';

export default function Tema4() {
  const [respuestas, setRespuestas] = useState(() => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || Array(actividades.length).fill(null);
  });
  const [feedback, setFeedback] = useState(() => {
    return actividades.map((act, idx) => {
      const resp = (JSON.parse(localStorage.getItem(STORAGE_KEY)) || [])[idx];
      if (resp == null) return null;
      if (act.tipo === 'opcion') return resp === act.respuesta;
      return resp === act.respuesta.toLowerCase();
    });
  });
  const [inputValues, setInputValues] = useState(Array(actividades.length).fill(''));
  const [puntaje, setPuntaje] = useState(() => Number(localStorage.getItem(PUNTAJE_KEY)) || 0);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(respuestas));
    const puntos = actividades.reduce((acc, act, idx) => {
      if (respuestas[idx] == null) return acc;
      if (act.tipo === 'opcion' && respuestas[idx] === act.respuesta) return acc + 1;
      if (act.tipo === 'completar' && respuestas[idx] === act.respuesta.toLowerCase()) return acc + 1;
      return acc;
    }, 0);
    setPuntaje(puntos);
    localStorage.setItem(PUNTAJE_KEY, puntos);
  }, [respuestas]);

  const handleRespuesta = (idx, opcion) => {
    if (respuestas[idx] !== null) return; // Bloqueado
    const nuevas = [...respuestas];
    nuevas[idx] = opcion;
    setRespuestas(nuevas);
    const nuevosFeedback = [...feedback];
    nuevosFeedback[idx] = opcion === actividades[idx].respuesta;
    setFeedback(nuevosFeedback);
  };

  const handleInputChange = (idx, value) => {
    const nuevosInputs = [...inputValues];
    nuevosInputs[idx] = value;
    setInputValues(nuevosInputs);
  };

  const handleInputSubmit = (idx) => {
    if (respuestas[idx] !== null) return; // Bloqueado
    const respuesta = inputValues[idx].toLowerCase().trim();
    const nuevas = [...respuestas];
    nuevas[idx] = respuesta;
    setRespuestas(nuevas);
    const nuevosFeedback = [...feedback];
    nuevosFeedback[idx] = respuesta === actividades[idx].respuesta.toLowerCase();
    setFeedback(nuevosFeedback);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Tema 4: Colours & Days</h1>
      <div className="mb-4 text-right font-bold text-green-700">Puntaje: {puntaje} / {actividades.length}</div>
      {actividades.map((act, idx) => (
        <div key={idx} className="mb-6 bg-white rounded-lg shadow p-4">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">{personajeEmoji[act.personaje] || '❓'}</span>
            <span className="font-semibold">{act.personaje} pregunta:</span>
          </div>
          <p className="mb-2">{act.pregunta}</p>
          {act.tipo === 'opcion' ? (
            <div className="flex flex-wrap gap-2">
              {act.opciones.map((op, opIdx) => (
                <button
                  key={opIdx}
                  className={`px-3 py-1 rounded border transition-all ${
                    respuestas[idx] === op
                      ? feedback[idx]
                        ? 'bg-green-200 border-green-500'
                        : 'bg-red-200 border-red-500'
                      : 'bg-blue-100 border-blue-300 hover:bg-blue-200'
                  }`}
                  onClick={() => handleRespuesta(idx, op)}
                  disabled={respuestas[idx] !== null}
                >
                  {op}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValues[idx]}
                onChange={(e) => handleInputChange(idx, e.target.value)}
                className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                placeholder="Escribí tu respuesta..."
                onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit(idx)}
                disabled={respuestas[idx] !== null}
              />
              <button
                onClick={() => handleInputSubmit(idx)}
                className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                disabled={respuestas[idx] !== null}
              >
                Verificar
              </button>
            </div>
          )}
          <Feedback correcto={feedback[idx]} respuesta={act.respuesta} mostrado={respuestas[idx] !== null} />
        </div>
      ))}
    </div>
  );
} 