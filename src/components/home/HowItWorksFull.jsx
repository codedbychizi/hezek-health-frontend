import Container from '../common/Container.jsx';
import FadeIn from '../common/FadeIn.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import { PROCESS_STEPS } from '../../data/processSteps.js';

export default function HowItWorksFull() {
  return (
    <section className="bg-brand-mist py-20">
      <Container>
        <SectionHeading eyebrow="The Process" title="How it works" />

        <div className="grid items-start gap-12 lg:grid-cols-[1fr_380px]">

          {/* Steps */}
          <div className="space-y-4">
            {PROCESS_STEPS.map((step, i) => (
              <FadeIn
                key={step.title}
                delay={i * 0.05}
                className="flex gap-5 rounded-card bg-white p-5 shadow-card"
              >
                {/* Number badge */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue font-display text-sm font-bold text-white">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-brand-blue">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-brand-ink/70">
                    {step.fullDescription}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Sticky image panel */}
          <FadeIn className="sticky top-24 hidden overflow-hidden rounded-card shadow-card-hover lg:block">
            <img
              src="/images/how-it-works-consult.png"
              alt="HezekHealth coordinator helping patient with travel and treatment planning"
              className="h-full w-full object-cover"
              style={{ minHeight: '500px' }}
            />
            {/* Overlay caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-blue/80 to-transparent p-5">
              <p className="text-sm font-semibold text-white">
                From case review to treatment abroad — we guide every step.
              </p>
            </div>
          </FadeIn>

        </div>
      </Container>
    </section>
  );
}