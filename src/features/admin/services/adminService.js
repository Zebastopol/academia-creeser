import {
  mockUsers, classes, events, mockBookings, mockAttendance,
  mockContactSubmissions, mockMarketingMetrics, mockAcademicCalendar,
  mockRevenue, academiaInfo,
} from '../../../shared/data/mockData';

const sleep = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const adminService = {
  // ─── Dashboard KPIs ───────────────────────────────────────────
  async getDashboardKPIs() {
    await sleep(200);
    const members = mockUsers.filter((u) => u.role === 'member');
    const activeMembers = members.filter((u) => u.status === 'active');
    const totalBookings = mockBookings.filter((b) => b.status === 'confirmed').length;
    const thisMonth = new Date().getMonth() + 1;
    const thisYear = new Date().getFullYear();
    const monthBookings = mockBookings.filter((b) => {
      const d = new Date(b.date);
      return d.getMonth() + 1 === thisMonth && d.getFullYear() === thisYear && b.status === 'confirmed';
    }).length;
    const rev = mockRevenue.find((r) => r.month === thisMonth && r.year === thisYear);

    return {
      totalUsers: mockUsers.length,
      activeMembers: activeMembers.length,
      totalClasses: classes.length,
      totalBookings,
      monthBookings,
      monthRevenue: rev?.revenue ?? 0,
      projectedRevenue: rev?.projected ?? 0,
      pendingContacts: mockContactSubmissions.filter((c) => c.status === 'new').length,
    };
  },

  async getMarketingMetrics() {
    await sleep(150);
    return { ...mockMarketingMetrics };
  },

  async getRevenueData() {
    await sleep(150);
    return [...mockRevenue];
  },

  async getContactSubmissions() {
    await sleep(200);
    return [...mockContactSubmissions].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  // ─── Users CRUD ───────────────────────────────────────────────
  async getUsers(filters = {}) {
    await sleep(200);
    let result = [...mockUsers];
    if (filters.role && filters.role !== 'all') result = result.filter((u) => u.role === filters.role);
    if (filters.status && filters.status !== 'all') result = result.filter((u) => u.status === filters.status);
    if (filters.search) {
      const term = filters.search.toLowerCase();
      result = result.filter((u) => u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term));
    }
    return result;
  },

  async getUserById(id) {
    await sleep(100);
    return mockUsers.find((u) => u.id === id) || null;
  },

  async createUser(data) {
    await sleep(300);
    const newUser = {
      id: Math.max(...mockUsers.map((u) => u.id)) + 1,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active',
      classIds: [],
      achievements: [],
      ...data,
    };
    mockUsers.push(newUser);
    return { ...newUser };
  },

  async updateUser(id, data) {
    await sleep(300);
    const idx = mockUsers.findIndex((u) => u.id === id);
    if (idx === -1) throw new Error('Usuario no encontrado');
    mockUsers[idx] = { ...mockUsers[idx], ...data };
    return { ...mockUsers[idx] };
  },

  async toggleUserStatus(id) {
    await sleep(200);
    const user = mockUsers.find((u) => u.id === id);
    if (!user) throw new Error('Usuario no encontrado');
    user.status = user.status === 'active' ? 'inactive' : 'active';
    return { ...user };
  },

  // ─── Student Metrics ──────────────────────────────────────────
  async getStudentMetrics(userId) {
    await sleep(200);
    const userBookings = mockBookings.filter((b) => b.userId === userId);
    const confirmed = userBookings.filter((b) => b.status === 'confirmed');
    const attendance = mockAttendance.filter((a) => a.userId === userId);
    const present = attendance.filter((a) => a.status === 'present' || a.status === 'late').length;
    const total = attendance.length;

    return {
      totalBookings: userBookings.length,
      confirmedBookings: confirmed.length,
      cancelledBookings: userBookings.filter((b) => b.status === 'cancelled').length,
      attendanceRecords: total,
      presentCount: present,
      attendanceRate: total > 0 ? Math.round((present / total) * 100) : 0,
      totalHours: confirmed.length,
    };
  },

  // ─── Classes CRUD ─────────────────────────────────────────────
  async getClasses(filters = {}) {
    await sleep(200);
    let result = [...classes];
    if (filters.search) {
      const term = filters.search.toLowerCase();
      result = result.filter((c) => c.name.toLowerCase().includes(term));
    }
    return result;
  },

  async createClass(data) {
    await sleep(300);
    const newClass = { id: Math.max(...classes.map((c) => c.id)) + 1, ...data };
    classes.push(newClass);
    return { ...newClass };
  },

  async updateClass(id, data) {
    await sleep(300);
    const idx = classes.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error('Clase no encontrada');
    classes[idx] = { ...classes[idx], ...data };
    return { ...classes[idx] };
  },

  async deleteClass(id) {
    await sleep(200);
    const idx = classes.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error('Clase no encontrada');
    classes.splice(idx, 1);
    return { success: true };
  },

  // ─── Events CRUD ──────────────────────────────────────────────
  async getEvents(filters = {}) {
    await sleep(200);
    let result = [...events];
    if (filters.search) {
      const term = filters.search.toLowerCase();
      result = result.filter((e) => e.title.toLowerCase().includes(term));
    }
    return result;
  },

  async createEvent(data) {
    await sleep(300);
    const newEvent = { id: Math.max(...events.map((e) => e.id)) + 1, ...data };
    events.push(newEvent);
    return { ...newEvent };
  },

  async updateEvent(id, data) {
    await sleep(300);
    const idx = events.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error('Evento no encontrado');
    events[idx] = { ...events[idx], ...data };
    return { ...events[idx] };
  },

  async deleteEvent(id) {
    await sleep(200);
    const idx = events.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error('Evento no encontrado');
    events.splice(idx, 1);
    return { success: true };
  },

  // ─── Bookings Management ─────────────────────────────────────
  async getAllBookings(filters = {}) {
    await sleep(200);
    let result = mockBookings.map((b) => {
      const user = mockUsers.find((u) => u.id === b.userId);
      const cls = classes.find((c) => c.id === b.classId);
      return { ...b, userName: user?.name ?? 'Desconocido', className: cls?.name ?? 'Desconocida' };
    });
    if (filters.status && filters.status !== 'all') result = result.filter((b) => b.status === filters.status);
    if (filters.userId) result = result.filter((b) => b.userId === filters.userId);
    if (filters.classId && filters.classId !== 'all') result = result.filter((b) => b.classId === Number(filters.classId));
    if (filters.dateRange?.start) result = result.filter((b) => b.date >= filters.dateRange.start);
    if (filters.dateRange?.end) result = result.filter((b) => b.date <= filters.dateRange.end);
    if (filters.search) {
      const term = filters.search.toLowerCase();
      result = result.filter((b) => b.userName.toLowerCase().includes(term) || b.className.toLowerCase().includes(term));
    }
    return result.sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  async updateBooking(id, data) {
    await sleep(300);
    const booking = mockBookings.find((b) => b.id === id);
    if (!booking) throw new Error('Reserva no encontrada');
    Object.assign(booking, data);
    return { ...booking };
  },

  async cancelBookingAdmin(id) {
    await sleep(200);
    const booking = mockBookings.find((b) => b.id === id);
    if (!booking) throw new Error('Reserva no encontrada');
    booking.status = 'cancelled';
    return { ...booking };
  },

  // ─── Reports ──────────────────────────────────────────────────
  async getAttendanceReport(filters = {}) {
    await sleep(300);
    let records = [...mockAttendance];
    if (filters.classId && filters.classId !== 'all') records = records.filter((a) => a.classId === Number(filters.classId));
    if (filters.location && filters.location !== 'all') {
      const bookingIds = mockBookings.filter((b) => b.location === filters.location).map((b) => b.id);
      records = records.filter((a) => bookingIds.includes(a.bookingId));
    }
    if (filters.dateRange?.start) records = records.filter((a) => a.date >= filters.dateRange.start);
    if (filters.dateRange?.end) records = records.filter((a) => a.date <= filters.dateRange.end);

    const total = records.length;
    const present = records.filter((a) => a.status === 'present').length;
    const late = records.filter((a) => a.status === 'late').length;
    const absent = records.filter((a) => a.status === 'absent').length;

    const byClass = {};
    records.forEach((r) => {
      const cls = classes.find((c) => c.id === r.classId);
      const name = cls?.name ?? 'Desconocida';
      if (!byClass[name]) byClass[name] = { present: 0, late: 0, absent: 0, total: 0 };
      byClass[name][r.status]++;
      byClass[name].total++;
    });

    return { total, present, late, absent, attendanceRate: total > 0 ? Math.round(((present + late) / total) * 100) : 0, byClass, records };
  },

  async getPopularityReport(filters = {}) {
    await sleep(300);
    let bookings = mockBookings.filter((b) => b.status === 'confirmed');
    if (filters.dateRange?.start) bookings = bookings.filter((b) => b.date >= filters.dateRange.start);
    if (filters.dateRange?.end) bookings = bookings.filter((b) => b.date <= filters.dateRange.end);

    const byClass = {};
    bookings.forEach((b) => {
      const cls = classes.find((c) => c.id === b.classId);
      const name = cls?.name ?? 'Desconocida';
      byClass[name] = (byClass[name] || 0) + 1;
    });

    const byLocation = {};
    bookings.forEach((b) => {
      byLocation[b.location] = (byLocation[b.location] || 0) + 1;
    });

    const byMonth = {};
    bookings.forEach((b) => {
      const key = b.date.substring(0, 7);
      byMonth[key] = (byMonth[key] || 0) + 1;
    });

    return { byClass, byLocation, byMonth, total: bookings.length };
  },

  // ─── Academic Calendar ────────────────────────────────────────
  async getAcademicEvents(filters = {}) {
    await sleep(200);
    let result = [...mockAcademicCalendar];
    if (filters.type && filters.type !== 'all') result = result.filter((e) => e.type === filters.type);
    if (filters.classId && filters.classId !== 'all') result = result.filter((e) => e.classIds.includes(Number(filters.classId)));
    return result;
  },

  async createAcademicEvent(data) {
    await sleep(300);
    const newEvent = { id: Math.max(...mockAcademicCalendar.map((e) => e.id)) + 1, ...data };
    mockAcademicCalendar.push(newEvent);
    return { ...newEvent };
  },

  async updateAcademicEvent(id, data) {
    await sleep(300);
    const idx = mockAcademicCalendar.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error('Evento académico no encontrado');
    mockAcademicCalendar[idx] = { ...mockAcademicCalendar[idx], ...data };
    return { ...mockAcademicCalendar[idx] };
  },

  async deleteAcademicEvent(id) {
    await sleep(200);
    const idx = mockAcademicCalendar.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error('Evento académico no encontrado');
    mockAcademicCalendar.splice(idx, 1);
    return { success: true };
  },

  // ─── Helpers ──────────────────────────────────────────────────
  getLocations() {
    return academiaInfo.locations.map((l) => l.name);
  },

  getClassOptions() {
    return classes.map((c) => ({ id: c.id, name: c.name }));
  },
};
