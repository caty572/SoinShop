import React from 'react';

interface CategoryNavProps {
  activeCategory: string | null;
  onSelectCategory: (category: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const categories = [
    { id: 'visage', label: 'Visage' },
    { id: 'cheveux', label: 'Cheveux' },
    { id: 'solaire', label: 'Solaire' },
    { id: 'promotions', label: 'Promotions' },
    { id: 'coffrets', label: 'Coffrets & Cadeaux' },
    { id: 'beaute', label: 'Beauté' },
    { id: 'complements', label: 'Compléments' },
  ];

  return (
    <div className="w-full bg-[#e7f3ea] border-y border-[#d2e8d6] shadow-2xs">
      <div className="w-full max-w-[1400px] mx-auto px-2 sm:px-6">
        <nav className="flex items-stretch justify-between gap-1 sm:gap-2 py-2.5 overflow-x-auto scrollbar-none text-[13px] sm:text-[14px] font-medium tracking-wide">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`transition-all whitespace-nowrap cursor-pointer flex-1 text-center px-3 py-1 rounded-sm relative ${
                  isActive
                    ? 'text-[#0d3b14] font-bold bg-white/70 shadow-2xs'
                    : 'text-[#1e4e24] hover:text-[#0b3310] hover:bg-white/40'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
