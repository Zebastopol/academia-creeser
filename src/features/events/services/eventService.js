import { events } from '../../../shared/data/mockData';

const sleep = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const eventService = {
  async getEvents(limit) {
    await sleep();
    return limit ? events.slice(0, limit) : [...events];
  },

  async getEventById(id) {
    await sleep();
    return events.find(e => e.id === parseInt(id));
  }
};
