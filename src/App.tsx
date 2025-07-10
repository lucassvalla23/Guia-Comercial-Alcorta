import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BusinessCard from './components/BusinessCard';
import BusinessModal from './components/BusinessModal';
import MapView from './components/MapView';
import CategoryGrid from './components/CategoryGrid';
import Footer from './components/Footer';
import { Star, MapPin } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50/40 via-white to-secondary-50/30 flex flex-col">
      <Header
        onCategorySelect={handleCategorySelect}
        onMapClick={() => setActiveView('map')}
        onHomeClick={() => setActiveView('home')}
        activeView={activeView}
      />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="relative mb-12 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-red-700/90"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2523ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          
          {/* Content */}
          <div className="relative text-center py-16 px-8">
            {/* Decorative elements */}
            <div className="absolute top-8 left-8 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-8 right-8 w-32 h-32 bg-accent-400/20 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
            
            {/* Main content */}
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 shadow-lg">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Descubre los
                <span className="block bg-gradient-to-r from-green-500 to-green-500 bg-clip-text text-transparent">
                  Comercios, Servicios Y Profesionales De Nuestra Localidad
                </span>
                <span className="block text-4xl md:text-5xl"></span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
                Conecta con negocios locales, descubre nuevos servicios y 
                <span className="font-semibold text-accent-200"> apoya a tu comunidad</span>
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{businesses.length}+</div>
                  <div className="text-white/80 text-sm">Negocios</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{categories.length}</div>
                  <div className="text-white/80 text-sm">Categorías</div>
                </div>
                <div className="text-center">
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
                  className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Explorar Negocios
                </button>
                <button 
                  onClick={() => setActiveView('map')}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/20 hover:bg-white/20 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Ver en Mapa
                </button>
              </div>
            </div>
          </div>
          
          {/* Bottom wave decoration */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-8">
              <path d="M0 120L50 105C100 90 200 60 300 45C400 30 500 30 600 37.5C700 45 800 60 900 67.5C1000 75 1100 75 1150 75L1200 75V120H1150C1100 120 1000 120 900 120C800 120 700 120 600 120C500 120 400 120 300 120C200 120 100 120 50 120H0Z" fill="white" fillOpacity="0.1"/>
            </svg>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 bg-white/60 backdrop-blur-sm rounded-xl p-1 shadow-sm border border-primary-100/30">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            showOpenOnly={showOpenOnly}
            onToggleOpenOnly={() => setShowOpenOnly(!showOpenOnly)}
          />
        </div>

        {/* Active Filters */}
        {(selectedCategory || searchTerm || showOpenOnly) && (
          <div className="mb-6 flex flex-wrap items-center gap-2 bg-white/70 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-primary-100/40">
            <span className="text-sm text-gray-600">Filtros activos:</span>
            {selectedCategory && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-700">
                {categories.find(cat => cat.id === selectedCategory)?.name}
                <button
                  onClick={() => setSelectedCategory('')}
                  className="ml-2 hover:text-primary-600"
                >
                  ×
                </button>
              </span>
            )}
            {searchTerm && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-accent-100 text-accent-700">
                "{searchTerm}"
                <button
                  onClick={() => setSearchTerm('')}
                  className="ml-2 hover:text-secondary-600"
                >
                  ×
                </button>
              </span>
            )}
            {showOpenOnly && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary-100 text-secondary-700">
                Solo abiertos
                <button
                  onClick={() => setShowOpenOnly(false)}
                  className="ml-2 hover:text-primary-600"
                >
                  ×
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 underline"
            >
              Limpiar todos
            </button>
          </div>
        )}

        {/* Categories Grid */}
        {!selectedCategory && !searchTerm && (
          <div className="mb-12 bg-gradient-to-r from-primary-50/60 to-accent-50/40 rounded-2xl p-6 shadow-sm border border-primary-100/50">
            <CategoryGrid onCategorySelect={handleCategorySelect} />
          </div>
        )}

        {/* Featured Businesses */}
        {featuredBusinesses.length > 0 && !selectedCategory && !searchTerm && (
          <div className="mb-12 bg-gradient-to-br from-accent-50/40 to-primary-50/30 rounded-2xl p-8 shadow-sm border border-accent-100/50">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-accent-600 to-primary-600 bg-clip-text text-transparent mb-6 flex items-center">
              <Star className="w-6 h-6 mr-3 text-accent-500" />
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

        {/* All Businesses */}
        <div id="negocios" className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-primary-100/40">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory 
                ? `${categories.find(cat => cat.id === selectedCategory)?.name || 'Categoría'}`
                : searchTerm
                ? 'Resultados de búsqueda'
                : 'Todos los Negocios'
              }
            </h2>
            <span className="text-sm text-gray-500">
              {filteredBusinesses.length} negocio{filteredBusinesses.length !== 1 ? 's' : ''} encontrado{filteredBusinesses.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          {filteredBusinesses.length === 0 ? (
            <div className="text-center py-12 bg-gradient-to-br from-primary-50/30 to-accent-50/20 rounded-xl">
              <p className="text-gray-500 text-lg">No se encontraron negocios con los filtros seleccionados</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-primary-600 hover:text-primary-700 underline"
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

      {/* Footer */}
      <Footer />

      {/* Modals */}
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