import { Link } from 'react-router-dom';
import {
  Droplet, Activity, Bone, HeartPulse, Heart,
  Microscope, Baby, Brain, Bot, ClipboardCheck,
} from 'lucide-react';
import Container from '../common/Container.jsx';
import FadeIn from '../common/FadeIn.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import Skeleton from '../common/Skeleton.jsx';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import { getActiveSpecialties } from '../../lib/queries.js';

const ICONS = {
  'kidney-transplantation':   Droplet,
  'liver-transplantation':    Activity,
  'bone-marrow-transplantation': Bone,
  'cabg':                     HeartPulse,
  'pci-ptca-stenting':        Activity,
  'valve-repair-replacement': Heart,
  'heart-transplantation':    HeartPulse,
  'cancer-treatment':         Microscope,
  'ivf-fertility':            Baby,
  'neurosurgery':             Brain,
  'joint-replacement':        Bone,
  'spine-surgery':            Bone,
  'robotic-surgery':          Bot,
  'executive-health-screening': ClipboardCheck,
};

export default function SpecialtiesSection() {
  const { data: specialties, loading } = useSupabaseQuery(getActiveSpecialties);

  return (
    <section className="bg-brand-mist py-20">
      <Container>
        <SectionHeading
          eyebrow="Treatment Areas"
          title="Medical Specialties We Facilitate"
          linkTo="/specialties"
          linkLabel="View all →"
        />

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {specialties?.map((specialty, i) => {
              const Icon = ICONS[specialty.slug] || Activity;
              return (
                <FadeIn
                  key={specialty.id}
                  delay={i * 0.03}
                >
                  <Link
                    to="/medical-request"
                    className="flex items-start gap-3 rounded-card bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover"
                  >
                    <Icon
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal"
                      strokeWidth={1.75}
                    />
                    <span className="text-sm font-semibold text-brand-blue">
                      {specialty.name}
                    </span>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        )}

        <FadeIn className="mt-10 text-center">
          <p className="text-sm text-brand-ink/60">
            Don't see your condition listed?{' '}
            <Link
              to="/medical-request"
              className="font-semibold text-brand-blue hover:underline"
            >
              Submit a request anyway
            </Link>{' '}
            — our team will review your case.
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}