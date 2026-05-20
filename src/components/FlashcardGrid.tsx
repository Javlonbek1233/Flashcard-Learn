import React, { useState } from 'react';
import { Star, RefreshCw, Trash2, Edit3, HelpCircle, CheckCircle } from 'lucide-react';
import { Flashcard, Category } from '../types';

interface FlashcardGridProps {
  cards: Flashcard[];
  categories: Category[];
  onToggleFavorite: (id: string) => void;
  onDeleteCard: (id: string) => void;
  onEditCard: (card: Flashcard) => void;
}

export default function FlashcardGrid({
  cards,
  categories,
  onToggleFavorite,
  onDeleteCard,
  onEditCard
}: FlashcardGridProps) {
  
  if (cards.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-12 glass-panel rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 text-center">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800/80 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-600 mb-4 animate-bounce">
          <HelpCircle size={32} />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Kartalar topilmadi</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md">
          Ushbu qidiruv yoki kategoriya uchun hali savol-javoblar mavjud emas. Yuqoridagi "Karta Qo'shish" tugmasi orqali yangilarini kiriting.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <FlashcardItem
          key={card.id}
          card={card}
          categories={categories}
          onToggleFavorite={onToggleFavorite}
          onDeleteCard={onDeleteCard}
          onEditCard={onEditCard}
        />
      ))}
    </div>
  );
}

interface FlashcardItemProps {
  key?: string;
  card: Flashcard;
  categories: Category[];
  onToggleFavorite: (id: string) => void;
  onDeleteCard: (id: string) => void;
  onEditCard: (card: Flashcard) => void;
}

function FlashcardItem({
  card,
  categories,
  onToggleFavorite,
  onDeleteCard,
  onEditCard
}: FlashcardItemProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Get difficulty styles and label
  const getDifficultyDetails = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy':
        return { label: 'Oson', color: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-500/20' };
      case 'medium':
        return { label: 'O\'rta', color: 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border-amber-500/20' };
      case 'hard':
        return { label: 'Qiyin', color: 'bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 border-rose-500/20' };
    }
  };

  const currentCategoryObj = categories.find(cat => cat.id === card.category);
  const diffDetails = getDifficultyDetails(card.difficulty);

  return (
    <div className="w-full h-72 perspective-1000 group">
      {/* 3D Rotatable Container */}
      <div
        id={`flashcard-card-inner-${card.id}`}
        className={`w-full h-full duration-500 preserve-3d transition-transform relative cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        
        {/* ================= CARD FRONT FACE ================= */}
        <div className="backface-hidden absolute w-full h-full glass-card hover:bg-white/80 dark:hover:bg-slate-900/60 p-5 rounded-3xl border border-white/20 dark:border-slate-800/40 shadow-sm flex flex-col justify-between transition-shadow hover:shadow-lg dark:hover:shadow-indigo-500/5">
          
          {/* Top Row: Category Title & Favorite star */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/30">
              {currentCategoryObj ? currentCategoryObj.name : 'No category'}
            </span>

            <div className="flex items-center gap-1">
              <span className={`text-[10px] font-bold px-2 py-0.5 border rounded-md uppercase tracking-wider ${diffDetails.color}`}>
                {diffDetails.label}
              </span>
              
              <button
                id={`fav-btn-front-${card.id}`}
                onClick={(e) => {
                  e.stopPropagation(); // Stop flip trigger
                  onToggleFavorite(card.id);
                }}
                className={`p-1.5 rounded-lg transition-transform hover:scale-110 cursor-pointer ${
                  card.isFavorite 
                    ? 'text-amber-500 hover:text-amber-600' 
                    : 'text-slate-300 dark:text-slate-600 hover:text-amber-500'
                }`}
                title={card.isFavorite ? 'Sevimli ro\'yhatidan o\'chirish' : 'Sevimli ro\'yhatiga qo\'shish'}
              >
                <Star size={16} fill={card.isFavorite ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          {/* Center Question Segment */}
          <div className="my-auto py-2 flex flex-col justify-center items-center text-center">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-indigo-500/80 mb-1">Savol:</span>
            <p className="text-base font-semibold text-slate-800 dark:text-slate-100 leading-relaxed max-h-24 overflow-y-auto w-full px-2">
              {card.question}
            </p>
          </div>

          {/* Bottom Row: Utilities and Flip Instructors */}
          <div className="flex items-center justify-between border-t border-slate-200/40 dark:border-slate-800/40 pt-3">
            <div className="flex items-center gap-1.5">
              <button
                id={`edit-btn-front-${card.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onEditCard(card);
                }}
                className="p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-indigo-500 hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20 transition-colors cursor-pointer"
                title="Tahrirlash"
              >
                <Edit3 size={15} />
              </button>
              <button
                id={`delete-btn-front-${card.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteCard(card.id);
                }}
                className="p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 dark:hover:bg-rose-500/20 transition-colors cursor-pointer"
                title="O'chirish"
              >
                <Trash2 size={15} />
              </button>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
              <span>Javobni ko'rish</span>
              <RefreshCw size={11} className="animate-spin-slow group-hover:rotate-180 transition-transform duration-500" />
            </div>
          </div>

        </div>

        {/* ================= CARD BACK FACE ================= */}
        <div className="rotate-y-180 backface-hidden absolute w-full h-full bg-slate-50 dark:bg-slate-900 border border-indigo-500/30 dark:border-indigo-500/20 p-5 rounded-3xl shadow-sm flex flex-col justify-between">
          
          {/* Top Row */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30">
              Javob
            </span>
            
            <div className="flex items-center gap-1">
              <button
                id={`fav-btn-back-${card.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(card.id);
                }}
                className={`p-1.5 rounded-lg transition-transform hover:scale-110 cursor-pointer ${
                  card.isFavorite 
                    ? 'text-amber-500' 
                    : 'text-slate-300 dark:text-slate-600 hover:text-amber-500'
                }`}
              >
                <Star size={16} fill={card.isFavorite ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          {/* Center Answer Segment */}
          <div className="my-auto py-2 flex flex-col justify-center items-center text-center">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-relaxed max-h-32 overflow-y-auto w-full px-2 italic">
              "{card.answer}"
            </p>
          </div>

          {/* Bottom Row: Score Statistics */}
          <div className="flex items-center justify-between border-t border-slate-200/40 dark:border-slate-800/40 pt-3 text-[10px] text-slate-500 dark:text-slate-400 font-semibold font-mono">
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">✓ {card.successCount} ta muvaffaqiyat</span>
              <span className="text-rose-500">✗ {card.failCount} ta xato</span>
            </div>

            <div className="flex items-center gap-1 text-indigo-500">
              <span>Savolni ko'rish</span>
              <RefreshCw size={11} className="rotate-180" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
