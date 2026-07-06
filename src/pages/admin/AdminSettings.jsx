import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabaseClient.js';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import { getPublicSettings } from '../../lib/queries.js';
import ImageUploadField from '../../components/admin/ImageUploadField.jsx';
import Skeleton from '../../components/common/Skeleton.jsx';

// Text/textarea fields — founder_image_url is handled separately with upload
const TEXT_FIELDS = [
  { key: 'company_email', label: 'Company Email' },
  { key: 'company_phone', label: 'Company Phone' },
  { key: 'company_whatsapp', label: 'WhatsApp Number (digits only, no +)' },
  { key: 'instagram_url', label: 'Instagram URL' },
  { key: 'founder_name', label: 'Founder Name' },
  { key: 'founder_bio', label: 'Founder Bio', type: 'textarea' },
];

export default function AdminSettings() {
  const { data: settings, loading } = useSupabaseQuery(getPublicSettings);
  const { register, reset, handleSubmit } = useForm();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [founderImage, setFounderImage] = useState('');

  useEffect(() => {
    if (settings) {
      reset(settings);
      setFounderImage(settings.founder_image_url || '');
    }
  }, [settings, reset]);

  async function onSubmit(data) {
    setSaving(true);
    const rows = [
      ...Object.entries(data).map(([key, value]) => ({ key, value: value || '' })),
      { key: 'founder_image_url', value: founderImage || '' },
    ];
    await supabase.from('website_settings').upsert(rows, { onConflict: 'key' });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const INPUT = 'w-full rounded-xl border border-brand-blue/20 px-4 py-2.5 text-sm focus:border-brand-teal focus:outline-none';

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-brand-blue">Website Settings</h1>
      <p className="mt-1 text-sm text-brand-ink/60">
        These values appear across the site and in emails.
      </p>

      <div className="mt-6 max-w-2xl rounded-card bg-white p-8 shadow-card">
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12" />)}
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {TEXT_FIELDS.map(field => (
              <div key={field.key}>
                <label className="mb-1 block text-sm font-medium text-brand-ink">
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea {...register(field.key)} rows={4} className={INPUT} />
                ) : (
                  <input {...register(field.key)} className={INPUT} />
                )}
              </div>
            ))}

            {/* Founder photo — uses upload button instead of plain URL field */}
            <ImageUploadField
              bucket="site-images"
              label="Founder Photo"
              value={founderImage}
              onChange={setFounderImage}
            />

            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-blue-dark disabled:opacity-60"
              >
                {saving ? 'Saving…' : 'Save Settings'}
              </button>
              {saved && (
                <span className="text-sm font-medium text-brand-teal">Saved!</span>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}