import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';

/**
 * Tarjeta de testimonio con shape alineado a Google Places reviews.
 *
 * @param {{ testimonial: { rating:number, text:string, date:string, authorName:string, authorPhoto:string }, index:number }} props
 */
const TestimonialCard = ({ testimonial, index }) => {
  const { rating, text, authorName, authorPhoto } = testimonial;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="card p-6 h-full flex flex-col"
    >
      <div className="flex items-center mb-4">
        {authorPhoto ? (
          <img
            src={authorPhoto}
            alt={authorName}
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-full mr-3 object-cover"
          />
        ) : (
          <div
            className="flex items-center justify-center w-12 h-12 mr-3 text-white bg-primary rounded-full font-bold"
            aria-hidden="true"
          >
            {authorName?.charAt(0).toUpperCase() || 'G'}
          </div>
        )}
        <div>
          <h4 className="font-bold">{authorName}</h4>
          <p className="text-sm text-gray-600">Reseña de Google</p>
        </div>
      </div>
      <div className="flex mb-3">
        {[...Array(Math.round(rating || 0))].map((_, i) => (
          <FaStar key={i} className="text-gold-400" />
        ))}
      </div>
      <p className="text-gray-600 text-sm italic flex-grow">&quot;{text}&quot;</p>
    </motion.div>
  );
};

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    rating: PropTypes.number,
    text: PropTypes.string,
    date: PropTypes.string,
    authorName: PropTypes.string,
    authorPhoto: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default TestimonialCard;
