import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Logo from '../common/Logo.jsx';
import Button from '../common/Button.jsx';

// ─── Nav link config ──────────────────────────────────────────────────────────
// To restore Hospitals: uncomment the { label: 'Hospitals', to: '/hospitals' } line
// To hide How It Works: comment out the { label: 'How It Works', to: '/how-it-works' } line
const NAV_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Countries', to: '/countries' },
  // { label: 'Hospitals', to: '/hospitals' },  // ← uncomment when hospital data is ready
  { label: 'How It Works', to: '/how-it-works' }, // ← comment out if she confirms removal
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
          <Logo height={80} />
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          <NavLink to="/about" className={linkClass}>About</NavLink>

          {/* Services dropdown */}
          <div className="group relative py-2">
            <NavLink to="/services" className={linkClass}>Services</NavLink>
            <div className="invisible absolute left-0 top-full w-52 rounded-card bg-white py-2 opacity-0 shadow-card-hover transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <Link
                to="/specialties"
                className="block px-4 py-2 text-sm text-brand-ink/70 hover:bg-brand-mist hover:text-brand-blue"
              >
                Medical Specialties
              </Link>
            </div>
          </div>

          {NAV_LINKS.slice(1).map((link) => (
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
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-brand-mist text-brand-blue' : 'text-brand-ink/70'}`
            }
            onClick={() => setOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-brand-mist text-brand-blue' : 'text-brand-ink/70'}`
            }
            onClick={() => setOpen(false)}
          >
            Services
          </NavLink>
          <NavLink
            to="/specialties"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 pl-6 text-sm font-medium ${isActive ? 'bg-brand-mist text-brand-blue' : 'text-brand-ink/70'}`
            }
            onClick={() => setOpen(false)}
          >
            Medical Specialties
          </NavLink>
          {NAV_LINKS.slice(1).map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-brand-mist text-brand-blue' : 'text-brand-ink/70'}`
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