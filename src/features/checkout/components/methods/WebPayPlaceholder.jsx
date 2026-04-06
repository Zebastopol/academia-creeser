import { FaGlobe, FaRocket } from 'react-icons/fa';

const WebPayPlaceholder = () => (
  <div className="flex flex-col items-center justify-center py-8 text-center">
    <div className="flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 text-gray-300 rounded-full">
      <FaGlobe className="text-2xl" />
    </div>
    <h4 className="text-base font-semibold text-gray-700">WebPay — Próximamente</h4>
    <p className="mt-2 text-sm text-gray-400 max-w-xs">
      Estamos trabajando en la integración con WebPay para que puedas pagar directamente desde la plataforma.
    </p>
    <span className="inline-flex items-center gap-1.5 mt-4 px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
      <FaRocket className="text-[10px]" /> En desarrollo
    </span>
  </div>
);

export default WebPayPlaceholder;
