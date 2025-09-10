import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import DownloadButton from '../components/DownloadButton';
import React from 'react';
import { Helmet } from 'react-helmet-async';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = useCallback((service) => {
    setSelectedService(service);
    setCurrentImageIndex(0);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedService(null);
    setCurrentImageIndex(0);
  }, []);

  const nextImage = useCallback(() => {
    if (selectedService) {
      setCurrentImageIndex((prev) => 
        (prev + 1) % selectedService.images.length
      );
    }
  }, [selectedService]);

  const prevImage = useCallback(() => {
    if (selectedService) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedService.images.length - 1 : prev - 1
      );
    }
  }, [selectedService]);

  // Auto-slide functionality
  React.useEffect(() => {
    if (!selectedService || !selectedService.images || selectedService.images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        (prev + 1) % selectedService.images.length
      );
    }, 5000); // 5 seconds auto-slide

    return () => clearInterval(interval);
  }, [selectedService]);

  const ServiceCard = React.memo(({ service }) => (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-[450px] sm:h-[480px] w-full flex flex-col">
      <div className="relative flex-shrink-0">
        <div className="aspect-video overflow-hidden">
          <img
            src={service.images[0]}
            alt={service.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>
      
      <div className="p-4 sm:p-6 relative flex-1 flex flex-col">
        <h3 className="font-neue font-bold text-base sm:text-lg xl:text-xl text-primary mb-2 sm:mb-3 line-clamp-2">
          {service.name}
        </h3>
        <p className="text-gray-600 font-nexa text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 flex-1 line-clamp-3 sm:line-clamp-4">
          {service.shortDescription || service.description}
        </p>
        
        {service.hasDetailsButton && (
          <div className="flex justify-end mt-auto pt-3 sm:pt-4">
            <button
              onClick={() => openModal(service)}
              className="bg-primary hover:bg-primary-600 text-white px-3 sm:px-4 py-2 rounded-lg font-nexa font-medium transition-colors text-sm sm:text-base shadow-md hover:shadow-lg"
            >
              Ver Detalles
            </button>
          </div>
        )}
      </div>
    </div>
  ));

  const Modal = useMemo(() => {
    if (!selectedService) return null;

    return (
    <Helmet>
      <title>Servicios — Grupo Feyod</title>
      <meta name="description" content="Nuestros Servicios." />
    </Helmet>,      
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative p-6 border-b border-gray-100">
              <h2 className="font-neue font-bold text-2xl text-primary pr-10">
                {selectedService.name}
              </h2>
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Image Carousel */}
            <div className="relative">
              <div className="aspect-video overflow-hidden">
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  src={selectedService.images[currentImageIndex]}
                  alt={`${selectedService.name} ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Navigation Buttons */}
              {selectedService.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeft size={24} className="text-primary" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <ChevronRight size={24} className="text-primary" />
                  </button>
                </>
              )}

              {/* Image Indicators */}
              {selectedService.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {selectedService.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? 'bg-white shadow-lg'
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Service Details */}
            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-neue font-bold text-lg text-primary mb-3">
                  Descripción del Servicio
                </h3>
                <p className="text-gray-600 font-nexa leading-relaxed">
                  {selectedService.description}
                </p>
              </div>

              {selectedService.details && selectedService.details.length > 0 && (
                <div>
                  <h3 className="font-neue font-bold text-lg text-primary mb-3">
                    Detalles del Proceso
                  </h3>
                  {selectedService.details.length === 1 ? (
                    // Single detail as paragraph
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600 font-nexa leading-relaxed">
                        {selectedService.details[0]}
                      </p>
                    </div>
                  ) : (
                    // Multiple details as enumerated list
                    <ol className="space-y-3">
                      {selectedService.details.map((detail, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-4 text-gray-600 font-nexa bg-gray-50 p-4 rounded-lg"
                        >
                          <div className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-sm font-bold">
                              {index + 1}
                            </span>
                          </div>
                          <p className="leading-relaxed">{detail}</p>
                        </motion.li>
                      ))}
                    </ol>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }, [selectedService, currentImageIndex, closeModal, nextImage, prevImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Banner */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-primary to-primary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-neue font-bold text-4xl md:text-6xl mb-6">
              Nuestros <span className="text-accent">Servicios</span>
            </h1>
            <p className="font-nexa text-xl md:text-2xl text-gray-100 leading-relaxed">
              En Grupo Feyod ofrecemos servicios especializados de mantenimiento, 
              instalación y soporte técnico para equipos sanitarios inteligentes, 
              garantizando el óptimo funcionamiento de su infraestructura.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Banner */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-accent to-accent-600 text-white px-6 py-4 rounded-xl shadow-lg inline-block">
              <p className="font-nexa font-semibold text-base sm:text-lg">
                🚀 Próximamente podrás agendar los servicios directamente desde nuestra página web 🚀
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 justify-items-center">
            {servicesData.map((service, index) => (
              <div key={service.id} className="w-full max-w-md">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {Modal}
    </div>
  );
};

export default Services;