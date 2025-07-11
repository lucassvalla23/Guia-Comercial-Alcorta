import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { 
  Menu, 
  X, 
  Home, 
  Map, 
  ChevronDown,
  Pill,
  Beef,
  Drumstick,
  ShoppingBasket,
  Store,
  Croissant,
  Salad,
  PawPrint,
  FlaskRound,
  Building2,
  Martini,
  Flower,
  PartyPopper,
  NotebookPen,
  Bone,
  School,
  Trophy,
  HandCoins,
  Baby,
  Scissors,
} from 'lucide-react';
import { categories } from '../data/mockData';

interface HeaderProps {
  onCategorySelect: (category: string) => void;
  onMapClick: () => void;
  onHomeClick: () => void;
  activeView: 'home' | 'map';
}

const Header: React.FC<HeaderProps> = ({ 
  onCategorySelect, 
  onMapClick, 
  onHomeClick, 
  activeView 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsCategoriesOpen(false);
  };

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const handleCategorySelect = (categoryId: string) => {
    onCategorySelect(categoryId);
    setIsCategoriesOpen(false);
    setIsMenuOpen(false);
  };

  const handleHomeClick = () => {
    onHomeClick();
    setIsMenuOpen(false);
  };

  const handleMapClick = () => {
    onMapClick();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-[#01764c] shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={handleHomeClick}>
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg mr-3 overflow-hidden">
              <img 
                src={logo} 
                alt="Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white">
                Guía Comercial Alcorta
              </h1>
              <p className="text-xs text-white/80 -mt-1">Tu pueblo conectado</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={handleHomeClick}
              className={`flex items-center px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeView === 'home'
                  ? 'text-[#c42b2a] bg-white/10 shadow-sm'
                  : 'text-white hover:text-[#c42b2a] hover:bg-white/10'
              }`}
            >
              <Home className="w-4 h-4 mr-2" />
              Inicio
            </button>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={toggleCategories}
                className="flex items-center px-3 py-2 rounded-lg font-medium text-white hover:text-[#c42b2a] hover:bg-white/10 transition-all duration-200"
              >
                Categorías
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                  isCategoriesOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {isCategoriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-y-auto z-50 max-h-[80vh] scroll-smooth">
                  {/* Header elegante */}
                  <div className="bg-[#01764c] px-6 py-3 sticky top-0 z-10">
                    <h3 className="text-white font-semibold text-base">Explorar Categorías</h3>
                    <p className="text-white/80 text-xs mt-1">Encuentra lo que buscas</p>
                  </div>
                  
                  {/* Grid de categorías */}
                  <div className="p-3">
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => {
                        const iconMap: { [key: string]: React.ComponentType<any> } = {
  Pill,
  Beef,
  Drumstick,
  ShoppingBasket,
  Store,
  Croissant,
  Salad,
  PawPrint,
  FlaskRound,
  Building2,
  Martini,
  Flower,
  PartyPopper,
  NotebookPen,
  Bone,
  School,
  Trophy,
  HandCoins,
  Baby,
  Scissors,
};

const IconComponent = iconMap[category.icon];

                        
                        return (
                          <button
                            key={category.id}
                            onClick={() => handleCategorySelect(category.id)}
                            className="group flex flex-col items-center p-3 rounded-lg border border-gray-100 hover:border-[#c42b2a]/30 hover:shadow-md transition-all duration-200 hover:bg-gradient-to-br hover:from-[#c42b2a]/5 hover:to-[#e74c3c]/5"
                          >
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-2 group-hover:from-[#c42b2a]/10 group-hover:to-[#e74c3c]/10 transition-all duration-200 shadow-sm`}>
                              {IconComponent && <IconComponent className={`w-5 h-5 ${category.color} group-hover:scale-105 transition-transform duration-200`} />}
                            </div>
                            <span className="text-xs font-medium text-gray-700 group-hover:text-[#c42b2a] text-center leading-tight">
                              {category.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Footer con acción */}
                  <div className="bg-gray-50 px-4 py-3 border-t border-gray-100 sticky bottom-0">
                    <button
                      onClick={() => {
                        onCategorySelect('');
                        setIsCategoriesOpen(false);
                      }}
                      className="w-full bg-[#c42b2a] text-white py-2.5 rounded-lg font-medium text-sm hover:bg-[#a82424] transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      Ver Todos los Negocios
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleMapClick}
              className={`flex items-center px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeView === 'map'
                  ? 'text-[#c42b2a] bg-white/10 shadow-sm'
                  : 'text-white hover:text-[#c42b2a] hover:bg-white/10'
              }`}
            >
              <Map className="w-4 h-4 mr-2" />
              Mapa
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-white hover:text-[#c42b2a] hover:bg-white/10 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-4 relative z-40">
            <div className="space-y-2">
              <button
                onClick={handleHomeClick}
                className={`w-full flex items-center px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeView === 'home'
                    ? 'text-[#c42b2a] bg-white/10'
                    : 'text-white hover:text-[#c42b2a] hover:bg-white/10'
                }`}
              >
                <Home className="w-4 h-4 mr-3" />
                Inicio
              </button>

              <div>
                <button
                  onClick={toggleCategories}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium text-white hover:text-[#c42b2a] hover:bg-white/10 transition-all duration-200"
                >
                  <span>Categorías</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    isCategoriesOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {isCategoriesOpen && (
                  <div className="mt-3 bg-white rounded-xl shadow-lg border border-gray-100 overflow-y-auto max-h-[60vh] scroll-smooth">
                    <div className="bg-[#01764c] px-4 py-3 sticky top-0 z-10">
                      <h4 className="text-white font-medium text-sm">Categorías</h4>
                    </div>
                    <div className="p-3 space-y-1">
                      {categories.map((category) => {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    Pill,
    Beef,
    Drumstick,
    ShoppingBasket,
    Store,
    Croissant,
    Salad,
    PawPrint,
    FlaskRound,
    Building2,
    Martini,
    Flower,
    PartyPopper,
    NotebookPen,
    Bone,
    School,
    Trophy,
    HandCoins,
    Baby,
    Scissors,
  };

  const IconComponent = iconMap[category.icon];

  return (
    <button
      key={category.id}
      onClick={() => handleCategorySelect(category.id)}
      className="w-full flex items-center px-3 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-[#c42b2a]/5 hover:to-[#e74c3c]/5 hover:text-[#c42b2a] rounded-lg transition-all duration-200 group"
    >
      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-gradient-to-br group-hover:from-[#c42b2a]/10 group-hover:to-[#e74c3c]/10 transition-all duration-200">
        {IconComponent && (
          <IconComponent className={`w-4 h-4 ${category.color}`} />
        )}
      </div>
      <span className="font-medium">{category.name}</span>
    </button>
  );
})}

                    </div>
                    <div className="bg-gray-50 px-3 py-3 border-t border-gray-100 sticky bottom-0">
                      <button
                        onClick={() => {
                          onCategorySelect('');
                          setIsCategoriesOpen(false);
                          setIsMenuOpen(false);
                        }}
                        className="w-full bg-[#c42b2a] text-white py-2.5 rounded-lg font-medium text-sm hover:bg-[#a82424] transition-all duration-200"
                      >
                        Ver Todos
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleMapClick}
                className={`w-full flex items-center px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeView === 'map'
                    ? 'text-[#c42b2a] bg-white/10'
                    : 'text-white hover:text-[#c42b2a] hover:bg-white/10'
                }`}
              >
                <Map className="w-4 h-4 mr-3" />
                Mapa
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for mobile categories */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden"
          onClick={() => {
            setIsMenuOpen(false);
            setIsCategoriesOpen(false);
          }}
        />
      )}
      
      {/* Overlay specifically for desktop categories dropdown */}
      {isCategoriesOpen && (
        <div 
          className="fixed inset-0 z-40 hidden md:block"
          onClick={() => setIsCategoriesOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;