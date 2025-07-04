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
  // Subject pronouns
  {
    tipo: 'completar',
    pregunta: 'Completa: ___ am Agustina.',
    respuesta: ['I'],
    personaje: 'Harry Potter',
  },
  {
    tipo: 'completar',
    pregunta: 'Completa: ___ are my friend.',
    respuesta: ['You'],
    personaje: 'Hermione Granger',
  },
  {
    tipo: 'completar',
    pregunta: 'Completa: ___ is a cat. (para "eso")',
    respuesta: 'It',
    personaje: 'Ron Weasley',
  },
  {
    tipo: 'completar',
    pregunta: 'Completa: ___ are students. (nosotros)',
    respuesta: 'We',
    personaje: 'Mashle',
  },
  {
    tipo: 'completar',
    pregunta: 'Completa: ___ is happy. (ella)',
    respuesta: 'She',
    personaje: 'Luna Lovegood',
  },
  {
    tipo: 'completar',
    pregunta: 'Completa: ___ are brothers. (ellos)',
    respuesta: 'They',
    personaje: 'Tanjiro Kamado',
  },
  {
    tipo: 'completar',
    pregunta: 'Completa: ___ is a wizard. (él)',
    respuesta: 'He',
    personaje: 'Dumbledore',
  },
  {
    tipo: 'completar',
    pregunta: 'Completa: ___ are teachers. (ustedes)',
    respuesta: 'You',
    personaje: 'Hanako-kun',
  },
  // Affirmative to be
  {
    tipo: 'completar',
    pregunta: 'Completa: I ___ a student.',
    respuesta: ['am'],
    personaje: 'Hermione Granger',
  },
  {
    tipo: 'completar',
    pregunta: 'Completa: She ___ my sister.',
    respuesta: 'is',
    personaje: 'Nezuko Kamado',
  },
  {
    tipo: 'completar',
    pregunta: 'Completa: They ___ friends.',
    respuesta: 'are',
    personaje: 'Zenitsu Agatsuma',
  },
  {
    tipo: 'completar',
    pregunta: 'Completa: It ___ a dog.',
    respuesta: 'is',
    personaje: 'Kou Minamoto',
  },
  // Negative to be
  {
    tipo: 'completar',
    pregunta: 'Completa: I ___ not tired.',
    respuesta: ['am'],
    personaje: 'Mashle',
  },
  {
    tipo: 'completar',
    pregunta: 'Completa: He ___ not my brother.',
    respuesta: 'is',
    personaje: 'Ron Weasley',
  },
  {
    tipo: 'completar',
    pregunta: 'Completa: We ___ not in class.',
    respuesta: 'are',
    personaje: 'Lemon Irvine',
  },
  {
    tipo: 'completar',
    pregunta: 'Completa: You ___ not late.',
    respuesta: 'are',
    personaje: 'Draco Malfoy',
  },
  // Reforzando con frases
  {
    tipo: 'completar',
    pregunta: 'Completa: ___ am not a boy.',
    respuesta: ['I'],
    personaje: 'Sakura Nanamine',
  },
  {
    tipo: 'completar',
    pregunta: 'Completa: ___ is not a girl. (él)',
    respuesta: 'He',
    personaje: 'Dot Barrett',
  },
  {
    tipo: 'completar',
    pregunta: 'Completa: ___ are not cats. (ellos)',
    respuesta: 'They',
    personaje: 'Finn Ames',
  },
  {
    tipo: 'completar',
    pregunta: 'Completa: ___ is not a pencil. (eso)',
    respuesta: 'It',
    personaje: 'Shinobu Kocho',
  },
];

const STORAGE_KEY = 'respuestas_tema6';
const PUNTAJE_KEY = 'puntaje_tema6';

// Función de normalización y comparación flexible
function normalizar(str) {
  return str
    .trim()
    .replace(/[.。]+$/, '') // quita punto final
    .replace(/´/g, "'") // reemplaza acento por apóstrofe
    .toLowerCase();
}
function esEquivalente(respUsuario, respuestaCorrecta) {
  if (Array.isArray(respuestaCorrecta)) {
    return respuestaCorrecta.some(eq => normalizar(respUsuario) === normalizar(eq));
  }
  return normalizar(respUsuario) === normalizar(respuestaCorrecta);
}

export default function Tema6() {
  const [respuestas, setRespuestas] = useState(() => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || Array(actividades.length).fill(null);
  });
  const [feedback, setFeedback] = useState(() => {
    return actividades.map((act, idx) => {
      const resp = (JSON.parse(localStorage.getItem(STORAGE_KEY)) || [])[idx];
      if (resp == null) return null;
      return resp.trim().toLowerCase() === act.respuesta.toLowerCase();
    });
  });
  const [inputValues, setInputValues] = useState(Array(actividades.length).fill(''));
  const [puntaje, setPuntaje] = useState(() => Number(localStorage.getItem(PUNTAJE_KEY)) || 0);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(respuestas));
    const puntos = actividades.reduce((acc, act, idx) => {
      if (respuestas[idx] == null) return acc;
      if (respuestas[idx].trim().toLowerCase() === act.respuesta.toLowerCase()) return acc + 1;
      return acc;
    }, 0);
    setPuntaje(puntos);
    localStorage.setItem(PUNTAJE_KEY, puntos);
  }, [respuestas]);

  const handleInputChange = (idx, value) => {
    const nuevosInputs = [...inputValues];
    nuevosInputs[idx] = value;
    setInputValues(nuevosInputs);
  };

  const handleInputSubmit = (idx) => {
    if (respuestas[idx] !== null) return; // Bloqueado
    const respuesta = inputValues[idx];
    const nuevas = [...respuestas];
    nuevas[idx] = respuesta;
    setRespuestas(nuevas);
    const nuevosFeedback = [...feedback];
    nuevosFeedback[idx] = esEquivalente(respuesta, actividades[idx].respuesta);
    setFeedback(nuevosFeedback);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-purple-600 mb-4">Tema 6: Subject Pronouns / Verb to be</h1>
      <div className="mb-4 text-right font-bold text-purple-700">Puntaje: {puntaje} / {actividades.length}</div>
      {actividades.map((act, idx) => (
        <div key={idx} className="mb-6 bg-white rounded-lg shadow p-4">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">{personajeEmoji[act.personaje] || '❓'}</span>
            <span className="font-semibold">{act.personaje} pregunta:</span>
          </div>
          <p className="mb-2">{act.pregunta}</p>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              className="border rounded px-2 py-1"
              value={inputValues[idx]}
              onChange={e => handleInputChange(idx, e.target.value)}
              disabled={respuestas[idx] !== null}
              onKeyDown={e => e.key === 'Enter' && handleInputSubmit(idx)}
            />
            <button
              className="px-3 py-1 rounded bg-blue-200 hover:bg-blue-300"
              onClick={() => handleInputSubmit(idx)}
              disabled={respuestas[idx] !== null}
            >
              Enviar
            </button>
          </div>
          {respuestas[idx] !== null && (
            <Feedback correcto={feedback[idx]} respuesta={act.respuesta} mostrado={respuestas[idx] !== null} />
          )}
        </div>
      ))}
    </div>
  );
} 