import { motion } from 'framer-motion';
import { cn } from '../../../shared/utils/cn';

const StatCard = ({ icon, label, value, color = 'primary', index }) => {
  const colorVariants = {
    primary: 'bg-primary-100 text-primary-600',
    accent: 'bg-accent-100 text-accent-600',
    gold: 'bg-gold-100 text-gold-600',
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card p-6 h-full flex flex-col"
    >
      <div className={cn(
        'inline-block p-3 rounded-lg mb-4 w-fit',
        colorVariants[color] || colorVariants.primary
      )}>
        {icon}
      </div>
      <div className="text-3xl font-bold mb-1 mt-auto">{value}</div>
      <div className="text-gray-600 text-sm">{label}</div>
    </motion.div>
  );
};

export default StatCard;
