import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// Layout
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

// Páginas (carga bajo demanda)
const Home = lazy(() => import(/* webpackPrefetch: true */ "./pages/Home"));
const Products = lazy(() => import(/* webpackPrefetch: true */ "./pages/Products"));
const Services = lazy(() => import(/* webpackPrefetch: true */ "./pages/Services"));
const About = lazy(() => import(/* webpackPrefetch: true */ "./pages/About"));
const Contact = lazy(() => import(/* webpackPrefetch: true */ "./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound")); // crea un componente sencillo

// Volver al top al cambiar de ruta
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      {/* link para accesibilidad: saltar al contenido */}
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-white focus:text-black focus:px-3 focus:py-2 focus:rounded"
      >
        Saltar al contenido
      </a>

      <Header />

      <main id="contenido">
        <Suspense fallback={<div className="p-6">Cargando…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  );
}
