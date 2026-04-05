import { useAdminUsers } from '../hooks/useAdminUsers';
import UsersTable from '../components/users/UsersTable';
import UserFormModal from '../components/users/UserFormModal';
import UserDetailDrawer from '../components/users/UserDetailDrawer';

const AdminUsersTemplate = () => {
  const {
    users, loading, filters, updateFilter,
    selectedUser, isFormOpen, isDetailOpen,
    openCreate, openEdit, openDetail, closeAll,
    saveUser, toggleStatus,
  } = useAdminUsers();

  if (loading && users.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 font-display">Gestión de Usuarios</h2>
        <p className="text-sm text-gray-500">{users.length} usuario{users.length !== 1 && 's'} registrado{users.length !== 1 && 's'}</p>
      </div>

      <UsersTable
        users={users}
        onEdit={openEdit}
        onView={openDetail}
        onToggleStatus={toggleStatus}
        onCreate={openCreate}
        filters={filters}
        onFilterChange={updateFilter}
      />

      <UserFormModal
        isOpen={isFormOpen}
        onClose={closeAll}
        onSave={saveUser}
        user={selectedUser}
      />

      <UserDetailDrawer
        isOpen={isDetailOpen}
        onClose={closeAll}
        user={selectedUser}
      />
    </div>
  );
};

export default AdminUsersTemplate;
