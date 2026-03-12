import { motion } from 'framer-motion';

const ProgressCard = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="card p-6"
    >
      <h2 className="text-xl font-bold mb-4">Tu Progreso</h2>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Cinturón Actual</span>
            <span className="font-semibold text-gray-900">{user?.belt}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-primary-600 h-2 rounded-full" style={{ width: '60%' }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Asistencia Mensual</span>
            <span className="font-semibold text-gray-900">85%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressCard;
