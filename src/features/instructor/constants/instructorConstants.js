export const INSTRUCTOR_SIDEBAR_ITEMS = [
  { id: 'dashboard',   label: 'Dashboard',   path: '/instructor',            icon: 'FaTachometerAlt' },
  { id: 'classes',     label: 'Mis Clases',  path: '/instructor/clases',     icon: 'FaChalkboardTeacher' },
  { id: 'students',    label: 'Alumnos',     path: '/instructor/alumnos',    icon: 'FaUsers' },
  { id: 'attendance',  label: 'Asistencia',  path: '/instructor/asistencia', icon: 'FaClipboardCheck' },
  { id: 'reports',     label: 'Reportes',    path: '/instructor/reportes',   icon: 'FaChartLine' },
];

export const PROGRESS_CATEGORIES = {
  technical: { label: 'Técnica',   color: 'bg-blue-100 text-blue-800',   icon: 'FaBullseye' },
  attitude:  { label: 'Actitud',   color: 'bg-green-100 text-green-800', icon: 'FaHeart' },
  physical:  { label: 'Físico',    color: 'bg-orange-100 text-orange-800', icon: 'FaDumbbell' },
  general:   { label: 'General',   color: 'bg-gray-100 text-gray-800',   icon: 'FaStickyNote' },
};

export const DAY_MAP = {
  0: 'Domingo',
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado',
};

export const DEFAULT_INSTRUCTOR_PAGE_SIZE = 10;
