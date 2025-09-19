import React, { useEffect, useCallback } from 'react';

/**
 * Modal reutilizable con:
 * - overlay: fixed inset-0, bg-black/60, backdrop-blur
 * - contenedor: rounded-2xl, shadow-2xl, max-h-[80vh], overflow-hidden
 * - scroll interno en <div data-modal-body>
 * - cierre por click fuera y tecla Esc
 * - bloqueo de scroll del body
 */
const Modal = ({
  open,
  onClose,
  children,
  ariaLabel = 'Diálogo',
  maxWidth = 'max-w-4xl', // puedes usar 'max-w-3xl' o 'max-w-5xl'
}) => {
  // Bloquear scroll del body mientras el modal esté abierto
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow || '';
    };
  }, [open]);

  // Cerrar con tecla Esc
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose?.();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose} // clic fuera cierra
    >
      <div
        className={`relative w-full ${maxWidth} max-h-[80vh] overflow-hidden rounded-2xl bg-white shadow-2xl`}
        onClick={(e) => e.stopPropagation()} // evita cierre si se hace click dentro
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
