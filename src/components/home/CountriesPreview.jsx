import { Link } from 'react-router-dom';
import Container from '../common/Container.jsx';
import FadeIn from '../common/FadeIn.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import { getActiveCountries } from '../../lib/queries.js';

export default function CountriesPreview() {
  const { data: countries, loading } = useSupabaseQuery(getActiveCountries);

  if (loading) return null;

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Where We Work"
          title="Countries we facilitate treatment in"
          linkTo="/countries"
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {countries?.map((country) => (
            <FadeIn
              key={country.id}
              className="overflow-hidden rounded-card bg-white shadow-card"
            >
              {country.image_url ? (
                <img
                  src={country.image_url}
                  alt={country.name}
                  className="h-40 w-full object-cover"
                />
              ) : (
                <div className="flex h-40 items-center justify-center bg-brand-mist text-sm text-brand-blue/40">
                  Image coming soon
                </div>
              )}
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-brand-blue">
                  {country.name}
                </h3>
                <p className="mt-2 text-sm text-brand-ink/70">{country.description}</p>
                <Link
                  to={`/countries/${country.slug}`}
                  className="mt-4 inline-block text-sm font-semibold text-brand-teal hover:underline"
                >
                  View hospitals →
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}