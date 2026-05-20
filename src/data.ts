import { Flashcard, Category } from './types';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'all', name: 'Barchasi', icon: 'Layers', color: 'blue' },
  { id: 'english', name: 'Ingliz tili', icon: 'Languages', color: 'emerald' },
  { id: 'coding', name: 'Dasturlash', icon: 'Code', color: 'amber' },
  { id: 'science', name: 'Fan & Texnika', icon: 'Atom', color: 'sky' },
  { id: 'geography', name: 'Geografiya', icon: 'Globe', color: 'rose' }
];

export const DEFAULT_FLASHCARDS: Flashcard[] = [
  // English Cards
  {
    id: 'eng-1',
    question: 'What does "Persistence" mean in Uzbek?',
    answer: 'Qat’iyatlilik, tirishqoqlik, taslim bo’lmasdan maqsad sariga intilish.',
    category: 'english',
    isFavorite: true,
    difficulty: 'medium',
    successCount: 3,
    failCount: 0
  },
  {
    id: 'eng-2',
    question: 'Translate to English: "Ma’suliyatli bo’lish orqali muvaffaqiyatga erishiladi."',
    answer: '"Success is achieved by being responsible."',
    category: 'english',
    isFavorite: false,
    difficulty: 'hard',
    successCount: 1,
    failCount: 1
  },
  {
    id: 'eng-3',
    question: 'How do you define the idiom "Bite the bullet"?',
    answer: 'Og’ir va qiyin vaziyatga chidab, jasorat bilan qaror qabul qilmoq, tishni tishga qo’ymoq.',
    category: 'english',
    isFavorite: false,
    difficulty: 'hard',
    successCount: 0,
    failCount: 0
  },
  
  // Coding Cards
  {
    id: 'code-1',
    question: 'JavaScript da "Closure" nima?',
    answer: 'Ichki funksiyaning o’zi yaratilgan tashqi funksiya o’zgaruvchilariga (scope-ga) kirish imkoniyati saqlanib qolishidir.',
    category: 'coding',
    isFavorite: true,
    difficulty: 'hard',
    successCount: 5,
    failCount: 1
  },
  {
    id: 'code-2',
    question: 'React da "Virtual DOM" ning asosiy maqsadi nima?',
    answer: 'Haqiqiy DOM-ni har bir yangilanishda qayta chizmasdan, o’zgarishlarni xotirada taqqoslab (diffing), minimal o’zgarishlarni tezkorlik bilan kiritishdir.',
    category: 'coding',
    isFavorite: false,
    difficulty: 'medium',
    successCount: 2,
    failCount: 0
  },
  {
    id: 'code-3',
    question: 'CSS da Flexbox va Grid-ning farqi nimada?',
    answer: 'Flexbox asosan bir o’lchamli (faqat qator yoki uning ustunida) tartiblash uchun, Grid esa ikki o’lchamli (bir vaqtning o’zida qator va ustunlar bo’yicha to’rsimon) murakkab layouts uchun ishlatiladi.',
    category: 'coding',
    isFavorite: false,
    difficulty: 'easy',
    successCount: 4,
    failCount: 0
  },

  // Science & Tech
  {
    id: 'sci-1',
    question: 'Nima uchun quyosh tutilishi sodir bo’ladi?',
    answer: 'Oy Yer va Quyosh oralig’iga to’g’ri kelib, Quyosh nurlarini to’sib qo’yganida Yer yuzida soya hosil qiladi.',
    category: 'science',
    isFavorite: false,
    difficulty: 'easy',
    successCount: 1,
    failCount: 0
  },
  {
    id: 'sci-2',
    question: 'Kvant kompyuteri nima?',
    answer: 'An’anaviy bitlardan (0 va 1) farqli ravishda, superpozitsiya va chalkashlik (entanglement) qonuniyatlariga tayanib, kvant bitlari (qubit) orqali juda katta hajmdagi hisoblashlarni amalga oshiruvchi texnologiya.',
    category: 'science',
    isFavorite: true,
    difficulty: 'hard',
    successCount: 0,
    failCount: 1
  },

  // Geography
  {
    id: 'geo-1',
    question: 'Dunyoning eng chuqur ko’li qaysi va qayerda joylashgan?',
    answer: 'Baykal ko’li, Rossiya Federatsiyasining Sibir janubiy qismida joylashgan (chuqurligi taxminan 1642 metr).',
    category: 'geography',
    isFavorite: false,
    difficulty: 'medium',
    successCount: 3,
    failCount: 0
  },
  {
    id: 'geo-2',
    question: 'O’zbekistonning eng baland tog’ cho’qqisi qaysi?',
    answer: 'Hazrati Sulton cho’qqisi (Hisor tizmasida, balandligi 4643 metr).',
    category: 'geography',
    isFavorite: false,
    difficulty: 'medium',
    successCount: 2,
    failCount: 1
  }
];
