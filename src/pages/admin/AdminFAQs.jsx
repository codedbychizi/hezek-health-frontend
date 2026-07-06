import { supabase } from '../../lib/supabaseClient.js';
import AdminCRUDPage from '../../components/admin/AdminCRUDPage.jsx';

export default function AdminFAQs() {
  return (
    <AdminCRUDPage
      title="FAQs"
      queryFn={async () => {
        const { data, error } = await supabase.from('faqs').select('*').order('display_order');
        if (error) throw error;
        return data;
      }}
      columns={[
        { label: 'Question', render: r => <span className="font-medium line-clamp-1">{r.question}</span> },
        { label: 'Answer', render: r => <span className="line-clamp-1 text-brand-ink/60">{r.answer}</span> },
        { label: 'Active', render: r => r.is_active ? <span className="text-brand-teal text-xs font-semibold">Yes</span> : <span className="text-brand-ink/40 text-xs">No</span> },
      ]}
      fields={[
        { name: 'question', label: 'Question', required: true, span: 2 },
        { name: 'answer', label: 'Answer', type: 'textarea', span: 2, rows: 4, required: true },
        { name: 'display_order', label: 'Display Order', type: 'number' },
        { name: 'is_active', label: 'Active', type: 'checkbox', checkboxLabel: 'Show on website' },
      ]}
      defaultValues={{ is_active: true, display_order: 0 }}
      onSave={async (data, existing) => {
        if (existing) await supabase.from('faqs').update(data).eq('id', existing.id);
        else await supabase.from('faqs').insert(data);
      }}
      onDelete={async (row) => supabase.from('faqs').delete().eq('id', row.id)}
    />
  );
}