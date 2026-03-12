import { useState, useEffect, Fragment } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import { GiKimono } from 'react-icons/gi';
import { Menu, Transition } from '@headlessui/react';
import { useAuth } from '../../../features/auth/context/AuthContext';
import { cn } from '../../utils/cn';
import Button from '../atoms/Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Clases', path: '/clases' },
    { name: 'Membresías', path: '/membresias' },
    { name: 'Eventos', path: '/eventos' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Contacto', path: '/contacto' }
  ];

  return (
    <nav
      className={cn(
        'fixed w-full z-50 transition-all duration-300',
        scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'
      )}
      aria-label="Navegación principal"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group" aria-label="Ir al inicio">
            <div className={cn(
              'p-2 rounded-lg transition-all duration-300',
              scrolled ? 'bg-primary-600' : 'bg-white'
            )}>
              <GiKimono className={cn(
                'text-2xl transition-colors duration-300',
                scrolled ? 'text-white' : 'text-primary-600'
              )} />
            </div>
            <div>
              <h1 className={cn(
                'font-display font-bold text-xl transition-colors duration-300',
                scrolled ? 'text-gray-900' : 'text-white'
              )}>
                CREESER
              </h1>
              <p className={cn(
                'text-xs transition-colors duration-300',
                scrolled ? 'text-gray-600' : 'text-gray-200'
              )}>
                Academia de Taekwondo
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'font-medium transition-all duration-300 hover:scale-105',
                  location.pathname === link.path
                    ? scrolled ? 'text-primary-600 font-bold border-b-2 border-primary-600' : 'text-white font-bold border-b-2 border-white'
                    : scrolled ? 'text-gray-700 hover:text-primary-600' : 'text-gray-200 hover:text-white'
                )}
                aria-current={location.pathname === link.path ? 'page' : undefined}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* User Menu / Login Button */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <Menu as="div" className="relative">
                <Menu.Button
                  className={cn(
                    'flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500',
                    scrolled ? 'bg-gray-100 text-gray-900' : 'bg-white/20 text-white backdrop-blur-sm'
                  )}
                >
                  <img src={user.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                  <span className="font-medium">{user.name}</span>
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link to="/dashboard" className={cn('flex items-center space-x-2 px-4 py-2 transition-colors', active ? 'bg-gray-100 text-primary-600' : 'text-gray-700')}>
                          <FaTachometerAlt />
                          <span>Dashboard</span>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link to="/perfil" className={cn('flex items-center space-x-2 px-4 py-2 transition-colors', active ? 'bg-gray-100 text-primary-600' : 'text-gray-700')}>
                          <FaUser />
                          <span>Mi Perfil</span>
                        </Link>
                      )}
                    </Menu.Item>
                    <hr className="my-2 border-gray-100" />
                    <Menu.Item>
                      {({ active }) => (
                        <button onClick={handleLogout} className={cn('flex items-center space-x-2 px-4 py-2 transition-colors w-full text-left text-red-600 font-medium', active ? 'bg-red-50' : '')}>
                          <FaSignOutAlt />
                          <span>Cerrar Sesión</span>
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className={cn('px-4 py-2 rounded-lg font-medium transition-all duration-300', scrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-gray-200')}>
                  Iniciar Sesión
                </Link>
                <Button to="/registro" className="bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/20" size="sm">Únete Ahora</Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            className={cn('lg:hidden p-2 rounded-lg transition-colors', scrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/20')}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 bg-white rounded-lg shadow-xl overflow-hidden"
            >
              <div className="py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      'block px-6 py-3 font-medium transition-colors',
                      location.pathname === link.path ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
                
                <hr className="my-4 border-gray-100" />
                
                {!isAuthenticated ? (
                  <div className="px-6 py-2 space-y-3">
                    <Link to="/login" className="block w-full text-center py-2 text-gray-700 font-medium">Iniciar Sesión</Link>
                    <Button to="/registro" className="w-full bg-primary-600 text-white">Únete Ahora</Button>
                  </div>
                ) : (
                  <div className="px-6 py-2 space-y-1">
                    <Link to="/dashboard" className="block py-3 text-gray-700 font-medium flex items-center space-x-2">
                      <FaTachometerAlt className="text-primary-600" />
                      <span>Dashboard</span>
                    </Link>
                    <button onClick={handleLogout} className="block w-full text-left py-3 text-red-600 font-medium flex items-center space-x-2">
                      <FaSignOutAlt />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
