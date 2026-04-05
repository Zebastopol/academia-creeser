import { useState } from 'react';
import AdminSidebar from '../../features/admin/components/AdminSidebar';
import AdminHeader from '../../features/admin/components/AdminHeader';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar collapsed={!sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 min-w-0 lg:ml-0">
        <AdminHeader onToggleSidebar={() => setSidebarOpen((o) => !o)} />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
