import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

const QuoteContext = createContext(null);

// Nuevo: usamos sessionStorage para que se borre al cerrar la pestaña
const SS_KEY = "feyod:quote:v1";
// (opcional) claves antiguas en localStorage para limpiar si existieran
const LEGACY_LS_KEYS = ["feyod_quote_items_v1", "feyod:quote"];

export const QuoteProvider = ({ children }) => {
  // 1) Cargar desde sessionStorage al iniciar la pestaña
  const [items, setItems] = useState(() => {
    try {
      const raw = sessionStorage.getItem(SS_KEY);
      if (raw) return JSON.parse(raw) || [];
    } catch { }
    return [];
  });

  const [isOpen, setIsOpen] = useState(false);

  // 2) Guardar en sessionStorage cada vez que cambien los items
  useEffect(() => {
    try {
      sessionStorage.setItem(SS_KEY, JSON.stringify(items));
    } catch { }
  }, [items]);

  // 3) Limpiar posibles restos de localStorage (una sola vez)
  useEffect(() => {
    try {
      LEGACY_LS_KEYS.forEach((k) => localStorage.removeItem(k));
    } catch { }
  }, []);

  // 4) Vaciar al cerrar la pestaña/ventana (cubre Safari/iOS con pagehide)
  useEffect(() => {
    const clearOnLeave = () => {
      try {
        sessionStorage.removeItem(SS_KEY);
      } catch { }
    };
    window.addEventListener("beforeunload", clearOnLeave);
    window.addEventListener("pagehide", clearOnLeave);
    return () => {
      window.removeEventListener("beforeunload", clearOnLeave);
      window.removeEventListener("pagehide", clearOnLeave);
    };
  }, []);

  // ===== API =====
  const addItem = useCallback((product) => {
    setItems((prev) => {
      if (!product) return prev;

      // evitar duplicados por id o por nombre
      const exists = prev.find((p) =>
        p.id && product.id ? p.id === product.id : p.name === product.name
      );
      if (exists) return prev;

      let image =
        product.image ||
        (product.images && product.images.length ? product.images[0] : null);

      // normaliza ruta a absoluta relativa al sitio
      if (image && typeof image === "string" && !image.startsWith("/")) {
        image = `/${image}`;
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          image,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((idOrName) => {
    setItems((prev) =>
      prev.filter((p) => !(p.id === idOrName || p.name === idOrName))
    );
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    try {
      sessionStorage.removeItem(SS_KEY);
    } catch { }
  }, []);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      clear,
      count: items.length,
      isOpen,
      openModal,
      closeModal,
    }),
    [items, addItem, removeItem, clear, isOpen, openModal, closeModal]
  );

  return (
    <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
  );
};

export const useQuoteStore = () => {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuoteStore must be used within QuoteProvider");
  return ctx;
};

export const useQuote = useQuoteStore;

export default QuoteProvider;
