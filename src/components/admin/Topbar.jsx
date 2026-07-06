import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function Topbar({ title, onMenuOpen }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate('/admin/login');
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-brand-blue/10 bg-white px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuOpen}
          className="text-brand-ink/60 hover:text-brand-blue lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="font-display text-lg font-bold text-brand-blue">{title}</h1>
      </div>
      <button
        onClick={handleSignOut}
        className="flex items-center gap-2 rounded-full border border-brand-blue/20 px-4 py-1.5 text-sm font-medium text-brand-ink/60 hover:border-brand-blue/40 hover:text-brand-blue"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </header>
  );
}