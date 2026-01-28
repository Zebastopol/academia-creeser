import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import { GiKimono } from 'react-icons/gi';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
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
    setShowUserMenu(false);
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
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className={`p-2 rounded-lg transition-all duration-300 ${
              scrolled ? 'bg-primary-600' : 'bg-white'
            }`}>
              <GiKimono className={`text-2xl transition-colors duration-300 ${
                scrolled ? 'text-white' : 'text-primary-600'
              }`} />
            </div>
            <div>
              <h1 className={`font-display font-bold text-xl transition-colors duration-300 ${
                scrolled ? 'text-gray-900' : 'text-white'
              }`}>
                CREESER
              </h1>
              <p className={`text-xs transition-colors duration-300 ${
                scrolled ? 'text-gray-600' : 'text-gray-200'
              }`}>
                Club Deportivo
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-all duration-300 hover:scale-105 ${
                  location.pathname === link.path
                    ? scrolled
                      ? 'text-primary-600'
                      : 'text-white font-bold'
                    : scrolled
                    ? 'text-gray-700 hover:text-primary-600'
                    : 'text-gray-200 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* User Menu / Login Button */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    scrolled
                      ? 'bg-gray-100 hover:bg-gray-200'
                      : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'
                  }`}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className={`font-medium ${
                    scrolled ? 'text-gray-900' : 'text-white'
                  }`}>
                    {user.name}
                  </span>
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2"
                    >
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition-colors"
                      >
                        <FaTachometerAlt className="text-primary-600" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        to="/perfil"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition-colors"
                      >
                        <FaUser className="text-primary-600" />
                        <span>Mi Perfil</span>
                      </Link>
                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition-colors w-full text-left text-red-600"
                      >
                        <FaSignOutAlt />
                        <span>Cerrar Sesión</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    scrolled
                      ? 'text-gray-700 hover:text-primary-600'
                      : 'text-white hover:text-gray-200'
                  }`}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/registro"
                  className="btn-primary"
                >
                  Únete Ahora
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled
                ? 'text-gray-900 hover:bg-gray-100'
                : 'text-white hover:bg-white/20'
            }`}
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
                    className={`block px-6 py-3 font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                <hr className="my-4" />
                
                {isAuthenticated ? (
                  <>
                    <div className="px-6 py-3 flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <Link
                      to="/dashboard"
                      className="block px-6 py-3 text-gray-700 hover:bg-gray-50"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/perfil"
                      className="block px-6 py-3 text-gray-700 hover:bg-gray-50"
                    >
                      Mi Perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-6 py-3 text-red-600 hover:bg-red-50"
                    >
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-6 py-3 text-gray-700 hover:bg-gray-50"
                    >
                      Iniciar Sesión
                    </Link>
                    <Link
                      to="/registro"
                      className="block mx-6 my-3 text-center btn-primary"
                    >
                      Únete Ahora
                    </Link>
                  </>
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
