import { mockUsers } from '../../../shared/data/mockData';
import { authService } from '../../auth/services/authService';
import { bookingService } from '../../bookings/services/bookingService';
import {
  BELT_PROGRESSION,
  ACHIEVEMENTS_CATALOG,
  PASSWORD_RULES,
} from '../constants/profileConstants';

const sleep = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * @param {string} password
 * @returns {{ valid: boolean, errors: string[] }}
 */
const _validatePasswordStrength = (password) => {
  const errors = [];
  if (password.length < PASSWORD_RULES.minLength) {
    errors.push(`Mínimo ${PASSWORD_RULES.minLength} caracteres`);
  }
  if (PASSWORD_RULES.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Al menos una letra mayúscula');
  }
  if (PASSWORD_RULES.requireNumber && !/\d/.test(password)) {
    errors.push('Al menos un número');
  }
  return { valid: errors.length === 0, errors };
};

/**
 * Calcula la semana ISO a la que pertenece una fecha (lunes = inicio de semana).
 * @param {string} dateStr  YYYY-MM-DD
 * @returns {string} "YYYY-WNN"
 */
const _weekKey = (dateStr) => {
  const d = new Date(dateStr + 'T12:00:00');
  const dayOfWeek = d.getDay() || 7;
  d.setDate(d.getDate() + 4 - dayOfWeek);
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return `${d.getFullYear()}-W${String(weekNo).padStart(2, '0')}`;
};

export const profileService = {
  /**
   * Actualiza datos personales. Delega la persistencia en authService.
   * @param {number} userId
   * @param {{ name?: string, email?: string, phone?: string, birthDate?: string, emergencyContact?: { name: string, phone: string } }} data
   * @returns {Promise<object>} Usuario actualizado
   */
  async updatePersonalInfo(userId, data) {
    await sleep();
    const allowedFields = ['name', 'email', 'phone', 'birthDate', 'emergencyContact', 'avatar'];
    const sanitized = {};
    for (const key of allowedFields) {
      if (data[key] !== undefined) sanitized[key] = data[key];
    }
    return authService.updateProfile(userId, sanitized);
  },

  /**
   * Valida la contraseña actual y establece una nueva.
   * @param {number} userId
   * @param {string} currentPassword
   * @param {string} newPassword
   * @returns {Promise<{ success: boolean }>}
   */
  async changePassword(userId, currentPassword, newPassword) {
    await sleep(400);

    const user = mockUsers.find(u => u.id === userId);
    if (!user) throw new Error('Usuario no encontrado');
    if (user.password !== currentPassword) {
      throw new Error('La contraseña actual es incorrecta');
    }

    const validation = _validatePasswordStrength(newPassword);
    if (!validation.valid) {
      throw new Error(validation.errors.join('. '));
    }

    user.password = newPassword;
    return { success: true };
  },

  /**
   * Retorna el historial completo de clases (delegando en bookingService).
   * @param {number} userId
   * @returns {Promise<Array>}
   */
  async getClassHistory(userId) {
    return bookingService.getUserBookingHistory(userId);
  },

  /**
   * Evalúa qué logros ha desbloqueado el usuario con base en su historial.
   * @param {number} userId
   * @returns {Promise<Array<{ id: string, name: string, description: string, icon: string, unlocked: boolean, unlockedAt: string|null }>>}
   */
  async getAchievements(userId) {
    const history = await bookingService.getUserBookingHistory(userId);
    const confirmed = history.filter(b => b.status === 'confirmed');

    const weekCounts = {};
    confirmed.forEach(b => {
      const wk = _weekKey(b.date);
      weekCounts[wk] = (weekCounts[wk] || 0) + 1;
    });

    const monthCounts = {};
    confirmed.forEach(b => {
      const mk = b.date.slice(0, 7);
      monthCounts[mk] = (monthCounts[mk] || 0) + 1;
    });

    const totalConfirmed = confirmed.length;
    const maxWeekly = Math.max(0, ...Object.values(weekCounts));

    const bestMonthAttendance = (() => {
      if (Object.keys(monthCounts).length === 0) return 0;
      const allBookingsMonth = {};
      history.forEach(b => {
        const mk = b.date.slice(0, 7);
        allBookingsMonth[mk] = (allBookingsMonth[mk] || 0) + 1;
      });
      let best = 0;
      for (const mk of Object.keys(allBookingsMonth)) {
        const total = allBookingsMonth[mk];
        const conf = monthCounts[mk] || 0;
        if (total > 0) {
          best = Math.max(best, Math.round((conf / total) * 100));
        }
      }
      return best;
    })();

    return ACHIEVEMENTS_CATALOG.map(achievement => {
      let unlocked = false;
      let unlockedAt = null;

      if (achievement.type === 'classes') {
        unlocked = totalConfirmed >= achievement.threshold;
        if (unlocked) {
          const sorted = [...confirmed].sort((a, b) => new Date(a.date) - new Date(b.date));
          unlockedAt = sorted[achievement.threshold - 1]?.date || null;
        }
      } else if (achievement.type === 'weekly') {
        unlocked = maxWeekly >= achievement.threshold;
      } else if (achievement.type === 'monthly_attendance') {
        unlocked = bestMonthAttendance >= achievement.threshold;
      }

      return { ...achievement, unlocked, unlockedAt };
    });
  },

  /**
   * Métricas de progreso del usuario.
   * @param {number} userId
   * @param {string} [userBelt]
   * @returns {Promise<{ totalClasses: number, attendancePercent: number, currentStreak: number, beltProgress: number, beltName: string, nextBelt: string|null }>}
   */
  async getProgressStats(userId, userBelt) {
    const history = await bookingService.getUserBookingHistory(userId);
    const confirmed = history.filter(b => b.status === 'confirmed');
    const totalClasses = confirmed.length;

    const attendancePercent = history.length > 0
      ? Math.round((confirmed.length / history.length) * 100)
      : 0;

    const sortedDates = [...new Set(confirmed.map(b => b.date))].sort();
    let currentStreak = 0;
    if (sortedDates.length > 0) {
      currentStreak = 1;
      for (let i = sortedDates.length - 1; i > 0; i--) {
        const curr = new Date(sortedDates[i] + 'T12:00:00');
        const prev = new Date(sortedDates[i - 1] + 'T12:00:00');
        const diff = (curr - prev) / (1000 * 60 * 60 * 24);
        if (diff <= 7) {
          currentStreak++;
        } else {
          break;
        }
      }
    }

    const currentBeltIdx = BELT_PROGRESSION.findIndex(
      b => b.name === userBelt
    );
    const beltProgress = currentBeltIdx >= 0
      ? Math.round(((currentBeltIdx + 1) / BELT_PROGRESSION.length) * 100)
      : 0;
    const nextBelt = currentBeltIdx >= 0 && currentBeltIdx < BELT_PROGRESSION.length - 1
      ? BELT_PROGRESSION[currentBeltIdx + 1].name
      : null;

    return {
      totalClasses,
      attendancePercent,
      currentStreak,
      beltProgress,
      beltName: userBelt || 'Sin cinturón',
      nextBelt,
    };
  },
};
