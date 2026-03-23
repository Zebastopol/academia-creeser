/**
 * Stub para futura integración con Google Calendar API.
 * Preparado para OAuth2 flow y sincronización de eventos.
 *
 * @returns {{
 *   isConnected: boolean,
 *   connect: () => Promise<void>,
 *   syncBooking: (booking: object) => Promise<void>,
 *   removeEvent: (eventId: string) => Promise<void>
 * }}
 */
export const useGoogleCalendar = () => ({
  /** Indica si el usuario tiene su cuenta de Google Calendar conectada */
  isConnected: false,

  /**
   * Inicia el flujo OAuth2 para conectar Google Calendar.
   * Futuro: redirigir al consent screen de Google y manejar el callback.
   */
  connect: async () => {
    console.info('[GoogleCalendar] connect() — pendiente de implementación');
  },

  /**
   * Sincroniza una reserva como evento en Google Calendar.
   * Futuro: POST a Google Calendar API v3 events.insert
   * @param {object} booking - Objeto Booking confirmado
   */
  syncBooking: async (booking) => {
    console.info('[GoogleCalendar] syncBooking() — pendiente de implementación', booking);
  },

  /**
   * Elimina un evento sincronizado de Google Calendar.
   * Futuro: DELETE a Google Calendar API v3 events.delete
   * @param {string} eventId - ID del evento en GCal
   */
  removeEvent: async (eventId) => {
    console.info('[GoogleCalendar] removeEvent() — pendiente de implementación', eventId);
  },
});
