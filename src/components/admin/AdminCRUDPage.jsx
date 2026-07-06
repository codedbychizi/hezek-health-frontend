import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import AdminModal from './AdminModal.jsx';
import Skeleton from '../common/Skeleton.jsx';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';

/**
 * Generic admin CRUD page.
 *
 * Props:
 *   title        — page heading
 *   queryFn      — async fn returning all rows
 *   columns      — [{ label, render }] defining the table
 *   fields       — [{ name, label, type, options, required, span }] for the form
 *   onSave       — async (data, editingRow) => void   — handles INSERT / UPDATE
 *   onDelete     — async (row) => void
 *   defaultValues — default form values for new rows
 */
export default function AdminCRUDPage({
  title, queryFn, columns, fields, onSave, onDelete, defaultValues = {}
}) {
  const { data: rows, loading, refresh } = useSupabaseQuery(queryFn);
  const [editing, setEditing] = useState(null);    // null = closed, {} = new row, row = edit
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  function openNew() {
    reset(defaultValues);
    setEditing({});
  }

  function openEdit(row) {
    reset(row);
    setEditing(row);
  }

  function closeModal() {
    setEditing(null);
    reset({});
  }

  async function handleSave(data) {
    setSaving(true);
    try {
      await onSave(data, editing?.id ? editing : null);
      refresh?.();
    } finally {
      setSaving(false);
      closeModal();
    }
  }

  async function handleDelete(row) {
    if (!window.confirm('Delete this item permanently?')) return;
    setDeleting(row.id);
    try {
      await onDelete(row);
      refresh?.();
    } finally {
      setDeleting(null);
    }
  }

  const INPUT = 'w-full rounded-xl border border-brand-blue/20 px-4 py-2.5 text-sm focus:border-brand-teal focus:outline-none';
  const isNew = editing && !editing.id;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-brand-blue">{title}</h1>
        <button
          onClick={openNew}
          className="flex items-center gap-2 rounded-full bg-brand-teal px-4 py-2 text-sm font-semibold text-white hover:bg-brand-teal-dark"
        >
          <Plus className="h-4 w-4" /> Add New
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-card bg-white shadow-card">
        {loading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-12" />)}
          </div>
        ) : !rows?.length ? (
          <p className="p-8 text-center text-sm text-brand-ink/50">No items yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-brand-blue/10 bg-brand-mist/50">
                <tr>
                  {columns.map(c => (
                    <th key={c.label} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-brand-ink/50">
                      {c.label}
                    </th>
                  ))}
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-blue/5">
                {rows.map(row => (
                  <tr key={row.id} className="hover:bg-brand-mist/30">
                    {columns.map(c => (
                      <td key={c.label} className="px-4 py-3 text-brand-ink/80">{c.render(row)}</td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => openEdit(row)} className="rounded-full border border-brand-blue/20 p-1.5 text-brand-blue hover:bg-brand-mist">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(row)}
                          disabled={deleting === row.id}
                          className="rounded-full border border-red-100 p-1.5 text-red-400 hover:bg-red-50 disabled:opacity-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing !== null && (
        <AdminModal title={isNew ? 'Add New' : 'Edit'} onClose={closeModal}>
          <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map(field => (
                <div key={field.name} className={field.span === 2 ? 'sm:col-span-2' : ''}>
                  <label className="mb-1 block text-xs font-medium text-brand-ink">
                    {field.label}{field.required && ' *'}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      {...register(field.name, { required: field.required })}
                      rows={field.rows || 3}
                      className={INPUT}
                    />
                  ) : field.type === 'select' ? (
                    <select {...register(field.name)} className={INPUT}>
                      {field.options.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  ) : field.type === 'checkbox' ? (
                    <div className="flex items-center gap-2 pt-1">
                      <input {...register(field.name)} type="checkbox" className="h-4 w-4 accent-brand-teal" />
                      <span className="text-xs text-brand-ink/70">{field.checkboxLabel}</span>
                    </div>
                  ) : (
                    <input
                      {...register(field.name, { required: field.required })}
                      type={field.type || 'text'}
                      className={INPUT}
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3 border-t border-brand-blue/10 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-brand-blue px-5 py-2 text-sm font-semibold text-white hover:bg-brand-blue-dark disabled:opacity-60"
              >
                {saving ? 'Saving…' : 'Save'}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full border border-brand-blue/20 px-5 py-2 text-sm font-semibold text-brand-blue hover:bg-brand-mist"
              >
                Cancel
              </button>
            </div>
          </form>
        </AdminModal>
      )}
    </div>
  );
}