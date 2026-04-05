import { useAdminBookings } from '../hooks/useAdminBookings';
import BookingsTable from '../components/bookings/BookingsTable';
import BookingEditModal from '../components/bookings/BookingEditModal';
import ConfirmDialog from '../../../shared/components/molecules/ConfirmDialog';

const AdminBookingsTemplate = () => {
  const {
    bookings, loading, filters, updateFilter,
    selectedBooking, isEditOpen, isCancelOpen,
    openEdit, openCancel, closeAll,
    updateBooking, cancelBooking,
  } = useAdminBookings();

  if (loading && bookings.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 font-display">Gestión de Reservas</h2>
        <p className="text-sm text-gray-500">{bookings.length} reserva{bookings.length !== 1 && 's'}</p>
      </div>

      <BookingsTable
        bookings={bookings}
        onEdit={openEdit}
        onCancel={openCancel}
        filters={filters}
        onFilterChange={updateFilter}
      />

      <BookingEditModal
        isOpen={isEditOpen}
        onClose={closeAll}
        onSave={updateBooking}
        booking={selectedBooking}
      />

      <ConfirmDialog
        isOpen={isCancelOpen}
        onClose={closeAll}
        onConfirm={cancelBooking}
        title="Cancelar Reserva"
        message={`¿Confirmas la cancelación de la reserva de ${selectedBooking?.userName} del ${selectedBooking?.date}?`}
        confirmLabel="Cancelar Reserva"
        variant="danger"
      />
    </div>
  );
};

export default AdminBookingsTemplate;
