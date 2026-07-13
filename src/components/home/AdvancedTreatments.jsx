import { Link } from 'react-router-dom';
import FadeIn from '../common/FadeIn.jsx';
import Container from '../common/Container.jsx';

export default function AdvancedTreatments() {
  return (
    <section className="py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">

          {/* Left — content */}
          <FadeIn className="order-2 lg:order-1">
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-teal">
              World-Class Care
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand-blue sm:text-4xl">
              Advanced treatments. Better outcomes.
            </h2>
            <p className="mt-4 text-brand-ink/70">
              Access a wide range of advanced medical treatments and cutting-edge
              technology at leading hospitals abroad — all coordinated personally for you.
            </p>
            <Link
              to="/specialties"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white hover:bg-brand-blue-dark"
            >
              View All Specialties →
            </Link>
          </FadeIn>

          {/* Right — image */}
          <FadeIn delay={0.1} className="order-1 overflow-hidden rounded-card shadow-card-hover lg:order-2">
            <img
              src="/images/medical-equipment.png"
              alt="Advanced medical diagnostic equipment at a partner hospital"
              className="h-full w-full object-cover"
              style={{ minHeight: '320px', maxHeight: '400px' }}
            />
          </FadeIn>

        </div>
      </Container>
    </section>
  );
}