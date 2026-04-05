import { useState } from 'react';
import InstructorSidebar from '../../features/instructor/components/InstructorSidebar';
import InstructorHeader from '../../features/instructor/components/InstructorHeader';

const InstructorLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <InstructorSidebar collapsed={!sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 min-w-0 lg:ml-0">
        <InstructorHeader onToggleSidebar={() => setSidebarOpen((o) => !o)} />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
};

export default InstructorLayout;
