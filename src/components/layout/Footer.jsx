import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { GiKimono } from 'react-icons/gi';
import { clubInfo } from '../../data/mockData';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Clases', path: '/clases' },
    { name: 'Membresías', path: '/membresias' },
    { name: 'Eventos', path: '/eventos' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Contacto', path: '/contacto' }
  ];

  const legalLinks = [
    { name: 'Términos y Condiciones', path: '/terminos' },
    { name: 'Política de Privacidad', path: '/privacidad' },
    { name: 'Preguntas Frecuentes', path: '/faq' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-primary-600 rounded-lg">
                <GiKimono className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-white">CREESER</h3>
                <p className="text-xs text-gray-400">Club Deportivo</p>
              </div>
            </div>
            <p className="text-sm mb-4">
              {clubInfo.description}
            </p>
            <div className="flex space-x-3">
              <a
                href={clubInfo.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-primary-600 rounded-lg transition-colors duration-300"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href={clubInfo.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-accent-600 rounded-lg transition-colors duration-300"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href={clubInfo.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-blue-500 rounded-lg transition-colors duration-300"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href={clubInfo.socialMedia.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-red-600 rounded-lg transition-colors duration-300"
              >
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg text-white mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-primary-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="mr-2 group-hover:mr-3 transition-all duration-300">→</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-lg text-white mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary-400 mt-1 flex-shrink-0" />
                <span className="text-sm">{clubInfo.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-primary-400 flex-shrink-0" />
                <a href={`tel:${clubInfo.phone}`} className="text-sm hover:text-primary-400 transition-colors">
                  {clubInfo.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-primary-400 flex-shrink-0" />
                <a href={`mailto:${clubInfo.email}`} className="text-sm hover:text-primary-400 transition-colors">
                  {clubInfo.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Schedule */}
          <div>
            <h4 className="font-display font-bold text-lg text-white mb-4">Horarios</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-400">Lunes - Viernes:</span>
                <span className="text-white font-medium">15:00 - 21:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Sábado:</span>
                <span className="text-white font-medium">09:00 - 14:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Domingo:</span>
                <span className="text-white font-medium">Cerrado</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link to="/contacto" className="btn-primary w-full text-center block">
                Contáctanos
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} Club Deportivo Creeser. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-gray-400 hover:text-primary-400 transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
