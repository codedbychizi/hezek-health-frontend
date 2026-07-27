import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../common/Logo.jsx';
import Button from '../common/Button.jsx';

// To restore Hospitals: uncomment { label: 'Hospitals', to: '/hospitals' }
// To hide How It Works: comment out { label: 'How It Works', to: '/how-it-works' }
const NAV_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Countries', to: '/countries' },
  // { label: 'Hospitals', to: '/hospitals' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-brand-blue' : 'text-brand-ink/70 hover:text-brand-blue'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-brand-blue/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <NavLink to="/" onClick={() => setOpen(false)}>
          <Logo className="h-20 w-auto" />
        </NavLink>

        {/* Desktop nav — no dropdown, Specialties lives on the homepage now */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button to="/medical-request" variant="accent">
            Request Appointment
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-brand-blue lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="flex flex-col gap-1 border-t border-brand-blue/10 bg-white px-6 py-4 lg:hidden">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-brand-mist text-brand-blue' : 'text-brand-ink/70'
                }`
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Button to="/medical-request" variant="accent" className="mt-3 justify-center">
            Request Appointment
          </Button>
        </nav>
      )}
    </header>
  );
}