import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FaMousePointer, FaEye } from 'react-icons/fa';

const MONTH_LABELS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

/**
 * @param {{ marketing: object }} props
 */
const MarketingOverview = ({ marketing }) => {
  if (!marketing) return null;

  const trafficData = marketing.trafficByMonth.map((m) => ({
    name: MONTH_LABELS[m.month - 1],
    'Visitas': m.pageViews,
    'Visitantes Únicos': m.uniqueVisitors,
  }));

  const heroClicksData = Object.entries(marketing.heroClicks).map(([key, val]) => ({
    name: key === 'inscribirse' ? 'Inscribirse' : key === 'verClases' ? 'Ver Clases' : 'Contacto',
    clicks: val,
  }));

  const sectionData = [
    { name: 'Inicio', views: marketing.sectionViews.home },
    { name: 'Clases', views: marketing.sectionViews.clases },
    { name: 'Baby TKD', views: marketing.sectionViews.babyTkd },
    { name: 'Kids', views: marketing.sectionViews.kids },
    { name: 'Cadetes', views: marketing.sectionViews.cadetes },
    { name: 'Adultos', views: marketing.sectionViews.adultos },
    { name: 'Contacto', views: marketing.sectionViews.contacto },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Traffic Chart */}
        <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-soft">
          <h3 className="flex items-center gap-2 mb-4 text-base font-bold text-gray-900">
            <FaEye className="text-primary-600" /> Tráfico Mensual
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Visitas" fill="#714790" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Visitantes Únicos" fill="#7cc8fb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Hero Clicks */}
        <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-soft">
          <h3 className="flex items-center gap-2 mb-4 text-base font-bold text-gray-900">
            <FaMousePointer className="text-primary-600" /> Clicks en Hero (CTA)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={heroClicksData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" fontSize={12} />
              <YAxis type="category" dataKey="name" fontSize={12} width={100} />
              <Tooltip />
              <Bar dataKey="clicks" fill="#E31E24" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Section Views */}
      <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-soft">
        <h3 className="flex items-center gap-2 mb-4 text-base font-bold text-gray-900">
          <FaEye className="text-primary-600" /> Vistas por Sección
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={sectionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Bar dataKey="views" fill="#015da4" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-3 text-center">
          <span className="text-sm text-gray-500">
            Tasa de conversión: <strong className="text-green-600">{marketing.conversionRate}%</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

MarketingOverview.propTypes = {
  marketing: PropTypes.object,
};

export default MarketingOverview;
