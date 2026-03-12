import SEO from '../shared/components/common/SEO';
import Hero from '../features/home/components/Hero';
import FeaturesSection from '../features/home/components/FeaturesSection';
import ClassesSection from '../features/home/components/ClassesSection';
import MembershipsSection from '../features/home/components/MembershipsSection';
import TestimonialsSection from '../features/home/components/TestimonialsSection';
import EventsSection from '../features/home/components/EventsSection';
import CTASection from '../features/home/components/CTASection';

const Home = () => {
  return (
    <main className="min-h-screen">
      <SEO 
        title="Inicio" 
        description="Bienvenidos a la Academia Creeser de Taekwondo. Los mejores programas para todas las edades, desde infantiles hasta adultos."
      />
      <article>
        <Hero />
        <FeaturesSection />
        <ClassesSection />
        <MembershipsSection />
        <TestimonialsSection />
        <EventsSection />
        <CTASection />
      </article>
    </main>
  );
};

export default Home;
