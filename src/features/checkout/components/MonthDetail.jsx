import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaTimesCircle, FaTrophy, FaFileInvoiceDollar } from 'react-icons/fa';

const ACHIEVEMENT_LABELS = {
  first_class: 'Primera clase',
  commitment: 'Compromiso',
  dedication: 'Dedicación',
  warrior: 'Guerrero',
};

/**
 * @param {{ detail: object, monthData: object, children: React.ReactNode }} props
 */
const MonthDetail = ({ detail, monthData, children }) => {
  if (!detail || !monthData) return null;

  const formatCLP = (val) => `$${val.toLocaleString('es-CL')}`;
  const isPendingOrOverdue = monthData.status === 'pending' || monthData.status === 'overdue';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={monthData.month}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="card overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FaFileInvoiceDollar className="text-primary" />
            Detalle — {detail.monthLabel} {monthData.year}
          </h3>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500">Membresía</span>
              <span className="ml-auto text-sm font-semibold text-gray-900">{detail.membership}</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <FaGraduationCap className="text-green-500" />
              <span className="text-sm text-gray-600">Clases asistidas</span>
              <span className="ml-auto text-sm font-bold text-green-700">{detail.classesAttended}</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
              <FaTimesCircle className="text-red-400" />
              <span className="text-sm text-gray-600">Clases no asistidas</span>
              <span className="ml-auto text-sm font-bold text-red-600">{detail.classesAbsent}</span>
            </div>

            {detail.achievements.length > 0 && (
              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                <FaTrophy className="text-yellow-500 mt-0.5" />
                <div>
                  <span className="text-sm text-gray-600">Logros del mes</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {detail.achievements.map((a) => (
                      <span key={a} className="px-2 py-0.5 text-[10px] font-medium bg-yellow-100 text-yellow-800 rounded-full">
                        {ACHIEVEMENT_LABELS[a] || a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <hr className="border-gray-100" />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Mensualidad</span>
              <span className="font-medium">{formatCLP(monthData.amount)}</span>
            </div>
            {detail.enrollmentFee && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Matrícula</span>
                <span className="font-medium">{formatCLP(detail.enrollmentFee)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-200">
              <span>Total</span>
              <span className="text-primary">{formatCLP(detail.total)}</span>
            </div>
          </div>

          {isPendingOrOverdue && children}

          <p className="text-xs text-gray-400 italic mt-4">
            *Si tienes clases no asistidas, consulta con tu Instructor la posibilidad de recuperarlas
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

MonthDetail.propTypes = {
  detail: PropTypes.shape({
    membership: PropTypes.string,
    classesAttended: PropTypes.number,
    classesAbsent: PropTypes.number,
    achievements: PropTypes.arrayOf(PropTypes.string),
    enrollmentFee: PropTypes.number,
    total: PropTypes.number,
    monthLabel: PropTypes.string,
  }),
  monthData: PropTypes.shape({
    month: PropTypes.number,
    year: PropTypes.number,
    amount: PropTypes.number,
    status: PropTypes.string,
  }),
  children: PropTypes.node,
};

export default MonthDetail;
