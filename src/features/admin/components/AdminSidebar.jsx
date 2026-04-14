import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  FaChartPie, FaUsers, FaChalkboardTeacher, FaCalendarAlt,
  FaClipboardList, FaFileAlt, FaTimes, FaArrowLeft
} from 'react-icons/fa';
import { ADMIN_SIDEBAR_ITEMS } from '../constants/adminConstants';

const ICON_MAP = {
  FaChartPie, FaUsers, FaChalkboardTeacher, FaCalendarAlt,
  FaClipboardList, FaFileAlt,
};

/**
 * @param {{ collapsed: boolean, onClose: function }} props
 */
const AdminSidebar = ({ collapsed, onClose }) => {
  return (
    <>
      {!collapsed && (
        <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 flex flex-col h-screen text-white transition-transform duration-300
          ${collapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'translate-x-0 w-64'}
          lg:sticky lg:top-0`}
        style={{ backgroundColor: '#141118' }}
      >
        <div className="flex items-center justify-between h-16 px-4" style={{ borderBottom: '1px solid #26212e' }}>
          {!collapsed && (
            <span className="text-lg font-bold font-display text-primary-400">
              CreeSer Admin
            </span>
          )}
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-800 lg:hidden">
            <FaTimes />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {ADMIN_SIDEBAR_ITEMS.map((item) => {
            const Icon = ICON_MAP[item.icon];
            return (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === '/admin'}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${isActive
                    ? 'bg-primary-600 text-white shadow-glow-primary'
                    : 'text-gray-300 hover:text-white'}`
                }
                style={({ isActive }) => (!isActive ? { ['--tw-bg-opacity']: 0 } : {})}
              >
                {Icon && <Icon size={18} />}
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        <div className="px-3 py-4" style={{ borderTop: '1px solid #26212e' }}>
          <NavLink
            to="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
          >
            <FaArrowLeft size={14} />
            {!collapsed && <span>Volver al sitio</span>}
          </NavLink>
        </div>
      </aside>
    </>
  );
};

AdminSidebar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AdminSidebar;
