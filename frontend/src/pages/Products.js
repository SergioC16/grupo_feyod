import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import { productsData } from '../data/productsData';
import DownloadButton from '../components/DownloadButton';

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Reset scroll position when category changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeCategory]);

  // Show scroll to top button - only for "Todos" category and after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldShow = activeCategory === 'Todos' && scrollY > 600;
      setShowScrollTop(shouldShow);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeCategory]);

  // Get all categories including subcategories
  const getAllCategories = () => {
    const categories = ['Todos'];
    Object.keys(productsData).forEach(category => {
      categories.push(category);
    });
    return categories;
  };

  // Get all products flattened
  const getAllProducts = () => {
    const allProducts = [];
    Object.values(productsData).forEach(categoryData => {
      if (categoryData.products) {
        allProducts.push(...categoryData.products);
      }
      if (categoryData.subcategories) {
        Object.values(categoryData.subcategories).forEach(subcategoryData => {
          allProducts.push(...subcategoryData.products);
        });
      }
    });
    return allProducts;
  };

  const categories = getAllCategories();
  const allProducts = getAllProducts();

  // Filter products based on category and search
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by category
    if (activeCategory !== 'Todos') {
      filtered = filtered.filter(product => product.category === activeCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(product => {
        const matchesName = product.name.toLowerCase().includes(searchLower);
        const matchesDescription = product.description.toLowerCase().includes(searchLower);
        const matchesKeywords = product.keywords && product.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchLower)
        );
        return matchesName || matchesDescription || matchesKeywords;
      });
    }

    return filtered;
  }, [allProducts, activeCategory, searchTerm]);

  const handleProductSelect = useCallback((product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
    setCurrentImageIndex(0);
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
    setSearchTerm('');
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  // Scroll to top function
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Regular Product Card Component
  const ProductCard = React.memo(({ product }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-96 flex flex-col">
      <div className="relative overflow-hidden flex-shrink-0">
        <img
          src={product.images ? product.images[0] : product.image}
          alt={product.name}
          className="w-full h-40 object-cover"
          loading="lazy"
        />
        {/* Show category only in "Todos" view */}
        {activeCategory === 'Todos' && (
          <div className="absolute top-3 right-3 bg-accent text-primary px-2 py-1 sm:px-3 sm:py-1 rounded-full font-nexa font-semibold text-xs sm:text-sm">
            {product.category}
          </div>
        )}
      </div>
      
      <div className="p-4 sm:p-6 relative flex-1 flex flex-col">
        <h3 className="font-neue font-bold text-lg sm:text-xl text-primary mb-2 sm:mb-3">
          {product.name}
        </h3>
        <p className="text-gray-600 font-nexa text-sm sm:text-base line-clamp-3 leading-relaxed flex-1">
          {product.description}
        </p>
        
        {/* Button container - handles both Ver Detalles and Ficha Técnica */}
        {(product.hasDetailsButton || product.hasTechnicalSheet) && (
          <div className="flex gap-2 mt-auto pt-4 mb-5 ml-5">
            {/* Ficha Técnica button */}
            {product.hasTechnicalSheet && (
              <DownloadButton
                pdfPath={product.pdf}
                fileName={`Ficha Técnica - ${product.name}.pdf`}
                buttonText="Ficha Técnica"
                variant="secondary"
                size="sm"
                className="bg-[#cc7722] hover:bg-[#c8911e] text-white font-nexa font-medium transition-colors text-xs sm:text-s py-2 px-4 rounded inline-block text-center"
                icon={false}
              />
            )}
            
            {/* Ver Detalles button */}
            {product.hasDetailsButton && (
              <button 
                onClick={() => handleProductSelect(product)}
                className={`bg-primary hover:bg-primary-600 text-white px-3 py-2 h-10 rounded-lg font-nexa font-medium transition-colors text-xs sm:text-sm ${
                  product.hasTechnicalSheet ? 'flex-1' : 'ml-auto'
                }`}
              >
                Ver Detalles
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  ));

  // Double Product Card Component
  const ProductDoubleCard = React.memo(({ product }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative col-span-1 sm:col-span-2 h-96 flex flex-col sm:flex-row">
      <div className="w-full sm:w-1/2 relative overflow-hidden">
        <img
          src={product.images ? product.images[0] : product.image}
          alt={product.name}
          className="w-full h-40 sm:h-full object-cover"
          loading="lazy"
        />
        {/* Show category only in "Todos" view */}
        {activeCategory === 'Todos' && (
          <div className="absolute top-3 right-3 bg-accent text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full font-nexa font-semibold text-xs sm:text-sm">
            {product.category}
          </div>
        )}
      </div>
      
      <div className="w-full sm:w-1/2 p-4 sm:p-8 relative flex-1 flex flex-col">
        <h3 className="font-neue font-bold text-xl sm:text-2xl text-primary mb-3 sm:mb-4">
          {product.name}
        </h3>
        <p className="text-gray-600 font-nexa text-sm sm:text-lg leading-relaxed mb-4 flex-1">
          {product.description}
        </p>
        
        {/* Variants for cartridge products */}
        {product.variants && (
          <div className="mb-4">
            <h4 className="font-nexa font-semibold text-primary mb-2 text-sm sm:text-base">Variantes disponibles:</h4>
            <ul className="space-y-1">
              {product.variants.map((variant) => (
                <li key={variant} className="text-gray-600 font-nexa text-xs sm:text-sm">• {variant}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Buttons */}
        {(product.hasDetailsButton || product.hasTechnicalSheet) && (
          <div className="flex gap-2 mt-auto pt-4 mb-5 ml-5">
            {product.hasTechnicalSheet && (
              <DownloadButton
                 pdfPath={product.pdf}
                 fileName={`Ficha Técnica - ${product.name}.pdf`}
                 buttonText="Ficha Técnica"
                 variant="secondary"
                 size="sm"
                 className="!bg-[#cc7722] hover:bg-[#c8911e] text-white font-bold py-2 px-4 rounded inline-block text-center"
                 icon={false}
              />
            )}
            {product.hasDetailsButton && (
              <button 
                onClick={() => handleProductSelect(product)}
                className={`bg-primary hover:bg-primary-600 text-white px-4 py-2 h-11 rounded-lg font-nexa font-medium transition-colors text-xs sm:text-sm ${
                  product.hasTechnicalSheet ? 'flex-1' : 'ml-auto'
                }`}
              >
                Ver Detalles
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  ));

  // ---------- MEDIA (images + video(s)) FOR MODAL ----------
const media = useMemo(() => {
  if (!selectedProduct) return [];

  // Imágenes
  const imgs = (selectedProduct.images || []).map((src) => ({
    type: 'image',
    src,
  }));

  // Videos: soporta ambos esquemas
  const vids =
    (selectedProduct.videos?.map((v) => ({
      type: 'video',
      src: v.src,
      poster: v.poster || (selectedProduct.images?.[0] ?? undefined),
    }))) ||
    (selectedProduct.video
      ? [{
          type: 'video',
          src: selectedProduct.video,
          poster: selectedProduct.videoPoster || (selectedProduct.images?.[0] ?? undefined),
        }]
      : []);

  // Orden: primero TODAS las imágenes, después los videos
  return [...imgs, ...vids];
}, [selectedProduct]);


  // Auto-slide for modal: image -> auto advance; video -> wait for onEnded
  useEffect(() => {
    if (!selectedProduct || media.length <= 1) return;
    const current = media[currentImageIndex];
    if (current?.type === 'video') return; // video controls its own advance
    const t = setTimeout(() => {
      setCurrentImageIndex(prev => (prev + 1) % media.length);
    }, 5000);
    return () => clearTimeout(t);
  }, [selectedProduct, media, currentImageIndex]);

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
              Nuestros <span className="text-accent">Productos</span>
            </h1>
            <p className="font-nexa text-xl md:text-2xl text-gray-100 leading-relaxed">
              Descubre nuestra línea completa de soluciones sanitarias inteligentes, 
              diseñadas para transformar cualquier espacio con tecnología de vanguardia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter and Search Bar */}
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-8">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 sm:gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-3 py-2 sm:px-6 sm:py-3 rounded-full font-nexa font-medium transition-all duration-300 text-sm sm:text-base ${
                    activeCategory === category
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-primary hover:bg-primary/10 shadow-md'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Bar with Clear Button */}
            <div className="relative w-full xl:w-96 flex items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Buscar productos..."
                  className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors font-nexa text-sm sm:text-base"
                />
              </div>
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="ml-2 w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Limpiar búsqueda"
                >
                  <X size={16} className="text-gray-600 sm:hidden" />
                  <X size={20} className="text-gray-600 hidden sm:block" />
                </button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product, i) => (
              <React.Fragment key={product.id || product.name || `p-${i}`}>
                {product.isDoubleCard ? (
                  <ProductDoubleCard product={product} />
                ) : (
                  <ProductCard product={product} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* No Results Message */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-neue font-bold text-gray-600 mb-2">
                No se encontraron productos
              </h3>
              <p className="text-gray-500 font-nexa">
                Intenta ajustar los filtros o buscar con otros términos.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-48 right-7 z-50 bg-white/80 backdrop-blur-md hover:bg-white/95 text-primary p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Product Modal with Image/Video Carousel */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={handleCloseModal}
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
                  {selectedProduct.name}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>

              {/* Image/Video Carousel */}
              <div className="relative">
                <div className="aspect-video overflow-hidden">
                  {media.length > 0 && (
                    media[currentImageIndex].type === 'image' ? (
                      <motion.img
                        key={`img-${currentImageIndex}`}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        src={media[currentImageIndex].src}
                        alt={`${selectedProduct.name} ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <motion.div
                        key={`vid-${currentImageIndex}`}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full h-full"
                      >
                        <video
                          src={media[currentImageIndex].src}
                          poster={media[currentImageIndex].poster}
                          className="w-full h-full object-cover"
                          autoPlay
                          muted
                          controls
                          playsInline
                          onEnded={() =>
                            setCurrentImageIndex(prev => (prev + 1) % media.length)
                          }
                        />
                      </motion.div>
                    )
                  )}
                </div>
                
                {/* Navigation Buttons */}
                {media.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => 
                        prev === 0 ? media.length - 1 : prev - 1
                      )}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                    >
                      <ChevronLeft size={24} className="text-primary" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => 
                        (prev + 1) % media.length
                      )}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                    >
                      <ChevronRight size={24} className="text-primary" />
                    </button>
                  </>
                )}

                {/* Indicators */}
                {media.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {media.map((_, index) => (
                      <button
                        key={`dot-${index}`}
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

              {/* Product Details */}
              <div className="p-6">
                <div className="mb-6">
                  <span className="bg-accent text-primary px-4 py-2 rounded-full font-nexa font-semibold text-sm mb-4 inline-block">
                    {selectedProduct.category}
                  </span>
                  <p className="text-xl text-gray-600 font-nexa leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                {selectedProduct.variants && (
                  <div className="mb-6">
                    <h3 className="font-neue font-bold text-lg text-primary mb-3">
                      Variantes Disponibles
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedProduct.variants.map((variant) => (
                        <div key={variant} className="bg-gray-50 p-3 rounded-lg">
                          <span className="text-gray-700 font-nexa">• {variant}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
