-- Hezek Health — Storage bucket policies
-- Run this in the Supabase SQL editor.
-- These are SEPARATE from table RLS policies — Supabase Storage has its
-- own policy system on the storage.objects table.

-- ── site-images bucket (country images, hospital images, founder photo) ──────

create policy "site-images: public can read"
  on storage.objects for select
  to public
  using (bucket_id = 'site-images');

create policy "site-images: admin can upload"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'site-images');

create policy "site-images: admin can update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'site-images');

create policy "site-images: admin can delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'site-images');

-- ── blog-images bucket (featured post images) ─────────────────────────────────

create policy "blog-images: public can read"
  on storage.objects for select
  to public
  using (bucket_id = 'blog-images');

create policy "blog-images: admin can upload"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'blog-images');

create policy "blog-images: admin can update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'blog-images');

create policy "blog-images: admin can delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'blog-images');

-- ── medical-request-files bucket (patient uploaded reports) ──────────────────
-- Public cannot read these — only authenticated admin can.

create policy "request-files: admin can upload"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'medical-request-files');

create policy "request-files: admin can read"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'medical-request-files');

create policy "request-files: admin can delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'medical-request-files');