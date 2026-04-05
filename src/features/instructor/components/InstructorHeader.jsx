import PropTypes from 'prop-types';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../auth/context/AuthContext';

/**
 * @param {{ onToggleSidebar: function }} props
 */
const InstructorHeader = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 sm:px-6">
      <button
        onClick={onToggleSidebar}
        className="flex items-center justify-center w-10 h-10 text-gray-600 rounded-lg hover:bg-gray-100 lg:hidden"
      >
        <FaBars size={18} />
      </button>

      <div className="hidden lg:block">
        <h1 className="text-lg font-bold text-gray-900 font-display">Panel de Instructor</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.role === 'instructor' ? 'Instructor' : user?.email}</p>
        </div>
        <img
          src={user?.avatar}
          alt={user?.name}
          className="w-9 h-9 rounded-full object-cover ring-2 ring-primary-100"
        />
        <button
          onClick={logout}
          className="flex items-center justify-center w-9 h-9 text-gray-400 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
          title="Cerrar sesión"
        >
          <FaSignOutAlt size={16} />
        </button>
      </div>
    </header>
  );
};

InstructorHeader.propTypes = {
  onToggleSidebar: PropTypes.func.isRequired,
};

export default InstructorHeader;
