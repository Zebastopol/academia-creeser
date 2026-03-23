import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../features/auth/context/AuthContext';
import { useBookings } from '../../features/bookings/hooks/useBookings';
import { useBookingCalendar } from '../../features/bookings/hooks/useBookingCalendar';
import BookingFilters from '../../features/bookings/components/BookingFilters';
import BookingCalendar from '../../features/bookings/components/BookingCalendar';
import BookingSummary from '../../features/bookings/components/BookingSummary';
import SEO from '../../shared/components/common/SEO';

const Bookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    selections,
    toggleSelection,
    isSlotSelected,
    removeSelection,
    clearSelections,
    confirmSelections,
  } = useBookings(user?.id);

  const {
    calendarGrid,
    slotsMap,
    selectedDate,
    setSelectedDate,
    selectedDateSlots,
    monthLabel,
    dayLabels,
    goToNextMonth,
    goToPrevMonth,
    canGoPrev,
    loading: calendarLoading,
    filtersReady,
  } = useBookingCalendar({
    location: selectedLocation,
    classId: selectedClassId,
    userId: user?.id,
  });

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const result = await confirmSelections();
      if (result.success) {
        const count = result.bookings.length;
        toast.success(
          `${count} clase${count > 1 ? 's' : ''} agendada${count > 1 ? 's' : ''} con éxito`
        );
        navigate('/dashboard');
      } else {
        toast.error(result.error || 'Error al confirmar');
      }
    } catch {
      toast.error('Ocurrió un error inesperado');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    setSelectedDate(null);
  };

  const handleClassChange = (classId) => {
    setSelectedClassId(classId);
    setSelectedDate(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20">
      <SEO
        title="Agendar Clase"
        description="Reserva tu lugar en la próxima sesión de la Academia Creeser."
      />

      <div className="container-custom max-w-5xl">
        <header className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-black text-gray-900 mb-3"
          >
            Agendar Clases
          </motion.h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Selecciona la sede, la clase y los horarios que mejor te acomoden.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main column: Filters + Calendar */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-dynamic-main text-white font-bold text-sm">
                  1
                </span>
                <h2 className="text-xl font-bold text-gray-800">
                  Filtra por Sede y Clase
                </h2>
              </div>
              <BookingFilters
                selectedLocation={selectedLocation}
                selectedClassId={selectedClassId}
                onLocationChange={handleLocationChange}
                onClassChange={handleClassChange}
              />
            </section>

            {filtersReady && (
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-dynamic-main text-white font-bold text-sm">
                    2
                  </span>
                  <h2 className="text-xl font-bold text-gray-800">
                    Elige tus horarios
                  </h2>
                </div>
                <BookingCalendar
                  calendarGrid={calendarGrid}
                  slotsMap={slotsMap}
                  selectedDate={selectedDate}
                  onSelectDate={setSelectedDate}
                  selectedDateSlots={selectedDateSlots}
                  monthLabel={monthLabel}
                  dayLabels={dayLabels}
                  onPrevMonth={goToPrevMonth}
                  onNextMonth={goToNextMonth}
                  canGoPrev={canGoPrev}
                  isSlotSelected={isSlotSelected}
                  onToggleSlot={toggleSelection}
                  loading={calendarLoading}
                />
              </motion.section>
            )}
          </div>

          {/* Sidebar: Summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-center gap-3 mb-5">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-dynamic-main text-white font-bold text-sm">
                3
              </span>
              <h2 className="text-xl font-bold text-gray-800">Tu Reserva</h2>
            </div>

            {selections.length > 0 ? (
              <BookingSummary
                selections={selections}
                onRemove={removeSelection}
                onClear={clearSelections}
                onConfirm={handleConfirm}
                isLoading={isLoading}
              />
            ) : (
              <div className="bg-white rounded-creeser border border-gray-100 shadow-soft p-8 text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100">
                  <span className="text-2xl text-gray-300">&#128197;</span>
                </div>
                <p className="text-gray-500 text-sm">
                  Aún no has seleccionado horarios. Elige una fecha en el
                  calendario para ver los disponibles.
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Bookings;
