export const ADMIN_SIDEBAR_ITEMS = [
  { id: 'dashboard',  label: 'Dashboard',  path: '/admin',          icon: 'FaChartPie' },
  { id: 'users',      label: 'Usuarios',   path: '/admin/usuarios', icon: 'FaUsers' },
  { id: 'classes',    label: 'Clases',     path: '/admin/clases',   icon: 'FaChalkboardTeacher' },
  { id: 'events',     label: 'Eventos',    path: '/admin/eventos',  icon: 'FaCalendarAlt' },
  { id: 'bookings',   label: 'Reservas',   path: '/admin/reservas', icon: 'FaClipboardList' },
  { id: 'reports',    label: 'Reportes',   path: '/admin/reportes', icon: 'FaFileAlt' },
];

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
};

export const USER_STATUS_MAP = {
  active:    { label: 'Activo',     color: 'bg-green-100 text-green-800' },
  inactive:  { label: 'Inactivo',   color: 'bg-gray-100 text-gray-800' },
  suspended: { label: 'Suspendido', color: 'bg-red-100 text-red-800' },
};

export {
  ATTENDANCE_STATUS,
  ATTENDANCE_STATUS_MAP,
  BOOKING_STATUS_MAP,
} from '../../../shared/constants/statusConstants';

export const CONTACT_STATUS_MAP = {
  new:     { label: 'Nuevo',      color: 'bg-blue-100 text-blue-800' },
  read:    { label: 'Leído',      color: 'bg-yellow-100 text-yellow-800' },
  replied: { label: 'Respondido', color: 'bg-green-100 text-green-800' },
};

export const CALENDAR_EVENT_TYPES = {
  class_program: { label: 'Programa de Clases', color: '#36adf7' },
  exam:          { label: 'Examen',              color: '#f59e0b' },
  competition:   { label: 'Competencia',         color: '#E31E24' },
  event:         { label: 'Evento',              color: '#0074ca' },
  enrollment:    { label: 'Inscripción',         color: '#0c92eb' },
};

export const REVENUE_PLANS = {
  '1x': { label: '1 vez x Semana', price: 30000 },
  '2x': { label: '2 veces x Semana', price: 35000 },
};

export const DEFAULT_PAGE_SIZE = 10;

export const FILTER_DEFAULTS = {
  search: '',
  status: 'all',
  role: 'all',
  classId: 'all',
  location: 'all',
  dateRange: { start: null, end: null },
};
