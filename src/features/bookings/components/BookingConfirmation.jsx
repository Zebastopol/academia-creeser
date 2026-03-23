import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FaCalendarCheck, FaInfoCircle } from 'react-icons/fa';
import Button from '../../../shared/components/atoms/Button';

/**
 * Modal de confirmación de reservas. Soporta una reserva o un array (batch).
 * @param {{
 *   bookings: object|Array,
 *   onConfirm: Function,
 *   onCancel: Function,
 *   isLoading: boolean
 * }} props
 */
const BookingConfirmation = ({ bookings, onConfirm, onCancel, isLoading }) => {
  const bookingList = Array.isArray(bookings) ? bookings : [bookings];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-creeser shadow-2xl overflow-hidden border border-gray-100"
    >
      <div className="bg-dynamic-main p-6 text-white flex items-center space-x-4">
        <div className="bg-white/20 p-3 rounded-full">
          <FaCalendarCheck size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Confirmar Asistencia</h3>
          <p className="text-white/80 text-sm">
            {bookingList.length === 1
              ? 'Verifica los detalles de tu clase'
              : `Confirma tus ${bookingList.length} reservas`}
          </p>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {bookingList.map((booking, idx) => (
          <div
            key={booking.slotId || booking.id || idx}
            className={bookingList.length > 1 ? 'pb-4 border-b border-gray-100 last:border-0 last:pb-0' : ''}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Clase</p>
                <p className="text-lg font-bold text-gray-900">{booking.className}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sede</p>
                <p className="text-lg font-bold text-gray-900">{booking.location}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Día</p>
                <p className="text-lg font-bold text-gray-900">{booking.day || booking.dayName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Horario</p>
                <p className="text-lg font-bold text-gray-900">{booking.time}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
          <FaInfoCircle className="text-blue-500 mt-1 flex-shrink-0" />
          <p className="text-sm text-blue-700 leading-relaxed">
            Recuerda llegar 10 minutos antes de comenzar. El uso del uniforme (dobok) es obligatorio para todos los alumnos.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
          <Button
            variant="ghost"
            onClick={onCancel}
            className="flex-1 order-2 sm:order-1"
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 order-1 sm:order-2 bg-dynamic-main text-white hover:bg-dynamic-dark"
            disabled={isLoading}
          >
            {isLoading ? 'Confirmando...' : `Confirmar ${bookingList.length > 1 ? bookingList.length + ' Reservas' : 'Reserva'}`}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

BookingConfirmation.propTypes = {
  bookings: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]).isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default BookingConfirmation;
