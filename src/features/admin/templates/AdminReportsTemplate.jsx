import { useState } from 'react';
import { useAdminReports } from '../hooks/useAdminReports';
import ReportFilters from '../components/reports/ReportFilters';
import AttendanceReport from '../components/reports/AttendanceReport';
import PopularityReport from '../components/reports/PopularityReport';

const TABS = [
  { id: 'attendance', label: 'Asistencia' },
  { id: 'popularity', label: 'Popularidad' },
];

const AdminReportsTemplate = () => {
  const {
    attendanceReport, popularityReport, loading, filters,
    updateFilter, updateDateRange, generateReports,
  } = useAdminReports();
  const [activeTab, setActiveTab] = useState('attendance');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 font-display">Reportes y Analytics</h2>
        <p className="text-sm text-gray-500">Selecciona filtros y genera reportes de asistencia y popularidad</p>
      </div>

      <ReportFilters
        filters={filters}
        onFilterChange={updateFilter}
        onDateRangeChange={updateDateRange}
        onGenerate={generateReports}
        loading={loading}
      />

      <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
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

      {!attendanceReport && !popularityReport && (
        <div className="py-16 text-center">
          <p className="text-gray-400">Configura los filtros y presiona "Generar Reporte" para ver los datos.</p>
        </div>
      )}

      {activeTab === 'attendance' && <AttendanceReport report={attendanceReport} />}
      {activeTab === 'popularity' && <PopularityReport report={popularityReport} />}
    </div>
  );
};

export default AdminReportsTemplate;
