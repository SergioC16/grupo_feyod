import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);
const DEFAULT_DURATION = 2000;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((payload, opts = {}) => {
    const normalized = typeof payload === 'string'
      ? { message: payload, ...opts }
      : { ...opts, ...payload };

    if (!normalized.message) {
      console.warn('Toast message is required');
      return;
    }

    const id = normalized.id ?? Date.now().toString();
    const duration = normalized.duration ?? DEFAULT_DURATION;

    setToasts((current) => [...current, { ...normalized, id }]);

    const timer = setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
      clearTimeout(timer);
    }, duration);
  }, []);

  const showToast = useCallback((payload, opts) => {
    push(payload, opts);
  }, [push]);

  return (
    <ToastContext.Provider value={{ push, showToast }}>
      {children}
      <div aria-live="polite" className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-2 rounded shadow-lg text-white ${
              toast.type === 'error'
                ? 'bg-red-500'
                : toast.type === 'success'
                ? 'bg-green-500'
                : toast.type === 'info'
                ? 'bg-blue-500'
                : 'bg-primary'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

export default ToastProvider;
