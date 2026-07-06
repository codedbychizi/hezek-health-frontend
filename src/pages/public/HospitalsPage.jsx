import { Link } from 'react-router-dom';
import SEO from '../../seo/SEO.jsx';
import Container from '../../components/common/Container.jsx';
import FadeIn from '../../components/common/FadeIn.jsx';
import Skeleton from '../../components/common/Skeleton.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import Button from '../../components/common/Button.jsx';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import { getActiveHospitalsFull } from '../../lib/queries.js';

export default function HospitalsPage() {
  const { data: hospitals, loading } = useSupabaseQuery(getActiveHospitalsFull);

  return (
    <>
      <SEO
        title="Hospitals"
        description="Hospitals and specialists Hezek Health partners with abroad."
      />

      <section className="bg-brand-mist py-20">
        <Container className="text-center">
          <FadeIn>
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-teal">
              Our Partners
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold text-brand-blue sm:text-5xl">
              Hospitals We Work With
            </h1>
          </FadeIn>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-44" />
              ))}
            </div>
          ) : hospitals?.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {hospitals.map((hospital) => {
                const specialtyNames = hospital.hospital_specialties
                  ?.map((hs) => hs.medical_specialties?.name)
                  .filter(Boolean);
                return (
                  <FadeIn
                    key={hospital.id}
                    className="overflow-hidden rounded-card bg-white shadow-card"
                  >
                    {hospital.image_url ? (
                      <img
                        src={hospital.image_url}
                        alt={hospital.name}
                        className="h-40 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-40 items-center justify-center bg-brand-mist text-sm text-brand-blue/40">
                        Image coming soon
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="font-display text-base font-bold text-brand-blue">
                        {hospital.name}
                      </h2>
                      <p className="mt-1 text-sm text-brand-teal">{hospital.countries?.name}</p>
                      {specialtyNames?.length > 0 && (
                        <p className="mt-2 text-xs text-brand-ink/60">
                          {specialtyNames.join(', ')}
                        </p>
                      )}
                      <p className="mt-2 text-sm text-brand-ink/70">{hospital.short_summary}</p>
                      <Link
                        to={`/hospitals/${hospital.id}`}
                        className="mt-4 inline-block text-sm font-semibold text-brand-blue hover:underline"
                      >
                        View Details →
                      </Link>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          ) : (
            <>
              <EmptyState
                title="Hospital partners coming soon"
                description="We're finalizing our hospital partnerships. Submit a medical request and our team will match you with the right hospital directly."
              />
              <div className="mt-8 text-center">
                <Button to="/medical-request" variant="primary">
                  Start Your Medical Request
                </Button>
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  );
}