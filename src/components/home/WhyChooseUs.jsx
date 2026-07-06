import { ShieldCheck, ClipboardCheck, Banknote, Route } from 'lucide-react';
import Container from '../common/Container.jsx';
import FadeIn from '../common/FadeIn.jsx';
import SectionHeading from '../common/SectionHeading.jsx';

const REASONS = [
  {
    icon: ClipboardCheck,
    title: 'Personalized Case Review',
    description: 'Every request is reviewed individually before we recommend any hospital.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified Hospitals & Specialists',
    description: 'We work only with reputable, accredited hospitals abroad.',
  },
  {
    icon: Banknote,
    title: 'Transparent Cost Estimates',
    description: 'Clear, upfront treatment cost information before you make a decision.',
  },
  {
    icon: Route,
    title: 'End-to-End Coordination',
    description: 'From treatment plan to visa, travel, and follow-up care back home.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow="Why Hezek Health" title="Care coordination you can trust" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason, i) => (
            <FadeIn
              key={reason.title}
              delay={i * 0.05}
              className="rounded-card bg-white p-6 shadow-card"
            >
              <reason.icon className="h-8 w-8 text-brand-teal" strokeWidth={1.75} />
              <h3 className="mt-4 font-display text-base font-bold text-brand-blue">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm text-brand-ink/70">{reason.description}</p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}