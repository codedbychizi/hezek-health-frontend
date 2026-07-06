import { Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient.js';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import Skeleton from '../../components/common/Skeleton.jsx';

async function getSubscribers() {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .order('subscribed_at', { ascending: false });
  if (error) throw error;
  return data;
}

export default function AdminNewsletter() {
  const { data: subscribers, loading, refresh } = useSupabaseQuery(getSubscribers);

  async function remove(id) {
    if (!window.confirm('Remove this subscriber?')) return;
    await supabase.from('newsletter_subscribers').delete().eq('id', id);
    refresh?.();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-brand-blue">Newsletter Subscribers</h1>
        <span className="text-sm text-brand-ink/50">{subscribers?.length ?? 0} total</span>
      </div>
      <div className="mt-6 overflow-hidden rounded-card bg-white shadow-card">
        {loading ? (
          <div className="p-6 space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-10" />)}</div>
        ) : !subscribers?.length ? (
          <p className="p-8 text-center text-sm text-brand-ink/50">No subscribers yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-brand-blue/10 bg-brand-mist/50">
              <tr>{['Email', 'Subscribed', 'Status', ''].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-brand-ink/50">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-brand-blue/5">
              {subscribers.map(sub => (
                <tr key={sub.id} className="hover:bg-brand-mist/30">
                  <td className="px-4 py-3 text-brand-ink">{sub.email}</td>
                  <td className="px-4 py-3 text-brand-ink/50 text-xs">{new Date(sub.subscribed_at).toLocaleDateString('en-GB')}</td>
                  <td className="px-4 py-3"><span className={'text-xs font-semibold ' + (sub.is_active ? 'text-brand-teal' : 'text-brand-ink/40')}>{sub.is_active ? 'Active' : 'Inactive'}</span></td>
                  <td className="px-4 py-3">
                    <button onClick={() => remove(sub.id)} className="rounded-full border border-red-100 p-1.5 text-red-400 hover:bg-red-50">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}