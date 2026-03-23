import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaLock, FaHistory, FaTrophy } from 'react-icons/fa';
import { useAuth } from '../../auth/context/AuthContext';
import SEO from '../../../shared/components/common/SEO';
import ProfileHeader from './ProfileHeader';
import PersonalInfoForm from './PersonalInfoForm';
import ChangePasswordForm from './ChangePasswordForm';
import ClassHistoryList from './ClassHistoryList';
import AchievementsGrid from './AchievementsGrid';
import ProgressOverview from './ProgressOverview';
import { cn } from '../../../shared/utils/cn';

const TABS = [
  { id: 'personal', label: 'Datos Personales', icon: <FaUser /> },
  { id: 'security', label: 'Seguridad', icon: <FaLock /> },
  { id: 'history',  label: 'Historial', icon: <FaHistory /> },
  { id: 'achievements', label: 'Logros', icon: <FaTrophy /> },
];

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
};

const ProfileTemplate = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const ActivePanel = TAB_PANELS[activeTab];

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12">
      <SEO
        title="Mi Perfil"
        description="Gestiona tus datos personales, seguridad y consulta tu progreso en Academia Creeser."
      />
      <div className="container-custom space-y-8">
        {/* Header */}
        <ProfileHeader user={user} />

        {/* Tab bar */}
        <div className="overflow-x-auto">
          <nav
            className="flex min-w-max border-b border-gray-200"
            role="tablist"
            aria-label="Secciones del perfil"
          >
            {TABS.map(tab => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'relative flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors whitespace-nowrap',
                  activeTab === tab.id
                    ? 'text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                )}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="profile-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
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
    </main>
  );
};

ProfileTemplate.propTypes = {};

export default ProfileTemplate;
