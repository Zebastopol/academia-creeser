import { motion } from 'framer-motion';
import { FaClock, FaCalendarAlt } from 'react-icons/fa';
import { cn } from '../../../shared/utils/cn';

const TimeSlotPicker = ({ slots, selectedSlot, onSelect }) => {
  if (!slots || slots.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-creeser border-2 border-dashed border-gray-200">
        <FaCalendarAlt className="mx-auto text-4xl text-gray-300 mb-3" />
        <p className="text-gray-500">No hay horarios disponibles para esta selección.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {slots.map((slot, idx) => (
        <motion.button
          key={idx}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(slot)}
          className={cn(
            "flex items-center justify-between p-5 rounded-creeser border-2 transition-all",
            selectedSlot === slot 
              ? "border-dynamic-main bg-dynamic-main text-white shadow-lg shadow-dynamic-main/20" 
              : "border-gray-100 bg-white hover:border-dynamic-main/30"
          )}
        >
          <div className="flex items-center space-x-4">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              selectedSlot === slot ? "bg-white/20" : "bg-dynamic-main/10 text-dynamic-main"
            )}>
              <FaClock />
            </div>
            <div className="text-left">
              <p className="font-bold text-lg">{slot.day}</p>
              <p className={cn(
                "text-sm",
                selectedSlot === slot ? "text-white/80" : "text-gray-500"
              )}>
                {slot.time}
              </p>
            </div>
          </div>
          <div className={cn(
            "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
            selectedSlot === slot ? "bg-white text-dynamic-main" : "bg-gray-100 text-gray-400"
          )}>
            {selectedSlot === slot ? 'Seleccionado' : 'Disponible'}
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default TimeSlotPicker;
