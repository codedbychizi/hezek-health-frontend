-- Hezek Health — Row Level Security policies
-- Run this AFTER 001_init_schema.sql.
--
-- Strategy: enable RLS everywhere (deny-by-default), then add narrow SELECT
-- policies only for the tables/rows that should be publicly readable.
-- Nothing here grants INSERT/UPDATE/DELETE to the public — those happen
-- later via the Express backend's service-role key, which bypasses RLS
-- entirely by design and is never exposed to the browser.

-- Public, read-only content
alter table countries enable row level security;
create policy "Public can read active countries"
  on countries for select
  using (is_active = true);

alter table medical_specialties enable row level security;
create policy "Public can read active specialties"
  on medical_specialties for select
  using (is_active = true);

alter table hospitals enable row level security;
create policy "Public can read active hospitals"
  on hospitals for select
  using (is_active = true);

alter table hospital_specialties enable row level security;
create policy "Public can read hospital-specialty links"
  on hospital_specialties for select
  using (true);

alter table blog_categories enable row level security;
create policy "Public can read blog categories"
  on blog_categories for select
  using (true);

alter table blog_posts enable row level security;
create policy "Public can read published posts"
  on blog_posts for select
  using (status = 'published');

alter table testimonials enable row level security;
create policy "Public can read active testimonials"
  on testimonials for select
  using (is_active = true);

alter table faqs enable row level security;
create policy "Public can read active faqs"
  on faqs for select
  using (is_active = true);

alter table website_settings enable row level security;
create policy "Public can read settings"
  on website_settings for select
  using (true);

-- Sensitive tables — RLS on, deliberately NO public policy.
-- The anon key gets zero access; only the service-role key (Express) can
-- read or write these, regardless of policy, since service-role bypasses
-- RLS entirely.
alter table medical_requests enable row level security;
alter table medical_request_files enable row level security;
alter table contact_messages enable row level security;
alter table newsletter_subscribers enable row level security;