import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa';
import SearchInput from './SearchInput';
import Pagination from '../atoms/Pagination';
import { DEFAULT_PAGE_SIZE } from '../../../features/admin/constants/adminConstants';

/**
 * Tabla reutilizable con ordenamiento, búsqueda y paginación.
 * @param {{
 *   columns: Array<{ key: string, label: string, sortable?: boolean, render?: function }>,
 *   data: Array,
 *   searchable?: boolean,
 *   searchPlaceholder?: string,
 *   pageSize?: number,
 *   actions?: function,
 *   emptyMessage?: string,
 *   headerActions?: React.ReactNode,
 * }} props
 */
const DataTable = ({
  columns,
  data,
  searchable = true,
  searchPlaceholder = 'Buscar...',
  pageSize = DEFAULT_PAGE_SIZE,
  actions,
  emptyMessage = 'No hay datos para mostrar.',
  headerActions,
}) => {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!search) return data;
    const term = search.toLowerCase();
    return data.filter((row) =>
      columns.some(({ key }) => {
        const val = row[key];
        return val != null && String(val).toLowerCase().includes(term);
      })
    );
  }, [data, search, columns]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey] ?? '';
      const bVal = b[sortKey] ?? '';
      const cmp = typeof aVal === 'number' ? aVal - bVal : String(aVal).localeCompare(String(bVal));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paged = sorted.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(1);
  };

  const handleSearch = (val) => {
    setSearch(val);
    setPage(1);
  };

  const SortIcon = ({ colKey }) => {
    if (sortKey !== colKey) return <FaSort className="ml-1 text-gray-300" size={10} />;
    return sortDir === 'asc'
      ? <FaSortUp className="ml-1 text-primary-600" size={10} />
      : <FaSortDown className="ml-1 text-primary-600" size={10} />;
  };

  return (
    <div className="bg-white rounded-xl shadow-soft border border-gray-100">
      {(searchable || headerActions) && (
        <div className="flex flex-col gap-3 p-4 border-b border-gray-100 sm:flex-row sm:items-center sm:justify-between">
          {searchable && (
            <div className="w-full sm:max-w-xs">
              <SearchInput value={search} onChange={handleSearch} placeholder={searchPlaceholder} />
            </div>
          )}
          {headerActions && <div className="flex gap-2">{headerActions}</div>}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 whitespace-nowrap ${col.sortable !== false ? 'cursor-pointer select-none hover:bg-gray-100' : ''}`}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                >
                  <div className="flex items-center">
                    {col.label}
                    {col.sortable !== false && <SortIcon colKey={col.key} />}
                  </div>
                </th>
              ))}
              {actions && <th className="px-4 py-3 text-right">Acciones</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-4 py-12 text-center text-gray-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paged.map((row, idx) => (
                <tr key={row.id ?? idx} className="hover:bg-gray-50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 whitespace-nowrap">
                      {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 py-3 text-right whitespace-nowrap">{actions(row)}</td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            {sorted.length} resultado{sorted.length !== 1 && 's'}
          </span>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
      render: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  searchable: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  pageSize: PropTypes.number,
  actions: PropTypes.func,
  emptyMessage: PropTypes.string,
  headerActions: PropTypes.node,
};

export default DataTable;
