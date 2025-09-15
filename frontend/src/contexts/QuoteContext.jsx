import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const QuoteContext = createContext(null);

const STORAGE_KEY = 'feyod_quote_items_v1';

export const QuoteProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  }, [items]);

  const addItem = useCallback((product) => {
    setItems((prev) => {
      if (!product) return prev;
      // dedupe by id or name
      const exists = prev.find((p) => (p.id && product.id ? p.id === product.id : p.name === product.name));
      if (exists) return prev;
  // prefer explicit image field, fall back to first images entry
      let image = product.image || (product.images && product.images.length ? product.images[0] : null);
      if (image && typeof image === 'string' && !image.startsWith('/')) {
        image = `/${image}`;
      }
      const toAdd = { id: product.id, name: product.name, category: product.category, image };
      return [...prev, toAdd];
    });
  }, []);

  const removeItem = useCallback((idOrName) => {
    setItems((prev) => prev.filter((p) => !(p.id === idOrName || p.name === idOrName)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  return (
    <QuoteContext.Provider value={{ items, addItem, removeItem, clear }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuoteStore = () => {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error('useQuoteStore must be used within QuoteProvider');
  return ctx;
};

export default QuoteProvider;
