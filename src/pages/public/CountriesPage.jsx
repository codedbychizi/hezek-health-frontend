import { Link } from 'react-router-dom';
import SEO from '../../seo/SEO.jsx';
import Container from '../../components/common/Container.jsx';
import FadeIn from '../../components/common/FadeIn.jsx';
import Skeleton from '../../components/common/Skeleton.jsx';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import { getActiveCountries } from '../../lib/queries.js';

export default function CountriesPage() {
  const { data: countries, loading } = useSupabaseQuery(getActiveCountries);

  return (
    <>
      <SEO
        title="Countries"
        description="Countries where Hezek Health facilitates treatment for Nigerian patients."
      />

      <section className="bg-brand-mist py-20">
        <Container className="text-center">
          <FadeIn>
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-teal">
              Where We Work
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold text-brand-blue sm:text-5xl">
              Countries We Facilitate Treatment In
            </h1>
          </FadeIn>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {loading
              ? Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-72" />)
              : countries?.map((country) => (
                  <FadeIn
                    key={country.id}
                    className="overflow-hidden rounded-card bg-white shadow-card"
                  >
                    {country.image_url ? (
                      <img
                        src={country.image_url}
                        alt={country.name}
                        className="h-48 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-48 items-center justify-center bg-brand-mist text-sm text-brand-blue/40">
                        Image coming soon
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="font-display text-xl font-bold text-brand-blue">
                        {country.name}
                      </h2>
                      <p className="mt-2 text-sm text-brand-ink/70">{country.description}</p>
                      <div className="mt-4 flex flex-wrap gap-4">
                        <Link
                          to={`/countries/${country.slug}`}
                          className="text-sm font-semibold text-brand-teal hover:underline"
                        >
                          View hospitals →
                        </Link>
                        <Link
                          to="/medical-request"
                          className="text-sm font-semibold text-brand-blue hover:underline"
                        >
                          Request Appointment →
                        </Link>
                      </div>
                    </div>
                  </FadeIn>
                ))}
          </div>
        </Container>
      </section>
    </>
  );
}