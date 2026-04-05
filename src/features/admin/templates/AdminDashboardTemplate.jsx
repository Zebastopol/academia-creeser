import { useState } from 'react';
import { useAdminDashboard } from '../hooks/useAdminDashboard';
import { useAcademicCalendar } from '../hooks/useAcademicCalendar';
import AdminKPIGrid from '../components/dashboard/AdminKPIGrid';
import MarketingOverview from '../components/dashboard/MarketingOverview';
import RevenueChart from '../components/dashboard/RevenueChart';
import AcademicCalendar from '../components/dashboard/AcademicCalendar';
import CalendarEventForm from '../components/dashboard/CalendarEventForm';
import StatusBadge from '../../../shared/components/molecules/StatusBadge';

const TABS = [
  { id: 'overview', label: 'Resumen' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'revenue', label: 'Ingresos' },
  { id: 'calendar', label: 'Calendario' },
  { id: 'contacts', label: 'Contactos' },
];

const AdminDashboardTemplate = () => {
  const { kpis, marketing, revenue, contacts, loading } = useAdminDashboard();
  const calendar = useAcademicCalendar();
  const [activeTab, setActiveTab] = useState('overview');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-3 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-display">Dashboard</h2>
          <p className="text-sm text-gray-500">Resumen general de la academia</p>
        </div>
      </div>

      <AdminKPIGrid kpis={kpis} />

      {/* Tabs */}
      <div className="flex gap-1 p-1 overflow-x-auto bg-gray-100 rounded-lg">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-md transition-colors
              ${activeTab === tab.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RevenueChart revenue={revenue} />
          <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-soft">
            <h3 className="mb-4 text-base font-bold text-gray-900">Últimos Contactos</h3>
            <div className="space-y-3">
              {contacts.slice(0, 5).map((c) => (
                <div key={c.id} className="flex items-start justify-between p-3 rounded-lg bg-gray-50">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{c.name}</p>
                    <p className="text-xs text-gray-500 truncate">{c.message}</p>
                  </div>
                  <StatusBadge status={c.status} className="ml-2 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'marketing' && <MarketingOverview marketing={marketing} />}

      {activeTab === 'revenue' && <RevenueChart revenue={revenue} />}

      {activeTab === 'calendar' && (
        <>
          <AcademicCalendar
            calendarEvents={calendar.calendarEvents}
            onSelectEvent={calendar.openEdit}
            onCreateEvent={calendar.openCreate}
          />
          <CalendarEventForm
            isOpen={calendar.isFormOpen}
            onClose={calendar.closeForm}
            onSave={calendar.saveEvent}
            event={calendar.selectedEvent}
          />
        </>
      )}

      {activeTab === 'contacts' && (
        <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-soft">
          <h3 className="mb-4 text-base font-bold text-gray-900">Formularios de Contacto</h3>
          <div className="space-y-3">
            {contacts.map((c) => (
              <div key={c.id} className="flex items-start justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-gray-900">{c.name}</p>
                    <StatusBadge status={c.status} />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{c.message}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>{c.email}</span>
                    <span>{c.phone}</span>
                    <span>{new Date(c.createdAt).toLocaleDateString('es-CL')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardTemplate;
