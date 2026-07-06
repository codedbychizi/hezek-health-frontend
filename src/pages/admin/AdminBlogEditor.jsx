import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UploadCloud } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { supabase } from '../../lib/supabaseClient.js';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import { getBlogCategories } from '../../lib/queries.js';
import Skeleton from '../../components/common/Skeleton.jsx';

function slugify(str) {
  return str.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function AdminBlogEditor() {
  const { id } = useParams();  // undefined on /admin/blog/new
  const navigate = useNavigate();
  const isNew = !id || id === 'new';

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const imageInputRef = useRef(null);

  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
    defaultValues: { status: 'draft', author_name: 'Hezek Health Team' },
  });

  // Watches the featured_image_url so we can show a preview thumbnail
  const featuredImageUrl = watch('featured_image_url', '');

  async function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!ALLOWED.includes(file.type)) {
      alert('Please upload a JPG, PNG, WEBP, or GIF image.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be under 5 MB.');
      return;
    }

    setUploading(true);
    try {
      // Generate a unique filename so two uploads of "photo.jpg" don't
      // overwrite each other in the bucket.
      const ext = file.name.split('.').pop();
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filename, file);

      if (uploadError) throw uploadError;

      // getPublicUrl is synchronous — no await needed.
      const { data } = supabase.storage.from('blog-images').getPublicUrl(filename);
      setValue('featured_image_url', data.publicUrl);
    } catch (err) {
      alert('Image upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  }

  const { data: categories } = useSupabaseQuery(getBlogCategories);

  const content = watch('content', '');
  const title = watch('title', '');

  // Auto-generate slug from title, but only for new posts
  useEffect(() => {
    if (isNew && title) setValue('slug', slugify(title));
  }, [title, isNew, setValue]);

  // Load existing post for editing
  useEffect(() => {
    if (!isNew) {
      supabase.from('blog_posts').select('*').eq('id', id).maybeSingle().then(({ data }) => {
        if (data) reset(data);
      });
    }
  }, [id, isNew, reset]);

  async function onSubmit(data) {
    setSaving(true);
    setError(null);

    // Supabase UUID columns reject empty strings — they must be null.
    // This converts any empty-string UUID field to null before the insert/update.
    const nullifyEmptyUUIDs = (obj) =>
      Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [k, v === '' ? null : v])
      );

    const payload = {
      ...nullifyEmptyUUIDs(data),
      published_at: data.status === 'published'
        ? (data.published_at || new Date().toISOString())
        : null,
      updated_at: new Date().toISOString(),
    };

    const { error: dbError } = isNew
      ? await supabase.from('blog_posts').insert(payload)
      : await supabase.from('blog_posts').update(payload).eq('id', id);

    if (dbError) {
      setError(dbError.message);
      setSaving(false);
    } else {
      navigate('/admin/blog');
    }
  }

  const INPUT = 'w-full rounded-xl border border-brand-blue/20 px-4 py-2.5 text-sm focus:border-brand-teal focus:outline-none';

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-brand-blue">
          {isNew ? 'New Blog Post' : 'Edit Post'}
        </h1>
        <button
          type="button"
          onClick={() => navigate('/admin/blog')}
          className="text-sm text-brand-ink/60 hover:text-brand-ink"
        >
          ← Back to posts
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">

          {/* Main content */}
          <div className="space-y-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-brand-ink">Title *</label>
              <input {...register('title', { required: true })} className={INPUT} placeholder="Post title..." />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-brand-ink">Slug *</label>
              <input {...register('slug', { required: true })} className={INPUT} placeholder="post-url-slug" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-brand-ink">Excerpt</label>
              <textarea {...register('excerpt')} rows={2} className={INPUT} placeholder="Short description for the post card..." />
            </div>

            {/* Editor / Preview toggle */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-brand-ink">Content (Markdown) *</label>
                <button
                  type="button"
                  onClick={() => setPreview(p => !p)}
                  className="rounded-full border border-brand-blue/20 px-3 py-1 text-xs font-semibold text-brand-blue hover:bg-brand-mist"
                >
                  {preview ? 'Edit' : 'Preview'}
                </button>
              </div>

              {preview ? (
                <div className="prose-custom min-h-[300px] rounded-xl border border-brand-blue/20 bg-white p-4">
                  <ReactMarkdown>{content || '*Nothing to preview yet.*'}</ReactMarkdown>
                </div>
              ) : (
                <textarea
                  {...register('content', { required: true })}
                  rows={16}
                  className={INPUT + ' font-mono text-xs leading-relaxed'}
                  placeholder="Write your post in Markdown..."
                />
              )}
            </div>
          </div>

          {/* Sidebar settings */}
          <div className="space-y-5">
            <div className="rounded-card bg-white p-5 shadow-card">
              <h3 className="mb-4 font-display text-sm font-bold text-brand-blue">Publish</h3>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-brand-ink">Status</label>
                  <select {...register('status')} className={INPUT}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-brand-ink">Category</label>
                  <select {...register('category_id')} className={INPUT}>
                    <option value="">No category</option>
                    {categories?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-brand-ink">Author Name</label>
                  <input {...register('author_name')} className={INPUT} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-brand-ink">
                    Featured Image
                  </label>

                  {/* Upload button */}
                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    disabled={uploading}
                    className="mb-2 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand-blue/20 py-3 text-sm text-brand-ink/60 hover:border-brand-teal/50 hover:text-brand-teal disabled:opacity-60"
                  >
                    <UploadCloud className="h-4 w-4" />
                    {uploading ? 'Uploading...' : 'Upload image'}
                  </button>

                  {/* Hidden file input */}
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="sr-only"
                    onChange={handleImageUpload}
                  />

                  {/* Manual URL fallback — useful if the image is already
                      hosted somewhere (e.g. a Unsplash link) */}
                  <input
                    {...register('featured_image_url')}
                    className={INPUT}
                    placeholder="Or paste an image URL..."
                  />

                  {/* Live thumbnail preview */}
                  {featuredImageUrl && (
                    <img
                      src={featuredImageUrl}
                      alt="Featured image preview"
                      className="mt-2 w-full rounded-xl object-cover"
                      style={{ maxHeight: '120px' }}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-card bg-white p-5 shadow-card">
              <h3 className="mb-4 font-display text-sm font-bold text-brand-blue">SEO</h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-brand-ink">Meta Title</label>
                  <input {...register('meta_title')} className={INPUT} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-brand-ink">Meta Description</label>
                  <textarea {...register('meta_description')} rows={3} className={INPUT} />
                </div>
              </div>
            </div>

            {error && <div className="rounded-xl bg-red-50 p-3 text-xs text-red-600">{error}</div>}

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-full bg-brand-blue py-3 text-sm font-semibold text-white hover:bg-brand-blue-dark disabled:opacity-60"
            >
              {saving ? 'Saving...' : (isNew ? 'Create Post' : 'Save Changes')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}