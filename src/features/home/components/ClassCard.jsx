import { motion } from 'framer-motion';
import Button from '../../../shared/components/atoms/Button';

const ClassCard = ({ classItem, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="card overflow-hidden group h-full flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={classItem.image}
          alt={classItem.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="px-3 py-1 bg-primary-600 text-white text-xs rounded-full">
            {classItem.ageGroup}
          </span>
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2">{classItem.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {classItem.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">{classItem.duration}</span>
          <span className="text-lg font-bold text-primary-600">
            ${classItem.price.toLocaleString()}
          </span>
        </div>
        <Button
          to={`/clases/${classItem.id}`}
          variant="primary"
          className="w-full"
        >
          Ver Detalles
        </Button>
      </div>
    </motion.div>
  );
};

export default ClassCard;
