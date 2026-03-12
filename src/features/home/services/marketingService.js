import { memberships, testimonials } from '../../../shared/data/mockData';

const sleep = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const marketingService = {
  async getMemberships() {
    await sleep();
    return [...memberships];
  },

  async getTestimonials() {
    await sleep();
    return [...testimonials];
  }
};
