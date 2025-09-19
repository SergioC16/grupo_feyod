import React, { useState, useRef, useEffect } from 'react';

/**
 * Botón flotante "Agregar a Cotización" (esquina inferior izquierda).
 * - Reposo: círculo 40x40 con "+" SVG centrado (fijo, no se mueve nunca).
 * - Hover (≥ md): el botón se ensancha en forma de pastilla; el texto aparece a la derecha.
 * - Click: toast "Agregado" ~1.2s justo encima.
 * Requiere que el contenedor padre (imagen de la card) tenga className="relative".
 */
const AddToQuoteButton = ({ onClick, ariaLabel = 'Agregar a cotización', className = '' }) => {
  const [showToast, setShowToast] = useState(false);
  const tRef = useRef(null);

  const handleClick = () => {
    onClick?.();
    clearTimeout(tRef.current);
    setShowToast(true);
    tRef.current = setTimeout(() => setShowToast(false), 1200);
  };

  useEffect(() => () => clearTimeout(tRef.current), []);

  return (
    <>
      {/* Contenedor del botón (posicionado bottom-left dentro del padre relative). */}
      <button
        type="button"
        onClick={handleClick}
        aria-label={ariaLabel}
        className={`group absolute bottom-3 left-3 z-50
        h-10 w-10 rounded-full
        bg-white/90 backdrop-blur shadow-lg hover:bg-white
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
        transition-all duration-300 overflow-hidden
        md:hover:w-[220px]
        ${className}`}
      >
        {/* Círculo con el "+" (fijo) */}
        <div className="absolute left-0 top-0 h-10 w-10 rounded-full flex items-center justify-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>

        {/* Texto (aparece a la derecha del círculo) */}
        <span
          className="absolute left-11 top-1/2 -translate-y-1/2
                     text-[13px] md:text-sm
                     opacity-0 max-w-0
                     group-hover:opacity-100 group-hover:max-w-[170px]
                     transition-all duration-300 ease-out
                     whitespace-nowrap overflow-hidden select-none"
        >
          Agregar a Cotización
        </span>
      </button>

      {/* Toast "Agregado" */}
      <div
        className={`pointer-events-none absolute bottom-14 left-3 z-50
                    rounded-md px-2 py-1 text-xs md:text-sm
                    bg-black/80 text-white shadow-md
                    transition-all duration-300
                    ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
        aria-hidden={!showToast}
      >
        Agregado
      </div>
    </>
  );
};

export default AddToQuoteButton;
