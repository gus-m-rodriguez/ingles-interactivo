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
  // Writing Introduction
  {
    tipo: 'completar',
    pregunta: "My name is ___",
    respuesta: "Agustina",
    personaje: "Harry Potter",
  },
  {
    tipo: 'completar',
    pregunta: "I'm ___ years old.",
    respuesta: "10",
    personaje: "Hermione Granger",
  },
  {
    tipo: 'completar',
    pregunta: "I'm in year ___ at Anglo school.",
    respuesta: "5",
    personaje: "Ron Weasley",
  },
  {
    tipo: 'completar',
    pregunta: "I'm from ___, Argentina.",
    respuesta: "Santiago",
    personaje: "Luna Lovegood",
  },
  // Frase completa
  {
    tipo: 'completar-frase',
    pregunta: 'Escribe la frase: Me llamo Agustina.',
    respuesta: [
      'My name is Agustina.',
      'My name is Agustina'
    ],
    personaje: 'Mashle',
  },
  {
    tipo: 'completar-frase',
    pregunta: 'Escribe la frase: Tengo 10 años.',
    respuesta: [
      "I'm 10 years old.",
      "I am 10 years old.",
      "I'm 10 years old",
      "I am 10 years old"
    ],
    personaje: 'Dumbledore',
  },
  {
    tipo: 'completar-frase',
    pregunta: "Escribe la frase: Estoy en quinto año en Anglo.",
    respuesta: "I'm in year 5 at Anglo school.",
    personaje: "Hanako-kun",
  },
  {
    tipo: 'completar-frase',
    pregunta: "Escribe la frase: Soy de Santiago, Argentina.",
    respuesta: "I'm from Santiago, Argentina.",
    personaje: "Nezuko Kamado",
  },
  // Possessive 's
  {
    tipo: 'completar',
    pregunta: 'That is my ___ car. (auto de mi papá)',
    respuesta: ["dad's", "dad´s"],
    personaje: 'Draco Malfoy',
  },
  {
    tipo: 'completar',
    pregunta: "My aunt's name is ___",
    respuesta: "Maria",
    personaje: "Finn Ames",
  },
  {
    tipo: 'completar',
    pregunta: "That is my ___ house. (casa de mi abuela)",
    respuesta: "grandma's",
    personaje: "Sakura Nanamine",
  },
  {
    tipo: 'completar',
    pregunta: "My ___ name is Tom. (hermano)",
    respuesta: "brother's",
    personaje: "Kou Minamoto",
  },
  // Frase completa con posesivo
  {
    tipo: 'completar-frase',
    pregunta: "Escribe la frase: Ese es el auto de mi papá.",
    respuesta: "That is my dad's car.",
    personaje: "Lemon Irvine",
  },
  {
    tipo: 'completar-frase',
    pregunta: "Escribe la frase: El nombre de mi tía es Maria.",
    respuesta: "My aunt's name is Maria.",
    personaje: "Dot Barrett",
  },
  // Have/has got
  {
    tipo: 'completar',
    pregunta: "Lucy ___ got a big house.",
    respuesta: "has",
    personaje: "Tanjiro Kamado",
  },
  {
    tipo: 'completar',
    pregunta: "We ___ got an old grandfather.",
    respuesta: "have",
    personaje: "Shinobu Kocho",
  },
  {
    tipo: 'completar',
    pregunta: "Annie ___ got three uncles.",
    respuesta: "has",
    personaje: "Mashle",
  },
  {
    tipo: 'completar',
    pregunta: "You ___ got a good dog.",
    respuesta: "have",
    personaje: "Ron Weasley",
  },
  // Frase completa con have/has got
  {
    tipo: 'completar-frase',
    pregunta: 'Escribe la frase: Lucy tiene una casa grande.',
    respuesta: [
      'Lucy has got a big house.',
      'Lucy has got a big house'
    ],
    personaje: 'Dumbledore',
  },
  {
    tipo: 'completar-frase',
    pregunta: "Escribe la frase: Nosotros tenemos un abuelo viejo.",
    respuesta: "We have got an old grandfather.",
    personaje: "Hanako-kun",
  },
];

const STORAGE_KEY = 'respuestas_tema8';
const PUNTAJE_KEY = 'puntaje_tema8';

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

export default function Tema8() {
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
      <h1 className="text-3xl font-bold text-purple-600 mb-4">Tema 8: Writing Introduction and Possessives</h1>
      <div className="mb-4 text-right font-bold text-purple-700">Puntaje: {puntaje} / {actividades.length}</div>
      {actividades.map((act, idx) => (
        <div key={idx} className="mb-6 bg-white rounded-lg shadow p-4">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">{personajeEmoji[act.personaje] || '❓'}</span>
            <span className="font-semibold">{act.personaje} pregunta:</span>
          </div>
          <p className="mb-2">{act.pregunta}</p>
          <div className="flex gap-2 items-center">
            {act.tipo === 'completar-frase' ? (
              <input
                type="text"
                className="border rounded px-2 py-1 w-full"
                value={inputValues[idx]}
                onChange={e => handleInputChange(idx, e.target.value)}
                disabled={respuestas[idx] !== null}
                onKeyDown={e => e.key === 'Enter' && handleInputSubmit(idx)}
                placeholder="Escribe la frase completa"
              />
            ) : (
              <input
                type="text"
                className="border rounded px-2 py-1"
                value={inputValues[idx]}
                onChange={e => handleInputChange(idx, e.target.value)}
                disabled={respuestas[idx] !== null}
                onKeyDown={e => e.key === 'Enter' && handleInputSubmit(idx)}
                placeholder="Completa la palabra"
              />
            )}
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