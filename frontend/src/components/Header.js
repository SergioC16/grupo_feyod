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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú al cambiar de ruta
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
        ${scrolled
          ? "bg-white/40 backdrop-blur-xl shadow-lg"
          : "bg-white/80 backdrop-blur-lg shadow-none"}

      `}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Fila principal */}
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-[68px] xl:h-20">
          {/* Logo (izquierda) */}
          <Link to="/" className="inline-flex items-center shrink-0">
            <img
              src="/images/general/logo.png"
              alt="Grupo Feyod"
              className="h-8 sm:h-9 lg:h-10 xl:h-12 w-auto object-contain"
              draggable="false"
            />
          </Link>

          {/* NAV DESKTOP (centrado) — sólo ≥ xl */}
          <nav
            className="
              hidden xl:flex
              items-center justify-center
              flex-1 min-w-0
              gap-4 2xl:gap-6
              whitespace-nowrap
            "
          >
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center gap-2
                    px-4 2xl:px-5
                    py-2
                    border-2 border-transparent
                    rounded-full
                    text-sm 2xl:text-base
                    transition-colors duration-300
                    ${isActive ? "bg-primary text-white border-primary shadow-lg" : "text-primary hover:bg-primary/10"}
                  `}
                >
                  <Icon size={20} />
                  <span className="font-nexa font-medium">{item.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* CTA (derecha) — visible sólo ≥ xl */}
          <motion.div
            className="hidden xl:inline-flex shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={openModal}
              className="relative bg-accent hover:bg-accent-600 text-white px-5 lg:px-6 py-2.5 lg:py-3 rounded-full font-nexa font-semibold shadow-lg hover:shadow-xl"
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

          {/* DERECHA: X (si abierto) + Hamburguesa — visible en < xl */}
          <div className={`flex xl:hidden items-center gap-3 ${isOpen ? "relative z-[70]" : ""}`}>
            {isOpen && (
              <button
                type="button"
                aria-label="Cerrar menú"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary shadow-md hover:bg-white focus:outline-none"
              >
                <X size={20} />
              </button>
            )}
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="p-3 rounded-lg text-primary hover:bg-primary/10 transition-colors"
              aria-label="Abrir o cerrar menú"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil / tablets / laptops como overlay */}
      {isOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60]"
          style={{ willChange: "opacity" }}
        >
          {/* Backdrop: clic fuera cierra */}
          <div
            className="absolute inset-0 bg-black/40 md:bg-black/30"
            onClick={() => setIsOpen(false)}
          />

          {/* Contenido del menú */}
          <div className="relative pt-16 md:pt-16 lg:pt-[72px] xl:pt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                <div className="px-4 py-4 space-y-2">
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

                  {/* CTA dentro del overlay para < xl */}

                  <button
                    onClick={() => {
                      openModal();
                      setIsOpen(false);
                    }}
                    aria-label="Abrir cotización"
                    className="relative w-full mt-3 bg-accent hover:bg-accent-600 text-white px-4 py-3 rounded-lg font-nexa font-semibold text-center shadow-md"
                  >
                    Cotizar ahora
                    {count > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-100 px-1 text-xs font-semibold text-green-700 shadow">
                        {count}
                      </span>
                    )}
                  </button>

                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
