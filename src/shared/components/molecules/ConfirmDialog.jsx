import PropTypes from 'prop-types';
import Modal from './Modal';
import Button from '../atoms/Button';

/**
 * @param {{ isOpen: boolean, onClose: function, onConfirm: function, title: string, message: string, confirmLabel?: string, variant?: 'danger'|'warning' }} props
 */
const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirmar',
  variant = 'danger',
}) => {
  const confirmStyles = {
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p className="mb-6 text-gray-600">{message}</p>
      <div className="flex justify-end gap-3">
        <Button variant="ghost" onClick={onClose}>
          Cancelar
        </Button>
        <button
          onClick={() => { onConfirm(); onClose(); }}
          className={`inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${confirmStyles[variant]}`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
};

ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string,
  variant: PropTypes.oneOf(['danger', 'warning']),
};

export default ConfirmDialog;
