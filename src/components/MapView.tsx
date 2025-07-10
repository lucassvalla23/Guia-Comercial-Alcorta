import React from 'react';
import { MapPin, ArrowLeft } from 'lucide-react';
import { Business } from '../types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Solución para los iconos faltantes de Leaflet
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapViewProps {
  businesses: Business[];
  onBackToHome: () => void;
  onBusinessSelect: (business: Business) => void;
}

const MapView: React.FC<MapViewProps> = ({ businesses, onBackToHome, onBusinessSelect }) => {
  // Coordenadas del centro de tu pueblo - REEMPLAZA CON LAS DE TU PUEBLO
  const townCenter: [number, number] = [-33.538978271800715, -61.123878894153336];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onBackToHome}
              className="flex items-center text-gray-600 hover:text-primary-600 transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver al Inicio
            </button>
            <h1 className="text-xl font-bold text-gray-900">Mapa de Negocios</h1>
          </div>
          <p className="text-sm text-gray-500">
            {businesses.length} negocios encontrados
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Mapa - Columna principal */}
          <div className="lg:col-span-2 h-96 relative z-0"> {/* z-0 para problemas de superposición */}
            <MapContainer
              center={townCenter}
              zoom={14}
              style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {businesses.map((business) => (
                <Marker
                  key={business.id}
                  position={[business.coordinates.lat, business.coordinates.lng]}
                  icon={customIcon}
                  eventHandlers={{
                    click: () => onBusinessSelect(business),
                  }}
                >
                  <Popup className="leaflet-popup-content-wrapper">
                    <div className="leaflet-popup-content">
                      <h3 className="font-bold text-base mb-1">{business.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{business.address}</p>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        business.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {business.isOpen ? 'Abierto' : 'Cerrado'}
                      </span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Lista de negocios - Columna lateral */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Lista de Negocios</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {businesses.map((business) => (
                <div
                  key={business.id}
                  onClick={() => onBusinessSelect(business)}
                  className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {business.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {business.address}
                      </p>
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          business.isOpen 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          <div className={`w-2 h-2 rounded-full mr-1 ${
                            business.isOpen ? 'bg-green-500' : 'bg-red-500'
                          }`} />
                          {business.isOpen ? 'Abierto' : 'Cerrado'}
                        </span>
                      </div>
                    </div>
                    <MapPin className="w-5 h-5 text-gray-400 ml-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;