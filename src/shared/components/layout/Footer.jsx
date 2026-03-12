import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { GiKimono } from 'react-icons/gi';
import { academiaInfo } from '../../data/mockData';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-primary-600 rounded-lg">
                <GiKimono className="text-2xl text-white" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-white">
                {academiaInfo.name.split(' ')[1].toUpperCase()}
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              {academiaInfo.tagline}. {academiaInfo.description.substring(0, 100)}...
            </p>
            <div className="flex space-x-4">
              <a href={academiaInfo.contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FaFacebook />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-primary-600 pb-2 inline-block">Navegación</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Inicio</Link></li>
              <li><Link to="/clases" className="text-gray-400 hover:text-white transition-colors">Clases</Link></li>
              <li><Link to="/membresias" className="text-gray-400 hover:text-white transition-colors">Membresías</Link></li>
              <li><Link to="/eventos" className="text-gray-400 hover:text-white transition-colors">Eventos</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-primary-600 pb-2 inline-block">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400">
                <FaMapMarkerAlt className="mt-1 text-primary-500" />
                <span>{academiaInfo.locations[0].address}, {academiaInfo.locations[0].name}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <FaPhone className="text-primary-500" />
                <span>{academiaInfo.contact.phone}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <FaEnvelope className="text-primary-500" />
                <span className="break-all">{academiaInfo.contact.email}</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-primary-600 pb-2 inline-block">Sedes</h4>
            <ul className="space-y-4">
              {academiaInfo.locations.map((loc, idx) => (
                <li key={idx} className="text-gray-400">
                  <p className="font-bold text-white">{loc.name}</p>
                  <p className="text-sm">{loc.address}</p>
                </li>
              ))}
              <li className="pt-2">
                <p className="text-primary-400 font-medium text-sm">Disponibilidad {academiaInfo.contact.availability}</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {currentYear} {academiaInfo.name}. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/" className="hover:text-white transition-colors">Privacidad</Link>
            <Link to="/" className="hover:text-white transition-colors">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
