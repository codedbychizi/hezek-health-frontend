import { supabase } from './supabaseClient.js';

// ─── Dashboard ────────────────────────────────────────────────────────────────

export async function getDashboardStats() {
  const [requests, messages, subscribers] = await Promise.all([
    supabase.from('medical_requests').select('id, status', { count: 'exact' }).eq('status', 'pending'),
    supabase.from('contact_messages').select('id', { count: 'exact' }).eq('is_read', false),
    supabase.from('newsletter_subscribers').select('id', { count: 'exact' }).eq('is_active', true),
  ]);
  return {
    pendingRequests: requests.count ?? 0,
    unreadMessages: messages.count ?? 0,
    subscribers: subscribers.count ?? 0,
  };
}

// ─── Medical Requests ─────────────────────────────────────────────────────────

export async function getAllRequests(status = null) {
  let q = supabase
    .from('medical_requests')
    .select('id, full_name, email, phone, medical_condition, status, created_at, countries(name), hospitals(name)')
    .order('created_at', { ascending: false });
  if (status) q = q.eq('status', status);
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

export async function getRequestById(id) {
  const { data, error } = await supabase
    .from('medical_requests')
    .select('*, countries(name), hospitals(name), medical_request_files(*)')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function updateRequestStatus(id, status, adminNotes) {
  const { error } = await supabase
    .from('medical_requests')
    .update({ status, admin_notes: adminNotes, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

export async function getAllPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, status, published_at, blog_categories(name)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getPostForEdit(id) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function upsertPost(post) {
  const payload = {
    ...post,
    updated_at: new Date().toISOString(),
    published_at: post.status === 'published' ? (post.published_at || new Date().toISOString()) : null,
  };
  const { data, error } = post.id
    ? await supabase.from('blog_posts').update(payload).eq('id', post.id).select().single()
    : await supabase.from('blog_posts').insert(payload).select().single();
  if (error) throw error;
  return data;
}

export async function deletePost(id) {
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) throw error;
}

export async function getAllCategories() {
  const { data, error } = await supabase.from('blog_categories').select('*').order('name');
  if (error) throw error;
  return data;
}

export async function upsertCategory(cat) {
  const { data, error } = cat.id
    ? await supabase.from('blog_categories').update(cat).eq('id', cat.id).select().single()
    : await supabase.from('blog_categories').insert(cat).select().single();
  if (error) throw error;
  return data;
}

export async function deleteCategory(id) {
  const { error } = await supabase.from('blog_categories').delete().eq('id', id);
  if (error) throw error;
}

// ─── Hospitals ────────────────────────────────────────────────────────────────

export async function getAllHospitalsAdmin() {
  const { data, error } = await supabase
    .from('hospitals')
    .select('*, countries(name)')
    .order('display_order');
  if (error) throw error;
  return data;
}

export async function upsertHospital(hospital) {
  const { specialtyIds, ...rest } = hospital;
  const { data, error } = rest.id
    ? await supabase.from('hospitals').update(rest).eq('id', rest.id).select().single()
    : await supabase.from('hospitals').insert(rest).select().single();
  if (error) throw error;

  if (specialtyIds) {
    await supabase.from('hospital_specialties').delete().eq('hospital_id', data.id);
    if (specialtyIds.length) {
      await supabase.from('hospital_specialties').insert(
        specialtyIds.map((sid) => ({ hospital_id: data.id, specialty_id: sid }))
      );
    }
  }
  return data;
}

export async function deleteHospital(id) {
  const { error } = await supabase.from('hospitals').delete().eq('id', id);
  if (error) throw error;
}

// ─── Countries ────────────────────────────────────────────────────────────────

export async function getAllCountriesAdmin() {
  const { data, error } = await supabase.from('countries').select('*').order('display_order');
  if (error) throw error;
  return data;
}

export async function upsertCountry(country) {
  const { data, error } = country.id
    ? await supabase.from('countries').update(country).eq('id', country.id).select().single()
    : await supabase.from('countries').insert(country).select().single();
  if (error) throw error;
  return data;
}

export async function deleteCountry(id) {
  const { error } = await supabase.from('countries').delete().eq('id', id);
  if (error) throw error;
}

// ─── Medical Specialties ──────────────────────────────────────────────────────

export async function getAllSpecialtiesAdmin() {
  const { data, error } = await supabase
    .from('medical_specialties')
    .select('*')
    .order('display_order');
  if (error) throw error;
  return data;
}

export async function upsertSpecialty(specialty) {
  const { data, error } = specialty.id
    ? await supabase.from('medical_specialties').update(specialty).eq('id', specialty.id).select().single()
    : await supabase.from('medical_specialties').insert(specialty).select().single();
  if (error) throw error;
  return data;
}

export async function deleteSpecialty(id) {
  const { error } = await supabase.from('medical_specialties').delete().eq('id', id);
  if (error) throw error;
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function getAllTestimonialsAdmin() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('display_order');
  if (error) throw error;
  return data;
}

export async function upsertTestimonial(t) {
  const { data, error } = t.id
    ? await supabase.from('testimonials').update(t).eq('id', t.id).select().single()
    : await supabase.from('testimonials').insert(t).select().single();
  if (error) throw error;
  return data;
}

export async function deleteTestimonial(id) {
  const { error } = await supabase.from('testimonials').delete().eq('id', id);
  if (error) throw error;
}

// ─── FAQs ─────────────────────────────────────────────────────────────────────

export async function getAllFAQsAdmin() {
  const { data, error } = await supabase.from('faqs').select('*').order('display_order');
  if (error) throw error;
  return data;
}

export async function upsertFAQ(faq) {
  const { data, error } = faq.id
    ? await supabase.from('faqs').update(faq).eq('id', faq.id).select().single()
    : await supabase.from('faqs').insert(faq).select().single();
  if (error) throw error;
  return data;
}

export async function deleteFAQ(id) {
  const { error } = await supabase.from('faqs').delete().eq('id', id);
  if (error) throw error;
}

// ─── Contact Messages ─────────────────────────────────────────────────────────

export async function getAllMessages() {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function markMessageRead(id) {
  const { error } = await supabase
    .from('contact_messages')
    .update({ is_read: true })
    .eq('id', id);
  if (error) throw error;
}

export async function deleteMessage(id) {
  const { error } = await supabase.from('contact_messages').delete().eq('id', id);
  if (error) throw error;
}

// ─── Newsletter ───────────────────────────────────────────────────────────────

export async function getAllSubscribers() {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .order('subscribed_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function deleteSubscriber(id) {
  const { error } = await supabase.from('newsletter_subscribers').delete().eq('id', id);
  if (error) throw error;
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export async function updateSetting(key, value) {
  const { error } = await supabase
    .from('website_settings')
    .update({ value })
    .eq('key', key);
  if (error) throw error;
}

// ─── Image upload to Supabase Storage (admin-authenticated) ──────────────────

export async function uploadImage(bucket, file) {
  const ext = file.name.split('.').pop();
  const path = Date.now() + '-' + Math.random().toString(36).slice(2) + '.' + ext;
  const { error } = await supabase.storage.from(bucket).upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}