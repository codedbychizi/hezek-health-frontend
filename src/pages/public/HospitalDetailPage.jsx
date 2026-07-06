import { useParams, Link } from 'react-router-dom';
import SEO from '../../seo/SEO.jsx';
import Container from '../../components/common/Container.jsx';
import FadeIn from '../../components/common/FadeIn.jsx';
import Skeleton from '../../components/common/Skeleton.jsx';
import Button from '../../components/common/Button.jsx';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import { getHospitalById } from '../../lib/queries.js';

export default function HospitalDetailPage() {
  const { id } = useParams();
  const { data: hospital, loading } = useSupabaseQuery(() => getHospitalById(id), [id]);

  if (loading) {
    return (
      <Container className="py-20">
        <Skeleton className="h-64" />
      </Container>
    );
  }

  if (!hospital) {
    return (
      <Container className="py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-brand-blue">Hospital not found</h1>
        <p className="mt-2 text-brand-ink/60">
          We couldn't find that hospital. It may have been removed or the link is incorrect.
        </p>
        <Link
          to="/hospitals"
          className="mt-6 inline-block text-sm font-semibold text-brand-teal hover:underline"
        >
          ← Back to all hospitals
        </Link>
      </Container>
    );
  }

  const specialtyNames = hospital.hospital_specialties
    ?.map((hs) => hs.medical_specialties?.name)
    .filter(Boolean);

  return (
    <>
      <SEO title={hospital.name} description={hospital.short_summary} />

      <section className="py-16">
        <Container>
          {hospital.image_url ? (
            <img
              src={hospital.image_url}
              alt={hospital.name}
              className="h-64 w-full rounded-card object-cover"
            />
          ) : (
            <div className="flex h-64 items-center justify-center rounded-card bg-brand-mist text-sm text-brand-blue/40">
              Image coming soon
            </div>
          )}

          <FadeIn className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-teal">
              {hospital.countries?.name}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-brand-blue sm:text-4xl">
              {hospital.name}
            </h1>
            {specialtyNames?.length > 0 && (
              <p className="mt-3 text-sm text-brand-ink/60">{specialtyNames.join(' · ')}</p>
            )}
            <p className="mt-6 max-w-2xl text-brand-ink/70">
              {hospital.description || hospital.short_summary}
            </p>
            <div className="mt-8">
              <Button to="/medical-request" variant="accent">
                Book Appointment
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}