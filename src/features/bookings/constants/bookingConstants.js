export const SLOT_STATUS = {
  AVAILABLE: 'available',
  FULL: 'full',
  BOOKED: 'booked',
  PAST: 'past',
};

export const BOOKING_STATUS = {
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  PENDING: 'pending',
};

/**
 * Mapeo de nombres de día en español a número de día JavaScript (Date.getDay()).
 * Domingo = 0, Lunes = 1, ..., Sábado = 6
 */
export const DAY_MAP = {
  'Domingo': 0,
  'Lunes': 1,
  'Martes': 2,
  'Miércoles': 3,
  'Jueves': 4,
  'Viernes': 5,
  'Sábado': 6,
};

export const DAY_LABELS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

export const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

export const SESSION_STORAGE_KEY = 'creeser_booking_selections';

export const DEFAULT_CAPACITY = 20;

/** Umbral a partir del cual un slot se considera lleno */
export const FULL_THRESHOLD = 18;
