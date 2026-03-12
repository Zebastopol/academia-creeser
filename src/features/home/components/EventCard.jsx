import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EventCard = ({ event, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="card overflow-hidden h-full flex flex-col"
    >
      <div className="relative h-40">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-accent-600 text-white text-xs rounded-full">
            {event.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="font-bold mb-2 line-clamp-2">{event.title}</h3>
        <p className="text-sm text-gray-600 mb-3">
          📅 {new Date(event.date).toLocaleDateString('es-CL')}
        </p>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
          {event.description}
        </p>
        <Link
          to={`/eventos/${event.id}`}
          className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1 mt-auto"
        >
          <span>Más información</span>
          <FaArrowRight className="text-xs" />
        </Link>
      </div>
    </motion.div>
  );
};

export default EventCard;
