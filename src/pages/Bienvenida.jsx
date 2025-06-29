import React from "react";
import hanako from '../assets/hanako.webp';
import harry from '../assets/harry.webp';
import mash from '../assets/mash-comiendo.webp';

export default function Bienvenida() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-4">¡Bienvenida, Agustina! 👋</h1>
      <p className="text-lg mb-6 max-w-xl">
        Esta es tu app para aprender inglés jugando, con tus personajes favoritos y muchas actividades interactivas.<br/>
        ¡Elegí un tema en la barra de arriba y empezá a divertirte!
      </p>
      <div className="flex flex-wrap gap-6 justify-center mb-6">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-pink-200 bg-white shadow-lg">
            <img
              src={hanako}
              alt="Hanako-kun"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="mt-2 font-semibold">Hanako-kun</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-200 bg-white shadow-lg">
            <img
              src={harry}
              alt="Harry Potter"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="mt-2 font-semibold">Harry Potter</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-200 bg-white shadow-lg">
            <img
              src={mash}
              alt="Mashle"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="mt-2 font-semibold">Mashle</span>
        </div>
      </div>
      <p className="text-md text-gray-700">¡Vamos a aprender juntos! 🌈✨</p>
    </div>
  );
} 