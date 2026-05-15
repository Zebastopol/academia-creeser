import { Link } from 'react-router-dom'
import { ChevronRight, Mail, MapPin, Phone } from 'lucide-react'
import { FaInstagram, FaFacebook } from 'react-icons/fa'
import { academiaInfo } from '../../data/mockData'
import BrandLogoMark from '../atoms/BrandLogoMark'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="relative w-full h-screen pt-8 snap-section--footer"
      style={{ backgroundColor: 'var(--color-footer-bg)' }}
    >
      <div className="container-custom" style={{ marginTop: 'auto', width: '100%' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <BrandLogoMark variant="darkBg" className="h-12 w-12" />
              <span
                className="font-display font-bold text-2xl tracking-tight"
                style={{ color: 'var(--color-text)' }}
              >
                {academiaInfo.name.split(' ')[1].toUpperCase()}
              </span>
            </Link>
            <p className="leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              {academiaInfo.tagline}. {academiaInfo.description.substring(0, 200)}...
            </p>
            <div className="flex space-x-4">
              <a href={academiaInfo.contact.instagramUrl} target="_blank" rel="noopener noreferrer" 
              className="w-10 h-10  rounded-full flex items-center justify-center "
              style={{ backgroundColor: 'var(--color-footer-surface)', hover: 'var(--color-footer-surface)', transition: 'colors', color: 'var(--color-primary)'}}
              >
                <FaInstagram />
              </a>
              <a href={academiaInfo.contact.facebookUrl} target="_blank" rel="noopener noreferrer" 
              className="w-10 h-10  rounded-full flex items-center justify-center "
              style={{ backgroundColor: 'var(--color-footer-surface)', hover: 'var(--color-footer-surface)', transition: 'colors', color: 'var(--color-primary)'}}
              >
                <FaFacebook />
              </a>
            </div>
          </div>

          <div>
            <h4
              className="inline-block pb-2 mb-6 text-lg font-bold border-b border-white/10"
              style={{ color: 'var(--color-text)' }}
            >
              Navegación
            </h4>
            <ul className="space-y-4">
              {[
                ['/', 'Inicio'],
                ['/clases', 'Clases'],
                ['/membresias', 'Membresías'],
                ['/eventos', 'Eventos'],
                ['/nosotros', 'Nosotros'],
                ['/contacto', 'Contacto'],
                ['/faq', 'Preguntas Frecuentes'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="flex items-center gap-2 transition-colors"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    <ChevronRight size={14} style={{ color: 'var(--color-primary)' }} />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="inline-block pb-2 mb-6 text-lg font-bold border-b border-white/10"
              style={{ color: 'var(--color-text)' }}
            >
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3" style={{ color: 'var(--color-text-muted)' }}>
                <MapPin size={16} className="mt-1" style={{ color: 'var(--color-primary)' }} />
                <span>{academiaInfo.locations[0].address}, {academiaInfo.locations[0].name}</span>
              </li>
              <li className="flex items-center space-x-3" style={{ color: 'var(--color-text-muted)' }}>
                <Phone size={16} style={{ color: 'var(--color-primary)' }} />
                <span>{academiaInfo.contact.phone}</span>
              </li>
              <li className="flex items-center space-x-3" style={{ color: 'var(--color-text-muted)' }}>
                <Mail size={16} style={{ color: 'var(--color-primary)' }} />
                <span className="break-all">{academiaInfo.contact.email}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="inline-block pb-2 mb-6 text-lg font-bold border-b border-white/10"
              style={{ color: 'var(--color-text)' }}
            >
              Sedes
            </h4>
            <ul className="space-y-4">
              {academiaInfo.locations.map((loc, idx) => (
                <li key={idx} style={{ color: 'var(--color-text-muted)' }}>
                  <p className="font-bold" style={{ color: 'var(--color-text)' }}>{loc.name}</p>
                  <p className="text-sm">{loc.address}</p>
                </li>
              ))}
              <li className="pt-2">
                <p className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
                  Disponibilidad {academiaInfo.contact.availability}
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="flex flex-col items-center justify-between pt-8 text-sm border-t md:flex-row"
          style={{ color: 'var(--color-text-muted)', borderColor: 'rgb(255 255 255 / 0.1)' }}
        >
          <p>© {currentYear} {academiaInfo.name}. Todos los derechos reservados.</p>
          <div className="flex mt-4 space-x-6 md:mt-0">
            <Link to="/" className="transition-colors" style={{ color: 'var(--color-text-muted)' }}>
              Privacidad
            </Link>
            <Link to="/" className="transition-colors" style={{ color: 'var(--color-text-muted)' }}>
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
