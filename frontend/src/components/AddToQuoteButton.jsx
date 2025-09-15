import React, { useState, useRef } from 'react';
import { Plus } from 'lucide-react';
import { useQuoteStore } from '../contexts/QuoteContext';
import { useToast } from './ToastProvider';

const AddToQuoteButton = ({ product }) => {
  const { addItem } = useQuoteStore();
  const { push } = useToast();
  const [showLocalToast, setShowLocalToast] = useState(false);
  const btnRef = useRef(null);

  const handleAdd = (e) => {
    e.stopPropagation();
    addItem(product);
    push('Agregado');
    // show a small local toast above the button
    setShowLocalToast(true);
    // collapse back after short timeout and remove focus
    setTimeout(() => {
      setShowLocalToast(false);
      try { btnRef.current?.blur(); } catch (_) {}
    }, 1400);
  };

  return (
    // button is positioned absolute by the card parent; keep it keyboard-accessible
    <div className="relative inline-block">
      {/* local toast above the button */}
      {showLocalToast && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1 rounded shadow-lg text-sm z-40">
          Agregado
        </div>
      )}
  <button
  ref={btnRef}
  onClick={handleAdd}
      aria-label={`Agregar ${product.name} a la cotización`}
      className={
        // collapsed: fixed circle (w-10) with no horizontal padding so icon is centered
        // expanded: auto width with padding to reveal text
        "absolute left-3 bottom-3 z-20 group flex items-center justify-center " +
        "bg-white/90 text-primary border border-gray-200 rounded-full h-10 overflow-hidden shadow " +
  "w-10 px-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-[width,padding] duration-150 ease-linear " +
  // on hover/focus switch to start alignment and increase padding/width to show text
  "hover:justify-start focus:justify-start hover:px-3 focus:px-3 hover:w-auto focus:w-auto"
      }
  >
      {/* Icon always visible and centered */}
      <Plus size={16} aria-hidden="true" className="flex-shrink-0" />

      {/* Visible only when hovered or focused (keyboard) */}
      <span
        aria-hidden="true"
        className={
          "ml-2 text-sm font-nexa whitespace-nowrap opacity-0 max-w-0 overflow-hidden transition-all duration-150 " +
          "group-hover:opacity-100 group-hover:max-w-[160px] group-focus:opacity-100 group-focus:max-w-[160px]"
        }
      >
        Agregar a Cotización
      </span>
    </button>
  </div>
  );
};

export default AddToQuoteButton;
