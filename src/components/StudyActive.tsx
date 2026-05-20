import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle, CheckCircle2, AlertCircle, Heart, Star, Sparkles, Trophy, BookOpen } from 'lucide-react';
import { Flashcard, Category } from '../types';

interface StudyActiveProps {
  cards: Flashcard[];
  categories: Category[];
  onUpdateCardStats: (id: string, success: boolean) => void;
  onToggleFavorite: (id: string) => void;
}

export default function StudyActive({
  cards,
  categories,
  onUpdateCardStats,
  onToggleFavorite
}: StudyActiveProps) {
  const [studyDeck, setStudyDeck] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  
  // Custom tracking for current session
  const [sessionSuccesses, setSessionSuccesses] = useState(0);
  const [sessionFailures, setSessionFailures] = useState(0);
  const [isDoneBag, setIsDoneBag] = useState(false);

  // Sync with available cards when study mode launches or changes
  useEffect(() => {
    if (cards.length > 0) {
      setStudyDeck([...cards]);
      setCurrentIndex(0);
      setIsFlipped(false);
      setIsDoneBag(false);
      setSessionSuccesses(0);
      setSessionFailures(0);
    }
  }, [cards]);

  if (cards.length === 0) {
    return (
      <div className="w-full text-center py-12 glass-panel rounded-3xl border border-dashed border-rose-200">
        <h3 className="text-lg font-bold text-slate-950 dark:text-white">O'rganish uchun kartalar mavjud emas</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Iltimos, avval kartalar yaratib oling yoki qidiruv filtrlarini tozalang.
        </p>
      </div>
    );
  }

  const activeCard = studyDeck[currentIndex];

  // Shuffling logic
  const handleShuffleToggle = () => {
    const nextShuffled = !shuffled;
    setShuffled(nextShuffled);
    if (nextShuffled) {
      const copy = [...studyDeck];
      // Fisher-Yates shuffle
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      setStudyDeck(copy);
    } else {
      // Revert to original unfiltered order
      setStudyDeck([...cards]);
    }
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // Next and Previous Controls
  const goNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex < studyDeck.length - 1) {
        setCurrentIndex(v => v + 1);
      } else {
        // We reached the end of the deck
        setIsDoneBag(true);
      }
    }, 150);
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(v => v - 1);
      }, 150);
    }
  };

  // Know/Don't Know Handlers
  const handleAnswerSubmit = (isCorrect: boolean) => {
    if (!activeCard) return;
    
    // Update global app stats
    onUpdateCardStats(activeCard.id, isCorrect);
    
    // Update local session stats
    if (isCorrect) {
      setSessionSuccesses(v => v + 1);
    } else {
      setSessionFailures(v => v + 1);
    }

    // Go next immediately after small time for polish
    goNext();
  };

  // Reset current session quiz
  const handleRestartQuiz = () => {
    setStudyDeck(shuffled ? [...studyDeck].sort(() => Math.random() - 0.5) : [...cards]);
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionSuccesses(0);
    setSessionFailures(0);
    setIsDoneBag(false);
  };

  const currentCategory = categories.find(c => c.id === activeCard?.category);

  // Difficulty colors
  const getDifficultyBadgeColor = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy': return 'bg-emerald-500/10 border-emerald-500/35 text-emerald-600 dark:text-emerald-400';
      case 'medium': return 'bg-amber-500/10 border-amber-500/35 text-amber-600 dark:text-amber-400';
      case 'hard': return 'bg-rose-500/10 border-rose-500/35 text-rose-600 dark:text-rose-400';
    }
  };

  return (
    <div className="max-w-xl mx-auto py-4">
      
      {/* Quiz Completion Screen */}
      {isDoneBag ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8 rounded-3xl text-center border border-white/30 dark:border-slate-800/50 shadow-xl"
        >
          <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-indigo-500 to-amber-400 rounded-full flex items-center justify-center text-white mb-6 animate-bounce shadow-lg shadow-indigo-500/20">
            <Trophy size={40} />
          </div>

          <h2 id="study-complete-title" className="text-2xl font-black text-slate-900 dark:text-white">Dars muvaffaqiyatli tugadi!</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Siz barcha {studyDeck.length} ta kartani ko'rib chiqdingiz va bilimingizni sinadingiz.
          </p>

          <div className="grid grid-cols-2 gap-4 my-6 py-4 border-y border-slate-200/40 dark:border-slate-800/40">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Yaxshi esda qoldi</span>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{sessionSuccesses} ta</span>
            </div>
            <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20">
              <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">Qayta takrorlash kerak</span>
              <span className="text-2xl font-black text-rose-600 dark:text-rose-400">{sessionFailures} ta</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              id="restart-study-btn"
              onClick={handleRestartQuiz}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center justify-center gap-2 transform active:scale-95 transition-all cursor-pointer shadow-md shadow-indigo-600/20"
            >
              <RotateCcw size={16} />
              Qayta Boshlash
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-6">
          
          {/* Top Controls Board */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white bg-white/40 dark:bg-slate-900/40 px-3.5 py-1.5 rounded-full border border-white/20 dark:border-slate-800/30">
              <BookOpen size={14} className="text-indigo-500" />
              <span>Kartalar progressi:</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-mono">
                {currentIndex + 1} / {studyDeck.length}
              </span>
            </div>

            {/* Shuffle Button */}
            <button
              id="shuffle-toggle-btn"
              onClick={handleShuffleToggle}
              className={`p-2 rounded-full border flex items-center justify-center gap-1.5 transition-all cursor-pointer duration-300 ${
                shuffled
                  ? 'bg-amber-500/20 border-amber-500 text-amber-600 dark:text-amber-400 font-bold'
                  : 'bg-white/40 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/30 text-slate-500 dark:text-slate-400'
              }`}
              title="Aralashtirib o'rganish"
            >
              <Shuffle size={14} />
              <span className="text-xs pr-1 font-semibold">{shuffled ? "Aralashtirildi" : "Aralashtirish"}</span>
            </button>
          </div>

          {/* Micro current progress bar */}
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / studyDeck.length) * 100}%` }}
            />
          </div>

          {/* Large Interactive Flippable Card */}
          <div className="w-full h-80 relative perspective-1000 group">
            <div
              id="active-study-card"
              onClick={() => setIsFlipped(!isFlipped)}
              className={`w-full h-full duration-500 preserve-3d transition-transform relative cursor-pointer ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              
              {/* Question Screen */}
              <div className="backface-hidden absolute w-full h-full glass-panel border border-white/30 dark:border-slate-800/60 p-6 rounded-3xl flex flex-col justify-between shadow-xl">
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    {currentCategory ? currentCategory.name : 'Category'}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 border rounded-md ${getDifficultyBadgeColor(activeCard.difficulty)}`}>
                      {activeCard.difficulty}
                    </span>
                    <button
                      id={`study-star-btn-${activeCard.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(activeCard.id);
                      }}
                      className="text-slate-350 dark:text-slate-600 hover:text-amber-500 transition-colors"
                    >
                      <Star size={18} fill={activeCard.isFavorite ? '#f59e0b' : 'none'} className={activeCard.isFavorite ? 'text-amber-500' : ''} />
                    </button>
                  </div>
                </div>

                <div className="text-center py-4 my-auto px-4">
                  <span className="text-xs block lowercase text-slate-400 mb-1">bosing va javobni tekshiring</span>
                  <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed font-sans max-h-36 overflow-y-auto">
                    {activeCard.question}
                  </p>
                </div>

                <div className="text-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 animate-pulse bg-indigo-500/5 py-1 rounded-xl">
                  Aylantirish (Flip)
                </div>

              </div>

              {/* Answer Screen */}
              <div className="rotate-y-180 backface-hidden absolute w-full h-full bg-slate-950 border border-purple-500/20 p-6 rounded-3xl flex flex-col justify-between shadow-xl">
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500">
                    Javob
                  </span>
                  
                  <span className="text-xs text-slate-500 font-mono font-bold">
                    Tarixiy: ✓{activeCard.successCount} / ✗{activeCard.failCount}
                  </span>
                </div>

                <div className="text-center py-4 my-auto px-4">
                  <p className="text-base sm:text-lg text-rose-100 leading-relaxed font-serif max-h-36 overflow-y-auto italic">
                    "{activeCard.answer}"
                  </p>
                </div>

                <div className="text-center text-xs text-rose-400 font-semibold bg-rose-500/5 py-1 rounded-xl">
                  Savolga qaytish uchun bosing
                </div>

              </div>

            </div>
          </div>

          {/* Quick Review Feedback Form (Visible when card is Flipped) */}
          <AnimatePresence>
            {isFlipped && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="glass-panel p-4 rounded-3xl border border-indigo-500/20 flex flex-col items-center gap-3 shadow-md"
              >
                <p className="text-xs font-bold text-slate-800 dark:text-slate-300">
                  Ushbu javobni eslay oldingizmi?
                </p>

                <div className="flex gap-4 w-full justify-center">
                  <button
                    id="know-btn"
                    onClick={() => handleAnswerSubmit(true)}
                    className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/15 cursor-pointer transform active:scale-95 transition-all"
                  >
                    <CheckCircle2 size={16} />
                    Ha, bilaman
                  </button>

                  <button
                    id="dont-know-btn"
                    onClick={() => handleAnswerSubmit(false)}
                    className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-450 hover:to-red-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-500/15 cursor-pointer transform active:scale-95 transition-all"
                  >
                    <AlertCircle size={16} />
                    Yo'q, eslay olmadim
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Manual Slider controls */}
          <div className="flex items-center justify-between px-2 pt-2 gap-4">
            <button
              id="prev-slide-btn"
              onClick={goPrev}
              disabled={currentIndex === 0}
              className={`p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-center cursor-pointer ${
                currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            <span className="text-xs font-semibold text-slate-500 font-mono">
              karta: {currentIndex + 1} / {studyDeck.length}
            </span>

            <button
              id="next-slide-btn"
              onClick={goNext}
              className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-center cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
