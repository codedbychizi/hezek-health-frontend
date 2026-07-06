import { useRef, useState } from 'react';
import { UploadCloud, X } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient.js';

/**
 * Drop-in image upload field for admin forms.
 *
 * Props:
 *   value    — current image URL (controlled)
 *   onChange — called with the new URL when upload completes or URL typed
 *   bucket   — Supabase Storage bucket name (default: 'site-images')
 *   label    — field label text
 */
export default function ImageUploadField({
  value = '',
  onChange,
  bucket = 'site-images',
  label = 'Image',
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const ALLOWED = ['image/jpeg', 'image/png', 'image/webp'];
  const MAX_MB = 5;

  async function handleFile(file) {
    if (!file) return;
    if (!ALLOWED.includes(file.type)) {
      setError('Please upload a JPG, PNG, or WEBP image.');
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`Image must be under ${MAX_MB} MB.`);
      return;
    }

    setError(null);
    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filename, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(bucket).getPublicUrl(filename);
      onChange(data.publicUrl);
    } catch (err) {
      setError('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  }

  const INPUT = 'w-full rounded-xl border border-brand-blue/20 px-3 py-2.5 text-sm focus:border-brand-teal focus:outline-none';

  return (
    <div>
      <p className="mb-1 text-xs font-medium text-brand-ink">{label}</p>

      {/* Thumbnail preview */}
      {value && (
        <div className="relative mb-2 inline-block">
          <img
            src={value}
            alt="Preview"
            className="h-24 w-40 rounded-xl object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white"
            aria-label="Remove image"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Upload button */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="mb-2 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand-blue/20 py-3 text-sm text-brand-ink/60 hover:border-brand-teal/50 hover:text-brand-teal disabled:opacity-60"
      >
        <UploadCloud className="h-4 w-4" />
        {uploading ? 'Uploading...' : value ? 'Replace image' : 'Upload image'}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {/* URL fallback */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={INPUT}
        placeholder="Or paste an image URL..."
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}