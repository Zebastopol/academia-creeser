import { FaUniversity, FaCreditCard, FaGlobe } from 'react-icons/fa';

export const PAYMENT_STATUS = {
  PAID: 'paid',
  PENDING: 'pending',
  OVERDUE: 'overdue',
};

export const PAYMENT_STATUS_MAP = {
  paid:    { label: 'Pagado',   color: 'success' },
  pending: { label: 'Pendiente', color: 'warning' },
  overdue: { label: 'Vencido',  color: 'error' },
};

export const PAYMENT_METHODS_REGISTRY = [
  { id: 'transfer', name: 'Transferencia Bancaria', component: 'TransferPayment', status: 'active',      icon: FaUniversity },
  { id: 'card',     name: 'Inscribir Tarjeta',      component: 'CardRegistration', status: 'active',      icon: FaCreditCard },
  { id: 'webpay',   name: 'WebPay',                  component: 'WebPayPlaceholder', status: 'coming_soon', icon: FaGlobe },
];

export const MONTH_LABELS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

export const ENROLLMENT_FEE = 15000;
