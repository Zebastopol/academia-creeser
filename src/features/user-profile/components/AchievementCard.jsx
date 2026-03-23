import PropTypes from 'prop-types';
import { cn } from '../../../shared/utils/cn';

/**
 * @param {{ achievement: object }} props
 */
const AchievementCard = ({ achievement }) => {
  const { name, description, icon, unlocked, unlockedAt } = achievement;

  return (
    <div className={cn(
      'relative flex flex-col items-center p-5 rounded-xl border-2 text-center transition-all',
      unlocked
        ? 'bg-white border-gold-400 shadow-md'
        : 'bg-gray-50 border-gray-200 opacity-50 grayscale'
    )}>
      <span className="text-4xl mb-3" role="img" aria-label={name}>
        {icon}
      </span>
      <h4 className="text-sm font-bold text-gray-900">{name}</h4>
      <p className="mt-1 text-xs text-gray-500 leading-relaxed">{description}</p>
      {unlocked && unlockedAt && (
        <span className="mt-3 text-[10px] font-medium text-gold-600">
          Desbloqueado el {new Date(unlockedAt + 'T12:00:00').toLocaleDateString('es-CL')}
        </span>
      )}
      {!unlocked && (
        <span className="mt-3 text-[10px] font-medium text-gray-400">Bloqueado</span>
      )}
    </div>
  );
};

AchievementCard.propTypes = {
  achievement: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    unlocked: PropTypes.bool.isRequired,
    unlockedAt: PropTypes.string,
  }).isRequired,
};

export default AchievementCard;
