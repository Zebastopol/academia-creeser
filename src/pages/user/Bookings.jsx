import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../features/auth/context/AuthContext';
import { useBookings } from '../../features/bookings/hooks/useBookings';
import { classes, academiaInfo } from '../../shared/data/mockData';
import LocationSelector from '../../features/bookings/components/LocationSelector';
import TimeSlotPicker from '../../features/bookings/components/TimeSlotPicker';
import BookingConfirmation from '../../features/bookings/components/BookingConfirmation';
import SEO from '../../shared/components/common/SEO';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
  const { user } = useAuth();
  const { createBooking } = useBookings(user?.id);
  const navigate = useNavigate();

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filtrar clases sugeridas según la edad/perfil del usuario (Mock logic)
  const userCategory = user?.belt ? "Cadetes" : "Adultos"; // Simplificación para la demo
  
  const availableSlots = useMemo(() => {
    if (!selectedLocation) return [];
    
    // Obtener todos los horarios de todas las clases en esa sede
    const allSlots = [];
    classes.forEach(c => {
      c.schedules.forEach(s => {
        if (s.location === selectedLocation) {
          allSlots.push({
            ...s,
            classId: c.id,
            className: c.name
          });
        }
      });
    });
    return allSlots;
  }, [selectedLocation]);

  const handleConfirmBooking = async () => {
    setIsLoading(true);
    try {
      const result = await createBooking({
        classId: selectedSlot.classId,
        date: new Date().toISOString().split('T')[0], // Para la demo usamos hoy
        time: selectedSlot.time,
        location: selectedSlot.location
      });

      if (result.success) {
        toast.success('¡Clase agendada con éxito!');
        navigate('/dashboard');
      } else {
        toast.error(result.error || 'Error al agendar');
      }
    } catch (error) {
      toast.error('Ocurrió un error inesperado');
    } finally {
      setIsLoading(false);
      setIsConfirming(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20">
      <SEO title="Agendar Clase" description="Reserva tu lugar en la próxima sesión de la Academia Creeser." />
      
      <div className="container-custom max-w-4xl">
        <header className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-black text-gray-900 mb-4"
          >
            Agendar Clase
          </motion.h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Selecciona la sede y el horario que mejor te acomode para tu próximo entrenamiento.
          </p>
        </header>

        {/* Step 1: Location */}
        <section className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <span className="w-8 h-8 rounded-full bg-dynamic-main text-white flex items-center justify-center font-bold">1</span>
            <h2 className="text-2xl font-bold text-gray-800">Elige tu Sede</h2>
          </div>
          <LocationSelector 
            selectedLocation={selectedLocation} 
            onSelect={(loc) => {
              setSelectedLocation(loc);
              setSelectedSlot(null);
            }} 
          />
        </section>

        {/* Step 2: Time Slots */}
        <AnimatePresence>
          {selectedLocation && (
            <motion.section 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-12"
            >
              <div className="flex items-center space-x-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-dynamic-main text-white flex items-center justify-center font-bold">2</span>
                <h2 className="text-2xl font-bold text-gray-800">Horarios Disponibles en {selectedLocation}</h2>
              </div>
              <TimeSlotPicker 
                slots={availableSlots} 
                selectedSlot={selectedSlot}
                onSelect={(slot) => setSelectedSlot(slot)}
              />
            </motion.section>
          )}
        </AnimatePresence>

        {/* Step 3: Action */}
        <AnimatePresence>
          {selectedSlot && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mt-10"
            >
              <button
                onClick={() => setIsConfirming(true)}
                className="group relative px-12 py-4 bg-dynamic-main text-white rounded-full font-bold text-xl shadow-xl shadow-dynamic-main/20 hover:bg-dynamic-dark transition-all duration-300"
              >
                Continuar con la Reserva
                <motion.span 
                  animate={{ x: [0, 5, 0] }} 
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="inline-block ml-2"
                >
                  →
                </motion.span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Confirmation Modal Overlay */}
      <AnimatePresence>
        {isConfirming && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsConfirming(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            />
            <div className="relative w-full max-w-lg">
              <BookingConfirmation 
                booking={selectedSlot}
                onConfirm={handleConfirmBooking}
                onCancel={() => setIsConfirming(false)}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Bookings;
