import React from "react";

export default function Feedback({ correcto, respuesta, mostrado }) {
  if (!mostrado) return null;
  return (
    <div className="mt-2">
      {correcto ? (
        <span className="text-green-600 font-bold flex items-center gap-2">
          ✅ ¡Muy bien! <span className="text-2xl">🎉</span>
        </span>
      ) : (
        <span className="text-red-600 font-bold flex items-center gap-2">
          ❌ Ups, la respuesta correcta es: <span className="underline">{respuesta}</span> <span className="text-2xl">🤔</span>
        </span>
      )}
    </div>
  );
} 