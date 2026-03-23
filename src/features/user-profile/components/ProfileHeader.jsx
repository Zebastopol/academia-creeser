import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaCalendarAlt } from 'react-icons/fa';

/**
 * @param {{ user: object }} props
 */
const ProfileHeader = ({ user }) => {
  const joinLabel = user?.joinDate
    ? new Date(user.joinDate + 'T12:00:00').toLocaleDateString('es-CL', { year: 'numeric', month: 'long' })
    : null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-dynamic-main via-dynamic-dark to-black rounded-2xl p-8 text-white shadow-xl shadow-dynamic-main/10"
    >
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
        <div className="relative shrink-0">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-28 h-28 rounded-full border-4 border-white/20 shadow-lg object-cover"
          />
          <span className="absolute -bottom-1 -right-1 bg-gold-500 px-2 py-0.5 rounded-full text-xs font-bold text-black shadow">
            {user?.belt || 'Nuevo'}
          </span>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold font-display md:text-4xl">{user?.name}</h1>
          <p className="mt-1 text-white/70 font-medium tracking-wide">
            {user?.membership || 'Sin membresía'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4 text-sm text-white/60 md:justify-start">
            {user?.email && (
              <span className="flex items-center gap-1.5">
                <FaEnvelope className="text-white/40" />
                {user.email}
              </span>
            )}
            {user?.phone && (
              <span className="flex items-center gap-1.5">
                <FaPhone className="text-white/40" />
                {user.phone}
              </span>
            )}
            {joinLabel && (
              <span className="flex items-center gap-1.5">
                <FaCalendarAlt className="text-white/40" />
                Miembro desde {joinLabel}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

ProfileHeader.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
    belt: PropTypes.string,
    membership: PropTypes.string,
    phone: PropTypes.string,
    joinDate: PropTypes.string,
  }),
};

export default ProfileHeader;
