import Container from '../common/Container.jsx';
import FadeIn from '../common/FadeIn.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import { getActiveTestimonials } from '../../lib/queries.js';

export default function TestimonialsPreview() {
  const { data: testimonials, loading } = useSupabaseQuery(getActiveTestimonials);

  // is_active defaults to false on every row (see migration 001), so this
  // stays hidden until real testimonials are switched on later — no code
  // change needed when that day comes.
  if (loading || !testimonials?.length) return null;

  return (
    <section className="bg-brand-mist py-20">
      <Container>
        <SectionHeading eyebrow="Patient Stories" title="What our patients say" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <FadeIn key={t.id} className="rounded-card bg-white p-6 shadow-card">
              <p className="text-sm text-brand-ink/80">&ldquo;{t.content}&rdquo;</p>
              <p className="mt-4 text-sm font-semibold text-brand-blue">
                {t.patient_name}
                {t.country ? `, ${t.country}` : ''}
              </p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}