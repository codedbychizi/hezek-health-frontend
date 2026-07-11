import { Heart, ShieldCheck, Award, Handshake, Lock, Star } from 'lucide-react';
import SEO from '../../seo/SEO.jsx';
import Container from '../../components/common/Container.jsx';
import FadeIn from '../../components/common/FadeIn.jsx';
import Button from '../../components/common/Button.jsx';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import { getPublicSettings } from '../../lib/queries.js';

const CORE_VALUES = [
  {
    icon: Heart,
    title: 'Compassion',
    description: 'We support every patient with empathy and understanding.',
  },
  {
    icon: ShieldCheck,
    title: 'Integrity',
    description: 'We believe in honesty and transparency.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We connect patients with quality healthcare providers.',
  },
  {
    icon: Handshake,
    title: 'Patient-Centered Care',
    description: 'Your health and comfort come first.',
  },
  {
    icon: Lock,
    title: 'Confidentiality',
    description: 'Your personal and medical information is kept secure.',
  },
  {
    icon: Star,
    title: 'Professionalism',
    description: 'We are committed to reliable, high-quality service.',
  },
];

function FounderAvatar({ name, imageUrl }) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className="h-32 w-32 rounded-full object-cover shadow-card"
      />
    );
  }

  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="flex h-32 w-32 items-center justify-center rounded-full bg-brand-mist text-3xl font-bold text-brand-blue shadow-card">
      {initials}
    </div>
  );
}

export default function AboutPage() {
  const { data: settings, loading } = useSupabaseQuery(getPublicSettings);

  const founderName = settings?.founder_name || 'Our Founder';
  const founderBio = settings?.founder_bio;
  const founderImage = settings?.founder_image_url;

  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Hezek Health's mission to connect Nigerian patients with trusted hospitals abroad."
      />

      <section className="bg-brand-mist py-20">
        <Container className="text-center">
          <FadeIn>
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-teal">
              About Hezek Health
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold text-brand-blue sm:text-5xl">
              Global care, local comfort
            </h1>
          </FadeIn>
        </Container>
      </section>

      {/* Brand Story */}
      <section className="py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <h2 className="font-display text-2xl font-bold text-brand-blue">Our Story</h2>
            <p className="mt-4 text-brand-ink/80">
              Hezek Health draws its inspiration from the biblical account of King Hezekiah,
              who after heartfelt prayer was granted fifteen more years of life: "I will add
              fifteen years to your life. And I will deliver you and this city from the hand
              of the king of Assyria. I will defend this city." (Isaiah 38:5, NIV)
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="rounded-card bg-brand-mist p-6 text-brand-ink/80">
              This powerful promise of renewed life is the foundation of our brand. At Hezek
              Health, we believe that health is a divine gift and that every individual
              deserves the opportunity to live longer, fuller, and healthier.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="bg-brand-mist py-20">
        <Container className="grid gap-6 sm:grid-cols-2">
          <FadeIn className="rounded-card bg-white p-8 shadow-card">
            <h2 className="font-display text-xl font-bold text-brand-blue">Mission</h2>
            <p className="mt-3 text-brand-ink/80">
              To guide patients through complex healthcare journeys by providing coordinated
              access to verified medical providers, beginning with fertility care and
              expanding into other specialized treatment areas through trusted clinical
              partnerships.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="rounded-card bg-white p-8 shadow-card">
            <h2 className="font-display text-xl font-bold text-brand-blue">Vision</h2>
            <p className="mt-3 text-brand-ink/80">
              To position Nigeria as a globally trusted destination for safe, ethical, and
              high-quality medical care by building structured systems that simplify access
              to specialist treatment across borders.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <Container>
          <FadeIn className="text-center">
            <h2 className="font-display text-2xl font-bold text-brand-blue">
              Our Core Values
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map((value, i) => (
              <FadeIn
                key={value.title}
                delay={i * 0.05}
                className="rounded-card bg-white p-6 text-center shadow-card"
              >
                <value.icon className="mx-auto h-8 w-8 text-brand-teal" strokeWidth={1.75} />
                <h3 className="mt-4 font-display text-base font-bold text-brand-blue">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-brand-ink/70">{value.description}</p>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Founder section ──────────────────────────────────────────────────
          TEMPORARILY HIDDEN at client's request.
          To restore: remove the opening {false && ( and the closing )}
          ──────────────────────────────────────────────────────────────── */}
      {false && (
      <section className="bg-brand-mist py-20">
        <Container className="flex flex-col items-center text-center">
          <FadeIn className="flex flex-col items-center">
            {!loading && <FounderAvatar name={founderName} imageUrl={founderImage} />}
            <h2 className="mt-5 font-display text-xl font-bold text-brand-blue">
              {founderName}
            </h2>
            <p className="text-sm font-medium text-brand-teal">Founder</p>
            <p className="mt-4 max-w-xl text-brand-ink/70">
              {founderBio || 'Founder bio coming soon.'}
            </p>
          </FadeIn>
        </Container>
      </section>
      )}{/* end founder section */}

      {/* No Team section yet — there's currently only the founder. Add a
          team_members table + grid here once there are other people to
          show; building it speculatively now would just be empty UI. */}

      <section className="py-16 text-center">
        <Container>
          <Button to="/medical-request" variant="primary">
            Start Your Medical Request
          </Button>
        </Container>
      </section>
    </>
  );
}