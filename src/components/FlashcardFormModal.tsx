import React, { useState, useEffect } from 'react';
import { X, Save, AlertTriangle } from 'lucide-react';
import { Flashcard, Category } from '../types';

interface FlashcardFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (question: string, answer: string, category: string, difficulty: 'easy' | 'medium' | 'hard', editId?: string) => void;
  categories: Category[];
  editingCard: Flashcard | null;
}

export default function FlashcardFormModal({
  isOpen,
  onClose,
  onSave,
  categories,
  editingCard
}: FlashcardFormModalProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('english');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [errorMsg, setErrorMsg] = useState('');

  // Selectable categories filtered of 'all'
  const fillableCategories = categories.filter(c => c.id !== 'all');

  // Load editing card data if editingCard changes
  useEffect(() => {
    if (editingCard) {
      setQuestion(editingCard.question);
      setAnswer(editingCard.answer);
      setCategory(editingCard.category);
      setDifficulty(editingCard.difficulty);
      setErrorMsg('');
    } else {
      setQuestion('');
      setAnswer('');
      setCategory('english');
      setDifficulty('medium');
      setErrorMsg('');
    }
  }, [editingCard, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!question.trim()) {
      setErrorMsg('Iltimos, savol matnini kiriting.');
      return;
    }
    if (!answer.trim()) {
      setErrorMsg('Iltimos, javob matnini kiriting.');
      return;
    }

    onSave(question.trim(), answer.trim(), category, difficulty, editingCard?.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 md:p-8 transform transition-transform scale-100">
        
        {/* Close Button */}
        <button
          id="close-modal-btn"
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Modal Title */}
        <div className="mb-6">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            {editingCard ? "Kartani Tahrirlash" : "Yangi Karta Qo'shish"}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Muvaffaqiyatli takrorlash va o'rganish uchun savol va to'liq tushunarli javobini kiriting.
          </p>
        </div>

        {/* Error message block */}
        {errorMsg && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
            <AlertTriangle size={15} />
            {errorMsg}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Question text */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-350 uppercase tracking-wider mb-1.5">
              Savol matni (Question)
            </label>
            <textarea
              id="form-question-textarea"
              rows={3}
              placeholder="Masalan: JavaScript da Closure nima?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950 text-slate-950 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-medium text-left"
            />
          </div>

          {/* Answer text */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-350 uppercase tracking-wider mb-1.5">
              Javob matni (Answer)
            </label>
            <textarea
              id="form-answer-textarea"
              rows={3}
              placeholder="Masalan: Ichki funksiyaning o'zi yaratilgan Scope-ga kirish imkoniyatidir..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950 text-slate-950 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-medium text-left"
            />
          </div>

          {/* Grid of details: Category and Difficulty selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Category selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-350 uppercase tracking-wider mb-1.5">
                Kategoriya
              </label>
              <select
                id="form-category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950 text-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer font-semibold"
              >
                {fillableCategories.map(cat => (
                  <option key={cat.id} value={cat.id} className="dark:bg-slate-900">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-350 uppercase tracking-wider mb-1.5">
                Qiyinchilik darajasi
              </label>
              <select
                id="form-difficulty-select"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950 text-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer font-semibold"
              >
                <option value="easy" className="dark:text-emerald-400 dark:bg-slate-900">Oson (Easy)</option>
                <option value="medium" className="dark:text-amber-400 dark:bg-slate-900">O'rtacha (Medium)</option>
                <option value="hard" className="dark:text-rose-400 dark:bg-slate-900">Qiyin (Hard)</option>
              </select>
            </div>

          </div>

          {/* Submit Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t border-slate-200/40 dark:border-slate-800/40 mt-6">
            <button
              id="cancel-modal-btn"
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Bekor Qilish
            </button>
            <button
              id="save-modal-btn"
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/10 flex items-center gap-1.5 cursor-pointer"
            >
              <Save size={14} />
              {editingCard ? "O'zgarishlarni Saqlash" : "Yangi Karta Yaratish"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
