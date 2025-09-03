import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Users, Award, Lightbulb, Shield, Zap } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovación',
      description: 'Desarrollamos constantemente nuevas tecnologías para revolucionar la industria sanitaria.'
    },
    {
      icon: Shield,
      title: 'Calidad',
      description: 'Utilizamos solo materiales premium y tecnología de vanguardia en todos nuestros productos.'
    },
    {
      icon: Heart,
      title: 'Compromiso',
      description: 'Nos comprometemos con el bienestar de nuestros clientes y el cuidado del medio ambiente.'
    },
    {
      icon: Users,
      title: 'Servicio',
      description: 'Brindamos soporte técnico especializado y atención personalizada las 24 horas.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-white"
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
              Sobre <span className="text-accent">Grupo Feyod</span>
            </h1>
            <p className="font-nexa text-xl md:text-2xl text-gray-100 leading-relaxed">
              Pioneros en tecnología sanitaria inteligente, transformando el futuro 
              de los espacios comerciales y residenciales con innovación sustentable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Mission */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-neue font-bold text-primary">
                  Nuestra Misión
                </h2>
              </div>
              <p className="text-lg text-gray-700 font-nexa leading-relaxed text-justify">
                En <strong>Grupo Feyod</strong> soñamos con un futuro en el que cada espacio sanitario aporte al bienestar colectivo y al <strong>cuidado del planeta. </strong> 
                 Como empresa colombiana, nacimos con la convicción de que el diseño, la funcionalidad y la sostenibilidad pueden ir de la mano.                 
              </p>
              <p className="text-lg text-gray-700 font-nexa leading-relaxed text-justify">
                <strong>Creamos soluciones sanitarias inteligentes</strong> para espacios industriales y comerciales que no solo optimizan el consumo de agua, 
                sino que también transforman entornos cotidianos en lugares más humanos, seguros y conscientes. Nuestro propósito es claro: 
                elevar la experiencia de lo esencial y demostrar que, <strong>desde lo simple, también se construye el progreso de un país.</strong>
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-neue font-bold text-primary">
                  Nuestra Visión
                </h2>
              </div>
              <p className="text-lg text-gray-700 font-nexa leading-relaxed text-justify">
                Imaginar un futuro donde cada espacio sanitario inspire confianza, <strong>bienestar y respeto por el medio ambiente. </strong>
                En 2029, llevaremos esta visión más allá de nuestras fronteras, expandiendo nuestro impacto hacia mercados internacionales y acompañando a empresas que creen, 
                como nosotros, en <strong>soluciones más limpias, eficientes y responsables.</strong>               
              </p>
              <p className="text-lg text-gray-700 font-nexa leading-relaxed text-justify">
                Queremos seguir siendo una marca colombiana que transforma el presente con <strong>la mirada puesta en el futuro</strong>: generando ahorros reales de agua, 
                desarrollando <strong>tecnología ecoeficiente</strong> y construyendo espacios que reflejen el cambio que queremos ver en el mundo.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-neue font-bold text-primary mb-6">
              Nuestros Valores
            </h2>
            <p className="text-xl text-gray-600 font-nexa max-w-3xl mx-auto">
              Los principios que guían cada decisión y acción en Grupo Feyod, 
              definiendo quiénes somos y cómo trabajamos día a día.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-neue font-bold text-primary mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 font-nexa leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-neue font-bold text-white mb-6">
              Nuestra Historia
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="flex items-start space-x-6"
              >
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-neue font-bold text-white">2004</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-neue font-bold text-white mb-3">Nace Grupo Feyod</h3>
                  <p className="text-white/90 font-nexa text-lg leading-relaxed">
                    Comenzamos nuestro camino con una línea de productos para bebés, explorando el diseño funcional y la fabricación a pequeña escala. Sin experiencia, pero con determinación, dimos nuestros primeros pasos en el mundo del diseño funcional, apostando por productos hechos con detalle y propósito. Era el inicio de una historia construida con cuidado, creatividad y visión emprendedora.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="flex items-start space-x-6"
              >
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-neue font-bold text-white">2006</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-neue font-bold text-white mb-3">Nuestros primeros espacios</h3>
                  <p className="text-white/90 font-nexa text-lg leading-relaxed">
                    Poco a poco fuimos abriéndonos camino. Desarrollamos válvulas de descarga controladas y logramos instalarlas en baños públicos de Bogotá, incluyendo lugares emblemáticos como Andrés Carne de Res. Ver nuestros productos funcionando fuera del taller fue la confirmación de que íbamos por el camino correcto.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="flex items-start space-x-6"
              >
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-neue font-bold text-white">2010</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-neue font-bold text-white mb-3">El primer gran impulso</h3>
                  <p className="text-white/90 font-nexa text-lg leading-relaxed">
                    Ese año ganamos el premio Destapa Futuro de Bavaria, un hito que nos permitió fortalecer el desarrollo de moldes y mejorar significativamente la calidad de nuestros acabados. Un salto clave hacia la profesionalización de nuestros productos.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="flex items-start space-x-6"
              >
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-neue font-bold text-white">2012</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-neue font-bold text-white mb-3">El incendio que lo cambió todo</h3>
                  <p className="text-white/90 font-nexa text-lg leading-relaxed mb-3">
                    <strong>3 de agosto de 2012</strong>
                  </p>
                  <p className="text-white/90 font-nexa text-lg leading-relaxed">
                    Ese día, el fuego arrasó con años de trabajo, sueños, máquinas, productos y esperanzas. Nuestro taller se redujo a cenizas y, con él, gran parte de lo que habíamos construido desde cero. Fue un golpe devastador para una empresa pequeña que apenas comenzaba a abrirse camino. Pero si algo nos define, es la capacidad de resistir.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="flex items-start space-x-6"
              >
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-neue font-bold text-white">2012</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-neue font-bold text-white mb-3">Renacer desde las cenizas</h3>
                  <p className="text-white/90 font-nexa text-lg leading-relaxed mb-3">
                    <strong>Agosto – Diciembre 2012</strong>
                  </p>
                  <p className="text-white/90 font-nexa text-lg leading-relaxed">
                    El incendio no apagó nuestras ganas de crear. Al contrario, encendió una nueva etapa. En medio de la pérdida, sin taller, sin recursos, pero con más fuerza que nunca, nos volcamos al diseño y desarrollo de un producto que marcaría nuestro rumbo. Diseñamos y fabricamos los primeros cartuchos de larga duración para orinales ecológicos, apostando por la sostenibilidad como nuevo norte. Así nació una nueva etapa, con la sostenibilidad como guía y la resiliencia como motor.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="flex items-start space-x-6"
              >
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-neue font-bold text-white">2013</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-neue font-bold text-white mb-3">Innovar con conciencia</h3>
                  <p className="text-white/90 font-nexa text-lg leading-relaxed mb-3">
                    <strong>2013 – 2015</strong>
                  </p>
                  <p className="text-white/90 font-nexa text-lg leading-relaxed">
                    Inspirados por el impacto positivo del ahorro de agua, comenzamos a crear grifos con sensor, pensados para equilibrar tecnología, diseño y eficiencia hídrica. Empezamos a exportar a Costa Rica y Ecuador. En cada producto buscamos algo más que funcionalidad: buscamos propósito e impacto.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="flex items-start space-x-6"
              >
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-neue font-bold text-white">Hoy</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-neue font-bold text-white mb-3">Seguimos soñando en verde</h3>
                  <p className="text-white/90 font-nexa text-lg leading-relaxed">
                    Hoy, desde Colombia, seguimos imaginando soluciones que transforman espacios esenciales en experiencias más humanas y responsables. Con presencia a nivel nacional e internacional, creemos que el cambio empieza en lo invisible… y se instala gota a gota. <em><strong>Seguimos caminando. Porque lo esencial, también transforma.</strong></em>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-neue font-bold text-primary mb-6">
              ¿Listo para Innovar?
            </h2>
            <p className="text-xl text-gray-600 font-nexa mb-8 leading-relaxed">
              Únete a los cientos de clientes que ya han transformado sus espacios 
              con nuestras soluciones inteligentes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contacto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-accent hover:bg-accent-600 text-white px-8 py-4 rounded-full font-nexa font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Contactar Ahora
              </motion.a>
              <motion.a
                href="/productos"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-full font-nexa font-semibold text-lg transition-all"
              >
                Ver Productos
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;