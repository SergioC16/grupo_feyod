import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappNumber = '+573002014127';
  const message = '¡Hola! Me interesa conocer más sobre las soluciones sanitarias inteligentes.';
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-20 sm:bottom-24 right-6 z-50">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 right-0 mb-2 mr-2"
          >
            <div className="bg-white rounded-lg shadow-xl p-4 max-w-xs relative">
              <button
                onClick={() => setShowTooltip(false)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-gray-500 hover:bg-gray-600 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <X size={12} />
              </button>
              <div className="pr-4">
                <h3 className="font-neue font-bold text-primary mb-2">
                  ¡Hablemos por WhatsApp!
                </h3>
                <p className="text-gray-600 font-nexa text-sm mb-3">
                  ¿Tienes preguntas sobre nuestros productos? Estamos aquí para ayudarte.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-nexa font-medium text-sm transition-colors"
                >
                  <MessageCircle size={16} className="mr-2" />
                  Iniciar Chat
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowTooltip(!showTooltip)}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 group animate-glow"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full bg-green-400 opacity-30 animate-ping"></div>
      </motion.button>

      {/* Direct WhatsApp link (mobile) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 rounded-full md:hidden"
        aria-label="Abrir WhatsApp"
      />
    </div>
  );
};

export default WhatsAppButton;