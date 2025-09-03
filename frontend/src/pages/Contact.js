import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, Facebook, Instagram, Linkedin, X } from 'lucide-react';

// TikTok Icon Component
const TikTokIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: 'consulta',
    selectedCategory: '',
    selectedProducts: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [availableProducts, setAvailableProducts] = useState([]);

  // Products data structure (same as Products.js)
  const productsData = {
    "Orinales y Cartuchos": [
      "Válvula de descarga para orinal",
      "Orinal ECOSPHERE",
      "Orinal ECOINOQ", 
      "Orinal ECO",
      "Cartucho de larga duración para orinal Gobi (Helvex)",
      "Cartucho para orinales ecológicos"
    ],
    "Accesorios para Sanitarios": [
      "Sensor Power Light",
      "Cobertor manual para sanitarios institucionales",
      "Válvula Smart cuadrada",
      "Hygiene Box para sanitarios",
      "Informador de estado de cubículos",
      "Bizcocho autoforralble para sanitario",
      "Asiento sin tapa, elongado"
    ],
    "Dispensadores": [
      "Dispensador de jabón/gel manos libres",
      "Dispensador Flat de sensor",
      "Dispensador de agua (sensor infrarrojo)",
      "Dispensador de jabón para mesón",
      "Dispensadores de jabón verticales",
      "Dispensador de sensor de agua para botellas",
      "Dispensador de agua Wave",
      "Dispensador de jabón de mesón (manija acero 304, capacidad 1 L)",
      "Dispensador de sensor de jabón en espuma"
    ],
    "Grifería Push": [
      "Grifo lavamanos Push LEED (Docol)",
      "Grifo lavamanos Push (Docol)",
      "Lavamanos autónomo",
      "Lavamanos cisterna"
    ],
    "Grifería y Duchas de Sensor": [
      "Grifo Squadra",
      "Grifo y jabonera Block",
      "Grifo cuello de ganso",
      "Grifo Dato",
      "Grifo y jabonera Block 2.0",
      "Grifo L",
      "Grifo Andrew",
      "Grifo Diamond",
      "Grifo Du‑Plo (quirúrgico)",
      "Grifo Quatro",
      "Grifo Escuadra",
      "Grifo Vicaríolo",
      "Grifo en bambú",
      "Grifo cascada en mármol",
      "Grifo Cascata",
      "Grifo rústico galvanizado en cobre",
      "Grifo Flat",
      "Grifo Torcia",
      "Grifo Cascada",
      "Grifo Curve",
      "Grifo Chiave",
      "Grifo Niagara",
      "Grifo Curvesense",
      "Grifo Cascade",
      "Grifo Cascadal",
      "Grifo Cilíndrico",
      "Grifo Prisma",
      "Módulo de lavamanos 4 en 1",
      "Ducha Curve",
      "Ducha Prisma",
      "Ducha Cascade"
    ],
    "Secadores de Manos": [
      "Secador de manos automático cóncavo",
      "Secador de manos automático vertical Prisma",
      "Secador de manos automático vertical Slim"
    ],
    "Accesorios para Bebés": [
      "Cambiador para bebés",
      "Soporte manos libres para bebés"
    ],
    "Higienización": [
      "Cámara UV de desinfección (tipo 1)",
      "Cámara UV de desinfección (tipo 2)",
      "Sistema de higienización para sanitarios y orinales",
      "Tapetes antisaplciaduras"
    ],
    "Sistemas de Ahorro de Agua": [
      "Sistema de recirculación de agua",
      "Boquilla ahorradora de agua para grifos"
    ],
    "Repuestos": [
      "Pistón Cover",
      "Chupa Stern Corona",
      "Kit de empaquetadura",
      "Copa para cartucho Corona sanitario",
      "Kit de escudo antivandálico para Push Corona sanitario",
      "Kit empaquetadura grifo y orinal Push Corona",
      "Kit reemplazo para fluxómetros descontinuados de sensor",
      "Llave para cartucho ecológico",
      "Pivote y conector para jabonera Corona",
      "Kit reemplazo para grifos de sensor",
      "Racor plástico para sanitarios",
      "Racor metálico para sanitarios",
      "Bobina para fluxómetro duplex Corona",
      "Cartucho para Push Docol sanitario de 1 ¼″",
      "Cartucho para Push sanitario Corona",
      "Aireador para grifo",
      "Manguera para jabonera de sensor Corona",
      "Resorte para cartucho Push Corona (grifo y sanitario)",
      "Cartucho para grifo y orinal Corona",
      "Sifón tipo P",
      "Sifón Push lavamanos",
      "Válvula Push para sanitario Corona",
      "Cambio kit reemplazo sensor para fluxómetro duplex Corona",
      "Cambio kit reemplazo sensor para fluxómetro duplex Corona, Grival"
    ]
  };

  const categories = Object.keys(productsData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Handle category change - NO eliminar productos seleccionados
    if (name === 'selectedCategory') {
      setAvailableProducts(productsData[value] || []);
      // NO limpiar selectedProducts para mantener la acumulación
    }
  };

  const handleProductToggle = (product) => {
    const category = formData.selectedCategory; // Categoria actual
    const productWithCategory = `${product} (${category})`;
    
    setFormData(prev => {
      const isAlreadySelected = prev.selectedProducts.some(p => p.startsWith(product));
      
      return {
        ...prev,
        selectedProducts: isAlreadySelected
          ? prev.selectedProducts.filter(p => !p.startsWith(product))
          : [...prev.selectedProducts, productWithCategory]
      };
    });
  };

  const removeProduct = (productToRemove) => {
    setFormData(prev => ({
      ...prev,
      selectedProducts: prev.selectedProducts.filter(p => p !== productToRemove)
    }));
  };

  // Define quotation service check
  const isQuotationService = formData.service === 'cotizacion';

  // Update message template when products are selected
  useEffect(() => {
    if (isQuotationService && formData.selectedProducts.length > 0) {
      const productsList = formData.selectedProducts.map(product => `- ${product}`).join('\n');
      const template = `Productos a consultar:\n${productsList}\n\n`;
      
      // Extract any manual text (text after the last product template)
      const currentMessage = formData.message;
      const templateRegex = /^Productos a consultar:[\s\S]*?\n\n/;
      const manualText = currentMessage.replace(templateRegex, '').trim();
      
      const newMessage = template + (manualText || '');
      
      // Only update if the message actually changed to avoid infinite loops
      if (formData.message !== newMessage) {
        setFormData(prev => ({
          ...prev,
          message: newMessage
        }));
      }
    } else if (!isQuotationService) {
      // If not quotation service, remove template and keep only manual text
      const currentMessage = formData.message;
      const templateRegex = /^Productos a consultar:[\s\S]*?\n\n/;
      const manualText = currentMessage.replace(templateRegex, '').trim();
      
      if (formData.message !== manualText || formData.selectedProducts.length > 0) {
        setFormData(prev => ({
          ...prev,
          message: manualText,
          selectedProducts: [],
          selectedCategory: ''
        }));
      }
    }
  }, [formData.selectedProducts, isQuotationService]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Prepare form data for backend
      const contactFormData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        company: formData.company || '',
        serviceType: formData.service,
        selectedProducts: formData.selectedProducts,
        message: formData.message
      };

      // Send to backend API
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactFormData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);
      
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        service: 'consulta',
        selectedCategory: '',
        selectedProducts: []
      });
      setAvailableProducts([]);
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      
    } catch (error) {
      console.error('Error sending form:', error);
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Teléfono',
      info: '300 2014127 - 315 7258223',
      subtitle: 'Lun - Vie: 7:00 AM - 5:00 PM'
    },
    {
      icon: Mail,
      title: 'Email',
      info: 'grupofeyodventas1@gmail.com',
      subtitle: 'Soporte rápido y confiable'
    },
    {
      icon: MapPin,
      title: 'Oficina Principal',
      info: 'Carrera 61 # 162 - 21, Bogotá',
      subtitle: 'Colombia'
    },
    {
      icon: Clock,
      title: 'Horarios',
      info: 'Lunes a Viernes',
      subtitle: '7:00 AM - 5:00 PM'
    }
  ];

  const services = [
    { value: 'consulta', label: 'Consulta General' },
    { value: 'cotizacion', label: 'Solicitar Cotización' },
    { value: 'soporte', label: 'Soporte Técnico' },
    { value: 'instalacion', label: 'Instalación' },
    { value: 'mantenimiento', label: 'Mantenimiento' }
  ];

  const socialLinks = [
    { icon: TikTokIcon, href: 'https://www.tiktok.com/', label: 'TikTok', color: 'text-pink-500' },
    { icon: Facebook, href: 'https://www.facebook.com/', label: 'Facebook', color: 'text-blue-600' },
    { icon: Instagram, href: 'https://www.instagram.com/', label: 'Instagram', color: 'text-pink-600' },
    { icon: Linkedin, href: 'https://www.linkedin.com', label: 'LinkedIn', color: 'text-blue-700' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 min-h-screen"
    >
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
                  Contác<span className="text-accent">tanos</span>
                </h1>
                <p className="font-nexa text-xl md:text-2xl text-gray-100 leading-relaxed">
                  Si estás buscando la mejor opción para renovar o mejorar tus instalaciones, nuestro equipo está listo para asesorarte y ofrecerte la solución perfecta para tus necesidades.
                  </p>
              </motion.div>
          </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-12 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-neue font-bold text-primary mb-6">
                    {info.title}
                  </h3>
                  <p className="text-gray-700 font-nexa font-medium mb-3">
                    {info.info}
                  </p>
                  <p className="text-gray-500 font-nexa text-sm">
                    {info.subtitle}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-neue font-bold text-primary mb-6 sm:mb-8">
                Envíanos un Mensaje
              </h2>
              
              {/* Success Message */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border-l-4 border-green-400 p-4 mb-6 rounded-lg"
                >
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <p className="text-green-700 font-nexa">
                      ¡Mensaje enviado exitosamente! Te contactaremos pronto.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-lg"
                >
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                    <p className="text-red-700 font-nexa">
                      Error al enviar el mensaje. Por favor, inténtalo de nuevo.
                    </p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-gray-700 font-nexa font-medium mb-2 text-sm sm:text-base">
                      Nombre Completo*
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors font-nexa text-sm sm:text-base"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-nexa font-medium mb-2 text-sm sm:text-base">
                      Teléfono*
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors font-nexa text-sm sm:text-base"
                      placeholder="Tu número de teléfono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-nexa font-medium mb-2 text-sm sm:text-base">
                    Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors font-nexa text-sm sm:text-base"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-nexa font-medium mb-2 text-sm sm:text-base">
                    Empresa/Organización*
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors font-nexa text-sm sm:text-base"
                    placeholder="Nombre de tu empresa"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-nexa font-medium mb-2 text-sm sm:text-base">
                    Tipo de Servicio*
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors font-nexa text-sm sm:text-base"
                  >
                    {services.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dynamic fields for quotation */}
                {isQuotationService && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 sm:space-y-6"
                  >
                    <div>
                      <label className="block text-gray-700 font-nexa font-medium mb-2 text-sm sm:text-base">
                        Categoría:
                      </label>
                      <select
                        name="selectedCategory"
                        value={formData.selectedCategory}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors font-nexa text-sm sm:text-base"
                      >
                        <option value="">Selecciona una categoría</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    {formData.selectedCategory && availableProducts.length > 0 && (
                      <div>
                        <label className="block text-gray-700 font-nexa font-medium mb-2 text-sm sm:text-base">
                          Productos:
                        </label>
                        <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-2 sm:p-3 space-y-1 sm:space-y-2">
                          {availableProducts.map((product) => {
                            const isProductSelected = formData.selectedProducts.some(p => p.startsWith(product));
                            return (
                              <label key={product} className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded text-sm sm:text-base">
                                <input
                                  type="checkbox"
                                  checked={isProductSelected}
                                  onChange={() => handleProductToggle(product)}
                                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded mt-0.5"
                                />
                                <span className="text-gray-700 font-nexa leading-tight">{product}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {formData.selectedProducts.length > 0 && (
                      <div>
                        <label className="block text-gray-700 font-nexa font-medium mb-2 text-sm sm:text-base">
                          Productos Seleccionados:
                        </label>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {formData.selectedProducts.map((product) => (
                            <div key={product} className="flex items-start justify-between bg-gray-50 p-2 sm:p-3 rounded-lg">
                              <span className="text-gray-700 font-nexa text-xs sm:text-sm leading-tight pr-2">{product}</span>
                              <button
                                type="button"
                                onClick={() => removeProduct(product)}
                                className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0 mt-0.5"
                              >
                                <X size={14} className="sm:hidden" />
                                <X size={16} className="hidden sm:block" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                <div>
                  <label className="block text-gray-700 font-nexa font-medium mb-2 text-sm sm:text-base">
                    Mensaje*
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors font-nexa resize-none text-sm sm:text-base"
                    placeholder="Cuéntanos sobre tu proyecto o consulta..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 sm:py-4 rounded-lg font-nexa font-semibold text-base sm:text-lg transition-all flex items-center justify-center space-x-2 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-accent hover:bg-accent-600 shadow-lg hover:shadow-xl'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Enviar Mensaje</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="space-y-6 sm:space-y-8 order-1 lg:order-2"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-neue font-bold text-primary mb-4 sm:mb-6">
                  Visítanos
                </h3>
                {/* Google Maps Embed */}
                <div className="h-64 rounded-2xl overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.2574665925244!2d-74.11655488573398!3d4.719448843039742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f8538c83eb4dd%3A0x6a7a4d8e3b8f4e6b!2sCarrera%2061%20%23162-21%2C%20Bogot%C3%A1%2C%20Colombia!5e0!3m2!1ses!2sus!4v1705590000000!5m2!1ses!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación Grupo Feyod"
                  ></iframe>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-neue font-bold text-primary mb-6">
                  Síguenos en Redes
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all ${social.color}`}
                        aria-label={social.label}
                      >
                        <Icon className="w-6 h-6" />
                      </motion.a>
                    );
                  })}
                </div>
                <p className="text-gray-600 font-nexa mt-4">
                  Mantente al día con nuestras últimas innovaciones y proyectos.
                </p>
              </div>

              <div className="bg-primary rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-neue font-bold mb-4">
                  ¿Necesitas Soporte Inmediato?
                </h3>
                <p className="font-nexa mb-6">
                  Nuestro equipo técnico está disponible para emergencias 
                  y consultas urgentes.
                </p>
                <span className="bg-accent hover:bg-accent-600 text-white px-6 py-3 rounded-full font-nexa font-semibold inline-flex items-center space-x-2 transition-colors">
                  <Phone className="w-5 h-5" />
                  <span>+57 315 7258223</span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;