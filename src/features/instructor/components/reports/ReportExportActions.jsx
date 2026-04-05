import PropTypes from 'prop-types';
import { FaFilePdf, FaPrint } from 'react-icons/fa';
import { toast } from 'react-toastify';

/**
 * @param {{ disabled: boolean }} props
 */
const ReportExportActions = ({ disabled }) => {
  const handleExport = () => {
    toast.info('Exportación a PDF disponible próximamente.');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleExport}
        disabled={disabled}
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
      >
        <FaFilePdf size={12} />
        Exportar PDF
      </button>
      <button
        onClick={handlePrint}
        disabled={disabled}
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
      >
        <FaPrint size={12} />
        Imprimir
      </button>
    </div>
  );
};

ReportExportActions.propTypes = {
  disabled: PropTypes.bool,
};

export default ReportExportActions;
