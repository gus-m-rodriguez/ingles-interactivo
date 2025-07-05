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
  // Ejemplo de actividades, luego se agregan más
  {
    tipo: 'completar',
    pregunta: 'I ___ (play) the guitar.',
    respuesta: ['play'],
    personaje: 'Harry Potter',
  },
  {
    tipo: 'completar',
    pregunta: 'He ___ (play) the guitar.',
    respuesta: ['plays'],
    personaje: 'Hermione Granger',
  },
  {
    tipo: 'completar',
    pregunta: 'They ___ (not eat) tomatoes.',
    respuesta: ["don't eat", "do not eat"],
    personaje: 'Ron Weasley',
  },
  {
    tipo: 'completar',
    pregunta: 'Does she ___ (star) in March?',
    respuesta: ['star'],
    personaje: 'Luna Lovegood',
  },
  {
    tipo: 'completar',
    pregunta: 'You ___ (not study) French.',
    respuesta: ["don't study", "do not study"],
    personaje: 'Mashle',
  },
  {
    tipo: 'completar',
    pregunta: '___ you play the guitar?',
    respuesta: ['Do'],
    personaje: 'Dumbledore',
  },
  {
    tipo: 'completar',
    pregunta: '___ he play the guitar?',
    respuesta: ['Does'],
    personaje: 'Hanako-kun',
  },
  // ... agregar más actividades ...
];

const STORAGE_KEY = 'respuestas_tema9';
const PUNTAJE_KEY = 'puntaje_tema9';

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

export default function Tema9() {
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
        filename: 'Tema9.pdf',
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
      <h1 className="text-3xl font-bold text-purple-600 mb-2">Tema 9: Simple Present</h1>
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
        <h1 className="text-3xl font-bold text-purple-600 mb-4">Tema 9: Simple Present</h1>
        <div className="mb-8">
          <div className="bg-blue-50 rounded-lg shadow p-4 mb-4">
            <h2 className="text-xl font-bold text-blue-700 mb-2">Presente Simple: Afirmativo</h2>
            <table className="w-full text-center border mb-2">
              <thead>
                <tr className="bg-blue-100">
                  <th className="p-2">Sujeto</th>
                  <th className="p-2">Verbo</th>
                  <th className="p-2">Complemento</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">I / You / We / They</td>
                  <td className="p-2">play</td>
                  <td className="p-2">the guitar</td>
                </tr>
                <tr>
                  <td className="p-2">He / She / It</td>
                  <td className="p-2">plays <span className="text-xs text-gray-500">(+s)</span></td>
                  <td className="p-2">the guitar</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-green-50 rounded-lg shadow p-4 mb-4">
            <h2 className="text-xl font-bold text-green-700 mb-2">Presente Simple: Negativo</h2>
            <table className="w-full text-center border mb-2">
              <thead>
                <tr className="bg-green-100">
                  <th className="p-2">Sujeto</th>
                  <th className="p-2">Auxiliar</th>
                  <th className="p-2">Verbo</th>
                  <th className="p-2">Complemento</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">I / You / We / They</td>
                  <td className="p-2">don't</td>
                  <td className="p-2">play</td>
                  <td className="p-2">the guitar</td>
                </tr>
                <tr>
                  <td className="p-2">He / She / It</td>
                  <td className="p-2">doesn't</td>
                  <td className="p-2">play</td>
                  <td className="p-2">the guitar</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-yellow-50 rounded-lg shadow p-4 mb-4">
            <h2 className="text-xl font-bold text-yellow-700 mb-2">Presente Simple: Preguntas</h2>
            <table className="w-full text-center border mb-2">
              <thead>
                <tr className="bg-yellow-100">
                  <th className="p-2">Auxiliar</th>
                  <th className="p-2">Sujeto</th>
                  <th className="p-2">Verbo</th>
                  <th className="p-2">Complemento</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">Do</td>
                  <td className="p-2">you / we / they</td>
                  <td className="p-2">play</td>
                  <td className="p-2">the guitar?</td>
                </tr>
                <tr>
                  <td className="p-2">Does</td>
                  <td className="p-2">he / she / it</td>
                  <td className="p-2">play</td>
                  <td className="p-2">the guitar?</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-pink-50 border-l-4 border-pink-400 rounded-lg shadow p-4 mb-4">
            <h3 className="text-lg font-bold text-pink-700 mb-2">Aclaraciones sobre la <span className="font-mono">-s</span> en el presente simple</h3>
            <ul className="list-disc ml-6 text-pink-900">
              <li>El verbo lleva <b>-s</b> <b>solo</b> con <b>He/She/It</b> en afirmativo.<br/>Ej: <span className="font-mono">He plays</span>, <span className="font-mono">She eats</span></li>
              <li>En negativo y preguntas, el verbo va en forma base.<br/>Ej: <span className="font-mono">He doesn't play</span>, <span className="font-mono">Does she eat?</span></li>
              <li>Para preguntas, se usa <b>Do</b> o <b>Does</b> al inicio.</li>
              <li className="mt-2"><b>Casos especiales para agregar <span className="font-mono">-es</span>:</b>
                <ul className="list-disc ml-6">
                  <li>Verbos que terminan en <b>-o, -ch, -sh, -ss, -x, -z</b>: se agrega <b>-es</b>.<br/>Ej: <span className="font-mono">go → goes</span>, <span className="font-mono">watch → watches</span>, <span className="font-mono">fix → fixes</span></li>
                  <li>Verbos que terminan en <b>consonante + y</b>: se cambia la <b>y</b> por <b>i</b> y se agrega <b>-es</b>.<br/>Ej: <span className="font-mono">study → studies</span>, <span className="font-mono">try → tries</span></li>
                  <li>Verbos que terminan en <b>vocal + y</b>: solo se agrega <b>-s</b>.<br/>Ej: <span className="font-mono">play → plays</span>, <span className="font-mono">enjoy → enjoys</span></li>
                </ul>
              </li>
            </ul>
          </div>
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
      {/* Bloque de información para la web */}
      <div className="mb-8">
        <div className="bg-blue-50 rounded-lg shadow p-4 mb-4">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Presente Simple: Afirmativo</h2>
          <table className="w-full text-center border mb-2">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-2">Sujeto</th>
                <th className="p-2">Verbo</th>
                <th className="p-2">Complemento</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">I / You / We / They</td>
                <td className="p-2">play</td>
                <td className="p-2">the guitar</td>
              </tr>
              <tr>
                <td className="p-2">He / She / It</td>
                <td className="p-2">plays <span className="text-xs text-gray-500">(+s)</span></td>
                <td className="p-2">the guitar</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-green-50 rounded-lg shadow p-4 mb-4">
          <h2 className="text-xl font-bold text-green-700 mb-2">Presente Simple: Negativo</h2>
          <table className="w-full text-center border mb-2">
            <thead>
              <tr className="bg-green-100">
                <th className="p-2">Sujeto</th>
                <th className="p-2">Auxiliar</th>
                <th className="p-2">Verbo</th>
                <th className="p-2">Complemento</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">I / You / We / They</td>
                <td className="p-2">don't</td>
                <td className="p-2">play</td>
                <td className="p-2">the guitar</td>
              </tr>
              <tr>
                <td className="p-2">He / She / It</td>
                <td className="p-2">doesn't</td>
                <td className="p-2">play</td>
                <td className="p-2">the guitar</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-yellow-50 rounded-lg shadow p-4 mb-4">
          <h2 className="text-xl font-bold text-yellow-700 mb-2">Presente Simple: Preguntas</h2>
          <table className="w-full text-center border mb-2">
            <thead>
              <tr className="bg-yellow-100">
                <th className="p-2">Auxiliar</th>
                <th className="p-2">Sujeto</th>
                <th className="p-2">Verbo</th>
                <th className="p-2">Complemento</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">Do</td>
                <td className="p-2">you / we / they</td>
                <td className="p-2">play</td>
                <td className="p-2">the guitar?</td>
              </tr>
              <tr>
                <td className="p-2">Does</td>
                <td className="p-2">he / she / it</td>
                <td className="p-2">play</td>
                <td className="p-2">the guitar?</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-pink-50 border-l-4 border-pink-400 rounded-lg shadow p-4 mb-4">
          <h3 className="text-lg font-bold text-pink-700 mb-2">Aclaraciones sobre la <span className="font-mono">-s</span> en el presente simple</h3>
          <ul className="list-disc ml-6 text-pink-900">
            <li>El verbo lleva <b>-s</b> <b>solo</b> con <b>He/She/It</b> en afirmativo.<br/>Ej: <span className="font-mono">He plays</span>, <span className="font-mono">She eats</span></li>
            <li>En negativo y preguntas, el verbo va en forma base.<br/>Ej: <span className="font-mono">He doesn't play</span>, <span className="font-mono">Does she eat?</span></li>
            <li>Para preguntas, se usa <b>Do</b> o <b>Does</b> al inicio.</li>
            <li className="mt-2"><b>Casos especiales para agregar <span className="font-mono">-es</span>:</b>
              <ul className="list-disc ml-6">
                <li>Verbos que terminan en <b>-o, -ch, -sh, -ss, -x, -z</b>: se agrega <b>-es</b>.<br/>Ej: <span className="font-mono">go → goes</span>, <span className="font-mono">watch → watches</span>, <span className="font-mono">fix → fixes</span></li>
                <li>Verbos que terminan en <b>consonante + y</b>: se cambia la <b>y</b> por <b>i</b> y se agrega <b>-es</b>.<br/>Ej: <span className="font-mono">study → studies</span>, <span className="font-mono">try → tries</span></li>
                <li>Verbos que terminan en <b>vocal + y</b>: solo se agrega <b>-s</b>.<br/>Ej: <span className="font-mono">play → plays</span>, <span className="font-mono">enjoy → enjoys</span></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      {/* Actividades */}
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
            <Feedback correcto={feedback[idx]} respuesta={act.respuesta[0]} mostrado={respuestas[idx] !== null} />
          )}
        </div>
      ))}
    </div>
  );
} 