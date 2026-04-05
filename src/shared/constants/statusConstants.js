export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LATE: 'late',
};

export const ATTENDANCE_STATUS_MAP = {
  present: { label: 'Presente', color: 'bg-green-100 text-green-800' },
  absent:  { label: 'Ausente',  color: 'bg-red-100 text-red-800' },
  late:    { label: 'Atraso',   color: 'bg-yellow-100 text-yellow-800' },
};

export const BOOKING_STATUS_MAP = {
  confirmed: { label: 'Confirmada', color: 'bg-blue-100 text-blue-800' },
  cancelled: { label: 'Cancelada',  color: 'bg-red-100 text-red-800' },
  pending:   { label: 'Pendiente',  color: 'bg-yellow-100 text-yellow-800' },
};

export const USER_STATUS_MAP = {
  active:    { label: 'Activo',     color: 'bg-green-100 text-green-800' },
  inactive:  { label: 'Inactivo',   color: 'bg-gray-100 text-gray-800' },
  suspended: { label: 'Suspendido', color: 'bg-red-100 text-red-800' },
};
