import { useParams, Link } from 'react-router-dom';
import SEO from '../../seo/SEO.jsx';
import Container from '../../components/common/Container.jsx';
import FadeIn from '../../components/common/FadeIn.jsx';
import Skeleton from '../../components/common/Skeleton.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import Button from '../../components/common/Button.jsx';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import { getCountryBySlug, getHospitalsByCountryId } from '../../lib/queries.js';

export default function CountryDetailPage() {
  const { slug } = useParams();

  // Re-runs whenever the :slug param changes (e.g. navigating from
  // /countries/india straight to /countries/turkey without unmounting).
  const { data: country, loading: countryLoading } = useSupabaseQuery(
    () => getCountryBySlug(slug),
    [slug]
  );

  // Depends on the first query finishing — guards against calling the
  // hospitals query before we know the country's id, and re-runs once
  // country.id becomes available.
  const { data: hospitals, loading: hospitalsLoading } = useSupabaseQuery(
    () => (country ? getHospitalsByCountryId(country.id) : Promise.resolve([])),
    [country?.id]
  );

  if (countryLoading) {
    return (
      <Container className="py-20">
        <Skeleton className="h-64" />
      </Container>
    );
  }

  if (!country) {
    return (
      <Container className="py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-brand-blue">Country not found</h1>
        <p className="mt-2 text-brand-ink/60">
          We couldn't find that country. It may have been removed or the link is incorrect.
        </p>
        <Link
          to="/countries"
          className="mt-6 inline-block text-sm font-semibold text-brand-teal hover:underline"
        >
          ← Back to all countries
        </Link>
      </Container>
    );
  }

  return (
    <>
      <SEO title={country.name} description={country.description} />

      <section className="bg-brand-mist py-20">
        <Container className="text-center">
          <FadeIn>
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-teal">
              Where We Work
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold text-brand-blue sm:text-5xl">
              {country.name}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-brand-ink/70">{country.description}</p>
            <div className="mt-6">
              <Button to="/medical-request" variant="accent">
                Request Appointment
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <h2 className="mb-8 font-display text-2xl font-bold text-brand-blue">
            Hospitals in {country.name}
          </h2>
          {hospitalsLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          ) : hospitals?.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {hospitals.map((hospital) => (
                <FadeIn key={hospital.id} className="rounded-card bg-white p-6 shadow-card">
                  <h3 className="font-display text-base font-bold text-brand-blue">
                    {hospital.name}
                  </h3>
                  <p className="mt-2 text-sm text-brand-ink/70">{hospital.short_summary}</p>
                </FadeIn>
              ))}
            </div>
          ) : (
            <EmptyState
              title="Hospital partners coming soon"
              description={`We're finalizing our hospital partnerships in ${country.name}. Submit a medical request and our team will match you directly.`}
            />
          )}
        </Container>
      </section>
    </>
  );
}