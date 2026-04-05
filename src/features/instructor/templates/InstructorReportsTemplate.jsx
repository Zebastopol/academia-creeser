import { FaPlus, FaSearch } from 'react-icons/fa';
import useProgressReports from '../hooks/useProgressReports';
import ProgressReport from '../components/reports/ProgressReport';
import ClassReport from '../components/reports/ClassReport';
import ProgressNoteForm from '../components/reports/ProgressNoteForm';
import ReportExportActions from '../components/reports/ReportExportActions';
import Button from '../../../shared/components/atoms/Button';

const InstructorReportsTemplate = () => {
  const {
    classOptions, reportType, setReportType,
    selectedClassId, setSelectedClassId,
    selectedStudentId, setSelectedStudentId,
    studentOptions, dateRange, setDateRange,
    report, loading, generateReport,
    noteFormOpen, setNoteFormOpen, savingNote, saveProgressNote,
  } = useProgressReports();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-display">Reportes de Progreso</h2>
          <p className="text-sm text-gray-500 mt-1">Analiza el desempeño de tus alumnos</p>
        </div>
        <div className="flex gap-2">
          <ReportExportActions disabled={!report} />
          <Button
            onClick={() => setNoteFormOpen(true)}
            className="bg-primary-600 text-white hover:bg-primary-700"
            size="sm"
          >
            <FaPlus className="mr-1" size={12} />
            Nueva Nota
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 sm:flex-row sm:items-end">
        <div>
          <label className="block mb-1 text-xs font-medium text-gray-600">Tipo de Reporte</label>
          <div className="flex gap-2">
            <button
              onClick={() => setReportType('student')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors
                ${reportType === 'student' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Por Alumno
            </button>
            <button
              onClick={() => setReportType('class')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors
                ${reportType === 'class' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Por Clase
            </button>
          </div>
        </div>

        <div className="flex-1">
          <label className="block mb-1 text-xs font-medium text-gray-600">Clase</label>
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            {classOptions.map((c) => (
              <option key={c.id} value={String(c.id)}>{c.name}</option>
            ))}
          </select>
        </div>

        {reportType === 'student' && (
          <div className="flex-1">
            <label className="block mb-1 text-xs font-medium text-gray-600">Alumno</label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              {studentOptions.map((s) => (
                <option key={s.id} value={String(s.id)}>{s.name}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block mb-1 text-xs font-medium text-gray-600">Desde</label>
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange((p) => ({ ...p, start: e.target.value }))}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block mb-1 text-xs font-medium text-gray-600">Hasta</label>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange((p) => ({ ...p, end: e.target.value }))}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <Button
          onClick={generateReport}
          disabled={loading}
          className="bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50"
        >
          <FaSearch className="mr-1" size={12} />
          {loading ? 'Generando...' : 'Generar'}
        </Button>
      </div>

      {/* Report Content */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="loading-spinner" />
        </div>
      ) : report ? (
        reportType === 'student' ? (
          <ProgressReport report={report} />
        ) : (
          <ClassReport report={report} />
        )
      ) : (
        <div className="flex items-center justify-center min-h-[200px] p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-400">Selecciona los filtros y genera un reporte.</p>
        </div>
      )}

      {/* Note Form Modal */}
      <ProgressNoteForm
        isOpen={noteFormOpen}
        onClose={() => setNoteFormOpen(false)}
        onSave={saveProgressNote}
        saving={savingNote}
        classOptions={classOptions}
        studentOptions={studentOptions}
        defaultClassId={selectedClassId}
        defaultStudentId={selectedStudentId}
      />
    </div>
  );
};

export default InstructorReportsTemplate;
