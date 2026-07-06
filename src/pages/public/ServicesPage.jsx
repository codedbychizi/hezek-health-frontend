import SEO from '../../seo/SEO.jsx';
import Container from '../../components/common/Container.jsx';
import FadeIn from '../../components/common/FadeIn.jsx';
import Button from '../../components/common/Button.jsx';
import { SERVICES } from '../../data/services.js';

export default function ServicesPage() {
  return (
    <>
      <SEO
        title="Our Services"
        description="Explore the services Hezek Health provides to help you access trusted hospitals abroad."
      />

      <section className="bg-brand-mist py-20">
        <Container className="text-center">
          <FadeIn>
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-teal">
              What We Do
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold text-brand-blue sm:text-5xl">
              Our Services
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-brand-ink/70">
              From your first case review to recovery back home, here's how we support you
              at every stage of your medical journey.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <FadeIn
                key={service.title}
                delay={i * 0.05}
                className="rounded-card bg-white p-8 shadow-card"
              >
                <service.icon className="h-9 w-9 text-brand-teal" strokeWidth={1.75} />
                <h2 className="mt-5 font-display text-lg font-bold text-brand-blue">
                  {service.title}
                </h2>
                <p className="mt-2 text-sm text-brand-ink/70">{service.description}</p>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 text-center">
        <Container>
          <Button to="/medical-request" variant="primary">
            Start Your Medical Request
          </Button>
        </Container>
      </section>
    </>
  );
}