import Container from '../common/Container.jsx';
import FadeIn from '../common/FadeIn.jsx';
import Button from '../common/Button.jsx';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import { getPublicSettings } from '../../lib/queries.js';

export default function ContactCTA() {
  const { data: settings } = useSupabaseQuery(getPublicSettings);
  const whatsapp = settings?.company_whatsapp || '2347046502462';

  return (
    <section className="bg-brand-blue py-20 text-white">
      <Container className="text-center">
        <FadeIn>
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Still have questions?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Speak with a HezekHealth Care Coordinator today for a confidential case review
            and personalized guidance on your treatment options.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button to="/medical-request" variant="accent">
              Request Appointment
            </Button>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Chat on WhatsApp
            </a>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}