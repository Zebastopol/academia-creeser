import { useAdminClasses } from '../hooks/useAdminClasses';
import ClassesTable from '../components/classes/ClassesTable';
import ClassFormModal from '../components/classes/ClassFormModal';
import ConfirmDialog from '../../../shared/components/molecules/ConfirmDialog';

const AdminClassesTemplate = () => {
  const {
    classes, loading, selectedClass,
    isFormOpen, isDeleteOpen,
    openCreate, openEdit, openDelete, closeAll,
    saveClass, deleteClass,
  } = useAdminClasses();

  if (loading && classes.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 font-display">Gestión de Clases</h2>
        <p className="text-sm text-gray-500">{classes.length} clase{classes.length !== 1 && 's'} activa{classes.length !== 1 && 's'}</p>
      </div>

      <ClassesTable classes={classes} onEdit={openEdit} onDelete={openDelete} onCreate={openCreate} />

      <ClassFormModal isOpen={isFormOpen} onClose={closeAll} onSave={saveClass} classData={selectedClass} />

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={closeAll}
        onConfirm={deleteClass}
        title="Eliminar Clase"
        message={`¿Estás seguro de eliminar la clase "${selectedClass?.name}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        variant="danger"
      />
    </div>
  );
};

export default AdminClassesTemplate;
