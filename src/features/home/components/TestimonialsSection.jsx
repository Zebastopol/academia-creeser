import SectionHeading from '../../../shared/components/atoms/SectionHeading';
import TestimonialCard from './TestimonialCard';
import { useTestimonials } from '../../testimonials/hooks/useTestimonials';

const TestimonialsSection = () => {
  const { testimonials, loading } = useTestimonials();

  if (loading) return null;

  return (
    <section className="py-20">
      <div className="container-custom">
        <SectionHeading
          title="Lo Que Dicen Nuestros Alumnos"
          subtitle="Historias reales de transformación y éxito"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
