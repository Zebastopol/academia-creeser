import { FaCalendar, FaStar, FaTrophy, FaUsers } from 'react-icons/fa';
import SectionHeading from '../../../shared/components/atoms/SectionHeading';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaUsers />,
      title: "Instructores Certificados",
      description: "Maestros con más de 20 años de experiencia y certificaciones internacionales"
    },
    {
      icon: <FaTrophy />,
      title: "Resultados Comprobados",
      description: "Más de 50 campeonatos ganados por nuestros alumnos a nivel nacional"
    },
    {
      icon: <FaCalendar />,
      title: "Horarios Flexibles",
      description: "Clases todos los días con horarios adaptados a tu rutina"
    },
    {
      icon: <FaStar />,
      title: "Instalaciones Modernas",
      description: "Equipamiento de última generación y espacios amplios y seguros"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <SectionHeading
          title="¿Por Qué Elegir Creeser?"
          subtitle="Somos más que un club deportivo, somos una familia comprometida con tu desarrollo"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
