import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaCalendar, FaTrophy, FaClock, FaChartLine, FaChartBar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAuth } from '../../features/auth/context/AuthContext'
import { useBookings } from '../../features/bookings/hooks/useBookings'
import { academiaInfo } from '../../shared/data/mockData'
import Button from '../../shared/components/atoms/Button'
import StatsGrid from '../../features/dashboard/components/StatsGrid'
import UpcomingClasses from '../../features/dashboard/components/UpcomingClasses'
import QuickActions from '../../features/dashboard/components/QuickActions'
import ProgressCard from '../../features/dashboard/components/ProgressCard'
import MembershipBlock from '../../features/checkout/components/MembershipBlock'
import SEO from '../../shared/components/common/SEO'

const Dashboard = () => {
  const { user, isAdmin, isInstructor } = useAuth()
  const { bookings, loading: bookingsLoading } = useBookings(user?.id)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
    return () => document.documentElement.removeAttribute('data-theme')
  }, [])

  const stats = [
    { icon: <FaCalendar className="text-3xl" />, label: 'Clases Agendadas', value: bookings.length, color: 'primary' },
    { icon: <FaClock className="text-3xl" />, label: 'Horas Entrenadas', value: '24h', color: 'accent' },
    { icon: <FaTrophy className="text-3xl" />, label: 'Logros', value: '5', color: 'gold' },
    { icon: <FaChartLine className="text-3xl" />, label: 'Asistencia', value: '85%', color: 'green' },
  ]

  return (
    <div className="min-h-screen pt-24 pb-12" style={{ backgroundColor: 'var(--color-bg)' }}>
      <SEO title="Mi Panel de Control" description="Gestiona tus clases y revisa tu progreso en Academia Creeser." />
      <div className="container-custom">
        {/* Welcome header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="dashboard-hero rounded-2xl p-8 text-white mb-8 shadow-xl"
          aria-labelledby="welcome-title"
        >
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={user?.avatar}
                  alt=""
                  className="w-24 h-24 rounded-full object-cover shadow-lg"
                  style={{ border: '3px solid oklch(0.45 0.15 305 / 0.5)' }}
                />
                <div
                  className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-accent)', border: '3px solid oklch(0.30 0.15 305)' }}
                >
                  <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                </div>
              </div>
              <div>
                <h1 id="welcome-title" className="text-3xl md:text-4xl font-bold font-display">
                  ¡Hola, {user?.name.split(' ')[0]}!
                </h1>
                <p className="text-white/70 mt-1 font-medium tracking-wide">
                  {user?.belt} &bull; {academiaInfo.name}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {(isAdmin || isInstructor) && (
                <Link
                  to={isAdmin ? '/admin' : '/instructor'}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg shadow transition-all"
                  style={{ backgroundColor: 'var(--color-accent)', color: '#0a080c' }}
                >
                  <FaChartBar /> Métricas
                </Link>
              )}
              <Button to="/perfil" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-black">
                Mi Perfil
              </Button>
              <Button to="/agendar" className="bg-white text-primary-600 hover:bg-primary-50 border-transparent">
                Agendar Clase
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Stats */}
        <section aria-label="Estadísticas de entrenamiento">
          <StatsGrid stats={stats} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2" aria-labelledby="classes-title">
            <h2 id="classes-title" className="sr-only">Próximas Clases</h2>
            {bookingsLoading ? (
              <div className="card p-6 flex justify-center py-12">
                <div className="loading-spinner" />
              </div>
            ) : (
              <UpcomingClasses classes={bookings} />
            )}
          </section>

          <aside className="space-y-6">
            <MembershipBlock userId={user?.id} membership={user?.membership} />
            <QuickActions />
            <ProgressCard user={user} />
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
