import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabaseClient.js';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import Skeleton from '../../components/common/Skeleton.jsx';
import StatusBadge from '../../components/admin/StatusBadge.jsx';
import AdminModal from '../../components/admin/AdminModal.jsx';

const STATUSES = ['pending', 'reviewing', 'contacted', 'booked', 'closed'];

async function getAllRequests() {
  const { data, error } = await supabase
    .from('medical_requests')
    .select('id, full_name, email, phone, medical_condition, status, created_at, admin_notes, countries(name), hospitals(name), medical_request_files(file_url, file_name)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function AdminRequests() {
  const { data: requests, loading, refresh } = useSupabaseQuery(getAllRequests);
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState('all');

  const { register, handleSubmit, reset } = useForm();

  function openRequest(req) {
    setSelected(req);
    reset({ status: req.status, admin_notes: req.admin_notes || '' });
  }

  async function saveRequest(data) {
    setSaving(true);
    await supabase
      .from('medical_requests')
      .update({ status: data.status, admin_notes: data.admin_notes, updated_at: new Date().toISOString() })
      .eq('id', selected.id);
    setSaving(false);
    setSelected(null);
    refresh?.();
  }

  const displayed = filter === 'all'
    ? requests
    : requests?.filter(r => r.status === filter);

  const INPUT = 'w-full rounded-xl border border-brand-blue/20 px-4 py-2.5 text-sm focus:border-brand-teal focus:outline-none';

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-brand-blue">Patient Requests</h1>

      {/* Status filter */}
      <div className="mt-4 flex flex-wrap gap-2">
        {['all', ...STATUSES].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={'rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition-colors ' +
              (filter === s ? 'bg-brand-blue text-white' : 'bg-white text-brand-ink/60 hover:bg-brand-mist')}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-card bg-white shadow-card">
        {loading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12" />)}
          </div>
        ) : !displayed?.length ? (
          <p className="p-8 text-center text-sm text-brand-ink/50">No requests found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-brand-blue/10 bg-brand-mist/50">
                <tr>
                  {['Patient', 'Condition', 'Country', 'Status', 'Date', ''].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-brand-ink/50">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-blue/5">
                {displayed.map(req => (
                  <tr key={req.id} className="hover:bg-brand-mist/30">
                    <td className="px-4 py-3">
                      <p className="font-medium text-brand-ink">{req.full_name}</p>
                      <p className="text-xs text-brand-ink/50">{req.email}</p>
                    </td>
                    <td className="max-w-[180px] truncate px-4 py-3 text-brand-ink/70">{req.medical_condition}</td>
                    <td className="px-4 py-3 text-brand-ink/70">{req.countries?.name || '—'}</td>
                    <td className="px-4 py-3"><StatusBadge status={req.status} /></td>
                    <td className="px-4 py-3 text-brand-ink/50">{formatDate(req.created_at)}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => openRequest(req)}
                        className="rounded-full border border-brand-blue/20 px-3 py-1 text-xs font-semibold text-brand-blue hover:bg-brand-mist"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Request detail modal */}
      {selected && (
        <AdminModal title={selected.full_name} onClose={() => setSelected(null)}>
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4 text-brand-ink/70">
              <div><span className="font-semibold text-brand-ink">Email:</span> {selected.email}</div>
              <div><span className="font-semibold text-brand-ink">Phone:</span> {selected.phone}</div>
              <div><span className="font-semibold text-brand-ink">Country:</span> {selected.countries?.name || '—'}</div>
              <div><span className="font-semibold text-brand-ink">Hospital:</span> {selected.hospitals?.name || '—'}</div>
            </div>
            <div>
              <p className="font-semibold text-brand-ink">Medical Condition</p>
              <p className="mt-1 rounded-xl bg-brand-mist p-3 text-brand-ink/70">{selected.medical_condition}</p>
            </div>
            {selected.medical_request_files?.length > 0 && (
              <div>
                <p className="font-semibold text-brand-ink">Uploaded Files</p>
                <ul className="mt-1 space-y-1">
                  {selected.medical_request_files.map((f, i) => (
                    <li key={i}>
                      <a href={f.file_url} target="_blank" rel="noreferrer" className="text-brand-blue hover:underline text-xs">
                        {f.file_name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <form onSubmit={handleSubmit(saveRequest)} className="space-y-4 border-t border-brand-blue/10 pt-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-brand-ink">Update Status</label>
                <select {...register('status')} className={INPUT}>
                  {STATUSES.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-brand-ink">Internal Notes (not visible to patient)</label>
                <textarea {...register('admin_notes')} rows={3} className={INPUT} />
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={saving} className="rounded-full bg-brand-blue px-5 py-2 text-sm font-semibold text-white hover:bg-brand-blue-dark disabled:opacity-60">
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
                <button type="button" onClick={() => setSelected(null)} className="rounded-full border border-brand-blue/20 px-5 py-2 text-sm font-semibold text-brand-blue hover:bg-brand-mist">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </AdminModal>
      )}
    </div>
  );
}