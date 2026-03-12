import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="card p-6 h-full flex flex-col"
    >
      <div className="flex items-center mb-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full mr-3 object-cover"
        />
        <div>
          <h4 className="font-bold">{testimonial.name}</h4>
          <p className="text-sm text-gray-600">{testimonial.role}</p>
        </div>
      </div>
      <div className="flex mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <FaStar key={i} className="text-gold-400" />
        ))}
      </div>
      <p className="text-gray-600 text-sm italic flex-grow">"{testimonial.text}"</p>
    </motion.div>
  );
};

export default TestimonialCard;
