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
    tipo: 'opcion',
    pregunta: '¿Cómo preguntás la edad de alguien en inglés?',
    opciones: ['How old are you?', 'How are you?', 'Where are you?', 'What is your name?'],
    respuesta: 'How old are you?',
    personaje: 'Ron Weasley',
  },
  {
    tipo: 'opcion',
    pregunta: '¿Cuál es la respuesta correcta para "What is your name?"?',
    opciones: ['I am ten', 'My name is Agustina', 'Blue', 'Argentina'],
    respuesta: 'My name is Agustina',
    personaje: 'Kou Minamoto',
  },
  {
    tipo: 'opcion',
    pregunta: 'Seleccioná la opción que significa "Vivo en Buenos Aires"',
    opciones: ['I live in Buenos Aires', 'I am from Buenos Aires', 'I like Buenos Aires', 'Buenos Aires is blue'],
    respuesta: 'I live in Buenos Aires',
    personaje: 'Lance Crown',
  },
  {
    tipo: 'opcion',
    pregunta: '¿Cómo decís tu nacionalidad en inglés?',
    opciones: ['I am Argentinian', 'I am Argentina', 'I am Buenos Aires', 'I am Spanish'],
    respuesta: 'I am Argentinian',
    personaje: 'Nezuko Kamado',
  },
  {
    tipo: 'completar',
    pregunta: 'Completá: "I am _____ years old" (10)',
    respuesta: 'ten',
    personaje: 'Hermione Granger',
  },
  {
    tipo: 'opcion',
    pregunta: '¿Qué significa "Where do you live?"?',
    opciones: ['¿Dónde vives?', '¿Cómo te llamas?', '¿Cuántos años tienes?', '¿De dónde eres?'],
    respuesta: '¿Dónde vives?',
    personaje: 'Mashle',
  },
  {
    tipo: 'completar',
    pregunta: 'Completá: "I _____ from Argentina" (soy)',
    respuesta: 'am',
    personaje: 'Dumbledore',
  },
  {
    tipo: 'opcion',
    pregunta: '¿Cómo se dice "Mi cumpleaños es el 15 de marzo"?',
    opciones: ['My birthday is March 15th', 'I am March 15th', 'I like March 15th', 'March 15th is my day'],
    respuesta: 'My birthday is March 15th',
    personaje: 'Zenitsu Agatsuma',
  },
  {
    tipo: 'completar',
    pregunta: 'Completá: "What is your _____?" (nombre)',
    respuesta: 'name',
    personaje: 'Sakura Nanamine',
  },
  {
    tipo: 'opcion',
    pregunta: '¿Qué significa "I am a student"?',
    opciones: ['Soy un estudiante', 'Me gusta estudiar', 'Voy a la escuela', 'Tengo tarea'],
    respuesta: 'Soy un estudiante',
    personaje: 'Finn Ames',
  },
  {
    tipo: 'completar',
    pregunta: 'Completá: "I _____ in Buenos Aires" (vivo)',
    respuesta: 'live',
    personaje: 'Inosuke Hashibira',
  },
  {
    tipo: 'opcion',
    pregunta: '¿Cómo preguntás "¿De dónde eres?" en inglés?',
    opciones: ['Where are you from?', 'Where do you live?', 'What is your name?', 'How old are you?'],
    respuesta: 'Where are you from?',
    personaje: 'Hanako-kun',
  },
];

const STORAGE_KEY = 'respuestas_tema2';
const PUNTAJE_KEY = 'puntaje_tema2';

export default function Tema2() {
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

  const handleDescargarPDF = () => {
    const element = document.getElementById('pdf-cuestionario');
    element.classList.remove('pdf-hidden');
    html2pdf()
      .set({
        margin: 0.5,
        filename: 'Tema2.pdf',
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
      <h1 className="text-3xl font-bold text-blue-600 mb-2">Tema 2: Personal Information</h1>
      <div id="pdf-cuestionario" className="pdf-hidden">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Tema 2: Personal Information</h1>
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
        <div className="font-bold text-blue-700 text-base">Puntaje: {puntaje} / {actividades.length}</div>
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
                className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Escribí tu respuesta..."
                onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit(idx)}
                disabled={respuestas[idx] !== null}
              />
              <button
                onClick={() => handleInputSubmit(idx)}
                className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
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