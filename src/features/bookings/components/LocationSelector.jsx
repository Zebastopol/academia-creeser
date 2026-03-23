import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { cn } from '../../../shared/utils/cn';

/**
 * Selector de sede reutilizable. Recibe locations como prop (Open/Closed).
 * @param {{
 *   locations: Array<{name: string, address: string}>,
 *   selectedLocation: string|null,
 *   onSelect: Function
 * }} props
 */
const LocationSelector = ({ locations, selectedLocation, onSelect }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
    {locations.map((loc) => (
      <button
        key={loc.name}
        onClick={() => onSelect(loc.name)}
        className={cn(
          'relative p-6 rounded-creeser border-2 text-left transition-all duration-300',
          selectedLocation === loc.name
            ? 'border-dynamic-main bg-dynamic-main/5 shadow-md shadow-dynamic-main/10'
            : 'border-gray-100 bg-white hover:border-gray-200',
        )}
      >
        <div className="flex justify-between items-start">
          <div className={cn(
            'p-3 rounded-lg mb-4 inline-block',
            selectedLocation === loc.name ? 'bg-dynamic-main text-white' : 'bg-gray-100 text-gray-400',
          )}>
            <FaMapMarkerAlt size={20} />
          </div>
          {selectedLocation === loc.name && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <FaCheckCircle className="text-dynamic-main text-xl" />
            </motion.div>
          )}
        </div>
        <h3 className={cn(
          'font-bold text-xl mb-1',
          selectedLocation === loc.name ? 'text-dynamic-dark' : 'text-gray-900',
        )}>
          Sede {loc.name}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          {loc.address}
        </p>
      </button>
    ))}
  </div>
);

LocationSelector.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedLocation: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export default LocationSelector;
