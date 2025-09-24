import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Home, Package, Users, Phone, Settings } from 'lucide-react';
import { useQuote } from '@/contexts/QuoteContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { count, openModal } = useQuote();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Inicio', href: '/', icon: Home },
    { name: 'Productos', href: '/productos', icon: Package },
    { name: 'Servicios', href: '/servicios', icon: Settings },
    { name: 'Nosotros', href: '/nosotros', icon: Users },
    { name: 'Contacto', href: '/contacto', icon: Phone },
  ];

  const isContactPage = location.pathname === '/contacto';
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 pt-safe transition-all duration-300 ${scrolled
        ? 'bg-white/40 backdrop-blur-xl shadow-lg'
        : 'bg-white/80 backdrop-blur-lg shadow-sm'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="h-8 sm:h-10 w-auto">
              <img src="/images/general/logo.png" alt="Grupo Feyod" className="w-full h-full object-contain" />
            </div>
          </Link>

          {/* Navegación escritorio */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${isActive
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-primary hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-nexa font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Botón CTA */}
          <motion.div
            className="hidden md:block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={openModal}
              className="relative btn-primary bg-accent hover:bg-accent-600 text-white px-6 py-3 rounded-full font-nexa font-semibold shadow-lg hover:shadow-xl"
              aria-label="Abrir cotización"
            >
              Cotizar ahora
              {count > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-100 px-1 text-xs font-semibold text-green-700 shadow">
                  {count}
                </span>
              )}
            </button>
          </motion.div>

          {/* Botón menú móvil */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-primary hover:bg-primary/10 transition-colors z-50 relative"
            aria-label="Abrir o cerrar menú"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navegación móvil */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden bg-white/95 backdrop-blur-lg rounded-b-2xl shadow-lg mx-4 sm:mx-0"
        >
          <div className="py-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 mx-2 rounded-lg transition-all duration-300 ${isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'text-primary hover:bg-primary/10'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-nexa font-medium">{item.name}</span>
                </Link>
              );
            })}
            {!isContactPage && (
              <button
                onClick={() => { openModal(); setIsOpen(false); }}
                aria-label="Abrir cotización"
                className="relative block w-auto mx-2 mt-4 bg-accent hover:bg-accent-600 text-primary px-4 py-3 rounded-lg font-nexa font-semibold text-center shadow-md"
              >
                Cotizar ahora
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-100 px-1 text-xs font-semibold text-green-700 shadow">
                    {count}
                  </span>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
