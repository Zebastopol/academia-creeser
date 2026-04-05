import PropTypes from 'prop-types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

/**
 * @param {{ currentPage: number, totalPages: number, onPageChange: function }} props
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  const btnBase = 'flex items-center justify-center w-9 h-9 text-sm font-medium rounded-lg transition-colors';

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnBase} text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        <FaChevronLeft size={12} />
      </button>

      {start > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className={`${btnBase} text-gray-600 hover:bg-gray-100`}>1</button>
          {start > 2 && <span className="px-1 text-gray-400">...</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`${btnBase} ${p === currentPage ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="px-1 text-gray-400">...</span>}
          <button onClick={() => onPageChange(totalPages)} className={`${btnBase} text-gray-600 hover:bg-gray-100`}>{totalPages}</button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btnBase} text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        <FaChevronRight size={12} />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
