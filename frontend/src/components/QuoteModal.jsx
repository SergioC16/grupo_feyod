import React from 'react';
import { X } from 'lucide-react';
import Modal from './ui/Modal';

/**
 * Modal de Cotizar con:
 * - Altura fija (max-h-[80vh]) y scroll interno
 * - X para cerrar (esquina superior derecha)
 * - Cierre por clic fuera y bloqueo de scroll del body (heredado de Modal)
 * - Responsive: grid 1→2 cols en productos
 * Props esperadas:
 *  - open (bool), onClose (fn)
 *  - items: array de productos a cotizar [{ id, name, image, qty, ...}]
 *  - onRemoveItem?: fn(id)
 *  - onSubmit?: fn()
 */
const QuoteModal = ({
  open,
  onClose,
  items = [],
  onRemoveItem,
  onSubmit,
}) => {
  return (
    <Modal open={open} onClose={onClose} ariaLabel="Cotización" maxWidth="max-w-4xl">
      {/* Header */}
      <div className="relative p-6 border-b border-gray-100">
        <h2 className="font-neue font-bold text-2xl text-primary pr-12">Cotización</h2>
        <button
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
          className="absolute top-6 right-6 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
        >
          <X size={18} className="text-gray-700" />
        </button>
      </div>

      {/* Cuerpo con scroll interno */}
      <div data-modal-body className="max-h-[calc(80vh-6rem)] overflow-y-auto p-6">
        {/* Grid responsive de productos */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {items.length === 0 && (
            <div className="col-span-full text-gray-500 font-nexa">No hay productos en la cotización.</div>
          )}

          {items.map((it) => (
            <div key={it.id ?? it.name} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 flex flex-col">
              {/* Imagen más alta en móvil, cover en sm+ */}
              <div className="relative overflow-hidden">
                <img
                  src={it.image || it.images?.[0]}
                  alt={it.name}
                  className="w-full object-contain h-40 sm:h-32 md:h-36 lg:h-40 sm:object-cover"
                  loading="lazy"
                />
              </div>

              <div className="mt-3 flex-1 flex flex-col">
                <h3 className="font-neue font-bold text-base sm:text-lg text-primary">{it.name}</h3>

                {/* Descripción oculta en móviles si llega */}
                {it.description && (
                  <p className="hidden md:block text-sm text-gray-600 mt-1">{it.description}</p>
                )}

                {/* Pie: botones alineados abajo */}
                <div className="mt-auto flex items-center justify-end gap-2 pt-3">
                  {onRemoveItem && (
                    <button
                      type="button"
                      onClick={() => onRemoveItem(it.id ?? it.name)}
                      className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-xs sm:text-sm font-nexa
                      bg-[#d41407] text-white hover:opacity-90
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d41407]"
                      aria-label="Eliminar de la cotización"
                    >
                    Quitar
                    </button>
                )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer fijo (no scroll) */}
      <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2 text-sm font-nexa hover:bg-gray-50"
        >
          Cerrar
        </button>
        {onSubmit && (
          <button
            type="button"
            onClick={onSubmit}
            className="inline-flex items-center justify-center rounded-xl bg-accent text-white px-4 py-2 text-sm font-nexa hover:bg-primary-600"
          >
            Enviar cotización
          </button>
        )}
      </div>
    </Modal>
  );
};

export default QuoteModal;
