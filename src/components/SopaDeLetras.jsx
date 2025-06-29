import React, { useState, useEffect, useRef } from 'react';

function generarGrid(palabras, size) {
  // Crea un grid vacío
  let grid = Array(size).fill(null).map(() => Array(size).fill(''));
  let placed = [];

  // Intenta colocar cada palabra
  palabras.forEach(palabra => {
    let placedWord = false;
    for (let intentos = 0; intentos < 100 && !placedWord; intentos++) {
      const horizontal = Math.random() > 0.5;
      const maxRow = horizontal ? size : size - palabra.length;
      const maxCol = horizontal ? size - palabra.length : size;
      const row = Math.floor(Math.random() * maxRow);
      const col = Math.floor(Math.random() * maxCol);
      let puede = true;
      for (let i = 0; i < palabra.length; i++) {
        const r = row + (horizontal ? 0 : i);
        const c = col + (horizontal ? i : 0);
        if (grid[r][c] && grid[r][c] !== palabra[i].toUpperCase()) {
          puede = false;
          break;
        }
      }
      if (puede) {
        for (let i = 0; i < palabra.length; i++) {
          const r = row + (horizontal ? 0 : i);
          const c = col + (horizontal ? i : 0);
          grid[r][c] = palabra[i].toUpperCase();
        }
        placed.push({ palabra, row, col, horizontal });
        placedWord = true;
      }
    }
  });
  // Rellenar vacíos con letras aleatorias
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!grid[r][c]) {
        grid[r][c] = letras[Math.floor(Math.random() * letras.length)];
      }
    }
  }
  return { grid, placed };
}

function getKey(row, col) {
  return `${row},${col}`;
}

export default function SopaDeLetras({ palabras, size = 12, storageKey }) {
  const palabrasRef = useRef(palabras.join(','));
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Si las palabras cambiaron, ignorar el localStorage
      if (parsed && parsed.placed && parsed.placed.length === palabras.length && parsed.placed.every((p, i) => p.palabra.toLowerCase() === palabras[i].toLowerCase())) {
        return parsed;
      }
    }
    const { grid, placed } = generarGrid(palabras, size);
    return { grid, placed, found: [], seleccion: [] };
  });
  const [seleccion, setSeleccion] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [mostrarSoluciones, setMostrarSoluciones] = useState(false);
  const [modalClave, setModalClave] = useState(false);
  const [inputClave, setInputClave] = useState('');
  const [errorClave, setErrorClave] = useState('');

  // Si cambian las palabras, regenerar la sopa y limpiar localStorage
  useEffect(() => {
    if (palabrasRef.current !== palabras.join(',')) {
      localStorage.removeItem(storageKey);
      const { grid, placed } = generarGrid(palabras, size);
      setData({ grid, placed, found: [], seleccion: [] });
      setMostrarSoluciones(false);
      palabrasRef.current = palabras.join(',');
    }
    // eslint-disable-next-line
  }, [palabras, storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(data));
  }, [data, storageKey]);

  const handleCellClick = (row, col) => {
    if (seleccion.length === 0) {
      setSeleccion([{ row, col }]);
    } else {
      const start = seleccion[0];
      const end = { row, col };
      // Solo horizontal o vertical
      if (start.row === end.row || start.col === end.col) {
        const celdas = [];
        let palabra = '';
        if (start.row === end.row) {
          const min = Math.min(start.col, end.col);
          const max = Math.max(start.col, end.col);
          for (let c = min; c <= max; c++) {
            celdas.push(getKey(start.row, c));
            palabra += data.grid[start.row][c];
          }
        } else {
          const min = Math.min(start.row, end.row);
          const max = Math.max(start.row, end.row);
          for (let r = min; r <= max; r++) {
            celdas.push(getKey(r, start.col));
            palabra += data.grid[r][start.col];
          }
        }
        const idx = palabras.findIndex(p => p.toUpperCase() === palabra);
        if (idx !== -1 && !data.found.some(f => f.palabra === palabra)) {
          setData(prev => ({ ...prev, found: [...prev.found, { palabra, celdas }] }));
          setMensaje('¡Correcto!');
        } else {
          setMensaje('No es una palabra válida.');
        }
        setSeleccion([]);
        setTimeout(() => setMensaje(''), 1000);
      } else {
        setSeleccion([]);
      }
    }
  };

  const handleReiniciar = () => {
    const { grid, placed } = generarGrid(palabras, size);
    setData({ grid, placed, found: [], seleccion: [] });
    setSeleccion([]);
    setMensaje('');
  };

  const handleMostrarSoluciones = () => {
    setModalClave(true);
    setInputClave('');
    setErrorClave('');
  };

  const handleConfirmarClave = () => {
    if (inputClave === 'AgusIngles2015') {
      setMostrarSoluciones(true);
      setModalClave(false);
    } else {
      setErrorClave('Clave incorrecta');
    }
  };

  const handleCancelarClave = () => {
    setModalClave(false);
    setInputClave('');
    setErrorClave('');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-2 font-bold text-lg text-pink-700">Palabras a encontrar:</div>
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {palabras.map(p => {
          const found = data.found.some(f => f.palabra.toLowerCase() === p.toLowerCase());
          return (
            <span
              key={p}
              className={`px-2 py-1 rounded-full text-sm font-bold transition-colors duration-200 ${found ? 'bg-green-400 text-white line-through' : 'bg-pink-100 text-pink-700'}`}
            >
              {p.toUpperCase()}
            </span>
          );
        })}
      </div>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${size}, 2rem)` }}>
        {data.grid.map((row, rIdx) =>
          row.map((cell, cIdx) => {
            const key = getKey(rIdx, cIdx);
            const isSelected = seleccion.some(sel => sel.row === rIdx && sel.col === cIdx);
            const isFound = data.found.some(f => f.celdas && f.celdas.includes(key));
            const isSolucion = mostrarSoluciones && data.placed.some(p => {
              let celdas = [];
              for (let i = 0; i < p.palabra.length; i++) {
                const r = p.row + (p.horizontal ? 0 : i);
                const c = p.col + (p.horizontal ? i : 0);
                celdas.push(getKey(r, c));
              }
              return celdas.includes(key);
            });
            // Determinar si la celda debe estar deshabilitada
            // Buscar todas las palabras que usan esta celda
            const palabrasConEstaCelda = data.placed.filter(p => {
              for (let i = 0; i < p.palabra.length; i++) {
                const r = p.row + (p.horizontal ? 0 : i);
                const c = p.col + (p.horizontal ? i : 0);
                if (getKey(r, c) === key) return true;
              }
              return false;
            });
            // Si todas esas palabras ya fueron encontradas, deshabilitar
            const todasEncontradas = palabrasConEstaCelda.length > 0 && palabrasConEstaCelda.every(p => data.found.some(f => f.palabra.toLowerCase() === p.palabra.toLowerCase()));
            return (
              <button
                key={key}
                className={`w-8 h-8 border border-gray-300 flex items-center justify-center font-bold text-lg select-none transition-all duration-100 ${isFound ? 'bg-green-300 text-white' : isSolucion ? 'bg-purple-300 text-white' : isSelected ? 'bg-yellow-200' : 'bg-white hover:bg-pink-100'}`}
                onClick={() => handleCellClick(rIdx, cIdx)}
                disabled={todasEncontradas}
              >
                {cell}
              </button>
            );
          })
        )}
      </div>
      <div className="mt-4 text-lg font-bold text-pink-700">Puntaje: {data.found.length} / {palabras.length}</div>
      <div className="mt-4 flex gap-4">
        <button onClick={handleReiniciar} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-bold">Reiniciar sopa</button>
        <button onClick={handleMostrarSoluciones} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-800 font-bold shadow">Mostrar soluciones</button>
      </div>
      {modalClave && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center min-w-[260px]">
            <div className="mb-2 text-pink-700 font-bold text-lg">Clave para mostrar soluciones</div>
            <input
              type="password"
              className="border border-pink-300 rounded px-3 py-1 mb-2 w-full text-center focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Contraseña"
              value={inputClave}
              onChange={e => setInputClave(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleConfirmarClave(); }}
              autoFocus
            />
            {errorClave && <div className="text-red-500 text-sm mb-2">{errorClave}</div>}
            <div className="flex gap-2">
              <button onClick={handleConfirmarClave} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 font-bold text-sm">Confirmar</button>
              <button onClick={handleCancelarClave} className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-400 font-bold text-sm">Cancelar</button>
            </div>
          </div>
        </div>
      )}
      {mensaje && <div className="mt-2 text-pink-600 font-bold">{mensaje}</div>}
    </div>
  );
} 