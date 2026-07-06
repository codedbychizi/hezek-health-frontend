-- Hezek Health — initial schema
-- Run this in the Supabase SQL editor (or via the CLI) on a fresh project.

create extension if not exists "pgcrypto";

-- COUNTRIES
create table countries (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  slug          text unique not null,
  image_url     text,
  description   text,
  display_order int default 0,
  is_active     boolean default true,
  created_at    timestamptz default now()
);

-- MEDICAL SPECIALTIES
create table medical_specialties (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  slug          text unique not null,
  icon          text,
  description   text,
  display_order int default 0,
  is_active     boolean default true,
  created_at    timestamptz default now()
);

-- HOSPITALS
create table hospitals (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  country_id    uuid references countries(id) on delete restrict,
  image_url     text,
  description   text,
  short_summary text,
  display_order int default 0,
  is_active     boolean default true,
  created_at    timestamptz default now()
);

create table hospital_specialties (
  hospital_id   uuid references hospitals(id) on delete cascade,
  specialty_id  uuid references medical_specialties(id) on delete cascade,
  primary key (hospital_id, specialty_id)
);

-- MEDICAL REQUESTS
create type request_status as enum ('pending', 'reviewing', 'contacted', 'booked', 'closed');

create table medical_requests (
  id                uuid primary key default gen_random_uuid(),
  full_name         text not null,
  email             text not null,
  phone             text not null,
  country_id        uuid references countries(id),
  hospital_id       uuid references hospitals(id),
  medical_condition text not null,
  additional_notes  text,
  consent_given     boolean not null default false,
  status            request_status default 'pending',
  admin_notes       text,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

create index idx_medical_requests_status on medical_requests(status);

create table medical_request_files (
  id            uuid primary key default gen_random_uuid(),
  request_id    uuid references medical_requests(id) on delete cascade,
  file_url      text not null,
  file_name     text not null,
  file_type     text,
  uploaded_at   timestamptz default now()
);

-- BLOG
create table blog_categories (
  id    uuid primary key default gen_random_uuid(),
  name  text not null,
  slug  text unique not null
);

create type post_status as enum ('draft', 'published');

create table blog_posts (
  id                  uuid primary key default gen_random_uuid(),
  title               text not null,
  slug                text unique not null,
  excerpt             text,
  content             text not null,
  featured_image_url  text,
  category_id         uuid references blog_categories(id),
  author_name         text default 'Hezek Health Team',
  status              post_status default 'draft',
  meta_title          text,
  meta_description    text,
  published_at        timestamptz,
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

create index idx_blog_posts_status_published on blog_posts(status, published_at);

-- TESTIMONIALS — defaults to inactive so the homepage section stays hidden
-- until rows are explicitly switched on from the admin dashboard.
create table testimonials (
  id            uuid primary key default gen_random_uuid(),
  patient_name  text not null,
  country       text,
  content       text not null,
  rating        smallint check (rating between 1 and 5),
  image_url     text,
  is_active     boolean default false,
  display_order int default 0,
  created_at    timestamptz default now()
);

-- FAQ
create table faqs (
  id            uuid primary key default gen_random_uuid(),
  question      text not null,
  answer        text not null,
  display_order int default 0,
  is_active     boolean default true
);

-- CONTACT MESSAGES
create table contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  subject     text,
  message     text not null,
  is_read     boolean default false,
  created_at  timestamptz default now()
);

-- NEWSLETTER
create table newsletter_subscribers (
  id              uuid primary key default gen_random_uuid(),
  email           text unique not null,
  is_active       boolean default true,
  subscribed_at   timestamptz default now()
);

-- WEBSITE SETTINGS (key-value, admin-editable)
create table website_settings (
  key     text primary key,
  value   text
);

insert into website_settings (key, value) values
  ('company_email', 'hello@hezekhealth.com'),
  ('company_phone', '+2347046502462'),
  ('company_whatsapp', '2347046502462'),
  ('instagram_url', 'https://instagram.com/hezekhealth'),
  ('founder_name', 'Winifred Akpobi'),
  ('founder_bio', ''),
  ('founder_image_url', '');

-- SEED DATA — launch countries only (India & Turkey)
insert into countries (name, slug, description, display_order) values
  ('India', 'india', 'A leading destination for advanced, affordable treatment across cardiology, oncology, transplants, and more.', 1),
  ('Turkey', 'turkey', 'Internationally accredited hospitals offering a wide range of specialist treatments.', 2);

-- SEED DATA — medical specialties (from the treatment list provided)
insert into medical_specialties (name, slug, display_order) values
  ('Kidney Transplantation', 'kidney-transplantation', 1),
  ('Liver Transplantation', 'liver-transplantation', 2),
  ('Bone Marrow Transplantation', 'bone-marrow-transplantation', 3),
  ('CABG', 'cabg', 4),
  ('PCI / PTCA with Stenting', 'pci-ptca-stenting', 5),
  ('Valve Repair and Replacement', 'valve-repair-replacement', 6),
  ('Heart Transplantation', 'heart-transplantation', 7),
  ('Cancer Treatment Packages', 'cancer-treatment', 8),
  ('IVF & Fertility Treatment', 'ivf-fertility', 9),
  ('Neurosurgery', 'neurosurgery', 10),
  ('Joint Replacement Surgery', 'joint-replacement', 11),
  ('Spine Surgery', 'spine-surgery', 12),
  ('Robotic Surgery Programs', 'robotic-surgery', 13),
  ('Executive Health Screening', 'executive-health-screening', 14);