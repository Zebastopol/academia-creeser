import { FaCalendar } from 'react-icons/fa';

const BookingItem = ({ booking }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
          <FaCalendar />
        </div>
        <div>
          <h3 className="font-semibold">{booking.className}</h3>
          <p className="text-sm text-gray-600">
            {new Date(booking.date).toLocaleDateString('es-CL')} • {booking.time}
          </p>
          <p className="text-xs text-gray-500">{booking.instructor}</p>
        </div>
      </div>
      <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
        Confirmada
      </span>
    </div>
  );
};

export default BookingItem;
