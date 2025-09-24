import React from 'react';
import { X } from 'lucide-react';
import Modal from './ui/Modal';
import {
  formatWhatsAppQuoteMessage,
  openWhatsAppWithText,
  formatWhatsAppQuoteMessageFromIdentity,
} from '@/utils/whatsapp';
import { useToast } from '@/components/ToastProvider';

/**
 * Modal de Cotizar con:
 * - Altura fija (max-h-[80vh]) y scroll interno
 * - X para cerrar (esquina superior derecha)
 * - Cierre por clic fuera y bloqueo de scroll del body (heredado de Modal)
 * - Responsive: grid 1â†’2 cols en productos
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
  // === Estado derivado ===
  const isEmpty = !items || items.length === 0;
  const { showToast } = useToast();

  // === NUEVO: estados para inputs de identidad ===
  const [fullName, setFullName] = React.useState('');
  const [company, setCompany] = React.useState('');

  // === NUEVO: Limpiar cotizaciÃ³n ===
  const handleClearQuote = () => {
    if (isEmpty) return;
    if (typeof onRemoveItem === 'function') {
      // VacÃ­a la lista removiendo cada item
      items.forEach(it => onRemoveItem(it.id ?? it.name));
    } else {
      // Si la limpieza depende de estado en el padre sin onRemoveItem,
      // aquÃ­ podrÃ­as invocar onClearItems?.() si existiera.
      console.warn('No se pudo limpiar: falta onRemoveItem para vaciar la lista.');
    }
    // (Opcional) tambiÃ©n podrÃ­as limpiar los inputs:
    setFullName('');
    setCompany('');
  };

  // === ACTUALIZADO: Enviar a WhatsApp con plantilla de identidad ===
  // === ACTUALIZADO: Enviar a WhatsApp con plantilla de identidad + TOAST ===
  const handleSendQuote = () => {
    const nameOk = String(fullName || '').trim();
    const companyOk = String(company || '').trim();

    if (isEmpty) {
      alert('No hay productos en la cotizaciÃ³n.');
      return;
    }
    if (!nameOk || !companyOk) {
      alert('Por favor completa los campos: "Nombre y Apellido" y "Empresa".');
      return;
    }

    // Construye mensaje con identidad
    const message = formatWhatsAppQuoteMessageFromIdentity({
      items,
      fullName: nameOk,
      company: companyOk,
    });

    // Abre WhatsApp
    openWhatsAppWithText(message);

    // Lanza toast de Ã©xito
    showToast({ type: 'success', message: 'CotizaciÃ³n enviada' });
    handleClearQuote();

    // Reinicia inputs locales
    setFullName('');
    setCompany('');

    // MantÃ©n comportamiento previo (cerrar modal / limpiar lista si el padre lo hace)
    if (typeof onSubmit === 'function') onSubmit();
  };


  return (
    <Modal open={open} onClose={onClose} ariaLabel="CotizaciÃ³n" maxWidth="max-w-4xl">

      {/* Header */}
      <div className="relative p-6 border-b border-gray-100">
        <h2 className="font-neue font-bold text-2xl text-primary pr-12">CotizaciÃ³n</h2>
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
      <div data-modal-body className="flex-1 overflow-y-auto p-6 max-h-ios-body">
        {/* Grid responsive de productos */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {items.length === 0 && (
            <div className="col-span-full text-gray-500 font-nexa">No hay productos en la cotizaciÃ³n.</div>
          )}

          {items.map((it) => (
            <div key={it.id ?? it.name} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 flex flex-col">
              {/* Imagen mÃ¡s alta en mÃ³vil, cover en sm+ */}
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

                {/* DescripciÃ³n oculta en mÃ³viles si llega */}
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
                      aria-label="Eliminar de la cotizaciÃ³n"
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
      <div className="p-6 border-t border-gray-100 mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* IZQUIERDA: BotÃ³n Limpiar (MISMAS CLASES QUE "Ver Detalles") */}
        <div className="order-2 sm:order-1">
          <button
            type="button"
            onClick={handleClearQuote}
            aria-label="Limpiar cotizaciÃ³n"
            // âš ï¸ IMPORTANTE: Usa EXACTAMENTE las mismas clases de tu botÃ³n "Ver Detalles" (azul + texto blanco).
            // Si el botÃ³n "Ver Detalles" usa otras clases en tu proyecto, reemplaza el className de abajo por esas MISMAS clases.
            className="inline-flex items-center justify-center rounded-xl bg-primary text-white px-4 py-2 text-sm font-nexa hover:bg-primary-600"
            title="Limpiar"
            disabled={isEmpty}
          >
            Limpiar
          </button>
        </div>

        {/* CENTRO: Inputs Nombre/Empresa */}
        <div className="order-1 sm:order-2 flex-1 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <input
            type="text"
            aria-label="Nombre y Apellido"
            placeholder="Nombre y Apellido"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full sm:w-64 h-10 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-nexa"
          />
          <input
            type="text"
            aria-label="Empresa"
            placeholder="Empresa"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full sm:w-64 h-10 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-nexa"
          />
        </div>

        {/* DERECHA: Cerrar + Enviar */}
        <div className="order-3 sm:order-3 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2 text-sm font-nexa hover:bg-gray-50"
          >
            Cerrar
          </button>

          <button
            type="button"
            onClick={handleSendQuote}
            disabled={isEmpty}
            aria-label="Enviar por WhatsApp"
            className={
              "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-nexa transition " +
              (isEmpty
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-accent text-white hover:bg-primary-600")
            }
            title="Enviar cotizaciÃ³n por WhatsApp"
          >
            Enviar CotizaciÃ³n
          </button>
        </div>
      </div>

    </Modal>
  );
};

export default QuoteModal;

