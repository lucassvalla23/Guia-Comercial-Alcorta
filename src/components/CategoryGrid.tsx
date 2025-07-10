import React from 'react';
import { Pill, Beef, Drumstick, ShoppingBasket, Store, Croissant, Salad, PawPrint, FlaskRound, Building2, Martini, Flower2, Baby, PartyPopper, NotebookPen, Bone, School, Trophy, HandCoins,     } from 'lucide-react';
import { categories } from '../data/mockData';

interface CategoryGridProps {
  onCategorySelect: (category: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategorySelect }) => {
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
    Flower2,
    Baby,
    PartyPopper,
    NotebookPen,
    Bone,
    School,
    Trophy,
    HandCoins,
  };

  return (
    <div>
      <h2 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent mb-6">Explorar por Categorías</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => {
          const IconComponent = iconMap[category.icon];
          return (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className="flex flex-col items-center p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-primary-100/50 hover:shadow-lg hover:bg-white transition-all duration-200 group hover:border-primary-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center mb-3 group-hover:from-primary-200 group-hover:to-accent-200 transition-all duration-200 shadow-md`}>
                <IconComponent className={`w-6 h-6 ${category.color}`} />
              </div>
              <span className="text-sm font-medium text-gray-900 text-center">
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGrid;