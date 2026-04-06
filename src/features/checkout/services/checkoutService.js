import { mockPayments, mockBankData, memberships, mockAttendance } from '../../../shared/data/mockData';
import { MONTH_LABELS, ENROLLMENT_FEE } from '../constants/checkoutConstants';

/**
 * @param {number} userId
 * @param {number} year
 * @returns {{ months: Array<{ month: number, label: string, year: number, amount: number, status: string, method: string|null, paidAt: string|null, membershipName: string }> }}
 */
export const getAnnualPayments = (userId, year = 2026) => {
  const userPayments = mockPayments.filter(
    (p) => p.userId === userId && p.year === year
  );

  const months = MONTH_LABELS.map((label, idx) => {
    const monthNum = idx + 1;
    const payment = userPayments.find((p) => p.month === monthNum);

    if (payment) {
      return {
        month: monthNum,
        label,
        year,
        amount: payment.amount,
        status: payment.status,
        method: payment.method,
        paidAt: payment.paidAt,
        membershipName: payment.membershipName,
      };
    }

    return {
      month: monthNum,
      label,
      year,
      amount: 0,
      status: 'none',
      method: null,
      paidAt: null,
      membershipName: null,
    };
  });

  return { months };
};

/**
 * @param {number} userId
 * @param {number} month
 * @param {number} year
 * @param {object} user
 * @returns {{ membership: string, classesAttended: number, classesAbsent: number, achievements: string[], enrollmentFee: number|null, total: number, monthLabel: string }}
 */
export const getMonthDetail = (userId, month, year, user) => {
  const attendanceRecords = mockAttendance.filter(
    (a) =>
      a.studentId === userId &&
      new Date(a.date).getMonth() + 1 === month &&
      new Date(a.date).getFullYear() === year
  );

  const classesAttended = attendanceRecords.filter(
    (a) => a.status === 'present' || a.status === 'late'
  ).length;
  const classesAbsent = attendanceRecords.filter(
    (a) => a.status === 'absent'
  ).length;

  const membershipStr = user?.membership || '';
  const membershipObj = memberships.find((m) =>
    membershipStr.toLowerCase().includes(m.name.toLowerCase().replace(' x ', ' '))
      || membershipStr.toLowerCase().includes(m.name.toLowerCase())
  );

  const amount = membershipObj?.promoPrice || membershipObj?.price || 0;
  const isFirstMonth = month === 3 && year === 2026;
  const enrollmentFee = isFirstMonth ? ENROLLMENT_FEE : null;
  const total = amount + (enrollmentFee || 0);

  return {
    membership: membershipObj?.name || membershipStr,
    classesAttended,
    classesAbsent,
    achievements: user?.achievements || [],
    enrollmentFee,
    total,
    monthLabel: MONTH_LABELS[month - 1],
  };
};

/**
 * @returns {object}
 */
export const getBankData = () => mockBankData;

/**
 * @param {number} userId
 * @returns {Array}
 */
export const getPaymentHistory = (userId) => {
  return mockPayments
    .filter((p) => p.userId === userId && p.status === 'paid')
    .sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt))
    .map((p) => ({
      ...p,
      monthLabel: MONTH_LABELS[p.month - 1],
    }));
};

/**
 * @param {number} userId
 * @param {number} month
 * @param {number} year
 * @returns {{ status: string }}
 */
export const getCurrentMonthPaymentStatus = (userId, year = 2026) => {
  const currentMonth = new Date().getMonth() + 1;
  const payment = mockPayments.find(
    (p) => p.userId === userId && p.month === currentMonth && p.year === year
  );
  return payment ? { status: payment.status, amount: payment.amount } : { status: 'none', amount: 0 };
};
