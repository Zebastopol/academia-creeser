import { motion } from 'framer-motion';
import { FaCalendar, FaTrophy, FaClock, FaChartLine, } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaChartBar } from 'react-icons/fa';
import { useAuth } from '../../features/auth/context/AuthContext';
import { useBookings } from '../../features/bookings/hooks/useBookings';
import { academiaInfo } from '../../shared/data/mockData';
import Button from '../../shared/components/atoms/Button';
import StatsGrid from '../../features/dashboard/components/StatsGrid';
import UpcomingClasses from '../../features/dashboard/components/UpcomingClasses';
import QuickActions from '../../features/dashboard/components/QuickActions';
import ProgressCard from '../../features/dashboard/components/ProgressCard';
import MembershipBlock from '../../features/checkout/components/MembershipBlock';
import SEO from '../../shared/components/common/SEO';

const Dashboard = () => {
  const { user, isAdmin, isInstructor } = useAuth();
  const { bookings, loading: bookingsLoading } = useBookings(user?.id);

  const stats = [
    {
      icon: <FaCalendar className="text-3xl" />,
      label: "Clases Agendadas",
      value: bookings.length,
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
      label: "Asistencia",
      value: "85%",
      color: "green"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12 transition-colors duration-700">
      <SEO title="Mi Panel de Control" description="Gestiona tus clases y revisa tu progreso en Academia Creeser." />
      <div className="container-custom">
        {/* Welcome Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-dynamic-main via-dynamic-dark to-black rounded-2xl p-8 text-white mb-8 shadow-xl shadow-dynamic-main/10"
          aria-labelledby="welcome-title"
        >
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={user?.avatar}
                  alt=""
                  className="w-24 h-24 rounded-full border-4 border-white/20 shadow-lg object-cover"
                />
                <div className="absolute -bottom-1 -right-1 bg-gold-500 w-8 h-8 rounded-full border-4 border-dynamic-dark flex items-center justify-center">
                   <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                </div>
              </div>
              <div>
                <h1 id="welcome-title" className="text-3xl md:text-4xl font-bold font-display">
                  ¡Hola, {user?.name.split(' ')[0]}!
                </h1>
                <p className="text-white/70 mt-1 font-medium tracking-wide">
                  {user?.belt} • {academiaInfo.name}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {(isAdmin || isInstructor) && (
                <Link
                  to={isAdmin ? '/admin' : '/instructor'}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-gold-500 text-black rounded-lg shadow hover:bg-gold-400 transition-all"
                >
                  <FaChartBar /> Métricas
                </Link>
              )}
              <Button
                to="/perfil"
                variant="outline"
                className="border-white/30 text-white hover:bg-white hover:text-black transition-all"
              >
                Mi Perfil
              </Button>
              <Button
                to="/agendar"
                className="bg-white text-dynamic-main hover:bg-dynamic-light border-transparent"
              >
                Agendar Clase
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Stats Grid */}
        <section aria-label="Estadísticas de entrenamiento">
          <StatsGrid stats={stats} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Classes */}
          <section className="lg:col-span-2" aria-labelledby="classes-title">
            <h2 id="classes-title" className="sr-only">Próximas Clases</h2>
            {bookingsLoading ? (
               <div className="card p-6 flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dynamic-main"></div>
               </div>
            ) : (
              <UpcomingClasses classes={bookings} />
            )}
          </section>

          {/* Sidebar Actions & Progress */}
          <aside className="space-y-6">
            <MembershipBlock userId={user?.id} membership={user?.membership} />
            <QuickActions />
            <ProgressCard user={user} />
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
