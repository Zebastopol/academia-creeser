import { memberships } from '../../../shared/data/publicData'
import { googlePlacesService } from '../../testimonials/services/googlePlacesService'

const sleep = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const marketingService = {
  async getMemberships() {
    await sleep();
    return [...memberships];
  },

  /**
   * Retorna testimonios en el shape estándar de Google Places:
   *   { rating, text, date, authorName, authorPhoto }
   * Usa Google Places API vía serverless function; cae a mockData si falla.
   */
  async getTestimonials() {
    const data = await googlePlacesService.getReviews()
    return data.reviews
  },
};
