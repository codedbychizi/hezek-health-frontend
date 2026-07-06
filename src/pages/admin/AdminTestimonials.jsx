import { supabase } from '../../lib/supabaseClient.js';
import AdminCRUDPage from '../../components/admin/AdminCRUDPage.jsx';

export default function AdminTestimonials() {
  return (
    <AdminCRUDPage
      title="Testimonials"
      queryFn={async () => {
        const { data, error } = await supabase.from('testimonials').select('*').order('display_order');
        if (error) throw error;
        return data;
      }}
      columns={[
        { label: 'Patient', render: r => <span className="font-medium">{r.patient_name}</span> },
        { label: 'Country', render: r => r.country || '—' },
        { label: 'Content', render: r => <span className="line-clamp-1 text-brand-ink/60">{r.content}</span> },
        { label: 'Visible', render: r => r.is_active ? <span className="text-brand-teal text-xs font-semibold">Yes</span> : <span className="text-brand-ink/40 text-xs">No</span> },
      ]}
      fields={[
        { name: 'patient_name', label: 'Patient Name', required: true },
        { name: 'country', label: 'Country' },
        { name: 'rating', label: 'Rating (1–5)', type: 'number' },
        { name: 'display_order', label: 'Display Order', type: 'number' },
        { name: 'content', label: 'Testimonial', type: 'textarea', span: 2, rows: 4, required: true },
        { name: 'is_active', label: 'Visible', type: 'checkbox', checkboxLabel: 'Show on homepage', span: 2 },
      ]}
      defaultValues={{ is_active: false, display_order: 0, rating: 5 }}
      onSave={async (data, existing) => {
        if (existing) await supabase.from('testimonials').update(data).eq('id', existing.id);
        else await supabase.from('testimonials').insert(data);
      }}
      onDelete={async (row) => supabase.from('testimonials').delete().eq('id', row.id)}
    />
  );
}