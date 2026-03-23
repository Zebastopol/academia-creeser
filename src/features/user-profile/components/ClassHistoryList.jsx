import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaFilter } from 'react-icons/fa';
import { useAuth } from '../../auth/context/AuthContext';
import { useClassHistory } from '../hooks/useClassHistory';
import { HISTORY_FILTERS } from '../constants/profileConstants';
import ClassHistoryItem from './ClassHistoryItem';
import { cn } from '../../../shared/utils/cn';

const FILTER_OPTIONS = [
  { value: HISTORY_FILTERS.ALL, label: 'Todas' },
  { value: HISTORY_FILTERS.CONFIRMED, label: 'Confirmadas' },
  { value: HISTORY_FILTERS.CANCELLED, label: 'Canceladas' },
];

const ClassHistoryList = () => {
  const { user } = useAuth();
  const { history, allHistory, loading, filter, changeFilter } = useClassHistory(user?.id);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dynamic-main" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="space-y-4"
    >
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <FaFilter className="text-gray-400 text-sm" />
        {FILTER_OPTIONS.map(opt => (
          <button
            key={opt.value}
            onClick={() => changeFilter(opt.value)}
            className={cn(
              'px-3 py-1.5 text-xs font-medium rounded-full border transition-colors',
              filter === opt.value
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-white text-gray-600 border-gray-300 hover:border-primary-400'
            )}
          >
            {opt.label}
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-400">
          {history.length} de {allHistory.length} registros
        </span>
      </div>

      {/* List */}
      {history.length === 0 ? (
        <div className="py-12 text-center text-gray-400">
          <p className="text-lg font-medium">Sin registros</p>
          <p className="text-sm mt-1">No hay clases que coincidan con el filtro seleccionado.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {history.map(booking => (
            <ClassHistoryItem key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

ClassHistoryList.propTypes = {};

export default ClassHistoryList;
