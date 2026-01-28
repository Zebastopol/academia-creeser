import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendar, FaUser, FaTrophy, FaClock, FaChartLine } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { mockBookings, classes } from '../../data/mockData';

const Dashboard = () => {
  const { user } = useAuth();

  const userBookings = mockBookings.filter(b => b.userId === user?.id);
  const upcomingClasses = userBookings.map(booking => {
    const classInfo = classes.find(c => c.id === booking.classId);
    return {
      ...booking,
      className: classInfo?.name,
      instructor: classInfo?.instructor
    };
  });

  const stats = [
    {
      icon: <FaCalendar className="text-3xl" />,
      label: "Clases Agendadas",
      value: userBookings.length,
      color: "primary"
    },
    {
      icon: <FaClock className="text-3xl" />,
      label: "Horas Entrenadas",
      value: "24h",
      color: "accent"
    },
    {
      icon: <FaTrophy className="text-3xl" />,
      label: "Logros",
      value: "5",
      color: "gold"
    },
    {
      icon: <FaChartLine className="text-3xl" />,
      label: "Progreso",
      value: "85%",
      color: "green"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container-custom">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-bold font-display">
                  ¡Bienvenido, {user?.name}!
                </h1>
                <p className="text-white/80 mt-1">
                  {user?.membership || 'Miembro'} • {user?.belt || 'Cinturón Blanco'}
                </p>
              </div>
            </div>
            <Link to="/perfil" className="btn-secondary border-white text-white hover:bg-white hover:text-primary-600">
              Editar Perfil
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6"
            >
              <div className={`inline-block p-3 bg-${stat.color}-100 text-${stat.color}-600 rounded-lg mb-4`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Classes */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Próximas Clases</h2>
                <Link to="/agendar" className="text-primary-600 hover:text-primary-700 font-medium">
                  Agendar Nueva Clase
                </Link>
              </div>

              {upcomingClasses.length > 0 ? (
                <div className="space-y-4">
                  {upcomingClasses.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
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
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FaCalendar className="text-6xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No tienes clases agendadas</p>
                  <Link to="/agendar" className="btn-primary">
                    Agendar Primera Clase
                  </Link>
                </div>
              )}
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="card p-6"
            >
              <h2 className="text-xl font-bold mb-4">Acciones Rápidas</h2>
              <div className="space-y-3">
                <Link
                  to="/agendar"
                  className="block p-3 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <FaCalendar className="text-primary-600" />
                    <span className="font-medium">Agendar Clase</span>
                  </div>
                </Link>
                <Link
                  to="/perfil"
                  className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <FaUser className="text-gray-600" />
                    <span className="font-medium">Mi Perfil</span>
                  </div>
                </Link>
                <Link
                  to="/membresias"
                  className="block p-3 bg-gold-50 hover:bg-gold-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <FaTrophy className="text-gold-600" />
                    <span className="font-medium">Mejorar Plan</span>
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* Progress Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="card p-6"
            >
              <h2 className="text-xl font-bold mb-4">Tu Progreso</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Cinturón Actual</span>
                    <span className="font-semibold">{user?.belt}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary-600 h-2 rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Asistencia Mensual</span>
                    <span className="font-semibold">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
