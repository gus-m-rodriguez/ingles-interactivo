import React, { useState, useEffect } from 'react';
import Feedback from '../components/Feedback';
import html2pdf from 'html2pdf.js';
import '../pdf.css';

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
    tipo: 'completar',
    pregunta: 'Escribí en inglés: 17',
    respuesta: ['seventeen'],
    personaje: 'Hermione Granger',
  },
  {
    tipo: 'completar',
    pregunta: 'Escribí en inglés: 25',
    respuesta: ['twenty-five', 'twenty five'],
    personaje: 'Mashle',
  },
  {
    tipo: 'completar',
    pregunta: 'Escribí en inglés: 42',
    respuesta: ['forty-two', 'forty two'],
    personaje: 'Ron Weasley',
  },
  {
    tipo: 'completar',
    pregunta: 'Escribí en inglés: 100',
    respuesta: ['one hundred', 'onehundred'],
    personaje: 'Dumbledore',
  },
  {
    tipo: 'completar',
    pregunta: '¿Cómo se escribe "amarillo" en inglés?',
    respuesta: ['yellow'],
    personaje: 'Hanako-kun',
  },
  {
    tipo: 'completar',
    pregunta: '¿Cómo se escribe "naranja" en inglés?',
    respuesta: ['orange'],
    personaje: 'Luna Lovegood',
  },
  {
    tipo: 'completar',
    pregunta: '¿Cómo se escribe "diecinueve" en inglés?',
    respuesta: ['nineteen'],
    personaje: 'Finn Ames',
  },
  {
    tipo: 'completar',
    pregunta: '¿Cómo se escribe "treinta y uno" en inglés?',
    respuesta: ['thirty-one', 'thirty one'],
    personaje: 'Tanjiro Kamado',
  },
  {
    tipo: 'completar',
    pregunta: '¿Cómo se escribe "setenta y cinco" en inglés?',
    respuesta: ['seventy-five', 'seventy five'],
    personaje: 'Kou Minamoto',
  },
  {
    tipo: 'completar',
    pregunta: '¿Cómo se escribe "verde" en inglés?',
    respuesta: ['green'],
    personaje: 'Shinobu Kocho',
  },
  {
    tipo: 'completar',
    pregunta: '¿Cómo se escribe "cincuenta y ocho" en inglés?',
    respuesta: ['fifty-eight', 'fifty eight'],
    personaje: 'Zenitsu Agatsuma',
  },
  {
    tipo: 'completar',
    pregunta: '¿Cómo se escribe "rojo" en inglés?',
    respuesta: ['red'],
    personaje: 'Sakura Nanamine',
  },
  {
    tipo: 'completar',
    pregunta: '¿Cómo se escribe "doce" en inglés?',
    respuesta: ['twelve'],
    personaje: 'Draco Malfoy',
  },
  {
    tipo: 'completar',
    pregunta: '¿Cómo se escribe "catorce" en inglés?',
    respuesta: ['fourteen'],
    personaje: 'Nezuko Kamado',
  },
  {
    tipo: 'completar',
    pregunta: '¿Cómo se escribe "azul" en inglés?',
    respuesta: ['blue'],
    personaje: 'Kanao Tsuyuri',
  },
];

const STORAGE_KEY = 'respuestas_tema5';
const PUNTAJE_KEY = 'puntaje_tema5';

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

export default function Tema5() {
  const [respuestas, setRespuestas] = useState(() => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || Array(actividades.length).fill(null);
  });
  const [feedback, setFeedback] = useState(() => {
    return actividades.map((act, idx) => {
      const resp = (JSON.parse(localStorage.getItem(STORAGE_KEY)) || [])[idx];
      if (resp == null) return null;
      return esEquivalente(resp, act.respuesta);
    });
  });
  const [inputValues, setInputValues] = useState(Array(actividades.length).fill(''));
  const [puntaje, setPuntaje] = useState(() => Number(localStorage.getItem(PUNTAJE_KEY)) || 0);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(respuestas));
    const puntos = actividades.reduce((acc, act, idx) => {
      if (respuestas[idx] == null) return acc;
      if (esEquivalente(respuestas[idx], act.respuesta)) return acc + 1;
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

  const handleDescargarPDF = () => {
    const element = document.getElementById('pdf-cuestionario');
    element.classList.remove('pdf-hidden');
    html2pdf()
      .set({
        margin: 0.5,
        filename: 'Tema5.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      })
      .from(element)
      .save()
      .then(() => {
        element.classList.add('pdf-hidden');
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-purple-600 mb-2">Tema 5: Más números y colores</h1>
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-purple-700 text-base">Puntaje: {puntaje} / {actividades.length}</div>
        <button
          onClick={handleDescargarPDF}
          className="px-3 py-1 bg-pink-500 text-white rounded-md font-semibold text-sm shadow hover:bg-pink-600 transition-all"
          style={{ minWidth: '120px' }}
        >
          Descargar PDF
        </button>
      </div>
      <div id="pdf-cuestionario" className="pdf-hidden">
        <h1 className="text-3xl font-bold text-purple-600 mb-4">Tema 5: Más números y colores</h1>
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
                  <span
                    key={opIdx}
                    className="px-3 py-1 rounded border bg-blue-100 border-blue-300 text-gray-700"
                    style={{ display: 'inline-block', minWidth: '80px', marginBottom: '4px' }}
                  >
                    {op}
                  </span>
                ))}
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={''}
                  readOnly
                  className="flex-1 px-3 py-1 border border-gray-300 rounded bg-gray-100"
                  placeholder="Respuesta..."
                  style={{ minWidth: '200px' }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
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