import { supabase } from './supabaseClient.js';

/**
 * website_settings is stored as rows of (key, value) so the admin dashboard
 * can edit any single field — like swapping the founder's bio — without a
 * schema change. This flattens those rows into a plain object so components
 * can just do `settings.founder_name` instead of searching an array.
 */
export async function getPublicSettings() {
  const { data, error } = await supabase.from('website_settings').select('key, value');
  if (error) throw error;
  return data.reduce((acc, row) => {
    acc[row.key] = row.value;
    return acc;
  }, {});
}

export async function getActiveFaqs() {
  const { data, error } = await supabase
    .from('faqs')
    .select('id, question, answer')
    .eq('is_active', true)
    .order('display_order');
  if (error) throw error;
  return data;
}

export async function getActiveSpecialties() {
  const { data, error } = await supabase
    .from('medical_specialties')
    .select('id, name, slug, description')
    .eq('is_active', true)
    .order('display_order');
  if (error) throw error;
  return data;
}

export async function getActiveCountries() {
  const { data, error } = await supabase
    .from('countries')
    .select('id, name, slug, image_url, description')
    .eq('is_active', true)
    .order('display_order');
  if (error) throw error;
  return data;
}

export async function getCountryBySlug(slug) {
  const { data, error } = await supabase
    .from('countries')
    .select('id, name, slug, image_url, description')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle(); // returns null instead of throwing when no row matches
  if (error) throw error;
  return data;
}

export async function getHospitalsByCountryId(countryId) {
  const { data, error } = await supabase
    .from('hospitals')
    .select('id, name, image_url, short_summary')
    .eq('country_id', countryId)
    .eq('is_active', true)
    .order('display_order');
  if (error) throw error;
  return data;
}

export async function getActiveHospitalsFull() {
  // Follows the hospitals -> hospital_specialties -> medical_specialties
  // chain in one query rather than fetching hospitals, then specialties,
  // then matching them up by hand in JavaScript.
  const { data, error } = await supabase
    .from('hospitals')
    .select(
      'id, name, image_url, short_summary, description, countries(name, slug), hospital_specialties(medical_specialties(name))'
    )
    .eq('is_active', true)
    .order('display_order');
  if (error) throw error;
  return data;
}

export async function getHospitalById(id) {
  const { data, error } = await supabase
    .from('hospitals')
    .select(
      'id, name, image_url, short_summary, description, countries(name, slug), hospital_specialties(medical_specialties(name))'
    )
    .eq('id', id)
    .eq('is_active', true)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getActiveHospitals(limit = 6) {
  // The nested `countries(name)` works because hospitals.country_id is a
  // foreign key to countries.id — Supabase follows that relationship for
  // you instead of needing a second query and a manual join in JS.
  const { data, error } = await supabase
    .from('hospitals')
    .select('id, name, image_url, short_summary, countries(name)')
    .eq('is_active', true)
    .order('display_order')
    .limit(limit);
  if (error) throw error;
  return data;
}

export async function getActiveTestimonials() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('id, patient_name, country, content, rating')
    .eq('is_active', true)
    .order('display_order');
  if (error) throw error;
  return data;
}

export async function getPublishedPosts(limit = 3) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image_url, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
}

export async function getBlogCategories() {
  const { data, error } = await supabase
    .from('blog_categories')
    .select('id, name, slug');
  if (error) throw error;
  return data;
}

/**
 * Paginated post list with optional category filter and search.
 * Returns both the page's posts AND the total count so the UI can
 * show "Page 2 of 5" and disable the Next button on the last page.
 */
export async function getPaginatedPosts({ page = 1, pageSize = 6, categoryId = null, search = '' } = {}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image_url, published_at, blog_categories(name, slug)', { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(from, to);

  if (categoryId) query = query.eq('category_id', categoryId);
  if (search.trim()) query = query.ilike('title', '%' + search.trim() + '%');

  const { data, error, count } = await query;
  if (error) throw error;
  return { posts: data, total: count };
}

export async function getPostBySlug(slug) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, content, featured_image_url, published_at, author_name, meta_title, meta_description, blog_categories(name, slug)')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getRelatedPosts(categoryId, excludeSlug, limit = 3) {
  // Finds posts in the same category, excluding the current one.
  // Falls back to the most recent posts if there are no category matches.
  if (!categoryId) return getPublishedPosts(limit);

  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image_url, published_at')
    .eq('status', 'published')
    .eq('category_id', categoryId)
    .neq('slug', excludeSlug)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data?.length ? data : getPublishedPosts(limit);
}