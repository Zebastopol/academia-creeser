import PropTypes from 'prop-types'
import { FaTools } from 'react-icons/fa'

/**
 * Banner persistente que avisa al usuario que la sección está en construcción.
 * Se muestra fijo en la parte superior de los paneles admin/instructor hasta
 * que exista backend real con datos productivos.
 *
 * @param {{ variant?: 'admin'|'instructor' }} props
 */
const ConstructionBanner = ({ variant = 'admin' }) => {
  const label = variant === 'instructor' ? 'Panel de Instructor' : 'Panel de Administración'

  return (
    <div
      role="alert"
      className="flex items-start gap-3 px-4 py-2.5 text-amber-900 bg-amber-100 border-b border-amber-300"
    >
      <FaTools className="flex-shrink-0 mt-0.5" size={16} aria-hidden="true" />
      <div className="text-xs leading-relaxed sm:text-sm">
        <span className="font-semibold">En Construcción — {label}:</span>{' '}
        esta sección sigue en desarrollo, los datos pueden no ser reales.
      </div>
    </div>
  )
}

ConstructionBanner.propTypes = {
  variant: PropTypes.oneOf(['admin', 'instructor']),
}

export default ConstructionBanner
