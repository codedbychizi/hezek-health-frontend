import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabaseClient.js';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import Skeleton from '../../components/common/Skeleton.jsx';

// ─── Queries local to this page ───────────────────────────────────────────────

async function getAllPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, status, published_at, blog_categories(name)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

async function getAllCats() {
  const { data, error } = await supabase
    .from('blog_categories')
    .select('*')
    .order('name');
  if (error) throw error;
  return data;
}

function slugify(str) {
  return str.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

// ─── Category manager sub-panel ───────────────────────────────────────────────

function CategoryManager() {
  const { data: cats, loading, refresh } = useSupabaseQuery(getAllCats);
  const [editing, setEditing] = useState(null); // null = add mode, object = edit mode
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  function startEdit(cat) {
    setEditing(cat);
    setValue('name', cat.name);
    setValue('slug', cat.slug);
    setOpen(true);
  }

  function startAdd() {
    setEditing(null);
    reset();
    setOpen(true);
  }

  async function onSubmit(data) {
    setSaving(true);
    if (editing) {
      await supabase.from('blog_categories').update(data).eq('id', editing.id);
    } else {
      await supabase.from('blog_categories').insert(data);
    }
    setSaving(false);
    reset();
    setEditing(null);
    refresh?.();
  }

  async function deleteCat(id) {
    if (!window.confirm('Delete this category? Posts in it will become uncategorised.')) return;
    await supabase.from('blog_categories').delete().eq('id', id);
    refresh?.();
  }

  const INPUT = 'w-full rounded-xl border border-brand-blue/20 px-3 py-2 text-sm focus:border-brand-teal focus:outline-none';

  return (
    <div className="mt-10 rounded-card bg-white shadow-card">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between p-5 text-left"
      >
        <h2 className="font-display text-base font-bold text-brand-blue">
          Manage Categories
        </h2>
        {open ? <ChevronUp className="h-4 w-4 text-brand-ink/40" /> : <ChevronDown className="h-4 w-4 text-brand-ink/40" />}
      </button>

      {open && (
        <div className="border-t border-brand-blue/10 p-5">
          {/* Category list */}
          {loading ? (
            <Skeleton className="h-24" />
          ) : cats?.length ? (
            <ul className="mb-5 space-y-2">
              {cats.map(cat => (
                <li key={cat.id} className="flex items-center justify-between rounded-xl bg-brand-mist px-4 py-2.5 text-sm">
                  <div>
                    <span className="font-medium text-brand-ink">{cat.name}</span>
                    <span className="ml-2 text-xs text-brand-ink/40">/{cat.slug}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(cat)}
                      className="rounded-full border border-brand-blue/20 p-1.5 text-brand-blue hover:bg-white"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => deleteCat(cat.id)}
                      className="rounded-full border border-red-100 p-1.5 text-red-400 hover:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mb-5 text-sm text-brand-ink/50">No categories yet.</p>
          )}

          {/* Add / edit form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-ink/50">
              {editing ? `Editing: ${editing.name}` : 'Add new category'}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <input
                  {...register('name', { required: true })}
                  className={INPUT}
                  placeholder="Category name"
                  onChange={(e) => {
                    // Auto-generate slug when adding, not when editing
                    if (!editing) setValue('slug', slugify(e.target.value));
                  }}
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">Name is required.</p>}
              </div>
              <div>
                <input
                  {...register('slug', { required: true })}
                  className={INPUT}
                  placeholder="category-slug"
                />
                {errors.slug && <p className="mt-1 text-xs text-red-500">Slug is required.</p>}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-brand-blue px-4 py-2 text-xs font-semibold text-white hover:bg-brand-blue-dark disabled:opacity-60"
              >
                {saving ? 'Saving...' : editing ? 'Update' : 'Add Category'}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={() => { setEditing(null); reset(); }}
                  className="rounded-full border border-brand-blue/20 px-4 py-2 text-xs font-semibold text-brand-ink/60 hover:bg-brand-mist"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// ─── Main blog manager ────────────────────────────────────────────────────────

export default function AdminBlog() {
  const { data: posts, loading, refresh } = useSupabaseQuery(getAllPosts);
  const [deleting, setDeleting] = useState(null);

  async function deletePost(id) {
    if (!window.confirm('Delete this post permanently?')) return;
    setDeleting(id);
    await supabase.from('blog_posts').delete().eq('id', id);
    setDeleting(null);
    refresh?.();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-brand-blue">Blog Posts</h1>
        <Link
          to="/admin/blog/new"
          className="flex items-center gap-2 rounded-full bg-brand-teal px-4 py-2 text-sm font-semibold text-white hover:bg-brand-teal-dark"
        >
          <Plus className="h-4 w-4" /> New Post
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-card bg-white shadow-card">
        {loading ? (
          <div className="space-y-3 p-6">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-12" />)}
          </div>
        ) : !posts?.length ? (
          <p className="p-8 text-center text-sm text-brand-ink/50">
            No posts yet. Write your first one!
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-brand-blue/10 bg-brand-mist/50">
              <tr>
                {['Title', 'Category', 'Status', 'Published', ''].map(h => (
                  <th key={h} className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-brand-ink/50 ${['Category', 'Published'].includes(h) ? 'hidden sm:table-cell' : ''}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-blue/5">
              {posts.map(post => (
                <tr key={post.id} className="hover:bg-brand-mist/30">
                  <td className="px-4 py-3 font-medium text-brand-ink">{post.title}</td>
                  <td className="hidden px-4 py-3 text-brand-ink/60 sm:table-cell">
                    {post.blog_categories?.name || '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={'rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ' +
                      (post.status === 'published'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-yellow-50 text-yellow-700')}>
                      {post.status}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 text-brand-ink/50 sm:table-cell">
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString('en-GB')
                      : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        to={'/admin/blog/' + post.id + '/edit'}
                        className="rounded-full border border-brand-blue/20 p-1.5 text-brand-blue hover:bg-brand-mist"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        onClick={() => deletePost(post.id)}
                        disabled={deleting === post.id}
                        className="rounded-full border border-red-100 p-1.5 text-red-400 hover:bg-red-50"
                      >
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

      {/* Category manager — collapsed by default, expand when needed */}
      <CategoryManager />
    </div>
  );
}