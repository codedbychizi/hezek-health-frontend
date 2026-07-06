import { supabase } from '../../lib/supabaseClient.js';
import AdminCRUDPage from '../../components/admin/AdminCRUDPage.jsx';

export default function AdminSpecialties() {
  return (
    <AdminCRUDPage
      title="Medical Specialties"
      queryFn={async () => {
        const { data, error } = await supabase.from('medical_specialties').select('*').order('display_order');
        if (error) throw error;
        return data;
      }}
      columns={[
        { label: 'Name', render: r => <span className="font-medium">{r.name}</span> },
        { label: 'Slug', render: r => <span className="text-brand-ink/50 text-xs font-mono">{r.slug}</span> },
        { label: 'Active', render: r => r.is_active ? <span className="text-brand-teal text-xs font-semibold">Yes</span> : <span className="text-brand-ink/40 text-xs">No</span> },
      ]}
      fields={[
        { name: 'name', label: 'Specialty Name', required: true },
        { name: 'slug', label: 'Slug', required: true },
        { name: 'description', label: 'Description', type: 'textarea', span: 2, rows: 2 },
        { name: 'display_order', label: 'Display Order', type: 'number' },
        { name: 'is_active', label: 'Active', type: 'checkbox', checkboxLabel: 'Show on website' },
      ]}
      defaultValues={{ is_active: true, display_order: 0 }}
      onSave={async (data, existing) => {
        if (existing) await supabase.from('medical_specialties').update(data).eq('id', existing.id);
        else await supabase.from('medical_specialties').insert(data);
      }}
      onDelete={async (row) => supabase.from('medical_specialties').delete().eq('id', row.id)}
    />
  );
}