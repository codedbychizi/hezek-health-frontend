import Container from '../common/Container.jsx';
import FadeIn from '../common/FadeIn.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import { PROCESS_STEPS } from '../../data/processSteps.js';

export default function HowItWorksFull() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="The Process"
          title="How it works"
        />
        <div className="relative">
          {/* Vertical connector line on desktop */}
          <div
            className="absolute left-6 top-0 hidden h-full w-0.5 bg-brand-teal/20 lg:block"
            aria-hidden="true"
          />
          <div className="space-y-8">
            {PROCESS_STEPS.map((step, i) => (
              <FadeIn
                key={step.title}
                delay={i * 0.05}
                className="relative lg:pl-20"
              >
                {/* Step number circle — sits on the connector line */}
                <div className="absolute left-0 top-0 hidden h-12 w-12 items-center justify-center rounded-full bg-brand-blue font-display text-lg font-bold text-white lg:flex">
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="rounded-card bg-white p-6 shadow-card lg:p-8">
                  {/* Mobile step number */}
                  <span className="mb-2 block font-display text-2xl font-bold text-brand-teal lg:hidden">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-lg font-bold text-brand-blue">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-ink/70">
                    {step.fullDescription}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}