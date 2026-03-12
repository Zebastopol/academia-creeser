import { classes } from '../../../shared/data/mockData';

const sleep = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const classService = {
  async getClasses() {
    await sleep();
    return [...classes];
  },

  async getClassById(id) {
    await sleep();
    return classes.find(c => c.id === parseInt(id));
  }
};
