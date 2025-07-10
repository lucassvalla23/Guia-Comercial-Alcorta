import React from 'react';
import { MapPin, Heart, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="ml-3">
                <h3 className="text-xl font-bold">Directorio Local</h3>
                <p className="text-gray-400 text-sm">Conectando emprendimientos</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Descubre y apoya los emprendimientos locales de tu pueblo. 
              Conectamos a la comunidad con los negocios que hacen único a nuestro lugar.
            </p>
            <div className="flex items-center text-gray-300">
              <Heart className="w-4 h-4 mr-2 text-red-500" />
              <span className="text-sm">Hecho con amor para nuestra comunidad</span>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Todos los Negocios
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Mapa Interactivo
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Categorías
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-3 text-gray-400" />
                <a href="mailto:info@directoriolocal.com" className="hover:text-white transition-colors">
                  info@directoriolocal.com
                </a>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-3 text-gray-400" />
                <a href="tel:+541112345678" className="hover:text-white transition-colors">
                  +54 11 1234-5678
                </a>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                <span>Tu Pueblo, Argentina</span>
              </div>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Directorio Local. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Términos de Uso
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Ayuda
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;