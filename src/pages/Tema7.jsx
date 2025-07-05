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
  // Transformar afirmativa en pregunta
  {
    tipo: 'completar-frase',
    pregunta: 'Transforma en pregunta: You are short.',
    respuesta: [
      'Are you short?',
      'Are you short'
    ],
    personaje: 'Harry Potter',
  },
  {
    tipo: 'completar-frase',
    pregunta: 'Transforma en pregunta: My name is Sora.',
    respuesta: [
      'Is my name Sora?',
      'Is my name Sora'
    ],
    personaje: 'Hermione Granger',
  },
  {
    tipo: 'completar-frase',
    pregunta: 'Transforma en pregunta: The weather is hot.',
    respuesta: 'Is the weather hot?',
    personaje: 'Ron Weasley',
  },
  {
    tipo: 'completar-frase',
    pregunta: 'Transforma en pregunta: My dad is a doctor.',
    respuesta: 'Is my dad a doctor?',
    personaje: 'Mashle',
  },
  // Completar con Wh-word
  {
    tipo: 'completar',
    pregunta: '___ is your name?',
    respuesta: ['What'],
    personaje: 'Luna Lovegood',
  },
  {
    tipo: 'completar',
    pregunta: '___ is your best friend?',
    respuesta: 'Who',
    personaje: 'Tanjiro Kamado',
  },
  {
    tipo: 'completar',
    pregunta: '___ is your school?',
    respuesta: 'Where',
    personaje: 'Dumbledore',
  },
  {
    tipo: 'completar',
    pregunta: '___ is your birthday?',
    respuesta: 'When',
    personaje: 'Hanako-kun',
  },
  {
    tipo: 'completar',
    pregunta: '___ are you sad?',
    respuesta: 'Why',
    personaje: 'Nezuko Kamado',
  },
  // Completar con verbo to be
  {
    tipo: 'completar',
    pregunta: 'Where ___ your mom?',
    respuesta: 'is',
    personaje: 'Zenitsu Agatsuma',
  },
  {
    tipo: 'completar',
    pregunta: 'Why ___ you tired?',
    respuesta: 'are',
    personaje: 'Draco Malfoy',
  },
  {
    tipo: 'completar',
    pregunta: 'Who ___ your teacher?',
    respuesta: 'is',
    personaje: 'Finn Ames',
  },
  // Nuevos ejemplos para reforzar
  {
    tipo: 'completar-frase',
    pregunta: 'Transforma en pregunta: She is your sister.',
    respuesta: [
      'Is she your sister?',
      'Is she your sister'
    ],
    personaje: 'Sakura Nanamine',
  },
  {
    tipo: 'completar-frase',
    pregunta: 'Transforma en pregunta: They are at home.',
    respuesta: 'Are they at home?',
    personaje: 'Kou Minamoto',
  },
  {
    tipo: 'completar',
    pregunta: '___ is your favorite color?',
    respuesta: 'What',
    personaje: 'Lemon Irvine',
  },
  {
    tipo: 'completar',
    pregunta: '___ are your friends?',
    respuesta: 'Who',
    personaje: 'Dot Barrett',
  },
];

const STORAGE_KEY = 'respuestas_tema7';
const PUNTAJE_KEY = 'puntaje_tema7';

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

export default function Tema7() {
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
        filename: 'Tema7.pdf',
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
      <h1 className="text-3xl font-bold text-purple-600 mb-2">Tema 7: Verb to be – Questions</h1>
      <div id="pdf-cuestionario" className="pdf-hidden">
        <h1 className="text-3xl font-bold text-purple-600 mb-4">Tema 7: Verb to be – Questions</h1>
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
                placeholder="Escribe la pregunta completa"
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