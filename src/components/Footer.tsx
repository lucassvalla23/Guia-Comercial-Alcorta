import React from 'react';
import { MapPin, Heart, Mail, Phone } from 'lucide-react';
import logo from '../assets/logo.png'; // Asegúrate de que la ruta sea correcta

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#01764c] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo y descripción - Actualizado para coincidir con el header */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg mr-3 overflow-hidden">
                <img 
                  src={logo} 
                  alt="Logo Guía Comercial Alcorta" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-3">
                <h3 className="text-xl font-bold">Guía Comercial Alcorta</h3>
                <p className="text-white/80 text-sm">Tu pueblo conectado</p>
              </div>
            </div>
            <p className="text-white/90 mb-4 max-w-md">
              Descubre y apoya los emprendimientos locales de tu pueblo. 
              Conectamos a la comunidad con los negocios que hacen único a nuestro lugar.
            </p>
            <div className="flex items-center text-white/90">
              <Heart className="w-4 h-4 mr-2 text-[#c42b2a]" />
              <span className="text-sm">Hecho con amor para nuestra comunidad</span>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/90 hover:text-[#c42b2a] transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-[#c42b2a] transition-colors">
                  Todos los Negocios
                </a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-[#c42b2a] transition-colors">
                  Mapa Interactivo
                </a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-[#c42b2a] transition-colors">
                  Categorías
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center text-white/90">
                <Mail className="w-4 h-4 mr-3 text-white/70" />
                <a href="mailto:guiacomercialalcorta@gmail.com" className="hover:text-[#c42b2a] transition-colors">
                  guiacomercialalcorta@gmail.com
                </a>
              </div>
              <div className="flex items-center text-white/90">
                <Phone className="w-4 h-4 mr-3 text-white/70" />
                <a href="tel:+543465661969" className="hover:text-[#c42b2a] transition-colors">
                  +54 9 3465 66-1969
                </a>
              </div>
              <div className="flex items-center text-white/90">
                <MapPin className="w-4 h-4 mr-3 text-white/70" />
                <span>Alcorta Santa Fe, Argentina</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/80 text-sm">
            © {currentYear} Guía Comercial Alcorta. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-white/80 hover:text-[#c42b2a] text-sm transition-colors">
              Términos de Uso
            </a>
            <a href="#" className="text-white/80 hover:text-[#c42b2a] text-sm transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-white/80 hover:text-[#c42b2a] text-sm transition-colors">
              Ayuda
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;