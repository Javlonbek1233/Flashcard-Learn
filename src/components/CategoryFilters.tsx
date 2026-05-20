import { Layers, Languages, Code, Atom, Globe, BookOpen } from 'lucide-react';
import { Category, Flashcard } from '../types';

interface CategoryFiltersProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  cards: Flashcard[];
}

export default function CategoryFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  cards
}: CategoryFiltersProps) {
  
  // Helper to determine counts dynamically for each category
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') {
      return cards.length;
    }
    return cards.filter(c => c.category === categoryId).length;
  };

  // Helper to get the correct icon component
  const getIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className={className} size={15} />;
      case 'Languages':
        return <Languages className={className} size={15} />;
      case 'Code':
        return <Code className={className} size={15} />;
      case 'Atom':
        return <Atom className={className} size={15} />;
      case 'Globe':
        return <Globe className={className} size={15} />;
      default:
        return <BookOpen className={className} size={15} />;
    }
  };

  // Helper colors for premium accents
  const getColorAccent = (color: string) => {
    switch (color) {
      case 'emerald':
        return 'text-emerald-500 fill-emerald-500/10 dark:text-emerald-400';
      case 'amber':
        return 'text-amber-500 fill-amber-500/10 dark:text-amber-400';
      case 'sky':
        return 'text-sky-500 fill-sky-500/10 dark:text-sky-400';
      case 'rose':
        return 'text-rose-500 fill-rose-500/10 dark:text-rose-400';
      default:
        return 'text-indigo-500 fill-indigo-500/10 dark:text-indigo-400';
    }
  };

  return (
    <div className="w-full mb-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-0.5 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          const count = getCategoryCount(category.id);
          const accentColor = getColorAccent(category.color);

          return (
            <button
              id={`cat-filter-${category.id}`}
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all duration-300 transform hover:scale-[1.02] cursor-pointer shadow-sm border ${
                isSelected
                  ? 'bg-white dark:bg-slate-900 border-indigo-500 text-indigo-600 dark:text-indigo-400 ring-2 ring-indigo-500/20 font-bold scale-[1.03]'
                  : 'bg-white/40 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800/40 text-slate-600 dark:text-slate-400 hover:bg-white/70 dark:hover:bg-slate-900/50'
              }`}
            >
              <span className={accentColor}>
                {getIcon(category.icon, "flex-shrink-0")}
              </span>
              <span>{category.name}</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                isSelected 
                  ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                  : 'bg-slate-200/50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
