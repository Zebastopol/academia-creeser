import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  to,
  type = 'button',
  onClick,
  disabled = false,
  isLoading = false,
  ...props
}) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'bg-accent-600 text-white hover:bg-accent-700 focus:ring-accent-500',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white',
    ghost: 'text-gray-600 hover:bg-gray-100'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg font-bold'
  };

  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const combinedClasses = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {isLoading ? (
          <span className="mr-2 animate-spin">◌</span>
        ) : null}
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2 animate-spin">◌</span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
