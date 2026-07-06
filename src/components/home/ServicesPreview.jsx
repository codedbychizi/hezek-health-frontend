import { Link } from 'react-router-dom';
import Container from '../common/Container.jsx';
import FadeIn from '../common/FadeIn.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import { SERVICES } from '../../data/services.js';

export default function ServicesPreview() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow="What We Do" title="Our services" linkTo="/services" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <FadeIn
              key={service.title}
              delay={i * 0.05}
              className="rounded-card bg-white p-6 shadow-card"
            >
              <service.icon className="h-8 w-8 text-brand-teal" strokeWidth={1.75} />
              <h3 className="mt-4 font-display text-base font-bold text-brand-blue">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-brand-ink/70">{service.description}</p>
              <Link
                to="/medical-request"
                className="mt-4 inline-block text-sm font-semibold text-brand-blue hover:underline"
              >
                Get Started →
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}