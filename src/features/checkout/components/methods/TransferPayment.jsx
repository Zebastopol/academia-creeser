import { FaCopy, FaCheck } from 'react-icons/fa';
import { useState } from 'react';
import { getBankData } from '../../services/checkoutService';

const TransferPayment = () => {
  const bank = getBankData();
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const fields = [
    { label: 'Banco', value: bank.bank },
    { label: 'Tipo de cuenta', value: bank.accountType },
    { label: 'N° Cuenta', value: bank.accountNumber, copyable: true },
    { label: 'RUT', value: bank.rut, copyable: true },
    { label: 'Titular', value: bank.name },
    { label: 'Email comprobante', value: bank.email, copyable: true },
  ];

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-600 mb-4">
        Realiza la transferencia a los siguientes datos y envía tu comprobante al email indicado.
      </p>

      <div className="space-y-2">
        {fields.map((f) => (
          <div
            key={f.label}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <span className="text-xs text-gray-400 block">{f.label}</span>
              <span className="text-sm font-medium text-gray-900">{f.value}</span>
            </div>
            {f.copyable && (
              <button
                type="button"
                onClick={() => copyToClipboard(f.value, f.label)}
                className="flex items-center gap-1 px-2 py-1 text-xs text-primary hover:bg-primary/10 rounded transition-colors"
              >
                {copied === f.label ? <FaCheck /> : <FaCopy />}
                {copied === f.label ? 'Copiado' : 'Copiar'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransferPayment;
