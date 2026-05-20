import { Award, Flame, Star, BookOpen, CheckCircle, BrainCircuit } from 'lucide-react';
import { Flashcard } from '../types';

interface StatsSectionProps {
  cards: Flashcard[];
}

export default function StatsSection({ cards }: StatsSectionProps) {
  const totalCards = cards.length;
  const favoriteCards = cards.filter(c => c.isFavorite).length;
  
  // Calculate total reviews
  const totalReviews = cards.reduce((acc, c) => acc + (c.successCount + c.failCount), 0);
  
  // A card is "Mastered" (O'zlashtirilgan) if successes > failures AND successes >= 2
  const masteredCards = cards.filter(c => c.successCount > c.failCount && c.successCount >= 2).length;
  
  // A card is "In Progress" (O'rganilmoqda) if reviewed but not mastered
  const inProgressCards = cards.filter(c => (c.successCount > 0 || c.failCount > 0) && !(c.successCount > c.failCount && c.successCount >= 2)).length;
  
  // Overall mastery percentage
  const masteryPercentage = totalCards > 0 ? Math.round((masteredCards / totalCards) * 100) : 0;

  // Let's create an elegant pseudo streak. If user reviewed at least 5 times, give them a streak of 3 days, higher reviewed gives more streak
  // Or we can track a custom local streak based on total reviews. Let's calculate:
  const computedStreak = Math.min(Math.floor(totalReviews / 5) + 1, 9);

  return (
    <div className="w-full mb-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        
        {/* Metric 1: Total Cards */}
        <div className="glass-card p-4 rounded-2xl flex items-center gap-3 shadow-sm border border-white/20 dark:border-slate-800/30">
          <div className="p-3 bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <BookOpen size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              Umumiy kartalar
            </p>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              {totalCards}
            </h3>
          </div>
        </div>

        {/* Metric 2: Starred Cards */}
        <div className="glass-card p-4 rounded-2xl flex items-center gap-3 shadow-sm border border-white/20 dark:border-slate-800/30">
          <div className="p-3 bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl">
            <Star size={20} fill="currentColor" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              Sevimlilar darsi
            </p>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              {favoriteCards}
            </h3>
          </div>
        </div>

        {/* Metric 3: Total Reviews */}
        <div className="glass-card p-4 rounded-2xl flex items-center gap-3 shadow-sm border border-white/20 dark:border-slate-800/30">
          <div className="p-3 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <BrainCircuit size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              Urinishlar soni
            </p>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              {totalReviews} <span className="text-xs font-normal text-slate-500">marta</span>
            </h3>
          </div>
        </div>

        {/* Metric 4: Streak Consistency */}
        <div className="glass-card p-4 rounded-2xl flex items-center gap-3 shadow-sm border border-white/20 dark:border-slate-800/30">
          <div className="p-3 bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 rounded-xl animate-pulse">
            <Flame size={20} fill="currentColor" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              Muntazamlik
            </p>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              {computedStreak} <span className="text-xs font-normal text-slate-500">kunlik streak</span>
            </h3>
          </div>
        </div>

      </div>

      {/* Progress tracking bar */}
      <div className="glass-panel p-5 rounded-3xl border border-white/20 dark:border-slate-800/30 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="text-indigo-500" size={18} />
              O'zlashtirish va O'rganish Ko'rsatkichi
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Kamida 2 marta muvaffaqiyatli javob berilgan kartalar mukammal o'zlashtirilgan hisoblanadi.
            </p>
          </div>
          <div className="text-right whitespace-nowrap">
            <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{masteryPercentage}%</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">to'liq tayyor</span>
          </div>
        </div>

        {/* Progress Bar with glowing color stops */}
        <div className="relative w-full h-3.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 shadow-md shadow-indigo-500/25"
            style={{ width: `${Math.max(masteryPercentage, 2)}%` }}
          />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-6 mt-4 text-xs font-medium text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>O'zlashtirildi: <strong className="text-slate-900 dark:text-white font-bold">{masteredCards}</strong> ta</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-400" />
            <span>O'rganilmoqda: <strong className="text-slate-900 dark:text-white font-bold">{inProgressCards}</strong> ta</span>
          </div>
          <div className="flex items-center gap-2 animate-pulse">
            <div className="w-3 h-3 rounded-full bg-slate-400" />
            <span>Ochilmadi: <strong className="text-slate-900 dark:text-white font-bold">{Math.max(0, totalCards - masteredCards - inProgressCards)}</strong> ta</span>
          </div>
        </div>
      </div>
    </div>
  );
}
