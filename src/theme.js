// Design tokens — "Neon Aurora" (approved, final)
export const T = {
  bgBase: '#0d0d1c',
  bgGradient: 'radial-gradient(130% 80% at 50% -10%, #231a4a 0%, #0d0d1c 55%)',
  surface: '#13131f',
  card: '#1a1a2e',
  cardBorder: 'rgba(168,85,247,.16)',
  cardBorderStrong: 'rgba(168,85,247,.3)',

  acc1: '#7c3aed',
  acc2: '#a855f7',
  accGrad: 'linear-gradient(135deg,#7c3aed,#a855f7)',

  like: '#4ade80',
  likeGrad: 'linear-gradient(135deg,#4ade80,#22c55e)',
  nope: '#f87171',
  discuss: '#fbbf24',

  text: '#ECECF5',
  textSecondary: '#8b8ba7',
  textMuted: '#6b6b85',

  tgBlue: 'linear-gradient(135deg,#37aee2,#1e96c8)',

  radiusCard: 24,
  radiusBtn: 16,
  radiusPill: 999,

  shadowCTA: '0 12px 28px rgba(124,58,237,.4)',
  shadowCard: '0 22px 48px rgba(0,0,0,.55)',
  shadowLike: '0 12px 26px rgba(74,222,128,.35)',
};

export const CATS = [
  { emoji: '🎬', label: 'Досуг' },
  { emoji: '🏠', label: 'Быт' },
  { emoji: '❤️', label: 'Интим' },
  { emoji: '💰', label: 'Финансы' },
  { emoji: '🗺️', label: 'Путешествия' },
  { emoji: '💼', label: 'Карьера' },
];

export const DEMO_CARDS = [
  { id: 1, emoji: '🍸', title: 'Бар «Мендели»', desc: 'Коктейль-бар с живой музыкой по пятницам', tags: ['Коктейли', 'Живая музыка', '₽₽'], dist: '1.2 км', source: '2ГИС', match: true },
  { id: 2, emoji: '🍜', title: 'Рамен-бар «Ку»', desc: 'Настоящий японский рамен и хрустящие гёдза', tags: ['Азия', 'Уютно', '₽₽'], dist: '0.8 км', source: 'Я.Карты', match: false },
  { id: 3, emoji: '🎭', title: 'Театр «Практика»', desc: 'Спектакль «Так и было» — начало в 20:00', tags: ['Спектакль', '20:00', '₽₽₽'], dist: '3.4 км', source: 'Афиша', match: false },
  { id: 4, emoji: '🍕', title: 'Пиццерия «Двор»', desc: 'Неаполитанская пицца на дровах и веранда', tags: ['Пицца', 'Веранда', '₽₽'], dist: '1.9 км', source: '2ГИС', match: false },
  { id: 5, emoji: '🏠', title: 'Остаёмся дома', desc: 'Уютный вечер с фильмом и пледом', tags: ['Дом', 'Кино', 'Бесплатно'], dist: null, source: null, match: false },
];
