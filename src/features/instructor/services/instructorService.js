import {
  mockUsers, classes, mockBookings, mockAttendance,
  mockProgressNotes, academiaInfo,
} from '../../../shared/data/mockData';
import { DAY_MAP } from '../constants/instructorConstants';

const sleep = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const instructorService = {
  // ─── Dashboard ────────────────────────────────────────────────
  async getInstructorKPIs(instructorId) {
    await sleep(200);
    const myClasses = classes.filter((c) => c.instructorId === instructorId);
    const classIds = myClasses.map((c) => c.id);
    const students = mockUsers.filter(
      (u) => u.role === 'member' && u.status === 'active' && u.classIds.some((cid) => classIds.includes(cid))
    );

    const now = new Date();
    const thisMonth = now.getMonth() + 1;
    const thisYear = now.getFullYear();
    const monthAttendance = mockAttendance.filter((a) => {
      const d = new Date(a.date);
      return classIds.includes(a.classId) && d.getMonth() + 1 === thisMonth && d.getFullYear() === thisYear;
    });
    const present = monthAttendance.filter((a) => a.status === 'present' || a.status === 'late').length;
    const avgAttendance = monthAttendance.length > 0 ? Math.round((present / monthAttendance.length) * 100) : 0;

    return {
      totalStudents: students.length,
      totalClasses: myClasses.length,
      monthAttendanceRate: avgAttendance,
      monthAttendanceRecords: monthAttendance.length,
      totalBookingsThisMonth: mockBookings.filter((b) => {
        const d = new Date(b.date);
        return classIds.includes(b.classId) && d.getMonth() + 1 === thisMonth && d.getFullYear() === thisYear && b.status === 'confirmed';
      }).length,
    };
  },

  async getTodayClasses(instructorId) {
    await sleep(150);
    const today = new Date();
    const dayName = DAY_MAP[today.getDay()];
    const myClasses = classes.filter((c) => c.instructorId === instructorId);

    return myClasses
      .map((cls) => {
        const todaySchedules = cls.schedules.filter((s) => s.day === dayName);
        if (todaySchedules.length === 0) return null;
        const studentCount = mockUsers.filter(
          (u) => u.role === 'member' && u.status === 'active' && u.classIds.includes(cls.id)
        ).length;
        return todaySchedules.map((s) => ({
          classId: cls.id,
          className: cls.name,
          ageGroup: cls.ageGroup,
          time: s.time,
          location: s.location,
          studentCount,
        }));
      })
      .filter(Boolean)
      .flat()
      .sort((a, b) => a.time.localeCompare(b.time));
  },

  async getWeekSchedule(instructorId) {
    await sleep(150);
    const myClasses = classes.filter((c) => c.instructorId === instructorId);
    const schedule = {};

    myClasses.forEach((cls) => {
      cls.schedules.forEach((s) => {
        if (!schedule[s.day]) schedule[s.day] = [];
        schedule[s.day].push({
          classId: cls.id,
          className: cls.name,
          ageGroup: cls.ageGroup,
          time: s.time,
          location: s.location,
        });
      });
    });

    Object.keys(schedule).forEach((day) => {
      schedule[day].sort((a, b) => a.time.localeCompare(b.time));
    });

    return schedule;
  },

  // ─── Clases ───────────────────────────────────────────────────
  async getMyClasses(instructorId) {
    await sleep(200);
    const myClasses = classes.filter((c) => c.instructorId === instructorId);

    return myClasses.map((cls) => {
      const students = mockUsers.filter(
        (u) => u.role === 'member' && u.status === 'active' && u.classIds.includes(cls.id)
      );
      const classAttendance = mockAttendance.filter((a) => a.classId === cls.id);
      const presentCount = classAttendance.filter((a) => a.status === 'present' || a.status === 'late').length;
      const avgAttendance = classAttendance.length > 0 ? Math.round((presentCount / classAttendance.length) * 100) : 0;

      return {
        ...cls,
        studentCount: students.length,
        avgAttendance,
        totalSessions: classAttendance.length,
      };
    });
  },

  async getClassDetail(classId) {
    await sleep(100);
    return classes.find((c) => c.id === classId) || null;
  },

  async getClassStudents(classId) {
    await sleep(200);
    const students = mockUsers.filter(
      (u) => u.role === 'member' && u.classIds.includes(classId)
    );

    return students.map((s) => {
      const attendance = mockAttendance.filter((a) => a.userId === s.id && a.classId === classId);
      const present = attendance.filter((a) => a.status === 'present' || a.status === 'late').length;
      return {
        ...s,
        attendanceRate: attendance.length > 0 ? Math.round((present / attendance.length) * 100) : 0,
        totalClasses: attendance.length,
        notes: mockProgressNotes.filter((n) => n.studentId === s.id && n.classId === classId),
      };
    });
  },

  // ─── Alumnos ──────────────────────────────────────────────────
  async getStudentsByClass(classId, filters = {}) {
    await sleep(200);
    let students = mockUsers.filter(
      (u) => u.role === 'member' && u.classIds.includes(classId)
    );

    if (filters.status && filters.status !== 'all') {
      students = students.filter((s) => s.status === filters.status);
    }
    if (filters.search) {
      const term = filters.search.toLowerCase();
      students = students.filter((s) => s.name.toLowerCase().includes(term) || s.email.toLowerCase().includes(term));
    }

    return students.map((s) => {
      const attendance = mockAttendance.filter((a) => a.userId === s.id && a.classId === classId);
      const present = attendance.filter((a) => a.status === 'present' || a.status === 'late').length;
      return {
        ...s,
        attendanceRate: attendance.length > 0 ? Math.round((present / attendance.length) * 100) : 0,
        totalAttendance: attendance.length,
      };
    });
  },

  async getStudentDetail(studentId) {
    await sleep(100);
    const student = mockUsers.find((u) => u.id === studentId);
    if (!student) return null;

    const bookings = mockBookings.filter((b) => b.userId === studentId);
    const attendance = mockAttendance.filter((a) => a.userId === studentId);
    const present = attendance.filter((a) => a.status === 'present' || a.status === 'late').length;
    const notes = mockProgressNotes.filter((n) => n.studentId === studentId);

    return {
      ...student,
      totalBookings: bookings.length,
      confirmedBookings: bookings.filter((b) => b.status === 'confirmed').length,
      attendanceRate: attendance.length > 0 ? Math.round((present / attendance.length) * 100) : 0,
      totalAttendance: attendance.length,
      notes: notes.sort((a, b) => new Date(b.date) - new Date(a.date)),
    };
  },

  async getStudentProgress(studentId) {
    await sleep(200);
    const attendance = mockAttendance.filter((a) => a.userId === studentId);
    const notes = mockProgressNotes.filter((n) => n.studentId === studentId);

    const byMonth = {};
    attendance.forEach((a) => {
      const key = a.date.substring(0, 7);
      if (!byMonth[key]) byMonth[key] = { present: 0, absent: 0, late: 0, total: 0 };
      byMonth[key][a.status]++;
      byMonth[key].total++;
    });

    return {
      attendanceByMonth: Object.entries(byMonth).map(([month, data]) => ({
        month,
        ...data,
        rate: data.total > 0 ? Math.round(((data.present + data.late) / data.total) * 100) : 0,
      })).sort((a, b) => a.month.localeCompare(b.month)),
      notes: notes.sort((a, b) => new Date(b.date) - new Date(a.date)),
    };
  },

  // ─── Asistencia ───────────────────────────────────────────────
  async getAttendanceByClassAndDate(classId, date) {
    await sleep(200);
    const students = mockUsers.filter(
      (u) => u.role === 'member' && u.status === 'active' && u.classIds.includes(classId)
    );
    const existing = mockAttendance.filter((a) => a.classId === classId && a.date === date);

    return students.map((s) => {
      const record = existing.find((a) => a.userId === s.id);
      return {
        userId: s.id,
        name: s.name,
        avatar: s.avatar,
        belt: s.belt,
        status: record?.status || null,
        recordId: record?.id || null,
      };
    });
  },

  async markAttendance(records, instructorId) {
    await sleep(300);
    const results = [];
    records.forEach((r) => {
      const existing = mockAttendance.find(
        (a) => a.classId === r.classId && a.date === r.date && a.userId === r.userId
      );
      if (existing) {
        existing.status = r.status;
        existing.markedBy = instructorId;
        existing.markedAt = new Date().toISOString();
        results.push({ ...existing });
      } else {
        const newRecord = {
          id: mockAttendance.length > 0 ? Math.max(...mockAttendance.map((a) => a.id)) + 1 : 1,
          bookingId: null,
          userId: r.userId,
          classId: r.classId,
          date: r.date,
          status: r.status,
          markedBy: instructorId,
          markedAt: new Date().toISOString(),
        };
        mockAttendance.push(newRecord);
        results.push({ ...newRecord });
      }
    });
    return results;
  },

  async updateAttendanceRecord(id, status, instructorId) {
    await sleep(200);
    const record = mockAttendance.find((a) => a.id === id);
    if (!record) throw new Error('Registro no encontrado');
    record.status = status;
    record.markedBy = instructorId;
    record.markedAt = new Date().toISOString();
    return { ...record };
  },

  async getAttendanceHistory(classId, filters = {}) {
    await sleep(200);
    let records = mockAttendance.filter((a) => a.classId === classId);

    if (filters.dateRange?.start) records = records.filter((a) => a.date >= filters.dateRange.start);
    if (filters.dateRange?.end) records = records.filter((a) => a.date <= filters.dateRange.end);

    return records
      .map((r) => {
        const user = mockUsers.find((u) => u.id === r.userId);
        return { ...r, studentName: user?.name ?? 'Desconocido', studentAvatar: user?.avatar };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  // ─── Reportes ─────────────────────────────────────────────────
  async getStudentProgressReport(studentId, filters = {}) {
    await sleep(300);
    const student = mockUsers.find((u) => u.id === studentId);
    if (!student) return null;

    let attendance = mockAttendance.filter((a) => a.userId === studentId);
    let notes = mockProgressNotes.filter((n) => n.studentId === studentId);

    if (filters.classId && filters.classId !== 'all') {
      attendance = attendance.filter((a) => a.classId === Number(filters.classId));
      notes = notes.filter((n) => n.classId === Number(filters.classId));
    }
    if (filters.dateRange?.start) {
      attendance = attendance.filter((a) => a.date >= filters.dateRange.start);
      notes = notes.filter((n) => n.date >= filters.dateRange.start);
    }
    if (filters.dateRange?.end) {
      attendance = attendance.filter((a) => a.date <= filters.dateRange.end);
      notes = notes.filter((n) => n.date <= filters.dateRange.end);
    }

    const byMonth = {};
    attendance.forEach((a) => {
      const key = a.date.substring(0, 7);
      if (!byMonth[key]) byMonth[key] = { present: 0, absent: 0, late: 0, total: 0 };
      byMonth[key][a.status]++;
      byMonth[key].total++;
    });

    const present = attendance.filter((a) => a.status === 'present' || a.status === 'late').length;

    return {
      student: { id: student.id, name: student.name, avatar: student.avatar, belt: student.belt, achievements: student.achievements },
      attendanceRate: attendance.length > 0 ? Math.round((present / attendance.length) * 100) : 0,
      totalRecords: attendance.length,
      attendanceByMonth: Object.entries(byMonth).map(([month, data]) => ({
        month, ...data,
        rate: data.total > 0 ? Math.round(((data.present + data.late) / data.total) * 100) : 0,
      })).sort((a, b) => a.month.localeCompare(b.month)),
      notes: notes.sort((a, b) => new Date(b.date) - new Date(a.date)),
    };
  },

  async getClassProgressReport(classId, filters = {}) {
    await sleep(300);
    const cls = classes.find((c) => c.id === Number(classId));
    if (!cls) return null;

    let attendance = mockAttendance.filter((a) => a.classId === Number(classId));
    if (filters.dateRange?.start) attendance = attendance.filter((a) => a.date >= filters.dateRange.start);
    if (filters.dateRange?.end) attendance = attendance.filter((a) => a.date <= filters.dateRange.end);

    const students = mockUsers.filter((u) => u.role === 'member' && u.classIds.includes(Number(classId)));
    const beltDistribution = {};
    students.forEach((s) => {
      const belt = s.belt || 'Sin cinturón';
      beltDistribution[belt] = (beltDistribution[belt] || 0) + 1;
    });

    const byMonth = {};
    attendance.forEach((a) => {
      const key = a.date.substring(0, 7);
      if (!byMonth[key]) byMonth[key] = { present: 0, absent: 0, late: 0, total: 0 };
      byMonth[key][a.status]++;
      byMonth[key].total++;
    });

    const studentAttendance = students.map((s) => {
      const sa = attendance.filter((a) => a.userId === s.id);
      const present = sa.filter((a) => a.status === 'present' || a.status === 'late').length;
      return {
        id: s.id, name: s.name, avatar: s.avatar, belt: s.belt,
        rate: sa.length > 0 ? Math.round((present / sa.length) * 100) : 0,
        total: sa.length,
      };
    }).sort((a, b) => b.rate - a.rate);

    const totalPresent = attendance.filter((a) => a.status === 'present' || a.status === 'late').length;

    return {
      className: cls.name,
      ageGroup: cls.ageGroup,
      totalStudents: students.length,
      attendanceRate: attendance.length > 0 ? Math.round((totalPresent / attendance.length) * 100) : 0,
      totalRecords: attendance.length,
      beltDistribution,
      attendanceByMonth: Object.entries(byMonth).map(([month, data]) => ({
        month, ...data,
        rate: data.total > 0 ? Math.round(((data.present + data.late) / data.total) * 100) : 0,
      })).sort((a, b) => a.month.localeCompare(b.month)),
      studentRanking: studentAttendance,
    };
  },

  async createProgressNote(data) {
    await sleep(300);
    const newNote = {
      id: mockProgressNotes.length > 0 ? Math.max(...mockProgressNotes.map((n) => n.id)) + 1 : 1,
      ...data,
      date: data.date || new Date().toISOString().split('T')[0],
    };
    mockProgressNotes.push(newNote);
    return { ...newNote };
  },

  async getProgressNotes(filters = {}) {
    await sleep(200);
    let notes = [...mockProgressNotes];

    if (filters.studentId) notes = notes.filter((n) => n.studentId === Number(filters.studentId));
    if (filters.classId && filters.classId !== 'all') notes = notes.filter((n) => n.classId === Number(filters.classId));
    if (filters.category && filters.category !== 'all') notes = notes.filter((n) => n.category === filters.category);
    if (filters.dateRange?.start) notes = notes.filter((n) => n.date >= filters.dateRange.start);
    if (filters.dateRange?.end) notes = notes.filter((n) => n.date <= filters.dateRange.end);

    return notes
      .map((n) => {
        const student = mockUsers.find((u) => u.id === n.studentId);
        const cls = classes.find((c) => c.id === n.classId);
        return { ...n, studentName: student?.name ?? 'Desconocido', className: cls?.name ?? 'Desconocida' };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  // ─── Helpers ──────────────────────────────────────────────────
  getLocations() {
    return academiaInfo.locations.map((l) => l.name);
  },

  getClassOptions(instructorId) {
    return classes
      .filter((c) => c.instructorId === instructorId)
      .map((c) => ({ id: c.id, name: c.name, ageGroup: c.ageGroup }));
  },
};
