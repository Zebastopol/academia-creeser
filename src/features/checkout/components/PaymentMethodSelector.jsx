import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { PAYMENT_METHODS_REGISTRY } from '../constants/checkoutConstants';

import TransferPayment from './methods/TransferPayment';
import CardRegistration from './methods/CardRegistration';
import WebPayPlaceholder from './methods/WebPayPlaceholder';

const COMPONENT_MAP = {
  TransferPayment,
  CardRegistration,
  WebPayPlaceholder,
};

/**
 * @param {{ className?: string }} props
 */
const PaymentMethodSelector = ({ className = '' }) => {
  const [activeMethod, setActiveMethod] = useState(null);

  const ActiveComponent = activeMethod
    ? COMPONENT_MAP[PAYMENT_METHODS_REGISTRY.find((m) => m.id === activeMethod)?.component]
    : null;

  return (
    <div className={`mt-6 ${className}`}>
      <h4 className="text-sm font-semibold text-gray-700 mb-3">Selecciona método de pago</h4>

      <div className="flex flex-wrap gap-2 mb-4">
        {PAYMENT_METHODS_REGISTRY.map((method) => {
          const Icon = method.icon;
          const isActive = activeMethod === method.id;
          const isComingSoon = method.status === 'coming_soon';

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => !isComingSoon && setActiveMethod(isActive ? null : method.id)}
              disabled={isComingSoon}
              className={`
                flex items-center gap-2
                px-4 py-2.5
                text-sm font-medium
                border rounded-lg
                transition-all duration-200
                ${isActive
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : isComingSoon
                    ? 'bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-primary/50 hover:text-primary'
                }
              `}
            >
              <Icon />
              {method.name}
              {isComingSoon && (
                <span className="ml-1 px-1.5 py-0.5 text-[9px] bg-gray-200 text-gray-500 rounded">
                  Pronto
                </span>
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {ActiveComponent && (
          <motion.div
            key={activeMethod}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-5 bg-white border border-gray-200 rounded-xl"
          >
            <ActiveComponent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

PaymentMethodSelector.propTypes = {
  className: PropTypes.string,
};

export default PaymentMethodSelector;
