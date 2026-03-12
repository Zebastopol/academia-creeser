import { mockBookings, classes } from '../../../shared/data/mockData';

const sleep = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const bookingService = {
  async getUserBookings(userId) {
    await sleep();
    return mockBookings
      .filter(b => b.userId === userId)
      .map(booking => {
        const classInfo = classes.find(c => c.id === booking.classId);
        return {
          ...booking,
          className: classInfo?.name,
          instructor: classInfo?.instructor
        };
      });
  },

  async createBooking(bookingData) {
    await sleep();
    const newBooking = {
      id: mockBookings.length + 1,
      status: 'confirmed',
      ...bookingData
    };
    mockBookings.push(newBooking);
    return newBooking;
  }
};
