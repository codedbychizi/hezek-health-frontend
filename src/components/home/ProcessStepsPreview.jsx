import Container from '../common/Container.jsx';
import FadeIn from '../common/FadeIn.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import { PROCESS_STEPS } from '../../data/processSteps.js';

export default function ProcessStepsPreview() {
  return (
    <section className="bg-brand-mist py-20">
      <Container>
        <SectionHeading
          eyebrow="The Process"
          title="Your medical journey, step by step"
          linkTo="/how-it-works"
          linkLabel="Full details →"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS_STEPS.map((step, i) => (
            <FadeIn
              key={step.title}
              delay={i * 0.05}
              className="rounded-card bg-white p-6 shadow-card"
            >
              <span className="font-display text-2xl font-bold text-brand-teal">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 font-display text-base font-bold text-brand-blue">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-brand-ink/70">{step.shortDescription}</p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}