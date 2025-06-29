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
  { tipo: 'opcion', pregunta: '¿Cómo se dice "Gracias" en inglés?', opciones: ['Thanks', 'Hello', 'Bye', 'Red'], respuesta: 'Thanks', personaje: 'Dumbledore' },
  { tipo: 'opcion', pregunta: 'Seleccioná la nacionalidad correcta para "Italy"', opciones: ['Italian', 'Italish', 'Italino', 'Italico'], respuesta: 'Italian', personaje: 'Kanao Tsuyuri' },
  { tipo: 'opcion', pregunta: '¿Cuál es el color "verde" en inglés?', opciones: ['Green', 'Blue', 'Yellow', 'Pink'], respuesta: 'Green', personaje: 'Mashle' },
  { tipo: 'opcion', pregunta: '¿Cómo preguntás la edad de alguien?', opciones: ['How old are you?', 'How are you?', 'What is your name?', 'Where are you from?'], respuesta: 'How old are you?', personaje: 'Hanako-kun' },
  { tipo: 'opcion', pregunta: '¿Cuál es el saludo para la noche?', opciones: ['Good night', 'Good morning', 'Goodbye', 'Good afternoon'], respuesta: 'Good night', personaje: 'Tanjiro Kamado' },
  { tipo: 'opcion', pregunta: 'Seleccioná el país correcto', opciones: ['Brazil', 'Red', 'Monday', 'Cat'], respuesta: 'Brazil', personaje: 'Hermione Granger' },
  { tipo: 'opcion', pregunta: '¿Cómo decís "Soy de Argentina" en inglés?', opciones: ['I am from Argentina', 'I am Argentina', 'I from Argentina', 'I am Argentinian'], respuesta: 'I am from Argentina', personaje: 'Zenitsu Agatsuma' },
  { tipo: 'opcion', pregunta: '¿Cuál es la nacionalidad de alguien de España?', opciones: ['Spanish', 'Spain', 'Spaniard', 'Spano'], respuesta: 'Spanish', personaje: 'Finn Ames' },
  { tipo: 'opcion', pregunta: 'Seleccioná el día correcto en inglés para "viernes"', opciones: ['Monday', 'Friday', 'Sunday', 'Tuesday'], respuesta: 'Friday', personaje: 'Ron Weasley' },
  { tipo: 'opcion', pregunta: '¿Cómo se dice "azul" en inglés?', opciones: ['Blue', 'Green', 'Yellow', 'Pink'], respuesta: 'Blue', personaje: 'Nezuko Kamado' },
  { tipo: 'completar', pregunta: 'Completá: "My name _____ Agustina" (es)', respuesta: 'is', personaje: 'Luna Lovegood' },
  { tipo: 'opcion', pregunta: '¿Qué significa "I am ten years old"?', opciones: ['Tengo 10 años', 'Soy de 10 años', 'Me gusta 10 años', 'Vivo 10 años'], respuesta: 'Tengo 10 años', personaje: 'Mashle' },
  { tipo: 'completar', pregunta: 'Completá: "I am from _____" (México)', respuesta: 'mexico', personaje: 'Sakura Nanamine' },
  { tipo: 'opcion', pregunta: '¿Cómo se dice "Buenos días" en inglés?', opciones: ['Good morning', 'Good night', 'Good afternoon', 'Good evening'], respuesta: 'Good morning', personaje: 'Kou Minamoto' },
  { tipo: 'completar', pregunta: 'Completá: "I _____ in Buenos Aires" (vivo)', respuesta: 'live', personaje: 'Inosuke Hashibira' },
  { tipo: 'opcion', pregunta: '¿Cuál es la nacionalidad de alguien de Francia?', opciones: ['French', 'France', 'Francia', 'Franch'], respuesta: 'French', personaje: 'Shinobu Kocho' },
  { tipo: 'completar', pregunta: 'Completá: "Today is _____" (martes)', respuesta: 'tuesday', personaje: 'Lemon Irvine' },
  { tipo: 'opcion', pregunta: '¿Qué significa "How are you?"?', opciones: ['¿Cómo estás?', '¿Dónde estás?', '¿Quién eres?', '¿Cuántos años tienes?'], respuesta: '¿Cómo estás?', personaje: 'Tsukasa Yugi' },
  { tipo: 'completar', pregunta: 'Completá: "The sun is _____" (amarillo)', respuesta: 'yellow', personaje: 'Nene Yashiro' },
  { tipo: 'opcion', pregunta: '¿Cómo se dice "Adiós" en inglés?', opciones: ['Goodbye', 'Hello', 'Thanks', 'Please'], respuesta: 'Goodbye', personaje: 'Draco Malfoy' },
];

const STORAGE_KEY = 'respuestas_final';
const PUNTAJE_KEY = 'puntaje_final';

export default function Final() {
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

  const respuestasCorrectas = puntaje;
  const porcentaje = Math.round((respuestasCorrectas / actividades.length) * 100);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-purple-600 mb-4">Desafío Final</h1>
      <div className="mb-4 text-right font-bold text-purple-700">Puntaje: {puntaje} / {actividades.length}</div>
      {respuestasCorrectas > 0 && (
        <div className="mb-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 text-center">
          <h2 className="text-xl font-bold text-purple-700 mb-2">
            ¡Progreso: {respuestasCorrectas}/{actividades.length} correctas!
          </h2>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${porcentaje}%` }}
            ></div>
          </div>
          <p className="mt-2 text-purple-600 font-semibold">{porcentaje}% completado</p>
        </div>
      )}
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
                className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                placeholder="Escribí tu respuesta..."
                onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit(idx)}
                disabled={respuestas[idx] !== null}
              />
              <button
                onClick={() => handleInputSubmit(idx)}
                className="px-4 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
                disabled={respuestas[idx] !== null}
              >
                Verificar
              </button>
            </div>
          )}
          <Feedback correcto={feedback[idx]} respuesta={act.respuesta} mostrado={respuestas[idx] !== null} />
        </div>
      ))}
      {respuestasCorrectas === actividades.length && (
        <div className="text-center bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6 mt-6">
          <h2 className="text-2xl font-bold text-green-700 mb-2">🎉 ¡Felicitaciones! 🎉</h2>
          <p className="text-lg text-green-600 mb-4">¡Completaste todas las actividades del desafío final!</p>
          <div className="text-4xl">🏆✨🌟</div>
        </div>
      )}
    </div>
  );
} 