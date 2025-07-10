import React from 'react';
import { Clock, Phone, MapPin, Star, Eye } from 'lucide-react';
import { Business } from '../types';
import { categories } from '../data/mockData';

interface BusinessCardProps {
  business: Business;
  onViewDetails: (business: Business) => void;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business, onViewDetails }) => {
  const category = categories.find(cat => cat.id === business.category);
  
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-sm border border-primary-100/50 hover:shadow-lg hover:border-primary-200 transition-all duration-200 hover:-translate-y-1">
      <div className="relative">
        <img
          src={business.image}
          alt={business.name}
          className="w-full h-48 object-cover rounded-t-xl"
        />
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
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {business.name}
          </h3>
          {category && (
            <span className={`text-sm font-medium ${category.color}`}>
              {category.icon}
            </span>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
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
              {business.hours.monday ? 'Lun-Vie ' + business.hours.monday : 'Horarios variables'}
            </span>
          </div>
        </div>
        
        <button
          onClick={() => onViewDetails(business)}
          className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 rounded-xl font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <Eye className="w-4 h-4 mr-2" />
          Ver Detalles
        </button>
      </div>
    </div>
  );
};

export default BusinessCard;