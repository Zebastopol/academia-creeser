import { useAdminEvents } from '../hooks/useAdminEvents';
import EventsTable from '../components/events/EventsTable';
import EventFormModal from '../components/events/EventFormModal';
import ConfirmDialog from '../../../shared/components/molecules/ConfirmDialog';

const AdminEventsTemplate = () => {
  const {
    events, loading, selectedEvent,
    isFormOpen, isDeleteOpen,
    openCreate, openEdit, openDelete, closeAll,
    saveEvent, deleteEvent,
  } = useAdminEvents();

  if (loading && events.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 font-display">Gestión de Eventos</h2>
        <p className="text-sm text-gray-500">{events.length} evento{events.length !== 1 && 's'}</p>
      </div>

      <EventsTable events={events} onEdit={openEdit} onDelete={openDelete} onCreate={openCreate} />

      <EventFormModal isOpen={isFormOpen} onClose={closeAll} onSave={saveEvent} event={selectedEvent} />

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={closeAll}
        onConfirm={deleteEvent}
        title="Eliminar Evento"
        message={`¿Estás seguro de eliminar el evento "${selectedEvent?.title}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        variant="danger"
      />
    </div>
  );
};

export default AdminEventsTemplate;
