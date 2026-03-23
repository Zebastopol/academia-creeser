import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { FaTrash, FaCalendarCheck, FaInfoCircle } from 'react-icons/fa';
import Button from '../../../shared/components/atoms/Button';

/**
 * @param {{
 *   selections: Array,
 *   onRemove: Function,
 *   onClear: Function,
 *   onConfirm: Function,
 *   isLoading: boolean
 * }} props
 */
const BookingSummary = ({ selections, onRemove, onClear, onConfirm, isLoading }) => {
  if (selections.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-creeser border border-gray-100 shadow-soft overflow-hidden"
    >
      <div className="bg-dynamic-main p-5 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaCalendarCheck size={20} />
          <h3 className="font-bold text-lg">
            Resumen ({selections.length})
          </h3>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="text-white/70 hover:text-white text-sm underline transition-colors"
          disabled={isLoading}
        >
          Limpiar todo
        </button>
      </div>

      <div className="p-5 space-y-3">
        <AnimatePresence>
          {selections.map(selection => (
            <motion.div
              key={selection.slotId}
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10, height: 0 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-semibold text-gray-900">{selection.className}</p>
                <p className="text-sm text-gray-500">
                  {selection.day}{' '}
                  {new Date(selection.date + 'T12:00:00').toLocaleDateString('es-CL', {
                    day: 'numeric',
                    month: 'short',
                  })}{' '}
                  &bull; {selection.time}
                </p>
                <p className="text-xs text-gray-400">Sede {selection.location}</p>
              </div>
              <button
                type="button"
                onClick={() => onRemove(selection.slotId)}
                disabled={isLoading}
                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Quitar selección"
              >
                <FaTrash size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="bg-blue-50 p-3 rounded-lg flex items-start gap-2 mt-4">
          <FaInfoCircle className="text-blue-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-700 leading-relaxed">
            Recuerda llegar 10 minutos antes. El uso del dobok es obligatorio.
          </p>
        </div>

        <div className="flex gap-3 pt-3 border-t border-gray-100">
          <Button
            variant="ghost"
            onClick={onClear}
            className="flex-1"
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-dynamic-main text-white hover:bg-dynamic-dark"
            disabled={isLoading}
          >
            {isLoading
              ? 'Confirmando...'
              : `Confirmar ${selections.length} Reserva${selections.length > 1 ? 's' : ''}`}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

BookingSummary.propTypes = {
  selections: PropTypes.arrayOf(
    PropTypes.shape({
      slotId: PropTypes.string.isRequired,
      className: PropTypes.string.isRequired,
      day: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default BookingSummary;
