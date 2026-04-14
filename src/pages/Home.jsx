import SEO from '../shared/components/common/SEO'
import SectionNavDots from '../shared/components/molecules/SectionNavDots'
import Footer from '../shared/components/layout/Footer'
import Hero from '../features/home/components/Hero'
import FeaturesSection from '../features/home/components/FeaturesSection'
import ClassesSection from '../features/home/components/ClassesSection'
import MembershipsSection from '../features/home/components/MembershipsSection'
import TestimonialsSection from '../features/home/components/TestimonialsSection'
import EventsSection from '../features/home/components/EventsSection'
import CTASection from '../features/home/components/CTASection'

const Home = () => {
  return (
    <>
      <SEO
        title="Inicio"
        description="Bienvenidos a la Academia Creeser de Taekwondo. Los mejores programas para todas las edades, desde infantiles hasta adultos."
      />
      <SectionNavDots />
      <div className="page-scroll-container">
        <Hero />
        <FeaturesSection />
        <ClassesSection />
        <MembershipsSection />
        <TestimonialsSection />
        <EventsSection />
        <CTASection />
        <div className="snap-section--footer bg-gray-900">
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Home
