import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, BookOpen, AlertCircle, Plus, RefreshCw, Layers } from 'lucide-react';

import { Flashcard, Category } from './types';
import { DEFAULT_CATEGORIES, DEFAULT_FLASHCARDS } from './data';

import Header from './components/Header';
import StatsSection from './components/StatsSection';
import CategoryFilters from './components/CategoryFilters';
import FlashcardGrid from './components/FlashcardGrid';
import StudyActive from './components/StudyActive';
import FlashcardFormModal from './components/FlashcardFormModal';

export default function App() {
  // 1. Core State
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });
  const [activeTab, setActiveTab] = useState<'deck' | 'study'>('deck');
  
  // 2. Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // 3. Modal & Editor State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);

  // 4. Load initial cards from localStorage or data.ts
  useEffect(() => {
    const savedCards = localStorage.getItem('flashcards');
    if (savedCards) {
      try {
        setCards(JSON.parse(savedCards));
      } catch (err) {
        setCards(DEFAULT_FLASHCARDS);
      }
    } else {
      setCards(DEFAULT_FLASHCARDS);
      localStorage.setItem('flashcards', JSON.stringify(DEFAULT_FLASHCARDS));
    }
  }, []);

  // 5. Save changes to localStorage whenever cards array changes
  const saveCards = (updatedCards: Flashcard[]) => {
    setCards(updatedCards);
    localStorage.setItem('flashcards', JSON.stringify(updatedCards));
  };

  // 6. Handle Dark Mode class on index.html body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // 7. Core Interactive Handlers
  const handleToggleFavorite = (id: string) => {
    const updated = cards.map(c => c.id === id ? { ...c, isFavorite: !c.isFavorite } : c);
    saveCards(updated);
  };

  const handleDeleteCard = (id: string) => {
    if (window.confirm("Haqiqatan ham ushbu kartani o'chirib tashlamoqchimisiz?")) {
      const updated = cards.filter(c => c.id !== id);
      saveCards(updated);
    }
  };

  const handleEditCardTrigger = (card: Flashcard) => {
    setEditingCard(card);
    setIsAddModalOpen(true);
  };

  const handleSaveCard = (
    question: string,
    answer: string,
    category: string,
    difficulty: 'easy' | 'medium' | 'hard',
    editId?: string
  ) => {
    if (editId) {
      // Edit mode
      const updated = cards.map(c => 
        c.id === editId 
          ? { ...c, question, answer, category, difficulty }
          : c
      );
      saveCards(updated);
      setEditingCard(null);
    } else {
      // Create mode
      const newCard: Flashcard = {
        id: `card-${Date.now()}`,
        question,
        answer,
        category,
        difficulty,
        isFavorite: false,
        successCount: 0,
        failCount: 0
      };
      saveCards([newCard, ...cards]);
    }
  };

  // Stats updater during study sessions
  const handleUpdateCardStats = (id: string, success: boolean) => {
    const updated = cards.map(c => {
      if (c.id === id) {
        return {
          ...c,
          successCount: success ? c.successCount + 1 : c.successCount,
          failCount: !success ? c.failCount + 1 : c.failCount,
          lastReviewedAt: new Date().toISOString()
        };
      }
      return c;
    });
    saveCards(updated);
  };

  // Reset all scoring metrics (Restart progress statistics)
  const handleResetProgressAll = () => {
    if (window.confirm("Barcha kartalarning o'rganish o'zlashtirish statistikalarini nollashtirmoqchimisiz?")) {
      const reset = cards.map(c => ({
        ...c,
        successCount: 0,
        failCount: 0,
        lastReviewedAt: undefined
      }));
      saveCards(reset);
    }
  };

  // 8. Filtered Flashcards
  const filteredCards = cards.filter(card => {
    const matchesSearch = 
      card.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory;
    const matchesFavorite = !showFavoritesOnly || card.isFavorite;

    return matchesSearch && matchesCategory && matchesFavorite;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative overflow-x-hidden">
      
      {/* Decorative colored glow orbs for glassmorphism ambient backdrop */}
      <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-indigo-600/20 dark:bg-indigo-600/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-[600px] h-[600px] bg-purple-600/15 dark:bg-purple-600/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-48 left-1/4 w-[800px] h-[400px] bg-blue-500/15 dark:bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Main header component */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddModal={() => {
          setEditingCard(null);
          setIsAddModalOpen(true);
        }}
        totalCardsCount={cards.length}
      />

      {/* Primary content area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Dynamic transition layout with Framer Motion */}
        <AnimatePresence mode="wait">
          {activeTab === 'deck' ? (
            <motion.div
              key="deck-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              
              {/* Stats overview banner */}
              <StatsSection cards={cards} />

              {/* Filtering Controls */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3 border-t border-slate-200/40 dark:border-slate-800/40 pt-6">
                <div>
                  <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <Layers size={18} className="text-indigo-600" />
                    Kategoriyalar bo‘yicha ko‘rish
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    O'zingizga qulay bilim sohalarini tanlash orqali kartalarni tartiblang.
                  </p>
                </div>

                {/* Reset Progress stats button */}
                {cards.some(c => c.successCount > 0 || c.failCount > 0) && (
                  <button
                    id="reset-stats-btn"
                    onClick={handleResetProgressAll}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-rose-500/5 transition-all self-start cursor-pointer flex items-center gap-1"
                  >
                    <RefreshCw size={11} />
                    Statistikani nollashtirish
                  </button>
                )}
              </div>

              {/* Category selector pills */}
              <CategoryFilters
                categories={DEFAULT_CATEGORIES}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                cards={cards}
              />

              {/* Dynamic Flashcards Grid */}
              <FlashcardGrid
                cards={filteredCards}
                categories={DEFAULT_CATEGORIES}
                onToggleFavorite={handleToggleFavorite}
                onDeleteCard={handleDeleteCard}
                onEditCard={handleEditCardTrigger}
              />

            </motion.div>
          ) : (
            <motion.div
              key="study-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              
              <div className="text-center max-w-xl mx-auto mb-8">
                <span className="text-xs uppercase tracking-wider font-extrabold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">
                  Dars Mashg'uloti
                </span>
                <h2 className="text-2xl font-black text-slate-950 dark:text-white mt-3">Bilimingizni sinovdan o'tkazing</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Har bir kartani o'qib bo'lgach, javobini oching va uning to'g'riligiga qarab mos ravishda baholang.
                </p>
              </div>

              {/* Active Slide Study mode screen */}
              <StudyActive
                cards={filteredCards}
                categories={DEFAULT_CATEGORIES}
                onUpdateCardStats={handleUpdateCardStats}
                onToggleFavorite={handleToggleFavorite}
              />

            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Popup Form Modal for Add / Edit */}
      <FlashcardFormModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingCard(null);
        }}
        onSave={handleSaveCard}
        categories={DEFAULT_CATEGORIES}
        editingCard={editingCard}
      />

      {/* Subtle modern footer */}
      <footer className="w-full text-center py-10 text-xs font-semibold text-slate-400 dark:text-slate-600 border-t border-slate-200/20 dark:border-slate-800/20 max-w-7xl mx-auto mt-16">
        <p>© 2026 Flashcard Learn App. Glassmorphism Design System bilan yaratilgan.</p>
      </footer>

    </div>
  );
}
