import Container from '../common/Container.jsx';
import FadeIn from '../common/FadeIn.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import { getActiveHospitals } from '../../lib/queries.js';

export default function HospitalsPreview() {
  const { data: hospitals, loading } = useSupabaseQuery(() => getActiveHospitals(6));

  // No hospitals yet — hide on the homepage rather than show an empty
  // "coming soon" block. That messaging belongs on /hospitals itself,
  // where a visitor arrived specifically expecting a hospital list.
  if (loading || !hospitals?.length) return null;

  return (
    <section className="bg-brand-mist py-20">
      <Container>
        <SectionHeading eyebrow="Our Partners" title="Hospitals we work with" linkTo="/hospitals" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hospitals.map((hospital) => (
            <FadeIn key={hospital.id} className="rounded-card bg-white p-6 shadow-card">
              <h3 className="font-display text-base font-bold text-brand-blue">
                {hospital.name}
              </h3>
              <p className="mt-1 text-sm text-brand-teal">{hospital.countries?.name}</p>
              <p className="mt-2 text-sm text-brand-ink/70">{hospital.short_summary}</p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}