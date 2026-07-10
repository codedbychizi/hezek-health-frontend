import { motion } from 'framer-motion';
import Container from '../common/Container.jsx';
import Button from '../common/Button.jsx';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-mist py-24 sm:py-32">
      <div
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-teal/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-blue/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Updated eyebrow — no longer says "Medical Tourism, Done Right"  */}
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-teal">
            Personalised Healthcare &amp; Treatment Abroad
          </span>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold text-brand-blue sm:text-5xl lg:text-6xl">
            Access trusted hospitals abroad, without the guesswork
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-ink/70">
            We help Nigerian patients connect with reputable hospitals and specialists in
            India and Turkey — from case review to treatment, travel, and recovery.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button to="/medical-request" variant="accent">
              Request an Appointment
            </Button>
            <Button to="/how-it-works" variant="outline">
              See How It Works
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}