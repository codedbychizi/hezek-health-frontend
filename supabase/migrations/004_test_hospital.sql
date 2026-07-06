-- Adds one test hospital in India so you can see /hospitals, /hospitals/:id,
-- and /countries/india actually populated. Safe to delete or edit later
-- once you have your real hospital partner list — this is just for testing.

with new_hospital as (
  insert into hospitals (name, country_id, short_summary, description, is_active, display_order)
  select
    'Apollo Test Hospital',
    countries.id,
    'A leading multi-specialty hospital with internationally accredited care.',
    'Apollo Test Hospital is a placeholder entry used to verify the Hospitals pages while real partner data is being finalized. Replace this with an actual partner hospital once available.',
    true,
    1
  from countries
  where countries.slug = 'india'
  returning id
)
insert into hospital_specialties (hospital_id, specialty_id)
select new_hospital.id, medical_specialties.id
from new_hospital, medical_specialties
where medical_specialties.slug in ('cabg', 'joint-replacement');