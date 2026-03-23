import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import CalendarHeader from './CalendarHeader';
import CalendarCell from './CalendarCell';
import SlotCard from './SlotCard';
import { FaCalendarAlt } from 'react-icons/fa';
import { SLOT_STATUS } from '../constants/bookingConstants';

/**
 * @param {{
 *   calendarGrid: Array,
 *   slotsMap: object,
 *   selectedDate: string|null,
 *   onSelectDate: Function,
 *   selectedDateSlots: Array,
 *   monthLabel: string,
 *   dayLabels: string[],
 *   onPrevMonth: Function,
 *   onNextMonth: Function,
 *   canGoPrev: boolean,
 *   isSlotSelected: Function,
 *   onToggleSlot: Function,
 *   loading: boolean
 * }} props
 */
const BookingCalendar = ({
  calendarGrid,
  slotsMap,
  selectedDate,
  onSelectDate,
  selectedDateSlots,
  monthLabel,
  dayLabels,
  onPrevMonth,
  onNextMonth,
  canGoPrev,
  isSlotSelected,
  onToggleSlot,
  loading,
}) => (
  <div className="space-y-6">
    <div className="bg-white rounded-creeser border border-gray-100 shadow-soft p-6">
      <CalendarHeader
        monthLabel={monthLabel}
        onPrev={onPrevMonth}
        onNext={onNextMonth}
        canGoPrev={canGoPrev}
      />

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayLabels.map(label => (
          <div key={label} className="text-center text-xs font-bold text-gray-400 uppercase py-2">
            {label}
          </div>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dynamic-main" />
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-1">
          {calendarGrid.flat().map((cell, idx) => {
            const dateSlots = cell.date ? (slotsMap[cell.date] || []) : [];
            const activeSlots = dateSlots.filter(
              s => s.status === SLOT_STATUS.AVAILABLE || s.status === SLOT_STATUS.BOOKED
            );
            return (
              <CalendarCell
                key={idx}
                day={cell.day}
                date={cell.date}
                isCurrentMonth={cell.isCurrentMonth}
                isToday={cell.isToday}
                isPast={cell.isPast}
                hasSlots={activeSlots.length > 0}
                slotCount={activeSlots.length}
                isSelected={cell.date === selectedDate}
                onClick={onSelectDate}
              />
            );
          })}
        </div>
      )}
    </div>

    {/* Slots for selected date */}
    <AnimatePresence>
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-3"
        >
          <h3 className="text-lg font-bold text-gray-800">
            Horarios del{' '}
            {new Date(selectedDate + 'T12:00:00').toLocaleDateString('es-CL', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
          </h3>

          {selectedDateSlots.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedDateSlots.map(slot => (
                <SlotCard
                  key={slot.id}
                  slot={slot}
                  isSelected={isSlotSelected(slot.id)}
                  onClick={onToggleSlot}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-creeser border-2 border-dashed border-gray-200">
              <FaCalendarAlt className="mx-auto text-3xl text-gray-300 mb-2" />
              <p className="text-gray-500">No hay horarios disponibles en esta fecha</p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

BookingCalendar.propTypes = {
  calendarGrid: PropTypes.arrayOf(PropTypes.array).isRequired,
  slotsMap: PropTypes.object.isRequired,
  selectedDate: PropTypes.string,
  onSelectDate: PropTypes.func.isRequired,
  selectedDateSlots: PropTypes.array.isRequired,
  monthLabel: PropTypes.string.isRequired,
  dayLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  onPrevMonth: PropTypes.func.isRequired,
  onNextMonth: PropTypes.func.isRequired,
  canGoPrev: PropTypes.bool.isRequired,
  isSlotSelected: PropTypes.func.isRequired,
  onToggleSlot: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default BookingCalendar;
