import PropTypes from 'prop-types'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { cn } from '../../utils/cn'

const BASE_BTN =
  'flex items-center justify-center w-10 h-10 text-sm font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1'
const INACTIVE_BTN =
  'text-gray-600 border border-gray-200 bg-white hover:border-primary-300 hover:text-primary-600 hover:-translate-y-0.5'
const ACTIVE_BTN =
  'bg-primary-600 text-white border border-primary-600 shadow-glow-primary'
const NAV_BTN =
  'text-gray-500 border border-gray-200 bg-white hover:border-primary-300 hover:text-primary-600 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:border-gray-200 disabled:hover:text-gray-500'
const ELLIPSIS = 'flex items-center justify-center w-8 h-10 text-gray-400 text-sm'

/**
 * @param {{ currentPage: number, totalPages: number, onPageChange: (page:number)=>void }} props
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null

  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
  const end = Math.min(totalPages, start + maxVisible - 1)
  if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1)

  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <nav
      aria-label="Paginación"
      className="flex items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
        className={cn(BASE_BTN, NAV_BTN)}
      >
        <FaChevronLeft size={12} />
      </button>

      {start > 1 && (
        <>
          <button
            type="button"
            onClick={() => onPageChange(1)}
            aria-label="Ir a la primera página"
            className={cn(BASE_BTN, INACTIVE_BTN)}
          >
            1
          </button>
          {start > 2 && <span className={ELLIPSIS}>…</span>}
        </>
      )}

      {pages.map((p) => {
        const isActive = p === currentPage
        return (
          <button
            type="button"
            key={p}
            onClick={() => onPageChange(p)}
            aria-label={`Ir a la página ${p}`}
            aria-current={isActive ? 'page' : undefined}
            className={cn(BASE_BTN, isActive ? ACTIVE_BTN : INACTIVE_BTN)}
          >
            {p}
          </button>
        )
      })}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className={ELLIPSIS}>…</span>}
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            aria-label={`Ir a la última página (${totalPages})`}
            className={cn(BASE_BTN, INACTIVE_BTN)}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Página siguiente"
        className={cn(BASE_BTN, NAV_BTN)}
      >
        <FaChevronRight size={12} />
      </button>
    </nav>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
}

export default Pagination
