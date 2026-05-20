import { Sun, Moon, Search, Star, Sparkles, BookOpen, Plus, Zap } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (show: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  activeTab: 'deck' | 'study';
  setActiveTab: (tab: 'deck' | 'study') => void;
  onOpenAddModal: () => void;
  totalCardsCount: number;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  showFavoritesOnly,
  setShowFavoritesOnly,
  isDarkMode,
  setIsDarkMode,
  activeTab,
  setActiveTab,
  onOpenAddModal,
  totalCardsCount
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/20 dark:border-slate-800/40 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Logo and App Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30 animate-pulse text-white">
              <BookOpen size={20} />
              <div className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </div>
            </div>
            <div>
              <h1 id="app-title-header" className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-indigo-950 dark:from-white dark:to-indigo-200 bg-clip-text text-transparent">
                Flashcard Learn
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Muvaffaqiyatli ilm sari qadam
              </p>
            </div>
          </div>

          {/* Quick Stats on Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              id="theme-toggle-mobile"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200/55 dark:hover:bg-slate-800/55 transition-colors"
              title="Mavzuni o'zgartirish"
            >
              {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {/* Dynamic Navigation Tabs & Addition Button */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          <button
            id="tab-deck-btn"
            onClick={() => setActiveTab('deck')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'deck'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/30 dark:hover:bg-slate-800/30'
            }`}
          >
            <Sparkles size={16} />
            Mening Kartalarim ({totalCardsCount})
          </button>
          
          <button
            id="tab-study-btn"
            onClick={() => setActiveTab('study')}
            disabled={totalCardsCount === 0}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
              totalCardsCount === 0 ? 'opacity-55 cursor-not-allowed' : ''
            } ${
              activeTab === 'study'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/30 dark:hover:bg-slate-800/30'
            }`}
          >
            <Zap size={16} />
            Faol O'rganish (Study)
          </button>

          <button
            id="add-card-header-btn"
            onClick={onOpenAddModal}
            className="ml-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/25 cursor-pointer whitespace-nowrap"
          >
            <Plus size={14} />
            Karta Qo'shish
          </button>
        </div>

        {/* Global Controls: Search & Favorites Toggle */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={16} />
            <input
              id="global-search-input"
              type="text"
              placeholder="Savol yoki javobdan qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/40 text-slate-950 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
            />
          </div>

          {/* Favorites Star Toggle */}
          <button
            id="favorites-filter-btn"
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
              showFavoritesOnly
                ? 'bg-amber-500/15 border-amber-500 text-amber-500 font-semibold'
                : 'bg-white/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/50 text-slate-500 dark:text-slate-400'
            }`}
            title="Faqat sevimlilarni ko'rsatish"
          >
            <Star size={16} fill={showFavoritesOnly ? 'currentColor' : 'none'} />
            <span className="text-xs hidden lg:inline">Sevimlilar</span>
          </button>

          {/* Desktop Theme Switcher */}
          <button
            id="theme-toggle-desktop"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 rounded-xl bg-white/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors hidden md:flex items-center justify-center"
            title="Mavzuni o'zgartirish"
          >
            {isDarkMode ? <Sun size={16} className="text-amber-400 animate-spin-slow" /> : <Moon size={16} />}
          </button>
        </div>

      </div>
    </header>
  );
}
