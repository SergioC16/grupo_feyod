import React, { useState, useEffect, useRef } from 'react';
import { useQuoteStore } from '../contexts/QuoteContext';
import { useToast } from './ToastProvider';
import { useNavigate } from 'react-router-dom';

const QuoteModal = ({ isOpen, onClose }) => {
  const { items, clear, removeItem } = useQuoteStore();
  const { push } = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    // store previously focused element to restore focus on close
    previouslyFocused.current = document.activeElement;
    // lock scroll on body
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // focus the close button when modal opens
    setTimeout(() => closeButtonRef.current?.focus(), 0);

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
      // robust focus trap for Tab navigation
      if (e.key === 'Tab') {
        const container = modalRef.current;
        if (!container) return;
        const focusable = Array.from(
          container.querySelectorAll(
            'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => el.offsetParent !== null);
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      // restore focus and body overflow
      try { previouslyFocused.current?.focus(); } catch (_) {}
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleImageError = (e) => {
    e.currentTarget.src = '/images/general/logo.png';
  };

  const handleSubmit = async () => {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
      });
      const json = await res.json();
      if (res.ok) {
        push('Enviado');
        clear();
        onClose();
      } else {
        push(json.message || 'Error al enviar');
      }
    } catch (err) {
      push('Error de red: usando mailto');
      // Fallback mailto
      const bodyLines = [
        'Buen día',
        '',
        'Deseo realizar la cotización de los siguientes productos:',
        '',
        ...items.map((p) => `- ${p.name}`),
        '',
        'Gracias',
      ];
      const body = encodeURIComponent(bodyLines.join('\n'));
      window.location.href = `mailto:grupofeyodventas1@gmail.com?subject=Cotización&body=${body}`;
    } finally {
      setLoading(false);
    }
  };

  return (
    // place wrapper under the fixed header (increase top margin so modal doesn't overlap header)
    <div className="fixed left-0 right-0 top-56 lg:top-64 bottom-0 z-50 flex items-start md:items-center justify-center px-4 py-6" aria-hidden={!isOpen}>
      {/* overlay limited to area below header: keep backdrop blur but remove dark band */}
      <div className="absolute inset-0 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
  role="dialog"
  aria-modal="true"
  aria-labelledby="quote-modal-title"
  ref={modalRef}
  onClick={(e) => e.stopPropagation()}
  className="relative bg-white rounded-2xl shadow-none max-w-[min(900px,95vw)] w-full mx-auto p-6 md:p-8 max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <h1 id="quote-modal-title" className="text-xl md:text-2xl font-neue font-bold text-left text-[#023047]">Cotización</h1>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Cerrar"
            className="ml-4 bg-[#023047] text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-[#023047]/40 rounded-full w-10 h-10 flex items-center justify-center text-2xl md:text-3xl translate-y-1"
            title="Cerrar"
          >
            <span className="-translate-y-px">×</span>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-600 mb-6">Aún no tienes productos para cotizar</p>
            <button onClick={() => { onClose(); navigate('/productos'); }} className="bg-primary text-white px-4 py-2 rounded">Ir a Productos</button>
          </div>
        ) : (
          <div className="space-y-4">
            <ul className="max-h-[60vh] overflow-auto space-y-3" role="list" aria-label="Productos a cotizar">
              {items.map((p) => (
                <li
                  key={p.id || p.name}
                  className="bg-gray-50 p-3 rounded grid grid-cols-[96px_1fr_auto] gap-4 items-center md:grid-cols-[120px_1fr_auto]"
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-700 rounded-lg overflow-hidden">
                    {p.image ? (
                      <img src={p.image} alt={p.name} onError={handleImageError} loading="lazy" decoding="async" width="112" height="112" className="w-full h-full object-cover object-center rounded-md" />
                    ) : (
                      <img src="/images/general/logo.png" alt="placeholder" loading="lazy" decoding="async" width="112" height="112" className="w-full h-full object-cover object-center rounded-md" />
                    )}
                  </div>
                  <div className="truncate">
                    <div className="font-nexa font-semibold text-base md:text-lg text-gray-900">{p.name}</div>
                    <div className="text-sm text-gray-500">{p.category}</div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => removeItem(p.id || p.name)}
                      className="text-red-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-2 py-1"
                      aria-label={`Eliminar ${p.name} de la cotización`}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-accent text-white px-4 py-2 rounded font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {loading ? 'Enviando...' : 'Cotizar'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteModal;
