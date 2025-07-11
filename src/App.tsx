import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BusinessCard from './components/BusinessCard';
import BusinessModal from './components/BusinessModal';
import MapView from './components/MapView';
import CategoryGrid from './components/CategoryGrid';
import Footer from './components/Footer';
import { Star, MapPin, Heart, ShoppingBag, Coffee, Utensils } from 'lucide-react';
import { Business } from './types';
import { businesses as initialBusinesses, categories } from './data/mockData';

function App() {
  const [businesses] = useState<Business[]>(initialBusinesses);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showOpenOnly, setShowOpenOnly] = useState(false);
  const [activeView, setActiveView] = useState<'home' | 'map'>('home');

  const filteredBusinesses = useMemo(() => {
    return businesses.filter(business => {
      const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           categories.find(cat => cat.id === business.category)?.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === '' || business.category === selectedCategory;
      const matchesOpenStatus = !showOpenOnly || business.isOpen;
      
      return matchesSearch && matchesCategory && matchesOpenStatus;
    });
  }, [businesses, searchTerm, selectedCategory, showOpenOnly]);

  const featuredBusinesses = useMemo(() => {
    return filteredBusinesses.filter(business => business.featured);
  }, [filteredBusinesses]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setActiveView('home');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setShowOpenOnly(false);
  };

  const scrollToBusinesses = () => {
    const businessesSection = document.getElementById('negocios');
    if (businessesSection) {
      businessesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (activeView === 'map') {
    return (
      <>
        <Header
          onCategorySelect={handleCategorySelect}
          onMapClick={() => setActiveView('map')}
          onHomeClick={() => setActiveView('home')}
          activeView={activeView}
        />
        <MapView
          businesses={filteredBusinesses}
          onBackToHome={() => setActiveView('home')}
          onBusinessSelect={setSelectedBusiness}
        />
        {selectedBusiness && (
          <BusinessModal
            business={selectedBusiness}
            onClose={() => setSelectedBusiness(null)}
          />
        )}
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#01764c]/10 via-white to-[#019b6d]/10 flex flex-col">
      <Header
        onCategorySelect={handleCategorySelect}
        onMapClick={() => setActiveView('map')}
        onHomeClick={() => setActiveView('home')}
        activeView={activeView}
      />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Nuevo Hero Section mejorado */}
        <div className="relative mb-12 rounded-3xl overflow-hidden shadow-2xl bg-[#01764c]">
          {/* Patrón de fondo abstracto */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#c42b2a] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#019b6d] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          </div>
          
          {/* Contenido */}
          <div className="relative z-10 text-center py-16 px-8">
            {/* Iconos decorativos flotantes */}
            <div className="absolute top-8 left-8 animate-float">
              <ShoppingBag className="w-12 h-12 text-white/20" />
            </div>
            <div className="absolute bottom-8 right-8 animate-float-delay">
              <Coffee className="w-12 h-12 text-white/20" />
            </div>
            <div className="absolute top-1/4 right-1/4 animate-float-delay-2">
              <Utensils className="w-10 h-10 text-white/20" />
            </div>
            <div className="absolute bottom-1/3 left-1/3 animate-float-delay-3">
              <Heart className="w-8 h-8 text-white/20" />
            </div>
            
            {/* Contenido principal */}
            <div className="max-w-4xl mx-auto relative z-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 shadow-lg mx-auto">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="block mb-4">Bienvenidos a</span>
                <span className="block text-5xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#c42b2a]/80">
                  Guía Comercial Alcorta
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
                Descubre los mejores comercios, servicios y profesionales de nuestra localidad. 
                <span className="block mt-2 font-medium text-white">¡Apoya lo local y fortalece nuestra comunidad!</span>
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 mb-8">
                <div className="text-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                  <div className="text-3xl font-bold text-white mb-1">{businesses.length}+</div>
                  <div className="text-white/80 text-sm">Negocios</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                  <div className="text-3xl font-bold text-white mb-1">{categories.length}</div>
                  <div className="text-white/80 text-sm">Categorías</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                  <div className="text-3xl font-bold text-white mb-1">{featuredBusinesses.length}</div>
                  <div className="text-white/80 text-sm">Destacados</div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => {
                    setActiveView('home');
                    clearFilters();
                    scrollToBusinesses();
                  }}
                  className="px-8 py-4 bg-white text-[#01764c] font-semibold rounded-xl hover:bg-gray-50 hover:text-[#016043] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Explorar Negocios
                </button>
                <button 
                  onClick={() => setActiveView('map')}
                  className="px-8 py-4 bg-[#c42b2a] text-white font-semibold rounded-xl border-2 border-[#c42b2a] hover:bg-[#a82424] hover:border-[#a82424] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <MapPin className="w-5 h-5" />
                  Ver en Mapa
                </button>
              </div>
            </div>
          </div>
          
          {/* Onda decorativa inferior */}
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="white"></path>
              <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="white"></path>
              <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="white"></path>
            </svg>
          </div>
        </div>

        {/* Resto del código permanece igual */}
        <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-sm border border-[#01764c]/30">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            showOpenOnly={showOpenOnly}
            onToggleOpenOnly={() => setShowOpenOnly(!showOpenOnly)}
          />
        </div>

        {(selectedCategory || searchTerm || showOpenOnly) && (
          <div className="mb-6 flex flex-wrap items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-[#01764c]/30">
            <span className="text-sm text-[#01764c]">Filtros activos:</span>
            {selectedCategory && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#01764c]/10 text-[#01764c]">
                {categories.find(cat => cat.id === selectedCategory)?.name}
                <button
                  onClick={() => setSelectedCategory('')}
                  className="ml-2 hover:text-[#016043]"
                >
                  ×
                </button>
              </span>
            )}
            {searchTerm && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#c42b2a]/10 text-[#c42b2a]">
                "{searchTerm}"
                <button
                  onClick={() => setSearchTerm('')}
                  className="ml-2 hover:text-[#a82424]"
                >
                  ×
                </button>
              </span>
            )}
            {showOpenOnly && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#019b6d]/10 text-[#01764c]">
                Solo abiertos
                <button
                  onClick={() => setShowOpenOnly(false)}
                  className="ml-2 hover:text-[#016043]"
                >
                  ×
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-sm text-[#01764c] hover:text-[#016043] underline"
            >
              Limpiar todos
            </button>
          </div>
        )}

        {!selectedCategory && !searchTerm && (
          <div className="mb-12 bg-gradient-to-r from-[#01764c]/10 to-[#019b6d]/10 rounded-2xl p-6 shadow-sm border border-[#01764c]/30">
            <CategoryGrid onCategorySelect={handleCategorySelect} />
          </div>
        )}

        {featuredBusinesses.length > 0 && !selectedCategory && !searchTerm && (
          <div className="mb-12 bg-gradient-to-br from-[#01764c]/10 to-[#019b6d]/10 rounded-2xl p-8 shadow-sm border border-[#01764c]/30">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#01764c] to-[#019b6d] bg-clip-text text-transparent mb-6 flex items-center">
              <Star className="w-6 h-6 mr-3 text-[#01764c]" />
              Negocios Destacados
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
              {featuredBusinesses.map((business) => (
                <BusinessCard
                  key={business.id}
                  business={business}
                  onViewDetails={setSelectedBusiness}
                />
              ))}
            </div>
          </div>
        )}

        <div id="negocios" className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-[#01764c]/30">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#01764c]">
              {selectedCategory 
                ? `${categories.find(cat => cat.id === selectedCategory)?.name || 'Categoría'}`
                : searchTerm
                ? 'Resultados de búsqueda'
                : 'Todos los Negocios'
              }
            </h2>
            <span className="text-sm text-[#01764c]/80">
              {filteredBusinesses.length} negocio{filteredBusinesses.length !== 1 ? 's' : ''} encontrado{filteredBusinesses.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          {filteredBusinesses.length === 0 ? (
            <div className="text-center py-12 bg-gradient-to-br from-[#01764c]/10 to-[#019b6d]/10 rounded-xl">
              <p className="text-[#01764c] text-lg">No se encontraron negocios con los filtros seleccionados</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-[#01764c] hover:text-[#016043] underline"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBusinesses.map((business) => (
                <BusinessCard
                  key={business.id}
                  business={business}
                  onViewDetails={setSelectedBusiness}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {selectedBusiness && (
        <BusinessModal
          business={selectedBusiness}
          onClose={() => setSelectedBusiness(null)}
        />
      )}
    </div>
  );
}

export default App;