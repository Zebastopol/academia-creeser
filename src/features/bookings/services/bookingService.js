import { mockBookings, classes, academiaInfo } from '../../../shared/data/mockData';
import {
  DAY_MAP,
  SLOT_STATUS,
  BOOKING_STATUS,
  DEFAULT_CAPACITY,
  FULL_THRESHOLD,
} from '../constants/bookingConstants';

const sleep = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Hash determinista para generar enrollment numbers consistentes por slot.
 * @param {string} str
 * @returns {number}
 */
const _hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const _formatDate = (year, month, day) =>
  `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

export const bookingService = {
  /**
   * Retorna las sedes disponibles.
   * @returns {Promise<Array<{name: string, address: string}>>}
   */
  async getLocations() {
    await sleep(100);
    return academiaInfo.locations.map(l => ({ ...l }));
  },

  /**
   * Retorna los tipos de clase disponibles para filtros.
   * @returns {Promise<Array<{id: number, name: string, ageGroup: string}>>}
   */
  async getClassTypes() {
    await sleep(100);
    return classes.map(c => ({ id: c.id, name: c.name, ageGroup: c.ageGroup }));
  },

  /**
   * Genera todos los slots de un mes, filtrados por sede y clase.
   * @param {{ year: number, month: number, location: string|null, classId: number|null, userId: number|null }} params
   * @returns {Promise<Array>} Slots con estado calculado
   */
  async getMonthSlots({ year, month, location, classId, userId }) {
    await sleep(200);

    const targetClasses = classId
      ? classes.filter(c => c.id === classId)
      : [...classes];

    const userBookings = userId
      ? mockBookings.filter(b => b.userId === userId && b.status !== BOOKING_STATUS.CANCELLED)
      : [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const slots = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay();
      const dateStr = _formatDate(year, month, day);

      targetClasses.forEach(cls => {
        cls.schedules.forEach(schedule => {
          if (location && schedule.location !== location) return;
          if (DAY_MAP[schedule.day] !== dayOfWeek) return;

          const slotId = this._buildSlotId(cls.id, schedule.location, dateStr, schedule.time);
          const enrolled = _hashCode(slotId) % DEFAULT_CAPACITY;

          const isBooked = userBookings.some(
            b => b.classId === cls.id && b.date === dateStr && b.location === schedule.location
          );
          const isPast = date < today;
          const isFull = enrolled >= FULL_THRESHOLD;

          let status = SLOT_STATUS.AVAILABLE;
          if (isPast) status = SLOT_STATUS.PAST;
          else if (isBooked) status = SLOT_STATUS.BOOKED;
          else if (isFull) status = SLOT_STATUS.FULL;

          slots.push({
            id: slotId,
            classId: cls.id,
            className: cls.name,
            location: schedule.location,
            dayName: schedule.day,
            time: schedule.time,
            date: dateStr,
            capacity: DEFAULT_CAPACITY,
            enrolled,
            status,
          });
        });
      });
    }

    return slots;
  },

  /**
   * Retorna slots para una fecha específica.
   * @param {{ date: string, location: string|null, classId: number|null, userId: number|null }} params
   * @returns {Promise<Array>}
   */
  async getSlotsForDate({ date, location, classId, userId }) {
    await sleep(100);

    const [year, monthStr, dayStr] = date.split('-').map(Number);
    const targetDate = new Date(year, monthStr - 1, dayStr);
    const dayOfWeek = targetDate.getDay();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const targetClasses = classId
      ? classes.filter(c => c.id === classId)
      : [...classes];

    const userBookings = userId
      ? mockBookings.filter(b => b.userId === userId && b.status !== BOOKING_STATUS.CANCELLED)
      : [];

    const slots = [];

    targetClasses.forEach(cls => {
      cls.schedules.forEach(schedule => {
        if (location && schedule.location !== location) return;
        if (DAY_MAP[schedule.day] !== dayOfWeek) return;

        const slotId = this._buildSlotId(cls.id, schedule.location, date, schedule.time);
        const enrolled = _hashCode(slotId) % DEFAULT_CAPACITY;

        const isBooked = userBookings.some(
          b => b.classId === cls.id && b.date === date && b.location === schedule.location
        );
        const isPast = targetDate < today;
        const isFull = enrolled >= FULL_THRESHOLD;

        let status = SLOT_STATUS.AVAILABLE;
        if (isPast) status = SLOT_STATUS.PAST;
        else if (isBooked) status = SLOT_STATUS.BOOKED;
        else if (isFull) status = SLOT_STATUS.FULL;

        slots.push({
          id: slotId,
          classId: cls.id,
          className: cls.name,
          location: schedule.location,
          dayName: schedule.day,
          time: schedule.time,
          date,
          capacity: DEFAULT_CAPACITY,
          enrolled,
          status,
        });
      });
    });

    return slots;
  },

  /**
   * Retorna las reservas activas de un usuario, enriquecidas con datos de la clase.
   * @param {number} userId
   * @returns {Promise<Array>}
   */
  async getUserBookings(userId) {
    await sleep();
    return mockBookings
      .filter(b => b.userId === userId && b.status !== BOOKING_STATUS.CANCELLED)
      .map(booking => {
        const classInfo = classes.find(c => c.id === booking.classId);
        return {
          ...booking,
          className: classInfo?.name,
          instructor: classInfo?.instructor,
        };
      });
  },

  /**
   * Crea una reserva individual.
   * @param {object} bookingData
   * @returns {Promise<object>}
   */
  async createBooking(bookingData) {
    await sleep();
    const newBooking = {
      id: mockBookings.length + 1,
      status: BOOKING_STATUS.CONFIRMED,
      createdAt: new Date().toISOString(),
      ...bookingData,
    };
    mockBookings.push(newBooking);
    return newBooking;
  },

  /**
   * Crea múltiples reservas en batch a partir de selecciones.
   * @param {number} userId
   * @param {Array<{slotId: string, classId: number, className: string, location: string, day: string, time: string, date: string}>} selections
   * @returns {Promise<Array>}
   */
  async createMultipleBookings(userId, selections) {
    await sleep(400);
    const baseId = mockBookings.length + 1;
    const newBookings = selections.map((selection, idx) => ({
      id: baseId + idx,
      userId,
      slotId: selection.slotId,
      classId: selection.classId,
      className: selection.className,
      location: selection.location,
      day: selection.day,
      time: selection.time,
      date: selection.date,
      status: BOOKING_STATUS.CONFIRMED,
      createdAt: new Date().toISOString(),
    }));
    mockBookings.push(...newBookings);
    return newBookings;
  },

  /**
   * Cancela una reserva existente.
   * @param {number} bookingId
   * @param {number} userId
   * @returns {Promise<{success: boolean, booking: object}>}
   */
  async cancelBooking(bookingId, userId) {
    await sleep();
    const booking = mockBookings.find(b => b.id === bookingId && b.userId === userId);
    if (!booking) throw new Error('Reserva no encontrada');
    booking.status = BOOKING_STATUS.CANCELLED;
    return { success: true, booking: { ...booking } };
  },

  /**
   * Retorna TODAS las reservas de un usuario (sin filtrar canceladas),
   * enriquecidas con datos de la clase. Uso principal: historial del perfil.
   * @param {number} userId
   * @returns {Promise<Array>}
   */
  async getUserBookingHistory(userId) {
    await sleep();
    return mockBookings
      .filter(b => b.userId === userId)
      .map(booking => {
        const classInfo = classes.find(c => c.id === booking.classId);
        return {
          ...booking,
          className: classInfo?.name,
          instructor: classInfo?.instructor,
          ageGroup: classInfo?.ageGroup,
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  /**
   * Genera un ID único y determinista para un slot.
   * @param {number} classId
   * @param {string} location
   * @param {string} date
   * @param {string} time
   * @returns {string}
   */
  _buildSlotId(classId, location, date, time) {
    const loc = location.toLowerCase().replace(/\s+/g, '');
    const t = time.split(' ')[0].replace(':', '');
    return `slot-${classId}-${loc}-${date}-${t}`;
  },
};
