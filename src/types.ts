export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  isFavorite: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  successCount: number;
  failCount: number;
  lastReviewedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Icon name matching Lucide icons
  color: string; // Tailwind color classes for tag/borders e.g. 'emerald'
}

export interface LearningSession {
  totalReviewed: number;
  correctAnswers: number;
  streak: number;
}
