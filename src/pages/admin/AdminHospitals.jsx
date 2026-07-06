import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabaseClient.js';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import { getActiveCountries } from '../../lib/queries.js';
import AdminModal from '../../components/admin/AdminModal.jsx';
import ImageUploadField from '../../components/admin/ImageUploadField.jsx';
import Skeleton from '../../components/common/Skeleton.jsx';

async function fetchHospitals() {
  const { data, error } = await supabase
    .from('hospitals')
    .select('id, name, short_summary, is_active, image_url, countries(name)')
    .order('display_order');
  if (error) throw error;
  return data;
}

const INPUT = 'w-full rounded-xl border border-brand-blue/20 px-4 py-2.5 text-sm focus:border-brand-teal focus:outline-none';

export default function AdminHospitals() {
  const { data: rows, loading, refresh } = useSupabaseQuery(fetchHospitals);
  const { data: countries } = useSupabaseQuery(getActiveCountries);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const { register, handleSubmit, reset } = useForm();

  function openNew() {
    reset({ is_active: true, display_order: 0 });
    setImageUrl('');
    setEditing({});
  }

  function openEdit(row) {
    reset(row);
    setImageUrl(row.image_url || '');
    setEditing(row);
  }

  function close() { setEditing(null); reset({}); setImageUrl(''); }

  async function onSubmit(data) {
    setSaving(true);
    // Convert empty string UUIDs to null
    const payload = Object.fromEntries(
      Object.entries({ ...data, image_url: imageUrl || null })
        .map(([k, v]) => [k, v === '' ? null : v])
    );
    if (editing?.id) await supabase.from('hospitals').update(payload).eq('id', editing.id);
    else await supabase.from('hospitals').insert(payload);
    setSaving(false);
    close();
    refresh?.();
  }

  async function onDelete(row) {
    if (!window.confirm('Delete this hospital?')) return;
    await supabase.from('hospitals').delete().eq('id', row.id);
    refresh?.();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-brand-blue">Hospitals</h1>
        <button onClick={openNew} className="flex items-center gap-2 rounded-full bg-brand-teal px-4 py-2 text-sm font-semibold text-white hover:bg-brand-teal-dark">
          <Plus className="h-4 w-4" /> Add Hospital
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-card bg-white shadow-card">
        {loading ? (
          <div className="space-y-3 p-6">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-12" />)}</div>
        ) : !rows?.length ? (
          <p className="p-8 text-center text-sm text-brand-ink/50">No hospitals yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-brand-blue/10 bg-brand-mist/50">
              <tr>
                {['Image', 'Name', 'Country', 'Active', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-brand-ink/50">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-blue/5">
              {rows.map(row => (
                <tr key={row.id} className="hover:bg-brand-mist/30">
                  <td className="px-4 py-3">
                    {row.image_url
                      ? <img src={row.image_url} alt={row.name} className="h-10 w-16 rounded-lg object-cover" />
                      : <div className="h-10 w-16 rounded-lg bg-brand-mist text-center text-xs leading-10 text-brand-ink/30">No img</div>
                    }
                  </td>
                  <td className="px-4 py-3 font-medium text-brand-ink">{row.name}</td>
                  <td className="px-4 py-3 text-brand-ink/60">{row.countries?.name || '—'}</td>
                  <td className="px-4 py-3">
                    {row.is_active
                      ? <span className="text-xs font-semibold text-brand-teal">Yes</span>
                      : <span className="text-xs text-brand-ink/40">No</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(row)} className="rounded-full border border-brand-blue/20 p-1.5 text-brand-blue hover:bg-brand-mist">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => onDelete(row)} className="rounded-full border border-red-100 p-1.5 text-red-400 hover:bg-red-50">
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

      {editing !== null && (
        <AdminModal title={editing?.id ? 'Edit Hospital' : 'Add Hospital'} onClose={close}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-brand-ink">Hospital Name *</label>
                <input {...register('name', { required: true })} className={INPUT} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-brand-ink">Country</label>
                <select {...register('country_id')} className={INPUT}>
                  <option value="">Select country</option>
                  {countries?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-brand-ink">Display Order</label>
                <input {...register('display_order')} type="number" className={INPUT} />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-brand-ink">Short Summary</label>
                <textarea {...register('short_summary')} rows={2} className={INPUT} />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-brand-ink">Full Description</label>
                <textarea {...register('description')} rows={4} className={INPUT} />
              </div>
              <div className="sm:col-span-2">
                <ImageUploadField
                  bucket="site-images"
                  label="Hospital Image"
                  value={imageUrl}
                  onChange={setImageUrl}
                />
              </div>
              <div className="flex items-center gap-2">
                <input {...register('is_active')} type="checkbox" className="h-4 w-4 accent-brand-teal" id="hosp-active" />
                <label htmlFor="hosp-active" className="text-xs text-brand-ink/70">Show on website</label>
              </div>
            </div>
            <div className="flex gap-3 border-t border-brand-blue/10 pt-4">
              <button type="submit" disabled={saving} className="rounded-full bg-brand-blue px-5 py-2 text-sm font-semibold text-white hover:bg-brand-blue-dark disabled:opacity-60">
                {saving ? 'Saving…' : 'Save'}
              </button>
              <button type="button" onClick={close} className="rounded-full border border-brand-blue/20 px-5 py-2 text-sm font-semibold text-brand-blue hover:bg-brand-mist">
                Cancel
              </button>
            </div>
          </form>
        </AdminModal>
      )}
    </div>
  );
}