import PropTypes from 'prop-types';
import Button from '../../../../shared/components/atoms/Button';
import { adminService } from '../../services/adminService';

/**
 * Filtros extensibles para reportes (Open/Closed: se pueden agregar nuevos sin modificar la base).
 * @param {{ filters: object, onFilterChange: function, onDateRangeChange: function, onGenerate: function, loading: boolean }} props
 */
const ReportFilters = ({ filters, onFilterChange, onDateRangeChange, onGenerate, loading }) => {
  const classOptions = adminService.getClassOptions();
  const locations = adminService.getLocations();

  const inputCls = 'px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500';

  return (
    <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-soft">
      <h3 className="mb-3 text-sm font-semibold text-gray-700">Filtros</h3>
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label className="block mb-1 text-xs text-gray-500">Clase</label>
          <select value={filters.classId} onChange={(e) => onFilterChange('classId', e.target.value)} className={inputCls}>
            <option value="all">Todas</option>
            {classOptions.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-xs text-gray-500">Sede</label>
          <select value={filters.location} onChange={(e) => onFilterChange('location', e.target.value)} className={inputCls}>
            <option value="all">Todas</option>
            {locations.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-xs text-gray-500">Desde</label>
          <input type="date" value={filters.dateRange.start} onChange={(e) => onDateRangeChange('start', e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="block mb-1 text-xs text-gray-500">Hasta</label>
          <input type="date" value={filters.dateRange.end} onChange={(e) => onDateRangeChange('end', e.target.value)} className={inputCls} />
        </div>
        <Button variant="primary" size="sm" onClick={onGenerate} isLoading={loading}>
          Generar Reporte
        </Button>
      </div>
    </div>
  );
};

ReportFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onDateRangeChange: PropTypes.func.isRequired,
  onGenerate: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default ReportFilters;
