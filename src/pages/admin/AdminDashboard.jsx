import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import { supabase } from '../../lib/supabaseClient.js';
import Skeleton from '../../components/common/Skeleton.jsx';
import { ClipboardList, MessageSquare, Mail, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

async function getDashboardStats() {
  // Four parallel queries — Promise.all means they run simultaneously,
  // not one after the other, so this is as fast as the slowest single query.
  const [requests, messages, subscribers, posts] = await Promise.all([
    supabase.from('medical_requests').select('id, status', { count: 'exact' }),
    supabase.from('contact_messages').select('id', { count: 'exact' }).eq('is_read', false),
    supabase.from('newsletter_subscribers').select('id', { count: 'exact' }).eq('is_active', true),
    supabase.from('blog_posts').select('id', { count: 'exact' }).eq('status', 'published'),
  ]);
  const pending = requests.data?.filter(r => r.status === 'pending').length || 0;
  return {
    totalRequests: requests.count || 0,
    pendingRequests: pending,
    unreadMessages: messages.count || 0,
    subscribers: subscribers.count || 0,
    publishedPosts: posts.count || 0,
  };
}

function StatCard({ icon: Icon, label, value, to, highlight }) {
  return (
    <Link to={to} className={'block rounded-card bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover ' + (highlight ? 'ring-2 ring-brand-teal' : '')}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-brand-ink/60">{label}</p>
          <p className="mt-1 font-display text-3xl font-bold text-brand-blue">{value}</p>
        </div>
        <Icon className={'h-8 w-8 ' + (highlight ? 'text-brand-teal' : 'text-brand-blue/30')} strokeWidth={1.5} />
      </div>
    </Link>
  );
}

export default function AdminDashboard() {
  const { data: stats, loading } = useSupabaseQuery(getDashboardStats);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-brand-blue">Dashboard</h1>
      <p className="mt-1 text-sm text-brand-ink/60">Welcome back. Here is what needs your attention.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28" />)
        ) : (
          <>
            <StatCard
              icon={ClipboardList}
              label="Pending Requests"
              value={stats?.pendingRequests ?? '—'}
              to="/admin/requests"
              highlight={stats?.pendingRequests > 0}
            />
            <StatCard
              icon={ClipboardList}
              label="Total Requests"
              value={stats?.totalRequests ?? '—'}
              to="/admin/requests"
            />
            <StatCard
              icon={MessageSquare}
              label="Unread Messages"
              value={stats?.unreadMessages ?? '—'}
              to="/admin/messages"
              highlight={stats?.unreadMessages > 0}
            />
            <StatCard
              icon={Mail}
              label="Newsletter Subscribers"
              value={stats?.subscribers ?? '—'}
              to="/admin/newsletter"
            />
          </>
        )}
      </div>

      <div className="mt-10 rounded-card bg-white p-6 shadow-card">
        <h2 className="font-display text-base font-bold text-brand-blue">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/admin/requests" className="rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue-dark">
            View Patient Requests
          </Link>
          <Link to="/admin/blog/new" className="rounded-full border border-brand-blue px-4 py-2 text-sm font-semibold text-brand-blue hover:bg-brand-mist">
            Write New Blog Post
          </Link>
          <Link to="/admin/messages" className="rounded-full border border-brand-blue px-4 py-2 text-sm font-semibold text-brand-blue hover:bg-brand-mist">
            Check Messages
          </Link>
        </div>
      </div>
    </div>
  );
}