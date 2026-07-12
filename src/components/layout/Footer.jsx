import { Link } from 'react-router-dom';
import Logo from '../common/Logo.jsx';

const COMPANY_PHONE = import.meta.env.VITE_COMPANY_PHONE || '+2347046502462';
const COMPANY_WHATSAPP = import.meta.env.VITE_COMPANY_WHATSAPP || '2347046502462';
const COMPANY_EMAIL = import.meta.env.VITE_COMPANY_EMAIL || 'hello@hezekhealth.com';

const COLUMNS = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Our Services', to: '/services' },
      { label: 'Countries', to: '/countries' },
      { label: 'Hospitals', to: '/hospitals' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'How It Works', to: '/how-it-works' },
      { label: 'Medical Specialties', to: '/specialties' },
      { label: 'Blog', to: '/blog' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-blue text-white">
      {/* Recurring brand wave motif from the logo deck — a quiet, on-brand
          signature rather than a flat divider line. */}
      <svg
        viewBox="0 0 200 16"
        preserveAspectRatio="none"
        className="block h-4 w-full"
        aria-hidden="true"
      >
        <path d="M0,16 Q50,0 100,10 T200,4 L200,16 Z" fill="#00DC92" opacity="0.85" />
      </svg>

      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo height={52} variant="footer" />
            <p className="mt-4 max-w-xs text-sm text-white/70">
              Connecting Nigerian patients with trusted hospitals and specialists abroad —
              from case review to recovery.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-teal">
                {column.heading}
              </h3>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-white/80 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-teal">
              Talk to us
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>
                <a href={`tel:${COMPANY_PHONE}`} className="hover:text-white">
                  {COMPANY_PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${COMPANY_WHATSAPP}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  WhatsApp us
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY_EMAIL}`} className="hover:text-white">
                  {COMPANY_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/hezekhealth"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  @hezekhealth
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Hezek Health. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}