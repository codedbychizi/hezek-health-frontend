import Container from './Container.jsx';
import FadeIn from './FadeIn.jsx';
import Button from './Button.jsx';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import { getPublicSettings } from '../../lib/queries.js';

export default function ContactCTA() {
  const { data: settings } = useSupabaseQuery(getPublicSettings);
  const whatsapp = settings?.company_whatsapp || '2347046502462';

  return (
    <section className="overflow-hidden bg-brand-blue">
      <div className="grid lg:grid-cols-2">

        {/* Image side */}
        <div className="relative hidden lg:block">
          <img
            src="/images/contact-consultation.png"
            alt="HezekHealth care coordinator"
            className="h-full w-full object-cover object-top"
            style={{ minHeight: '360px' }}
          />
          {/* Right-side gradient to blend into the blue panel */}
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-brand-blue to-transparent" />
        </div>

        {/* Text side */}
        <FadeIn className="flex flex-col justify-center px-8 py-16 text-white lg:px-16">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Still have questions?
          </h2>
          <p className="mt-3 max-w-lg text-white/80">
            Speak with a HezekHealth Care Coordinator today for a confidential case
            review and personalised guidance on your treatment options.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
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

      </div>
    </section>
  );
}