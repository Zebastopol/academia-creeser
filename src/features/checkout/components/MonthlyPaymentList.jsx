import PropTypes from 'prop-types';
import MonthlyPaymentCard from './MonthlyPaymentCard';

/**
 * @param {{ months: Array, selectedMonth: number|null, onSelect: function }} props
 */
const MonthlyPaymentList = ({ months, selectedMonth, onSelect }) => {
  const currentMonth = new Date().getMonth() + 1;

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-6">
      {months.map((m) => (
        <MonthlyPaymentCard
          key={m.month}
          data={m}
          isSelected={selectedMonth === m.month}
          isCurrent={m.month === currentMonth}
          onClick={onSelect}
        />
      ))}
    </div>
  );
};

MonthlyPaymentList.propTypes = {
  months: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedMonth: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};

export default MonthlyPaymentList;
