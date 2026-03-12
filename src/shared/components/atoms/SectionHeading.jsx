import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const SectionHeading = ({
  title,
  subtitle,
  centered = true,
  className,
  inverse = false,
  ...props
}) => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <motion.div
      {...fadeInUp}
      className={cn(
        'mb-16',
        centered ? 'text-center' : 'text-left',
        className
      )}
      {...props}
    >
      <h2 className={cn(
        'text-3xl md:text-5xl font-bold font-display mb-4',
        inverse ? 'text-white' : 'text-gray-900'
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'text-lg md:text-xl max-w-3xl',
          centered && 'mx-auto',
          inverse ? 'text-gray-200' : 'text-gray-600'
        )}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
