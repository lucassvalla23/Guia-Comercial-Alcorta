import React from 'react';
import { Search, Filter } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  showOpenOnly: boolean;
  onToggleOpenOnly: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  showOpenOnly,
  onToggleOpenOnly,
}) => {
  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar negocios por nombre o categoría..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 shadow-sm"
          />
        </div>
        
        <button
          onClick={onToggleOpenOnly}
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
            showOpenOnly
              ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
              : 'bg-white/90 text-gray-700 border border-primary-200 hover:bg-primary-50'
          }`}
        >
          <Filter className="w-4 h-4 mr-2" />
          {showOpenOnly ? 'Solo Abiertos' : 'Todos'}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;