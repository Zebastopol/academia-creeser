import { motion } from 'framer-motion';
import { FaCreditCard } from 'react-icons/fa';
import useCheckout from '../hooks/useCheckout';
import MonthlyPaymentList from '../components/MonthlyPaymentList';
import MonthDetail from '../components/MonthDetail';
import PaymentMethodSelector from '../components/PaymentMethodSelector';
import SEO from '../../../shared/components/common/SEO';

const CheckoutTemplate = () => {
  const { months, selectedMonth, monthDetail, loading, selectMonth, user } = useCheckout();

  const selectedMonthData = months.find((m) => m.month === selectedMonth);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12">
      <SEO title="Portal de Pagos" description="Gestiona tus pagos y membresía en Academia Creeser." />
      <div className="container-custom max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-xl">
              <FaCreditCard className="text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Portal de Pagos</h1>
              <p className="text-sm text-gray-500">
                {user?.membership || 'Sin membresía'} — {user?.name}
              </p>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Mensualidades 2026</h2>
            <MonthlyPaymentList
              months={months}
              selectedMonth={selectedMonth}
              onSelect={selectMonth}
            />
          </section>

          {selectedMonthData && monthDetail && (
            <section>
              <MonthDetail detail={monthDetail} monthData={selectedMonthData}>
                <PaymentMethodSelector />
              </MonthDetail>
            </section>
          )}
        </motion.div>
      </div>
    </main>
  );
};

export default CheckoutTemplate;
