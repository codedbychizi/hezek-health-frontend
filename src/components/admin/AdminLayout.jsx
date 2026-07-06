import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ClipboardList, Building2, Globe, Stethoscope,
  FileText, Star, HelpCircle, MessageSquare, Mail, Settings,
  Menu, X, LogOut,
} from 'lucide-react';
import Logo from '../common/Logo.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Patient Requests', to: '/admin/requests', icon: ClipboardList },
  { label: 'Blog Posts', to: '/admin/blog', icon: FileText },
  { label: 'Hospitals', to: '/admin/hospitals', icon: Building2 },
  { label: 'Countries', to: '/admin/countries', icon: Globe },
  { label: 'Specialties', to: '/admin/specialties', icon: Stethoscope },
  { label: 'Testimonials', to: '/admin/testimonials', icon: Star },
  { label: 'FAQs', to: '/admin/faqs', icon: HelpCircle },
  { label: 'Messages', to: '/admin/messages', icon: MessageSquare },
  { label: 'Newsletter', to: '/admin/newsletter', icon: Mail },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
];

function SidebarContent({ onClose }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate('/admin/login');
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-white/10 p-5">
        <Logo className="[&_span]:text-white [&_span_span]:text-brand-teal" />
        {onClose && (
          <button onClick={onClose} className="text-white/60 lg:hidden">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ' +
                  (isActive
                    ? 'bg-brand-teal/20 text-brand-teal'
                    : 'text-white/70 hover:bg-white/10 hover:text-white')
                }
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-white/10 p-4">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-brand-mist">
      <aside className="hidden w-60 shrink-0 overflow-y-auto bg-brand-blue lg:flex lg:flex-col">
        <SidebarContent />
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-brand-ink/40" onClick={() => setSidebarOpen(false)} />
          <aside className="relative flex h-full w-64 flex-col bg-brand-blue">
            <SidebarContent onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-brand-blue/10 bg-white px-6">
          <button className="text-brand-blue lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <span className="text-sm text-brand-ink/50">Hezek Health Admin</span>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}