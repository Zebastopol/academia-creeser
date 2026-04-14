import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaCalendarAlt, FaChartBar } from 'react-icons/fa'
import gsap from 'gsap'
import { useAuth } from '../../auth/context/AuthContext'

/**
 * @param {{ user: object }} props
 */
const ProfileHeader = ({ user }) => {
  const { isAdmin, isInstructor } = useAuth()
  const progressRef = useRef(null)

  const joinLabel = user?.joinDate
    ? new Date(user.joinDate + 'T12:00:00').toLocaleDateString('es-CL', { year: 'numeric', month: 'long' })
    : null

  useEffect(() => {
    if (!progressRef.current) return
    gsap.fromTo(
      progressRef.current,
      { width: '0%' },
      { width: '65%', duration: 1.2, ease: 'power2.out', delay: 0.5 }
    )
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="dashboard-hero rounded-2xl p-8 text-white shadow-xl"
    >
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
        <div className="relative shrink-0">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-28 h-28 rounded-full object-cover shadow-lg transition-shadow duration-300 hover:shadow-glow-primary"
            style={{ border: '2px solid var(--color-primary)' }}
          />
          <span
            className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-xs font-bold shadow"
            style={{ backgroundColor: 'var(--color-accent)', color: '#0a080c' }}
          >
            {user?.belt || 'Nuevo'}
          </span>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold font-display md:text-4xl">{user?.name}</h1>
          <p className="mt-1 text-white/70 font-medium tracking-wide">
            {user?.membership || 'Sin membresía'}
          </p>

          {/* Progress bar */}
          <div className="mt-3 max-w-xs md:max-w-sm">
            <div className="flex justify-between text-xs text-white/50 mb-1">
              <span>Progreso de nivel</span>
              <span>65%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10">
              <div
                ref={progressRef}
                className="h-1.5 rounded-full"
                style={{ backgroundColor: 'var(--color-accent)', width: 0 }}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4 text-sm text-white/60 md:justify-start">
            {user?.email && (
              <span className="flex items-center gap-1.5">
                <FaEnvelope className="text-white/40" /> {user.email}
              </span>
            )}
            {user?.phone && (
              <span className="flex items-center gap-1.5">
                <FaPhone className="text-white/40" /> {user.phone}
              </span>
            )}
            {joinLabel && (
              <span className="flex items-center gap-1.5">
                <FaCalendarAlt className="text-white/40" /> Miembro desde {joinLabel}
              </span>
            )}
          </div>

          {(isAdmin || isInstructor) && (
            <Link
              to={isAdmin ? '/admin' : '/instructor'}
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 text-sm font-semibold rounded-lg shadow transition-all"
              style={{ backgroundColor: 'var(--color-accent)', color: '#0a080c' }}
            >
              <FaChartBar /> Métricas
            </Link>
          )}
        </div>
      </div>
    </motion.section>
  )
}

export default ProfileHeader
