import SEO from '../../seo/SEO.jsx';
import Container from '../../components/common/Container.jsx';
import FadeIn from '../../components/common/FadeIn.jsx';
import ContactCTA from '../../components/common/ContactCTA.jsx';
import { PROCESS_STEPS } from '../../data/processSteps.js';

export default function HowItWorksPage() {
  return (
    <>
      <SEO
        title="How It Works"
        description="A step-by-step look at how Hezek Health coordinates your treatment abroad, from case review to recovery."
      />

      <section className="bg-brand-mist py-20">
        <Container className="text-center">
          <FadeIn>
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-teal">
              The Process
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold text-brand-blue sm:text-5xl">
              How It Works
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-brand-ink/70">
              From your first message to your follow-up care back home, here's exactly what
              to expect at each stage of your medical journey.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {PROCESS_STEPS.map((step, i) => (
              <FadeIn
                key={step.title}
                delay={i * 0.05}
                className="rounded-card bg-white p-8 shadow-card"
              >
                <span className="font-display text-3xl font-bold text-brand-teal">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-3 font-display text-lg font-bold text-brand-blue">
                  {step.title}
                </h2>
                <p className="mt-3 text-sm text-brand-ink/70">{step.fullDescription}</p>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}