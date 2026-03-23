export const BELT_PROGRESSION = [
  { id: 'white',  name: 'Cinturón Blanco',       order: 0, color: 'bg-gray-100 text-gray-800' },
  { id: 'yellow', name: 'Cinturón Amarillo',      order: 1, color: 'bg-yellow-100 text-yellow-800' },
  { id: 'green',  name: 'Cinturón Verde',         order: 2, color: 'bg-green-100 text-green-800' },
  { id: 'blue',   name: 'Cinturón Azul',          order: 3, color: 'bg-blue-100 text-blue-800' },
  { id: 'red',    name: 'Cinturón Rojo',          order: 4, color: 'bg-red-100 text-red-800' },
  { id: 'black1', name: 'Cinturón Negro 1er Dan', order: 5, color: 'bg-gray-900 text-white' },
  { id: 'black2', name: 'Cinturón Negro 2do Dan', order: 6, color: 'bg-gray-900 text-white' },
  { id: 'black3', name: 'Cinturón Negro 3er Dan', order: 7, color: 'bg-gray-900 text-white' },
];

export const ACHIEVEMENTS_CATALOG = [
  {
    id: 'first_class',
    name: 'Primera Clase',
    description: 'Completaste tu primera clase en la academia.',
    icon: '🥋',
    threshold: 1,
    type: 'classes',
  },
  {
    id: 'commitment',
    name: 'Constancia',
    description: '¡10 clases completadas! La disciplina rinde frutos.',
    icon: '🔥',
    threshold: 10,
    type: 'classes',
  },
  {
    id: 'dedication',
    name: 'Dedicación',
    description: '25 clases. Tu progreso es notable.',
    icon: '⭐',
    threshold: 25,
    type: 'classes',
  },
  {
    id: 'warrior',
    name: 'Guerrero',
    description: '¡50 clases! Eres un ejemplo de perseverancia.',
    icon: '🏆',
    threshold: 50,
    type: 'classes',
  },
  {
    id: 'weekly_streak',
    name: 'Racha Semanal',
    description: '4 clases en una misma semana. ¡Imparable!',
    icon: '⚡',
    threshold: 4,
    type: 'weekly',
  },
  {
    id: 'perfect_month',
    name: 'Puntualidad Perfecta',
    description: 'Asistencia 100% en un mes calendario.',
    icon: '💎',
    threshold: 100,
    type: 'monthly_attendance',
  },
];

export const PASSWORD_RULES = {
  minLength: 8,
  requireUppercase: true,
  requireNumber: true,
  requireSpecial: false,
};

export const PROFILE_TABS = [
  { id: 'personal', label: 'Datos Personales', icon: 'FaUser' },
  { id: 'security', label: 'Seguridad', icon: 'FaLock' },
  { id: 'history',  label: 'Historial', icon: 'FaHistory' },
  { id: 'achievements', label: 'Logros', icon: 'FaTrophy' },
];

export const HISTORY_FILTERS = {
  ALL: 'all',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
};
