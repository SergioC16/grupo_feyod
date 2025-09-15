import React, { useEffect, Suspense, lazy, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// Layout
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import { QuoteProvider } from './contexts/QuoteContext';
import { ToastProvider } from './components/ToastProvider';

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
  const [appReady, setAppReady] = useState(false);

  // Ensure we only show footer and other persistent UI after the page has fully loaded
  useEffect(() => {
    if (document.readyState === 'complete') {
      setTimeout(() => setAppReady(true), 80);
      return;
    }
    const onLoad = () => setTimeout(() => setAppReady(true), 80);
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <QuoteProvider>
      <ToastProvider>
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

      {/* Full-screen Suspense fallback acts as splash screen during lazy loads */}
      <main id="contenido">
        <Suspense
          fallback={
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-center bg-cover"
                style={{ backgroundImage: "url('/images/general/banner.jpg')" }}
              >
                {/* overlay to match normal hero when not first image */}
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative text-center">
                  <div className="loader mb-4" />
                  <div className="text-white font-neue font-bold">Cargando…</div>
                </div>
              </div>
            }
        >
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

      {/* Only render Footer and floating buttons after the page is ready to avoid flashes */}
      {appReady && <Footer />}
      {appReady && <WhatsAppButton />}
        </BrowserRouter>
      </ToastProvider>
    </QuoteProvider>
  );
}
