import React from 'react';
import { 
  Pill, Beef, Drumstick, ShoppingBasket, Store, Croissant, 
  Salad, PawPrint, FlaskRound, Building2, Martini, 
  Flower, PartyPopper, NotebookPen, Bone, School, 
  Trophy, HandCoins, Baby, Scissors,
} from 'lucide-react';
import { categories } from '../data/mockData';

interface CategoryGridProps {
  onCategorySelect: (category: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategorySelect }) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
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

  return (
    <div>
      <h2 className="text-xl font-bold bg-gradient-to-r from-[#01764c] to-[#019b6d] bg-clip-text text-transparent mb-6">
        Explorar por Categorías
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => {
          const IconComponent = iconMap[category.icon];
          if (!IconComponent) return null;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className="flex flex-col items-center p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[#01764c]/30 hover:shadow-lg hover:bg-white transition-all duration-200 group hover:border-[#01764c]/50 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-[#01764c]/10 to-[#019b6d]/10 flex items-center justify-center mb-3 group-hover:from-[#01764c]/20 group-hover:to-[#019b6d]/20 transition-all duration-200 shadow-md`}>
                <IconComponent className={`w-6 h-6 ${category.color}`} />
              </div>
              <span className="text-sm font-medium text-[#01764c] text-center group-hover:text-[#016043]">
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