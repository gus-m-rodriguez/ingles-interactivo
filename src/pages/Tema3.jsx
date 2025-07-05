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
    pregunta: '¿Cuál de estos es un país?',
    opciones: ['Argentina', 'Red', 'Monday', 'Cat'],
    respuesta: 'Argentina',
    personaje: 'Draco Malfoy',
  },
  {
    tipo: 'opcion',
    pregunta: 'Seleccioná la nacionalidad correcta para "Japan"',
    opciones: ['Japanese', 'Japanish', 'Japanite', 'Japano'],
    respuesta: 'Japanese',
    personaje: 'Kanao Tsuyuri',
  },
  {
    tipo: 'opcion',
    pregunta: '¿Cómo decís "Soy de Brasil" en inglés?',
    opciones: ['I am from Brazil', 'I am Brazil', 'I from Brazil', 'I am Brasilian'],
    respuesta: 'I am from Brazil',
    personaje: 'Mashle',
  },
  {
    tipo: 'opcion',
    pregunta: '¿Cuál es la nacionalidad de alguien de Francia?',
    opciones: ['French', 'France', 'Francia', 'Franch'],
    respuesta: 'French',
    personaje: 'Nene Yashiro',
  },
  {
    tipo: 'completar',
    pregunta: 'Completá: "I am from _____" (España)',
    respuesta: 'spain',
    personaje: 'Dot Barrett',
  },
  {
    tipo: 'opcion',
    pregunta: '¿Qué significa "I am Mexican"?',
    opciones: ['Soy mexicano', 'Voy a México', 'Me gusta México', 'Soy de México'],
    respuesta: 'Soy mexicano',
    personaje: 'Lemon Irvine',
  },
  {
    tipo: 'completar',
    pregunta: 'Completá: "I am _____" (italiano)',
    respuesta: 'italian',
    personaje: 'Sakura Nanamine',
  },
  {
    tipo: 'opcion',
    pregunta: '¿Cuál es la nacionalidad de alguien de Alemania?',
    opciones: ['German', 'Germany', 'Germanic', 'Germanish'],
    respuesta: 'German',
    personaje: 'Finn Ames',
  },
  {
    tipo: 'completar',
    pregunta: 'Completá: "I am from _____" (Canadá)',
    respuesta: 'canada',
    personaje: 'Hagrid',
  },
  {
    tipo: 'opcion',
    pregunta: '¿Cómo se dice "Soy australiano" en inglés?',
    opciones: ['I am Australian', 'I am Australia', 'I from Australia', 'I am Australiano'],
    respuesta: 'I am Australian',
    personaje: 'Zenitsu Agatsuma',
  },
  {
    tipo: 'completar',
    pregunta: 'Completá: "I am _____" (chino)',
    respuesta: 'chinese',
    personaje: 'Luna Lovegood',
  },
  {
    tipo: 'opcion',
    pregunta: '¿Cuál es la nacionalidad de alguien de Rusia?',
    opciones: ['Russian', 'Russia', 'Rusian', 'Rusish'],
    respuesta: 'Russian',
    personaje: 'Tsukasa Yugi',
  },
];

const STORAGE_KEY = 'respuestas_tema3';
const PUNTAJE_KEY = 'puntaje_tema3';

export default function Tema3() {
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
        filename: 'Tema3.pdf',
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
      <h1 className="text-3xl font-bold text-yellow-600 mb-2">Tema 3: Countries & Nationalities</h1>
      <div id="pdf-cuestionario" className="pdf-hidden">
        <h1 className="text-3xl font-bold text-yellow-600 mb-4">Tema 3: Countries & Nationalities</h1>
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
        <div className="font-bold text-yellow-700 text-base">Puntaje: {puntaje} / {actividades.length}</div>
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
                className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
                placeholder="Escribí tu respuesta..."
                onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit(idx)}
                disabled={respuestas[idx] !== null}
              />
              <button
                onClick={() => handleInputSubmit(idx)}
                className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
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