import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BusinessCard from './components/BusinessCard';
import BusinessModal from './components/BusinessModal';
import MapView from './components/MapView';
import CategoryGrid from './components/CategoryGrid';
import Footer from './components/Footer';
import { Star, MapPin, ShoppingBag } from 'lucide-react';
import { Business } from './types';
import { businesses as initialBusinesses, categories } from './data/mockData';
import { bannerImages } from './data/bannerImages';
import { checkBusinessHours } from './utils/hoursHelper';
import { getCurrentPharmacy, getPharmacySchedule } from './utils/pharmacyHelper';
import { PharmacySchedule } from './components/PharmacySchedule';

function App() {
  const [businesses, setBusinesses] = useState<Business[]>(() => {
    return initialBusinesses.map(business => ({
      ...business,
      isOpen: checkBusinessHours(business.hours)
    }));
  });
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showOpenOnly, setShowOpenOnly] = useState(false);
  const [activeView, setActiveView] = useState<'home' | 'map'>('home');
  const [updateTime, setUpdateTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setBusinesses(prevBusinesses => 
        prevBusinesses.map(business => ({
          ...business,
          isOpen: checkBusinessHours(business.hours)
        }))
      );
      setUpdateTime(Date.now());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const filteredBusinesses = useMemo(() => {
    return businesses.filter(business => {
      const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           categories.find(cat => cat.id === business.category)?.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === '' || business.category === selectedCategory;
      const matchesOpenStatus = !showOpenOnly || business.isOpen;
      
      return matchesSearch && matchesCategory && matchesOpenStatus;
    });
  }, [businesses, searchTerm, selectedCategory, showOpenOnly, updateTime]);

  const featuredBusinesses = useMemo(() => {
    return filteredBusinesses.filter(business => business.featured);
  }, [filteredBusinesses]);

  const currentPharmacy = useMemo(() => getCurrentPharmacy(businesses), [businesses, updateTime]);
  const pharmacySchedule = useMemo(() => 
    getPharmacySchedule(businesses.filter(b => b.isPharmacy)), 
    [businesses]
  );

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
        {/* Banner */}
        <div className="relative mb-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#01764c] to-[#00a372]">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWRhc2hhcnJheT0iNSw1IiBvcGFjaXR5PSIwLjEiLz4KPC9zdmc+')]"></div>
            </div>
          </div>

          <div className="relative z-10 py-16 px-8 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
                <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4">
                  👋 Bienvenidos a
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  <span className="block mb-2">Guía Comercial</span>
                  <span className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#c4fcef]">
                    Alcorta
                  </span>
                </h1>
                
                <p className="text-xl text-white/90 max-w-2xl">
                  Tu directorio local de comercios y servicios. Encuentra lo mejor de nuestra comunidad.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button 
                    onClick={() => {
                      setActiveView('home');
                      clearFilters();
                      scrollToBusinesses();
                    }}
                    className="px-6 py-3 bg-white text-[#01764c] font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Explorar Negocios
                  </button>
                  <button 
                    onClick={() => setActiveView('map')}
                    className="px-6 py-3 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white/10 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
                  >
                    <MapPin className="w-5 h-5" />
                    Ver en Mapa
                  </button>
                </div>
              </div>

              <div className="lg:w-1/2 relative">
                <div className="grid grid-cols-3 gap-2 rounded-xl overflow-hidden shadow-lg">
                  {bannerImages.map((img) => (
                    <div 
                      key={img.id}
                      className="aspect-square overflow-hidden hover:scale-105 transition-transform duration-300"
                    >
                      <img
                        src={img.image}
                        alt={img.alt}
                        className="w-full h-full object-cover hover:brightness-110 transition-all"
                      />
                    </div>
                  ))}
                </div>
                
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#c42b2a]/80 rounded-full mix-blend-multiply filter blur-xl z-[-1]"></div>
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#00c9a7]/70 rounded-full mix-blend-multiply filter blur-xl z-[-1]"></div>
              </div>
            </div>

            {/* Sección de Farmacia de Turno */}
            {currentPharmacy && (
              <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-[#c42b2a]/30">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
  <h3 className="text-lg font-bold text-[#c42b2a] flex items-center">
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
    Farmacia de turno hoy
  </h3>
  <p className="text-gray-800">
    {currentPharmacy.name} - {currentPharmacy.address}
  </p>
  <p className="text-sm text-gray-600 mt-1">
    Horario: {currentPharmacy.hours.monday.morning} a {currentPharmacy.hours.monday.afternoon} {/* Ejemplo para lunes */}
  </p>
  {currentPharmacy.emergencyPhone && (
    <p className="text-sm text-[#c42b2a] mt-1">
      <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      Urgencias: {currentPharmacy.emergencyPhone}
    </p>
  )}
</div>
<button
  onClick={() => setSelectedBusiness(currentPharmacy)}
  className="px-4 py-2 bg-[#c42b2a] text-white rounded-lg hover:bg-[#a82424] transition-colors duration-200 flex items-center"
>
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  Ver detalles
</button>
                </div>
              </div>
            )}

            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <span>{businesses.length}+ Negocios</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                <span>{categories.length} Categorías</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                <span>Actualizado diariamente</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"></div>
        </div>

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
          <div className="mb-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#01764c]/20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
                  <span className="bg-gradient-to-r from-[#01764c] to-[#019b6d] bg-clip-text text-transparent">
                    <Star className="inline-block w-6 h-6 mr-3 -mt-1 text-[#01764c]" />
                    Negocios Destacados
                  </span>
                </h2>
                <span className="text-sm bg-[#01764c]/10 text-[#01764c] px-3 py-1 rounded-full">
                  {featuredBusinesses.length} destacados
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredBusinesses.map((business) => (
                  <BusinessCard
                    key={business.id}
                    business={business}
                    onViewDetails={setSelectedBusiness}
                  />
                ))}
              </div>
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
            <div className="text-center py-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200">
              <div className="max-w-md mx-auto">
                <svg 
                  className="w-16 h-16 mx-auto text-[#01764c]/50 mb-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-medium text-gray-800 mb-2">No se encontraron resultados</h3>
                <p className="text-gray-600 mb-6">Prueba ajustando tus filtros de búsqueda</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-[#01764c] text-white rounded-lg hover:bg-[#016043] transition-colors duration-200 inline-flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Limpiar todos los filtros
                </button>
              </div>
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

        {/* Sección de Horario de Farmacias */}
        <PharmacySchedule schedule={pharmacySchedule} />
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