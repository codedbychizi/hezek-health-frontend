import {
  Droplet,
  Activity,
  Bone,
  HeartPulse,
  Heart,
  Microscope,
  Baby,
  Brain,
  Bot,
  ClipboardCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../seo/SEO.jsx';
import Container from '../../components/common/Container.jsx';
import FadeIn from '../../components/common/FadeIn.jsx';
import Skeleton from '../../components/common/Skeleton.jsx';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import { getActiveSpecialties } from '../../lib/queries.js';

// A few specialties intentionally share an icon — lucide-react doesn't have
// organ-specific medical icons, so this is an approximation. This map is
// the only place that needs to change if you swap in a closer match later.
const ICONS = {
  'kidney-transplantation': Droplet,
  'liver-transplantation': Activity,
  'bone-marrow-transplantation': Bone,
  cabg: HeartPulse,
  'pci-ptca-stenting': Activity,
  'valve-repair-replacement': Heart,
  'heart-transplantation': HeartPulse,
  'cancer-treatment': Microscope,
  'ivf-fertility': Baby,
  neurosurgery: Brain,
  'joint-replacement': Bone,
  'spine-surgery': Bone,
  'robotic-surgery': Bot,
  'executive-health-screening': ClipboardCheck,
};

export default function SpecialtiesPage() {
  const { data: specialties, loading } = useSupabaseQuery(getActiveSpecialties);

  return (
    <>
      <SEO
        title="Medical Specialties"
        description="Browse the medical specialties Hezek Health facilitates treatment for abroad."
      />

      <section className="bg-brand-mist py-20">
        <Container className="text-center">
          <FadeIn>
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-teal">
              Treatment Areas
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold text-brand-blue sm:text-5xl">
              Medical Specialties
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-brand-ink/70">
              Select a treatment area to start your medical request — our team will match
              you with the right hospital and specialist.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {specialties?.map((specialty, i) => {
                const Icon = ICONS[specialty.slug] || Activity;
                return (
                  <FadeIn
                    key={specialty.id}
                    delay={i * 0.03}
                    className="rounded-card bg-white p-6 shadow-card"
                  >
                    <Icon className="h-8 w-8 text-brand-teal" strokeWidth={1.75} />
                    <h2 className="mt-4 font-display text-base font-bold text-brand-blue">
                      {specialty.name}
                    </h2>
                    <Link
                      to="/medical-request"
                      className="mt-4 inline-block text-sm font-semibold text-brand-blue hover:underline"
                    >
                      Request This Treatment →
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}