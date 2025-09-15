import React, { useState, useRef } from 'react';
import { Plus } from 'lucide-react';
import { useQuoteStore } from '../contexts/QuoteContext';
import { useToast } from './ToastProvider';

export default function AddToQuoteButton({ product }) {
  const { addItem } = useQuoteStore();
  const { push } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [showLocalToast, setShowLocalToast] = useState(false);
  const btnRef = useRef(null);

  const handleAdd = (e) => {
    e.stopPropagation();
    addItem(product);
    push && push('Agregado');
    setShowLocalToast(true);
    setTimeout(() => {
      setShowLocalToast(false);
      try { btnRef.current?.blur(); } catch (_) {}
    }, 1400);
  };

  return (
    <div className="absolute left-3 bottom-3 z-20 group">
      {showLocalToast && (
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-lg shadow bg-primary text-white text-sm z-40" role="status">
          Agregado
        </div>
      )}

      <button
        ref={btnRef}
        type="button"
        onClick={handleAdd}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onFocus={() => setExpanded(true)}
        onBlur={() => setExpanded(false)}
        aria-label={`Agregar ${product.name} a la cotización`}
        className={
          'flex items-center justify-center rounded-full h-8 w-8 bg-white/95 text-primary border border-gray-200 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all duration-200 ease-linear ' +
          (expanded ? ' px-3 w-auto rounded-lg gap-2' : ' px-0 w-8')
        }
      >
        <Plus size={16} aria-hidden="true" className="flex-shrink-0" />
        <span className={
          'ml-2 overflow-hidden transition-all duration-200 ease-linear whitespace-nowrap ' +
          (expanded ? 'opacity-100 max-w-[160px]' : 'opacity-0 max-w-0')
        }>
          Agregar a Cotización
        </span>
      </button>
    </div>
  );
}
