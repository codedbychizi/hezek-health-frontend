import { ClipboardList, Banknote, Stamp, Plane, Stethoscope, HeartPulse } from 'lucide-react';

/**
 * Derived from the six-step process you provided (no separate services
 * list was supplied). Treat as a draft — confirm or edit the wording
 * whenever you're ready. Both the homepage preview and the full /services
 * page import from here, so there's exactly one place to update.
 */
export const SERVICES = [
  {
    icon: ClipboardList,
    title: 'Case Review & Hospital Matching',
    description: 'We review your case and match you with the right specialists.',
  },
  {
    icon: Banknote,
    title: 'Treatment Cost Estimates',
    description: 'Transparent, personalized cost estimates before you decide.',
  },
  {
    icon: Stamp,
    title: 'Medical Visa Assistance',
    description: 'Guidance on documentation needed for your medical visa.',
  },
  {
    icon: Plane,
    title: 'Travel & Logistics Coordination',
    description: 'Appointment scheduling, travel, and accommodation support.',
  },
  {
    icon: Stethoscope,
    title: 'Treatment Coordination Abroad',
    description: 'Support throughout your treatment at the chosen hospital.',
  },
  {
    icon: HeartPulse,
    title: 'Follow-Up Care Coordination',
    description: 'Discharge planning and continuity of care back home.',
  },
];