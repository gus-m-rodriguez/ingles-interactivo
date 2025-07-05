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

// Función de corrección flexible (como en temas 5-9)
const corregirRespuesta = (respuestaUsuario, respuestasCorrectas) => {
  if (!respuestaUsuario) return false;
  
  const respuesta = respuestaUsuario.toLowerCase().trim();
  const correctas = Array.isArray(respuestasCorrectas) ? respuestasCorrectas : [respuestasCorrectas];
  
  return correctas.some(correcta => {
    const correctaNormalizada = correcta.toLowerCase().trim();
    
    // Ignorar mayúsculas/minúsculas, punto final, aceptar apóstrofe o acento
    const respuestaLimpia = respuesta
      .replace(/[.!?]$/, '') // Quitar punto final
      .replace(/['´]/g, "'") // Normalizar apóstrofe
      .replace(/[´`]/g, "'"); // Normalizar acentos
    
    const correctaLimpia = correctaNormalizada
      .replace(/[.!?]$/, '')
      .replace(/['´]/g, "'")
      .replace(/[´`]/g, "'");
    
    return respuestaLimpia === correctaLimpia;
  });
};

const actividades = [
  // TEMA 5 - Números y colores (8 actividades)
  { tipo: 'escribir', pregunta: 'Escribí el número "15" en inglés', respuesta: 'fifteen', personaje: 'Harry Potter' },
  { tipo: 'escribir', pregunta: 'Escribí el color "rojo" en inglés', respuesta: 'red', personaje: 'Hermione Granger' },
  { tipo: 'escribir', pregunta: 'Escribí el número "23" en inglés', respuesta: 'twenty-three', personaje: 'Ron Weasley' },
  { tipo: 'escribir', pregunta: 'Escribí el color "azul" en inglés', respuesta: 'blue', personaje: 'Luna Lovegood' },
  { tipo: 'escribir', pregunta: 'Escribí el número "8" en inglés', respuesta: 'eight', personaje: 'Draco Malfoy' },
  { tipo: 'escribir', pregunta: 'Escribí el color "verde" en inglés', respuesta: 'green', personaje: 'Hagrid' },
  { tipo: 'escribir', pregunta: 'Escribí el número "12" en inglés', respuesta: 'twelve', personaje: 'Dumbledore' },
  { tipo: 'escribir', pregunta: 'Escribí el color "amarillo" en inglés', respuesta: 'yellow', personaje: 'Nene Yashiro' },

  // TEMA 6 - Subject pronouns y verb to be (8 actividades)
  { tipo: 'escribir', pregunta: 'Completá: "_____ am a student" (yo)', respuesta: 'i', personaje: 'Hanako-kun' },
  { tipo: 'escribir', pregunta: 'Completá: "_____ is my friend" (él)', respuesta: 'he', personaje: 'Kou Minamoto' },
  { tipo: 'escribir', pregunta: 'Completá: "_____ are happy" (ellos)', respuesta: 'they', personaje: 'Tsukasa Yugi' },
  { tipo: 'escribir', pregunta: 'Completá: "_____ is beautiful" (ella)', respuesta: 'she', personaje: 'Sakura Nanamine' },
  { tipo: 'escribir', pregunta: 'Completá: "_____ are students" (nosotros)', respuesta: 'we', personaje: 'Mashle' },
  { tipo: 'escribir', pregunta: 'Completá: "_____ is my name" (eso)', respuesta: 'it', personaje: 'Finn Ames' },
  { tipo: 'escribir', pregunta: 'Completá: "_____ are friends" (ustedes)', respuesta: 'you', personaje: 'Dot Barrett' },
  { tipo: 'escribir', pregunta: 'Completá: "_____ am from Argentina" (yo)', respuesta: 'i', personaje: 'Lance Crown' },

  // TEMA 7 - Verb to be - Questions (8 actividades)
  { tipo: 'escribir', pregunta: 'Completá la pregunta: "_____ you happy?" (¿estás?)', respuesta: 'are', personaje: 'Lemon Irvine' },
  { tipo: 'escribir', pregunta: 'Completá la pregunta: "_____ she a teacher?" (¿es?)', respuesta: 'is', personaje: 'Tanjiro Kamado' },
  { tipo: 'escribir', pregunta: 'Completá la pregunta: "_____ they students?" (¿son?)', respuesta: 'are', personaje: 'Nezuko Kamado' },
  { tipo: 'escribir', pregunta: 'Completá la pregunta: "_____ I correct?" (¿estoy?)', respuesta: 'am', personaje: 'Zenitsu Agatsuma' },
  { tipo: 'escribir', pregunta: 'Completá la pregunta: "_____ it cold?" (¿está?)', respuesta: 'is', personaje: 'Inosuke Hashibira' },
  { tipo: 'escribir', pregunta: 'Completá la pregunta: "_____ we late?" (¿estamos?)', respuesta: 'are', personaje: 'Kanao Tsuyuri' },
  { tipo: 'escribir', pregunta: 'Completá la pregunta: "_____ he your brother?" (¿es?)', respuesta: 'is', personaje: 'Shinobu Kocho' },
  { tipo: 'escribir', pregunta: 'Completá la pregunta: "_____ you from Spain?" (¿eres?)', respuesta: 'are', personaje: 'Harry Potter' },

  // TEMA 8 - Writing Introduction and Possessives (8 actividades)
  { tipo: 'escribir', pregunta: 'Completá: "My name _____ Agustina" (es)', respuesta: 'is', personaje: 'Hermione Granger' },
  { tipo: 'escribir', pregunta: 'Completá: "I _____ 10 years old" (tengo)', respuesta: 'am', personaje: 'Ron Weasley' },
  { tipo: 'escribir', pregunta: 'Completá: "I _____ from Argentina" (soy)', respuesta: 'am', personaje: 'Luna Lovegood' },
  { tipo: 'escribir', pregunta: 'Completá: "This is _____ book" (mi)', respuesta: 'my', personaje: 'Draco Malfoy' },
  { tipo: 'escribir', pregunta: 'Completá: "_____ name is Tom" (su - de él)', respuesta: 'his', personaje: 'Hagrid' },
  { tipo: 'escribir', pregunta: 'Completá: "_____ name is Mary" (su - de ella)', respuesta: 'her', personaje: 'Dumbledore' },
  { tipo: 'escribir', pregunta: 'Completá: "I _____ got a cat" (tengo)', respuesta: 'have', personaje: 'Nene Yashiro' },
  { tipo: 'escribir', pregunta: 'Completá: "She _____ got a dog" (tiene)', respuesta: 'has', personaje: 'Hanako-kun' },

  // TEMA 9 - Simple Present (8 actividades)
  { tipo: 'escribir', pregunta: 'Completá: "I _____ English" (estudio)', respuesta: 'study', personaje: 'Kou Minamoto' },
  { tipo: 'escribir', pregunta: 'Completá: "He _____ soccer" (juega)', respuesta: 'plays', personaje: 'Tsukasa Yugi' },
  { tipo: 'escribir', pregunta: 'Completá: "She _____ to school" (va)', respuesta: 'goes', personaje: 'Sakura Nanamine' },
  { tipo: 'escribir', pregunta: 'Completá: "They _____ TV" (miran)', respuesta: 'watch', personaje: 'Mashle' },
  { tipo: 'escribir', pregunta: 'Completá: "I _____ like pizza" (no me gusta)', respuesta: 'dont', personaje: 'Finn Ames' },
  { tipo: 'escribir', pregunta: 'Completá: "He _____ like vegetables" (no le gusta)', respuesta: 'doesnt', personaje: 'Dot Barrett' },
  { tipo: 'escribir', pregunta: 'Completá: "_____ you like music?" (¿te gusta?)', respuesta: 'do', personaje: 'Lance Crown' },
  { tipo: 'escribir', pregunta: 'Completá: "_____ she study?" (¿estudia?)', respuesta: 'does', personaje: 'Lemon Irvine' },
];

const STORAGE_KEY = 'respuestas_final_ii';
const PUNTAJE_KEY = 'puntaje_final_ii';

export default function FinalII() {
  const [respuestas, setRespuestas] = useState(() => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || Array(actividades.length).fill(null);
  });
  const [feedback, setFeedback] = useState(() => {
    return actividades.map((act, idx) => {
      const resp = (JSON.parse(localStorage.getItem(STORAGE_KEY)) || [])[idx];
      if (resp == null) return null;
      return corregirRespuesta(resp, act.respuesta);
    });
  });
  const [inputValues, setInputValues] = useState(Array(actividades.length).fill(''));
  const [puntaje, setPuntaje] = useState(() => Number(localStorage.getItem(PUNTAJE_KEY)) || 0);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(respuestas));
    const puntos = actividades.reduce((acc, act, idx) => {
      if (respuestas[idx] == null) return acc;
      if (corregirRespuesta(respuestas[idx], act.respuesta)) return acc + 1;
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
    nuevosFeedback[idx] = corregirRespuesta(respuesta, actividades[idx].respuesta);
    setFeedback(nuevosFeedback);
  };

  const respuestasCorrectas = puntaje;
  const porcentaje = Math.round((respuestasCorrectas / actividades.length) * 100);

  const handleDescargarPDF = () => {
    const element = document.getElementById('pdf-cuestionario');
    element.classList.remove('pdf-hidden');
    html2pdf()
      .set({
        margin: 0.5,
        filename: 'Desafio_Final_II.pdf',
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
      <h1 className="text-3xl font-bold text-purple-600 mb-2">Desafío Final II</h1>
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
        <h1 className="text-3xl font-bold text-purple-600 mb-4">Desafío Final II</h1>
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
          </div>
        ))}
      </div>
      {/* Renderizado normal para la web */}
      {actividades.map((act, idx) => (
        <div key={idx} className="hidden-print mb-6 bg-white rounded-lg shadow p-4">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">{personajeEmoji[act.personaje] || '❓'}</span>
            <span className="font-semibold">{act.personaje} pregunta:</span>
          </div>
          <p className="mb-2">{act.pregunta}</p>
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
          <Feedback correcto={feedback[idx]} respuesta={act.respuesta} mostrado={respuestas[idx] !== null} />
        </div>
      ))}
      {respuestasCorrectas === actividades.length && (
        <div className="text-center bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6 mt-6">
          <h2 className="text-2xl font-bold text-green-700 mb-2">🎉 ¡Felicitaciones! 🎉</h2>
          <p className="text-lg text-green-600 mb-4">¡Completaste todas las actividades del Desafío Final II!</p>
          <div className="text-4xl">🏆✨🌟</div>
        </div>
      )}
    </div>
  );
} 