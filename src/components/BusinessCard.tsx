import React, { useState } from 'react';
import { Clock, Phone, MapPin, Star, Eye } from 'lucide-react';
import { Business } from '../types';
import { categories } from '../data/mockData';

interface BusinessCardProps {
  business: Business;
  onViewDetails: (business: Business) => void;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business, onViewDetails }) => {
  const category = categories.find(cat => cat.id === business.category);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVertical, setIsVertical] = useState(false);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    setImageLoaded(true);
    setIsVertical(img.naturalHeight > img.naturalWidth);
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-sm border border-primary-100/50 hover:shadow-lg hover:border-primary-200 transition-all duration-200 hover:-translate-y-1 h-full flex flex-col">
      <div className="relative flex-grow">
        {/* Contenedor de imagen rediseñado */}
        <div className={`w-full ${isVertical ? 'h-72' : 'h-56'} flex items-center justify-center bg-gray-100 overflow-hidden rounded-t-xl`}>
          {!imageLoaded && (
            <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="text-gray-400">Cargando imagen...</div>
            </div>
          )}
          <img
            src={business.image}
            alt={business.name}
            className={`${isVertical ? 'h-full w-auto' : 'w-full h-auto'} max-w-full max-h-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={handleImageLoad}
            loading="lazy"
            style={{
              maxWidth: 'calc(100% - 20px)',
              maxHeight: 'calc(100% - 20px)'
            }}
          />
        </div>

        {business.featured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg border-2 border-white">
            <Star className="w-3 h-3 inline mr-1 fill-current" />
            Destacado
          </div>
        )}
        <div className="absolute top-3 right-3 max-w-[calc(100%-6rem)]">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            business.isOpen 
              ? 'bg-green-500/90 text-white backdrop-blur-sm' 
              : 'bg-red-500/90 text-white backdrop-blur-sm'
          }`}>
            <div className={`w-2 h-2 rounded-full mr-1 ${
              business.isOpen ? 'bg-white' : 'bg-white'
            }`} />
            {business.isOpen ? 'Abierto' : 'Cerrado'}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {business.name}
          </h3>
          {category && (
            <span className={`text-sm font-medium ${category.color}`}>
              {category.name}
            </span>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
          {business.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="line-clamp-1">{business.address}</span>
          </div>
          
          {business.phone && (
            <div className="flex items-center text-gray-500 text-sm">
              <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{business.phone}</span>
            </div>
          )}
          
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>
              {business.hours.monday.morning !== 'Cerrado' 
                ? `Lun-Vie ${business.hours.monday.morning} / ${business.hours.monday.afternoon}` 
                : 'Cerrado'}
            </span>
          </div>
        </div>
        
        <button
          onClick={() => onViewDetails(business)}
          className="w-full bg-[#00764c] text-white py-3 rounded-xl font-medium hover:bg-[#005c3a] transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <Eye className="w-4 h-4 mr-2" />
          Ver Detalles
        </button>
      </div>
    </div>
  );
};

export default BusinessCard;