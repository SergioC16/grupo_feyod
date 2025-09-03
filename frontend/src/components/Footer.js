import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

// TikTok Icon Component (since it's not in lucide-react)
const TikTokIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Productos', href: '/productos' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Contacto', href: '/contacto' }
  ];

  const services = [
    'Sanitarios Inteligentes',
    'Orinales Automatizados',
    'Griferías Sensor',
    'Instalación Profesional',
    'Mantenimiento Técnico',
    'Consultoría Especializada'
  ];

  const socialLinks = [
    { icon: TikTokIcon, href: 'https://www.tiktok.com/', label: 'TikTok', color: 'hover:text-pink-500' },
    { icon: Instagram, href: 'https://www.instagram.com/', label: 'Instagram', color: 'hover:text-pink-600' },
    { icon: Facebook, href: 'https://www.facebook.com/', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: Linkedin, href: 'https://www.linkedin.com/', label: 'LinkedIn', color: 'hover:text-blue-700' }
  ];

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              {/* <div className="w-10 h-10 flex items-center justify-center">
                <img 
                  src="/images/general/isologo.png" 
                  alt="Grupo Feyod" 
                  className="w-full h-full object-contain"
                />
              </div> */}
              
              <img src="/images/general/logo2.png" alt="Grupo Feyod" className="h-8 sm:h-10 w-auto" />
            </Link>
            <p className="text-white/80 font-nexa mb-6 leading-relaxed">
              Pioneros en tecnología sanitaria inteligente, transformando espacios 
              con soluciones innovadoras y sustentables.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-white/10 hover:bg-accent hover:text-primary rounded-full flex items-center justify-center transition-all duration-300 group ${social.color}`}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-neue font-bold text-xl mb-6 text-white">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-white/80 hover:text-accent transition-colors duration-300 font-nexa"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-neue font-bold text-xl mb-6 text-white">
              Nuestros Servicios
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-white/80 font-nexa text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-neue font-bold text-xl mb-6 text-white">
              Contacto
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div className="text-white/80 font-nexa">
                  <p>Carrera 61 # 162 - 21</p>
                  <p>Bogotá, Colombia</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent" />
                <span className="text-white/80 font-nexa">
                  +57 300 201 4127 / +57 315 725 8223
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent" />
                <span className="text-white/80 font-nexa">
                  grupofeyodventas1@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <div className="text-white/60 font-nexa text-sm">
              © {currentYear} Grupo Feyod. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;