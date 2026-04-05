import useAttendanceMarker from '../hooks/useAttendanceMarker';
import AttendanceDatePicker from '../components/attendance/AttendanceDatePicker';
import AttendanceSheet from '../components/attendance/AttendanceSheet';
import DataTable from '../../../shared/components/molecules/DataTable';
import StatusBadge from '../../../shared/components/molecules/StatusBadge';
import { ATTENDANCE_STATUS_MAP } from '../../../shared/constants/statusConstants';

const HISTORY_COLUMNS = [
  {
    key: 'date',
    label: 'Fecha',
    sortable: true,
    render: (row) => <span className="text-sm">{row.date}</span>,
  },
  {
    key: 'studentName',
    label: 'Alumno',
    render: (row) => (
      <div className="flex items-center gap-2">
        <img src={row.studentAvatar} alt="" className="w-6 h-6 rounded-full object-cover" />
        <span className="text-sm">{row.studentName}</span>
      </div>
    ),
  },
  {
    key: 'status',
    label: 'Estado',
    render: (row) => {
      const map = ATTENDANCE_STATUS_MAP[row.status];
      return map ? (
        <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${map.color}`}>{map.label}</span>
      ) : (
        <span className="text-xs text-gray-400">{row.status}</span>
      );
    },
  },
];

const InstructorAttendanceTemplate = () => {
  const {
    classOptions, selectedClassId, setSelectedClassId,
    selectedDate, setSelectedDate,
    students, loading, saving,
    setStudentStatus, markAllPresent, saveAttendance,
    history, historyLoading,
    viewMode, setViewMode,
  } = useAttendanceMarker();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-display">Asistencia</h2>
          <p className="text-sm text-gray-500 mt-1">Marca la asistencia de tus alumnos</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('mark')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors
              ${viewMode === 'mark' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Marcar
          </button>
          <button
            onClick={() => setViewMode('history')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors
              ${viewMode === 'history' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Historial
          </button>
        </div>
      </div>

      <AttendanceDatePicker
        classOptions={classOptions}
        selectedClassId={selectedClassId}
        onChangeClass={setSelectedClassId}
        selectedDate={selectedDate}
        onChangeDate={setSelectedDate}
      />

      {viewMode === 'mark' ? (
        <AttendanceSheet
          students={students}
          loading={loading}
          saving={saving}
          onStatusChange={setStudentStatus}
          onMarkAllPresent={markAllPresent}
          onSave={saveAttendance}
        />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h3 className="text-lg font-bold text-gray-900 font-display mb-4">Historial de Asistencia</h3>
          {historyLoading ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <div className="loading-spinner" />
            </div>
          ) : (
            <DataTable
              columns={HISTORY_COLUMNS}
              data={history}
              searchable
              pageSize={15}
              emptyMessage="No hay registros de asistencia para esta clase."
            />
          )}
        </div>
      )}
    </div>
  );
};

export default InstructorAttendanceTemplate;
