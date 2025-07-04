import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const temas = [
  { 
    key: 'tema1', 
    label: 'Tema 1: Greetings & Introductions', 
    path: '/tema1',
    description: 'Saludos e introducciones básicas'
  },
  { 
    key: 'tema2', 
    label: 'Tema 2: Personal Information', 
    path: '/tema2',
    description: 'Información personal y preguntas básicas'
  },
  { 
    key: 'tema3', 
    label: 'Tema 3: Countries & Nationalities', 
    path: '/tema3',
    description: 'Países y nacionalidades'
  },
  { 
    key: 'tema4', 
    label: 'Tema 4: Colours & Days', 
    path: '/tema4',
    description: 'Colores y días de la semana'
  },
  { 
    key: 'tema5', 
    label: 'Tema 5: More Numbers & Colors', 
    path: '/tema5',
    description: 'Números adicionales y más colores'
  },
  {
    key: 'tema6',
    label: 'Tema 6: Subject Pronouns / Verb to be',
    path: '/tema6',
    description: 'Pronombres personales y verbo to be (afirmativo y negativo)'
  },
  {
    key: 'tema7',
    label: 'Tema 7: Verb to be – Questions',
    path: '/tema7',
    description: 'Preguntas con verbo to be y Wh-words'
  },
  {
    key: 'tema8',
    label: 'Tema 8: Writing Introduction and Possessives',
    path: '/tema8',
    description: 'Presentaciones personales, posesivos (’s) y have/has got'
  },
  {
    key: 'tema9',
    label: 'Tema 9: Simple Present',
    path: '/tema9',
    description: 'Presente simple: afirmativo, negativo, preguntas y uso de la -s'
  },
  { 
    key: 'final', 
    label: 'Desafío Final I', 
    path: '/final',
    description: 'Evaluación final tema 1 a 4'
  },
  {
    key: 'final_ii',
    label: 'Desafío Final II',
    path: '/final-ii',
    description: 'Evaluación final temas 5 a 9'
  },
];

// Hook para detectar el tamaño de pantalla y ajustar tarjetas por página
function useTarjetasPorPagina() {
  const [tarjetas, setTarjetas] = useState(6); // default escritorio
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setTarjetas(2); // móvil
      } else if (window.innerWidth < 1024) {
        setTarjetas(4); // tablet
      } else {
        setTarjetas(6); // escritorio
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return tarjetas;
}

export default function Cuestionarios() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const tarjetasPorPagina = useTarjetasPorPagina();
  const totalPaginas = Math.ceil(temas.length / tarjetasPorPagina);

  const handleTemaClick = (path) => {
    navigate(path);
  };

  // Solo los temas de la página actual
  const temasActuales = temas.slice(
    currentPage * tarjetasPorPagina,
    (currentPage + 1) * tarjetasPorPagina
  );
  // Rellenar con espacios vacíos si hay menos tarjetas
  const tarjetasParaMostrar = [
    ...temasActuales,
    ...Array(tarjetasPorPagina - temasActuales.length).fill(null)
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 mt-6">
      <h1 className="text-3xl font-bold text-pink-600 mb-6 flex items-center justify-center gap-2">
        <span role="img" aria-label="cuestionarios">📝</span> Cuestionarios Disponibles
      </h1>
      
      <div className="relative flex justify-center px-2 sm:px-8">
        <div className="relative w-full max-w-full sm:max-w-[1100px]" style={{maxWidth: '100vw'}}>
          {/* Botones de navegación */}
          {totalPaginas > 1 && (
            <>
              <button
                onClick={() => setCurrentPage((prev) => (prev - 1 + totalPaginas) % totalPaginas)}
                className="group absolute -left-8 top-0 h-full w-8 flex items-center justify-center bg-white/30 hover:bg-pink-200/80 transition-all duration-300 z-10 rounded-l-lg shadow-none border-none outline-none"
                style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}
              >
                <span className="text-2xl text-pink-600 group-hover:text-pink-800 transition-all duration-200 select-none">‹</span>
              </button>
              <button
                onClick={() => setCurrentPage((prev) => (prev + 1) % totalPaginas)}
                className="group absolute -right-8 top-0 h-full w-8 flex items-center justify-center bg-white/30 hover:bg-pink-200/80 transition-all duration-300 z-10 rounded-r-lg shadow-none border-none outline-none"
                style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}
              >
                <span className="text-2xl text-pink-600 group-hover:text-pink-800 transition-all duration-200 select-none">›</span>
              </button>
            </>
          )}
          {/* Contenedor del carrusel con animación fade */}
          <div className="overflow-hidden min-h-[500px]">
            <div 
              key={currentPage}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-6 transition-opacity duration-500 ease-in-out opacity-100 animate-fadeIn"
              style={{minHeight: '500px'}}
            >
              {tarjetasParaMostrar.map((tema, idx) => (
                tema ? (
                  <div 
                    key={tema.key}
                    className="bg-white rounded-lg shadow-lg p-6 h-56 flex flex-col justify-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 border-transparent hover:border-pink-300"
                    onClick={() => handleTemaClick(tema.path)}
                  >
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-pink-700 mb-2">{tema.label}</h3>
                      <p className="text-gray-600 mb-4 text-sm">{tema.description}</p>
                      <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:from-pink-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-md">
                        Comenzar Cuestionario
                      </button>
                    </div>
                  </div>
                ) : (
                  <div key={idx} className="h-56" />
                )
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Indicadores de página */}
      {totalPaginas > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPaginas }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentPage 
                  ? 'bg-pink-600 scale-125' 
                  : 'bg-pink-300 hover:bg-pink-400'
              }`}
            />
          ))}
        </div>
      )}
      
      <div className="mt-8 text-center">
        <p className="text-gray-600 text-sm">
          💡 Selecciona cualquier tema para comenzar el cuestionario correspondiente
        </p>
        {totalPaginas > 1 && (
          <p className="text-gray-500 text-xs mt-2">
            Usa las flechas o los puntos para navegar entre las páginas
          </p>
        )}
      </div>
    </div>
  );
} 