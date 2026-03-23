import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaUserFriends } from 'react-icons/fa';
import { bookingService } from '../services/bookingService';
import { cn } from '../../../shared/utils/cn';

/**
 * @param {{
 *   selectedLocation: string|null,
 *   selectedClassId: number|null,
 *   onLocationChange: Function,
 *   onClassChange: Function
 * }} props
 */
const BookingFilters = ({ selectedLocation, selectedClassId, onLocationChange, onClassChange }) => {
  const [locations, setLocations] = useState([]);
  const [classTypes, setClassTypes] = useState([]);

  useEffect(() => {
    const load = async () => {
      const [locs, types] = await Promise.all([
        bookingService.getLocations(),
        bookingService.getClassTypes(),
      ]);
      setLocations(locs);
      setClassTypes(types);
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      {/* Sede */}
      <div>
        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
          <FaMapMarkerAlt className="text-dynamic-main" /> Sede
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {locations.map(loc => (
            <button
              key={loc.name}
              type="button"
              onClick={() => onLocationChange(loc.name)}
              className={cn(
                'flex flex-col items-start',
                'p-4 rounded-creeser border-2 transition-all duration-200',
                selectedLocation === loc.name
                  ? 'border-dynamic-main bg-dynamic-main/5 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300',
              )}
            >
              <span className={cn(
                'font-bold',
                selectedLocation === loc.name ? 'text-dynamic-dark' : 'text-gray-900',
              )}>
                Sede {loc.name}
              </span>
              <span className="text-sm text-gray-500">{loc.address}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Clase */}
      <div>
        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
          <FaUserFriends className="text-dynamic-main" /> Clase
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {classTypes.map(cls => (
            <button
              key={cls.id}
              type="button"
              onClick={() => onClassChange(cls.id)}
              className={cn(
                'flex flex-col items-center',
                'p-3 rounded-creeser border-2 transition-all duration-200',
                selectedClassId === cls.id
                  ? 'border-dynamic-main bg-dynamic-main text-white shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300 text-gray-900',
              )}
            >
              <span className="font-bold text-sm">{cls.name}</span>
              <span className={cn(
                'text-xs mt-0.5',
                selectedClassId === cls.id ? 'text-white/70' : 'text-gray-400',
              )}>
                {cls.ageGroup}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Hint */}
      {(!selectedLocation || !selectedClassId) && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-gray-400 italic"
        >
          Selecciona una sede y una clase para activar el calendario
        </motion.p>
      )}
    </div>
  );
};

BookingFilters.propTypes = {
  selectedLocation: PropTypes.string,
  selectedClassId: PropTypes.number,
  onLocationChange: PropTypes.func.isRequired,
  onClassChange: PropTypes.func.isRequired,
};

export default BookingFilters;
