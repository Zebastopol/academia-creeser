import { motion } from 'framer-motion';
import Button from '../../../shared/components/atoms/Button';
import { cn } from '../../../shared/utils/cn';

const MembershipCard = ({ plan, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={cn(
        'relative bg-white text-gray-900 rounded-2xl p-8 flex flex-col h-full',
        plan.popular ? 'ring-4 ring-gold-400 transform scale-105 z-10' : ''
      )}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="px-4 py-1 bg-gold-400 text-gray-900 text-sm font-bold rounded-full">
            MÁS POPULAR
          </span>
        </div>
      )}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
        <div className="flex items-baseline justify-center">
          <span className="text-4xl font-bold">${plan.price.toLocaleString()}</span>
          <span className="text-gray-600 ml-2">/{plan.period}</span>
        </div>
      </div>
      <ul className="space-y-3 mb-8 flex-grow">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start space-x-2">
            <span className="text-green-500 mt-1">✓</span>
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        to="/registro"
        variant={plan.popular ? 'primary' : 'outline'}
        className={cn(
          'w-full py-3',
          !plan.popular && 'border-gray-200 text-gray-900 hover:bg-gray-100 hover:text-gray-900'
        )}
      >
        Comenzar Ahora
      </Button>
    </motion.div>
  );
};

export default MembershipCard;
