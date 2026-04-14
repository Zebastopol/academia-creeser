import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUser, FaLock, FaHistory, FaTrophy, FaCreditCard } from 'react-icons/fa'
import { useAuth } from '../../auth/context/AuthContext'
import SEO from '../../../shared/components/common/SEO'
import ProfileHeader from './ProfileHeader'
import PersonalInfoForm from './PersonalInfoForm'
import ChangePasswordForm from './ChangePasswordForm'
import ClassHistoryList from './ClassHistoryList'
import AchievementsGrid from './AchievementsGrid'
import ProgressOverview from './ProgressOverview'
import CheckoutHistoryList from '../../checkout/components/CheckoutHistoryList'

const TABS = [
  { id: 'personal', label: 'Datos Personales', icon: <FaUser /> },
  { id: 'security', label: 'Seguridad', icon: <FaLock /> },
  { id: 'history', label: 'Historial', icon: <FaHistory /> },
  { id: 'achievements', label: 'Logros', icon: <FaTrophy /> },
  { id: 'payments', label: 'Pagos', icon: <FaCreditCard /> },
]

const TAB_PANELS = {
  personal: PersonalInfoForm,
  security: ChangePasswordForm,
  history: ClassHistoryList,
  achievements: () => (
    <div className="space-y-8">
      <ProgressOverview />
      <AchievementsGrid />
    </div>
  ),
  payments: CheckoutHistoryList,
}

const ProfileTemplate = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('personal')
  const ActivePanel = TAB_PANELS[activeTab]

  return (
    <div className="min-h-screen pt-24 pb-12" style={{ backgroundColor: 'var(--color-bg)' }}>
      <SEO
        title="Mi Perfil"
        description="Gestiona tus datos personales, seguridad y consulta tu progreso en Academia Creeser."
      />
      <div className="container-custom space-y-8">
        <ProfileHeader user={user} />

        {/* Tab bar */}
        <div className="overflow-x-auto">
          <nav
            className="flex min-w-max"
            role="tablist"
            aria-label="Secciones del perfil"
            style={{ borderBottom: '1px solid var(--color-surface-offset)' }}
          >
            {TABS.map(tab => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors whitespace-nowrap"
                style={{
                  color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-faint)',
                }}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="profile-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.section
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="card p-6 md:p-8"
          >
            <ActivePanel />
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ProfileTemplate
