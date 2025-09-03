import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Users, Award, CheckCircle, Star } from 'lucide-react';
import DownloadButton from '../components/DownloadButton';

const Home = () => {
   
  // Splash state: show image-only for 2 seconds, then reveal hero/carousel with text
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 1000);
    return () => clearTimeout(t);
  }, []);
// Carousel state and functionality
  const heroImages = [
    '/images/general/banner1.png',
    '/images/general/banner2.png',
    '/images/general/banner3.png',
    '/images/general/banner4.png',
    '/images/general/banner5.png',
    '/images/general/banner6.png'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);
  const benefits = [
    {
      icon: Shield,
      title: 'Máxima Higiene',
      description: 'Tecnología antibacterial y sensores sin contacto para una experiencia completamente higiénica.'
    },
    {
      icon: Zap,
      title: 'Tecnología Inteligente',
      description: 'Sistemas automatizados que optimizan el uso de recursos y mejoran la funcionalidad.'
    },
    {
      icon: Award,
      title: 'Calidad Premium',
      description: 'Productos certificados con garantía extendida y soporte técnico especializado.'
    },
    {
      icon: Users,
      title: 'Uso Comercial',
      description: 'Soluciones diseñadas para alto tráfico en hoteles, centros comerciales y oficinas.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Instalaciones' },
    { number: '98%', label: 'Satisfacción' },
    { number: '100%', label: 'Soporte' },
    { number: '5.0', label: 'Calificación' }
  ];

  if (showSplash) {
  return (
    <motion.section
      className="fixed inset-0 z-50 bg-center bg-cover"
      style={{ backgroundImage: "url('/images/general/banner.jpg')" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 1.6 }}
    />
  );
}

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-hidden"
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Image Carousel Background */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
          <div className="hero-gradient absolute inset-0"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-4xl">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-neue font-bold text-white mb-6 leading-tight"
            >
              El Futuro de los
              <span className="text-accent block">Baños Inteligentes</span>
            </motion.h1>
            
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 mb-8 font-nexa leading-relaxed"
            >
              Ofrecemos soluciones tecnológicas avanzadas para modernizar baños en todo tipo de espacios: sanitarios inteligentes, griferías automatizadas y más.
            </motion.p>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/productos"
                className="btn-primary bg-accent hover:bg-accent-600 text-white px-8 py-4 rounded-full font-nexa font-semibold text-lg shadow-xl hover:shadow-2xl flex items-center justify-center group"
              >
                Ver Productos
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/contacto"
                className="btn-primary border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-full font-nexa font-semibold text-lg flex items-center justify-center"
              >
                Solicitar Cotización
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Carousel Indicators - REMOVED as requested */}

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/70"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
            <div className="w-1 h-3 bg-white/50 rounded-full mx-auto animate-bounce"></div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-neue font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80 font-nexa">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-neue font-bold text-primary mb-6">
              ¿Por Qué Elegir Grupo Feyod?
            </h2>
            <p className="text-xl text-gray-600 font-nexa max-w-3xl mx-auto">
              Lideramos la innovación en tecnología sanitaria con soluciones que combinan 
              inteligencia artificial, diseño premium y máxima funcionalidad.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-hover bg-white p-8 rounded-2xl shadow-lg text-center group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-neue font-bold text-primary mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 font-nexa leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-700 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/4957793/pexels-photo-4957793.jpeg')`
          }}
        />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-neue font-bold text-white mb-6">
              Transforma Tu Espacio Hoy
            </h2>
            <p className="text-xl text-white/90 font-nexa mb-8 leading-relaxed">
              Descubre cómo nuestras soluciones inteligentes pueden revolucionar 
              tu hogar, empresa o establecimiento comercial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contacto"
                className="btn-primary bg-accent hover:bg-accent-600 text-white px-8 py-4 rounded-full font-nexa font-semibold text-lg shadow-xl hover:shadow-2xl"
              >
                Solicitar Consulta Gratuita
              </Link>
              <button
                onClick={() => {
                  console.log('Iniciando descarga del catálogo');
                  // Crear enlace temporal para descarga
                  const link = document.createElement('a');
                  link.href = '/pdfs/catalog/catalogo_grupo_feyod.pdf';
                  link.download = 'Catálogo Grupo Feyod.pdf';
                  link.style.display = 'none';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  console.log('Catálogo descargado exitosamente');
                }}
                className="btn-primary border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-full font-nexa font-semibold text-lg transition-all duration-300"
              >
                Explorar Catálogo
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;