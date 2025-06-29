import React from "react";
import { NavLink } from "react-router-dom";

const temas = [
  { path: "/", label: "🏠 Inicio" },
  { path: "/tema1", label: "Tema 1" },
  { path: "/tema2", label: "Tema 2" },
  { path: "/tema3", label: "Tema 3" },
  { path: "/tema4", label: "Tema 4" },
  { path: "/final", label: "🏆 Desafío Final" },
  { path: "/puntajes", label: "📊 Puntajes" },
];

export default function NavBar() {
  const juegos = { path: "/juegos", label: "Juegos" };

  return (
    <nav className="bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap gap-2 justify-center py-4">
          {temas.map((tema) => (
            <NavLink
              key={tema.path}
              to={tema.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-white text-pink-600 shadow-md transform scale-105"
                    : "bg-white/20 text-white hover:bg-white/30 hover:scale-105"
                }`
              }
            >
              {tema.label}
            </NavLink>
          ))}
          <NavLink
            key={juegos.path}
            to={juegos.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg font-bold transition-all duration-200 ${
                isActive
                  ? "bg-white text-pink-600 shadow-md transform scale-105"
                  : "bg-white/20 text-white hover:bg-white/30 hover:scale-105"
              }`
            }
          >
            {juegos.label}
          </NavLink>
        </div>
      </div>
    </nav>
  );
} 