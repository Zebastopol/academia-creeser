import { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CALENDAR_EVENT_TYPES } from '../../constants/adminConstants';
import Button from '../../../../shared/components/atoms/Button';

const locales = { es };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

const MESSAGES_ES = {
  allDay: 'Todo el día',
  previous: 'Anterior',
  next: 'Siguiente',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'No hay eventos en este rango.',
  showMore: (total) => `+${total} más`,
};

/**
 * @param {{ calendarEvents: Array, onSelectEvent: function, onCreateEvent: function }} props
 */
const AcademicCalendar = ({ calendarEvents, onSelectEvent, onCreateEvent }) => {
  const eventStyleGetter = useCallback((event) => {
    const resource = event.resource;
    const typeInfo = CALENDAR_EVENT_TYPES[resource?.type];
    return {
      style: {
        backgroundColor: resource?.color || typeInfo?.color || '#0c92eb',
        borderRadius: '6px',
        border: 'none',
        color: '#fff',
        fontSize: '0.75rem',
        padding: '2px 6px',
      },
    };
  }, []);

  const legend = useMemo(() => Object.entries(CALENDAR_EVENT_TYPES), []);

  return (
    <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-soft">
      <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base font-bold text-gray-900">Calendario Académico</h3>
        <Button variant="primary" size="sm" onClick={onCreateEvent}>+ Nuevo Evento</Button>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        {legend.map(([key, val]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: val.color }} />
            <span className="text-xs text-gray-500">{val.label}</span>
          </div>
        ))}
      </div>

      <div style={{ height: 550 }}>
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          views={['month', 'week', 'agenda']}
          messages={MESSAGES_ES}
          culture="es"
          eventPropGetter={eventStyleGetter}
          onSelectEvent={(e) => onSelectEvent(e.resource)}
          popup
          style={{ height: '100%' }}
        />
      </div>
    </div>
  );
};

AcademicCalendar.propTypes = {
  calendarEvents: PropTypes.array.isRequired,
  onSelectEvent: PropTypes.func.isRequired,
  onCreateEvent: PropTypes.func.isRequired,
};

export default AcademicCalendar;
