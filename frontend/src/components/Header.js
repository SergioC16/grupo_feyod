import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Home, Package, Users, Phone, Settings } from "lucide-react";
import { useQuote } from "@/contexts/QuoteContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { count, openModal } = useQuote();

  // Sombra / blur al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar menú al navegar (evita duplicados y estados “colgados”)
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navigation = [
    { name: "Inicio", href: "/", icon: Home },
    { name: "Productos", href: "/productos", icon: Package },
    { name: "Servicios", href: "/servicios", icon: Settings },
    { name: "Nosotros", href: "/nosotros", icon: Users },
    { name: "Contacto", href: "/contacto", icon: Phone },
  ];

  const isContactPage = location.pathname === "/contacto";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`
        sticky top-0 z-50 w-full relative
        pt-[env(safe-area-inset-top)]
        transition-[background-color,backdrop-filter,box-shadow] duration-300
        ${scrolled ? "bg-white/40 backdrop-blur-xl shadow-lg" : "bg-white/80 backdrop-blur-lg shadow-sm"}
      `}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Fila principal */}
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo (izquierda) */}
          <Link to="/" className="inline-flex items-center shrink-0">
            <img
              src="/images/general/logo.png"
              alt="Grupo Feyod"
              className="h-8 sm:h-10 md:h-12 w-auto object-contain"
              draggable="false"
            />
          </Link>

          {/* Navegación desktop (centro) */}
          <nav className="hidden md:flex items-center gap-6 flex-1 justify-center min-w-0">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-2 px-4 py-2 border-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-0 focus:shadow-none     
                  ${isActive
                      ? "bg-primary text-white shadow-lg border-primary" // Borde visible (puedes ajustarlo si prefieres sin borde)
                      : "text-primary hover:bg-primary/10 hover:text-primary border-transparent" // <-- **CLAVE:** Borde de 2px invisible
                  } `}
                >
                  <Icon size={18} />
                  <span className="font-nexa font-medium">{item.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* CTA escritorio (derecha) — visible solo ≥ lg */}
          <motion.div
            className="hidden lg:inline-flex shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={openModal}
              className="relative bg-accent hover:bg-accent-600 text-white px-6 py-3 rounded-full font-nexa font-semibold shadow-lg hover:shadow-xl"
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

          {/* Botón menú móvil (solo < md) */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden p-3 rounded-lg text-primary hover:bg-primary/10 transition-colors relative"
            aria-label="Abrir o cerrar menú"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menú móvil como OVERLAY ÚNICO (no empuja el layout) */}
      {isOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="md:hidden absolute left-0 right-0 top-full pointer-events-auto"
          style={{ willChange: "transform" }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-2 bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden">
              <div className="px-4 py-4 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive ? "bg-primary text-white shadow-md" : "text-primary hover:bg-primary/10"
                        }`}
                    >
                      <Icon size={20} />
                      <span className="font-nexa font-medium">{item.name}</span>
                    </Link>
                  );
                })}

                {/* CTA móvil (dentro del overlay; no al lado del logo) */}
                {!isContactPage && (
                  <button
                    onClick={() => {
                      openModal();
                      setIsOpen(false);
                    }}
                    aria-label="Abrir cotización"
                    className="relative w-full mt-4 bg-accent hover:bg-accent-600 text-white px-4 py-3 rounded-lg font-nexa font-semibold text-center shadow-md"
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
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
