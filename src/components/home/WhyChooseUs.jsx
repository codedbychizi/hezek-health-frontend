import { ShieldCheck, ClipboardCheck, Banknote, Route } from 'lucide-react';
import { motion } from 'framer-motion';
import Container from '../common/Container.jsx';
import FadeIn from '../common/FadeIn.jsx';
import SectionHeading from '../common/SectionHeading.jsx';

const REASONS = [
  {
    icon: ClipboardCheck,
    title: 'Personalised Case Review',
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
    description: 'Clear, upfront treatment cost information before you decide.',
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
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Left — image */}
          <FadeIn className="relative overflow-hidden rounded-card shadow-card-hover">
            <img
              src="/images/medical-team.png"
              alt="Experienced HezekHealth medical specialists"
              className="h-full w-full object-cover"
              style={{ minHeight: '360px', maxHeight: '420px' }}
            />
            {/* Teal accent stripe */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-brand-teal" />
          </FadeIn>

          {/* Right — content */}
          <div>
            <SectionHeading eyebrow="Why HezekHealth" title="Care coordination you can trust" />
            <div className="grid gap-5 sm:grid-cols-2">
              {REASONS.map((reason, i) => (
                <FadeIn
                  key={reason.title}
                  delay={i * 0.05}
                  className="rounded-card bg-brand-mist p-5"
                >
                  <reason.icon className="h-7 w-7 text-brand-teal" strokeWidth={1.75} />
                  <h3 className="mt-3 font-display text-sm font-bold text-brand-blue">
                    {reason.title}
                  </h3>
                  <p className="mt-1 text-xs text-brand-ink/70">{reason.description}</p>
                </FadeIn>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}