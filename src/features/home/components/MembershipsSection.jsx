import SectionHeading from '../../../shared/components/atoms/SectionHeading';
import MembershipCard from './MembershipCard';
import { useMemberships } from '../../memberships/hooks/useMemberships';

const MembershipsSection = () => {
  const { memberships, loading } = useMemberships();

  if (loading) return null;

  return (
    <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white">
      <div className="container-custom">
        <SectionHeading
          title="Planes de Membresía"
          subtitle="Elige el plan que mejor se adapte a tus objetivos y estilo de vida"
          inverse
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {memberships.map((plan, index) => (
            <MembershipCard
              key={plan.id}
              plan={plan}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipsSection;
