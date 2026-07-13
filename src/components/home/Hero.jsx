import { motion } from 'framer-motion';
import Container from '../common/Container.jsx';
import Button from '../common/Button.jsx';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-mist">
      {/* Subtle background blobs */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-teal/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-blue/8 blur-3xl" aria-hidden="true" />

      <Container className="relative grid min-h-[580px] items-center gap-0 lg:grid-cols-2">

        {/* Left — text content */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="py-16 pr-0 lg:py-24 lg:pr-12"
        >
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-teal">
            Personalised Healthcare &amp; Treatment Abroad
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-brand-blue sm:text-5xl">
            Access trusted hospitals abroad, without the guesswork
          </h1>
          <p className="mt-5 max-w-lg text-lg text-brand-ink/70">
            We help Nigerian patients connect with reputable hospitals and specialists in
            India and Turkey — from case review to treatment, travel, and recovery.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button to="/medical-request" variant="accent">
              Request an Appointment
            </Button>
            <Button to="/how-it-works" variant="outline">
              See How It Works
            </Button>
          </div>
        </motion.div>

        {/* Right — image */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative hidden h-full min-h-[480px] lg:block"
        >
          {/* Rounded left edge only so it bleeds to the right on desktop */}
          <div className="absolute inset-0 overflow-hidden rounded-l-[2rem]">
            <img
              src="/images/hero-doctor.png"
              alt="HezekHealth care coordinator with patient"
              className="h-full w-full object-cover object-center"
            />
            {/* Subtle gradient fade on the left edge to blend with background */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-brand-mist to-transparent" />
          </div>
        </motion.div>

        {/* Mobile hero image — shown below text on small screens */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pb-8 lg:hidden"
        >
          <img
            src="/images/hero-doctor.png"
            alt="HezekHealth care coordinator with patient"
            className="w-full rounded-card object-cover shadow-card"
            style={{ maxHeight: '260px', objectPosition: 'top' }}
          />
        </motion.div>

      </Container>
    </section>
  );
}