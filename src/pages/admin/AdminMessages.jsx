import { useState } from 'react';
import { Trash2, Eye } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient.js';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import Skeleton from '../../components/common/Skeleton.jsx';
import AdminModal from '../../components/admin/AdminModal.jsx';

async function getMessages() {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export default function AdminMessages() {
  const { data: messages, loading, refresh } = useSupabaseQuery(getMessages);
  const [viewing, setViewing] = useState(null);

  async function markRead(msg) {
    await supabase.from('contact_messages').update({ is_read: true }).eq('id', msg.id);
    setViewing({ ...msg, is_read: true });
    refresh?.();
  }

  async function deleteMessage(id) {
    if (!window.confirm('Delete this message?')) return;
    await supabase.from('contact_messages').delete().eq('id', id);
    setViewing(null);
    refresh?.();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-brand-blue">Contact Messages</h1>
      <div className="mt-6 overflow-hidden rounded-card bg-white shadow-card">
        {loading ? (
          <div className="p-6 space-y-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-12" />)}</div>
        ) : !messages?.length ? (
          <p className="p-8 text-center text-sm text-brand-ink/50">No messages yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-brand-blue/10 bg-brand-mist/50">
              <tr>{['Name', 'Email', 'Subject', 'Date', ''].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-brand-ink/50">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-brand-blue/5">
              {messages.map(msg => (
                <tr key={msg.id} className={'hover:bg-brand-mist/30 ' + (!msg.is_read ? 'font-semibold' : '')}>
                  <td className="px-4 py-3 text-brand-ink">{msg.name}</td>
                  <td className="px-4 py-3 text-brand-ink/70">{msg.email}</td>
                  <td className="px-4 py-3 text-brand-ink/70">{msg.subject || '—'}</td>
                  <td className="px-4 py-3 text-brand-ink/50 text-xs">{new Date(msg.created_at).toLocaleDateString('en-GB')}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => { setViewing(msg); markRead(msg); }} className="rounded-full border border-brand-blue/20 p-1.5 text-brand-blue hover:bg-brand-mist">
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => deleteMessage(msg.id)} className="rounded-full border border-red-100 p-1.5 text-red-400 hover:bg-red-50">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {viewing && (
        <AdminModal title={viewing.name} onClose={() => setViewing(null)}>
          <div className="space-y-3 text-sm text-brand-ink/80">
            <div><span className="font-semibold">Email:</span> {viewing.email}</div>
            {viewing.phone && <div><span className="font-semibold">Phone:</span> {viewing.phone}</div>}
            {viewing.subject && <div><span className="font-semibold">Subject:</span> {viewing.subject}</div>}
            <div className="rounded-xl bg-brand-mist p-4 text-brand-ink/70">{viewing.message}</div>
            <div className="flex gap-3 pt-2">
              <a href={'mailto:' + viewing.email} className="rounded-full bg-brand-blue px-4 py-2 text-xs font-semibold text-white hover:bg-brand-blue-dark">
                Reply by Email
              </a>
              <button onClick={() => deleteMessage(viewing.id)} className="rounded-full border border-red-100 px-4 py-2 text-xs font-semibold text-red-500 hover:bg-red-50">
                Delete
              </button>
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
}