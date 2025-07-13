import { BusinessMap } from './BusinessMap';
import React from 'react';
import { X, MapPin, Phone, Clock, Globe, MessageCircle, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import { Business } from '../types';
import { categories } from '../data/mockData';

interface BusinessModalProps {
  business: Business | null;
  onClose: () => void;
}

const BusinessModal: React.FC<BusinessModalProps> = ({ business, onClose }) => {
  if (!business) return null;

  const category = categories.find(cat => cat.id === business.category);

  const handleWhatsAppClick = () => {
    if (business.whatsapp) {
      window.open(`https://wa.me/${business.whatsapp.replace(/\D/g, '')}`, '_blank');
    }
  };

  const handleEmailClick = () => {
    if (business.email) {
      window.open(`mailto:${business.email}`, '_blank');
    }
  };

  type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

  const daysOfWeek: { key: Weekday; name: string }[] = [
    { key: 'monday', name: 'Lunes' },
    { key: 'tuesday', name: 'Martes' },
    { key: 'wednesday', name: 'Miércoles' },
    { key: 'thursday', name: 'Jueves' },
    { key: 'friday', name: 'Viernes' },
    { key: 'saturday', name: 'Sábado' },
    { key: 'sunday', name: 'Domingo' },
  ];

  const renderHoursTable = () => (
    <table className="w-full text-sm text-gray-700">
      <thead>
        <tr className="text-gray-500 border-b">
          <th className="text-left py-2 px-2">Día</th>
          <th className="py-2 px-2 text-center">Mañana</th>
          <th className="py-2 px-2 text-center">Tarde</th>
        </tr>
      </thead>
      <tbody>
        {daysOfWeek.map((day) => (
          <tr key={day.key} className="border-b">
            <td className="py-2 px-2 font-medium">{day.name}</td>
            <td className="py-2 px-2 text-center font-mono text-gray-600">
              {business.hours[day.key].morning}
            </td>
            <td className="py-2 px-2 text-center font-mono text-gray-600">
              {business.hours[day.key].afternoon}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">{business.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="relative mb-6">
            <img
              src={business.image}
              alt={business.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute top-4 right-4 max-w-[calc(100%-2rem)]">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                business.isOpen
                  ? 'bg-green-500/90 text-white backdrop-blur-sm'
                  : 'bg-red-500/90 text-white backdrop-blur-sm'
              }`}>
                <div className="w-2 h-2 rounded-full mr-2 bg-white" />
                {business.isOpen ? 'Abierto Ahora' : 'Cerrado'}
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Información principal */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  {category && (
                    <span className={`text-sm font-medium ${category.color}`}>
                      {category.name}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">{business.description}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0" />
                  <span>{business.address}</span>
                </div>

                {business.phone && (
                  <div className="flex items-center text-gray-700">
                    <Phone className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0" />
                    <a href={`tel:${business.phone}`} className="hover:text-blue-600 transition-colors">
                      {business.phone}
                    </a>
                  </div>
                )}

                {business.email && (
                  <div className="flex items-center text-gray-700">
                    <Mail className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0" />
                    <button
                      onClick={handleEmailClick}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {business.email}
                    </button>
                  </div>
                )}

                {business.website && (
                  <div className="flex items-center text-gray-700">
                    <Globe className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0" />
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 transition-colors"
                    >
                      Sitio Web
                    </a>
                  </div>
                )}
              </div>

              {/* Botones de contacto y redes sociales */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Contacto y Redes Sociales</h3>
                <div className="flex flex-wrap gap-3">
                  {business.whatsapp && (
                    <button
                      onClick={handleWhatsAppClick}
                      className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </button>
                  )}

                  {business.socialMedia?.facebook && (
                    <a
                      href={business.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <Facebook className="w-4 h-4 mr-2" />
                      Facebook
                    </a>
                  )}

                  {business.socialMedia?.instagram && (
                    <a
                      href={business.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <Instagram className="w-4 h-4 mr-2" />
                      Instagram
                    </a>
                  )}

                  {business.socialMedia?.twitter && (
                    <a
                      href={business.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar con horarios y mapa */}
            <div className="space-y-6">
              {/* Horarios */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Horarios de Atención
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
                  {renderHoursTable()}
                </div>
              </div>

              {/* Ubicación */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Ubicación
                </h3>
                <BusinessMap business={business} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessModal;
