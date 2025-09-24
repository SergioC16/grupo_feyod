// src/utils/whatsapp.js

// --- Normalizador de producto ---
function normalizeProduct(p = {}) {
  const name =
    p.name ??
    p.nombre ??
    p.title ??
    p.titulo ??
    p.productName ??
    p.producto ??
    '';

  const category =
    p.category ??
    p.categoria ??
    p.categoryName ??
    p.categoriaNombre ??
    p.type ??
    p.grupo ??
    '';

  return {
    name: String(name || '').trim(),
    category: String(category || '').trim(),
  };
}

// --- Helpers principales ---
function formatWhatsAppQuoteMessage(products = []) {
  const header = [
    'Buen día ',
    '',
    'Deseo realizar la cotización de los siguientes productos:',
    ''
  ].join('\n');

  const items = (products || [])
    .map(normalizeProduct)
    .filter(p => p.name)
    .map(p => `-${p.name}${p.category ? ` (${p.category})` : ''}`)
    .join('\n');

  const footer = ['', 'Gracias.'].join('\n');

  return [header, items, footer].join('\n');
}

// --- NUEVO: Plantilla con identidad (Nombre + Empresa) ---
function formatWhatsAppQuoteMessageFromIdentity({ items = [], fullName = '', company = '' } = {}) {
  const header = [
    'Buen día',
    '',
    `Mi nombre es ${fullName}, de la empresa ${company} estoy interesad@ en cotizar los siguientes productos:`,
    ''
  ].join('\n');

  const products = (items || [])
    .map(normalizeProduct)
    .filter(p => p.name)
    .map(p => `-${p.name}${p.category ? ` (${p.category})` : ''}`)
    .join('\n');

  const footer = ['', 'Gracias.'].join('\n');

  return [header, products, footer].join('\n');
}

function openWhatsAppWithText(text, mode = 'wa') {
  const phone = '573157258223';
  const encoded = encodeURIComponent(text);
  const url =
    mode === 'api'
      ? `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`
      : `https://wa.me/${phone}?text=${encoded}`;

  if (typeof window !== 'undefined') {
    window.open(url, '_blank');
  }
  return url;
}

// --- Export nombrado + default (para ambos estilos de import) ---
export { formatWhatsAppQuoteMessage, openWhatsAppWithText, formatWhatsAppQuoteMessageFromIdentity };
const whatsapp = { formatWhatsAppQuoteMessage, openWhatsAppWithText, formatWhatsAppQuoteMessageFromIdentity };
export default whatsapp;

