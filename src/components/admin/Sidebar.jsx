import { NavLink } from 'react-router-dom';
import logoImg from '../../assets/logo/hezek-logo.svg';
import {
  LayoutDashboard, ClipboardList, Globe, Hospital,
  Stethoscope, FileText, Star, HelpCircle,
  MessageSquare, Mail, Settings, X
} from 'lucide-react';

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true },
    ],
  },
  {
    label: 'Patient Care',
    items: [
      { label: 'Medical Requests', to: '/admin/requests', icon: ClipboardList },
      { label: 'Messages', to: '/admin/messages', icon: MessageSquare },
    ],
  },
  {
    label: 'Content',
    items: [
      { label: 'Blog', to: '/admin/blog', icon: FileText },
      { label: 'Testimonials', to: '/admin/testimonials', icon: Star },
      { label: 'FAQs', to: '/admin/faqs', icon: HelpCircle },
    ],
  },
  {
    label: 'Directory',
    items: [
      { label: 'Countries', to: '/admin/countries', icon: Globe },
      { label: 'Hospitals', to: '/admin/hospitals', icon: Hospital },
      { label: 'Specialties', to: '/admin/specialties', icon: Stethoscope },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Newsletter', to: '/admin/newsletter', icon: Mail },
      { label: 'Settings', to: '/admin/settings', icon: Settings },
    ],
  },
];

export default function Sidebar({ onClose }) {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-brand-teal/15 text-brand-teal'
        : 'text-white/70 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <aside className="flex h-full w-64 flex-col bg-brand-blue">
      <div className="flex items-center justify-between px-5 py-5">
        {/*
          filter: brightness(0) invert(1) converts all dark colours in the
          SVG to white, making it visible on the dark blue sidebar.
          This is the correct approach for single-colour SVG logos on dark
          backgrounds — no separate "footer" variant file needed.

          To revert to the coloured logo: remove the filter style property.
        */}
        <img
          src={logoImg}
          alt="HezekHealth"
          style={{
            height: '100px',
            width: 'auto',
            display: 'block',
            filter: 'brightness(0) invert(1)',
          }}
        />
        {onClose && (
          <button onClick={onClose} className="text-white/60 hover:text-white lg:hidden">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-4 pb-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-6">
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-white/40">
              {group.label}
            </p>
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={linkClass}
                onClick={onClose}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}