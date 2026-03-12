import { FaArrowRight } from 'react-icons/fa';
import SectionHeading from '../../../shared/components/atoms/SectionHeading';
import ClassCard from './ClassCard';
import Button from '../../../shared/components/atoms/Button';
import { useClasses } from '../../classes/hooks/useClasses';

const ClassesSection = () => {
  const { classes, loading } = useClasses();

  if (loading) {
    return (
      <section className="py-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container-custom">
        <SectionHeading
          title="Nuestras Clases"
          subtitle="Programas diseñados para cada edad y nivel de experiencia"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {classes.map((classItem, index) => (
            <ClassCard
              key={classItem.id}
              classItem={classItem}
              index={index}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            to="/clases"
            variant="secondary"
            className="inline-flex items-center space-x-2"
          >
            <span>Ver Todas las Clases</span>
            <FaArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ClassesSection;
