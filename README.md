# Hezek Health — Frontend (Phase 1: Foundation)

This is the project scaffold: Vite + React, Tailwind with the real brand tokens,
the base layout (header/footer/WhatsApp button), and every route wired up to a
placeholder page so navigation works end-to-end before content is built.

## What's in this phase

- Vite + React + Tailwind, configured with brand colors (`#16538C` / `#00DC92`)
- Header with desktop + mobile nav, matching the full route map
- Footer with sitemap links, contact details, brand wave accent
- Floating WhatsApp button (uses the number you provided)
- Full routing skeleton — every page from the spec has a live route
- Supabase client + Express API client set up, ready for Phase 3 onward
- Admin route guard (`ProtectedRoute`) — wired but not yet enforced with real auth (Phase 6)
- Database migration (`supabase/migrations/001_init_schema.sql`) with all tables,
  seeded with your launch countries (India, Turkey) and the 14 treatment specialties

## Getting started

```bash
npm install
cp .env.example .env   # fill in your real Supabase URL/key once you have a project
npm run dev
```

Visit `http://localhost:5173` — every nav link and route should load (showing
a "Coming soon" placeholder until its phase is built).

## Setting up Supabase

1. Create a project at supabase.com
2. Open the SQL editor, paste in `supabase/migrations/001_init_schema.sql`, run it
3. Copy your Project URL and anon key into `.env`

## About the logo

The mark in `src/components/common/Logo.jsx` is a hand-drawn approximation of
your brand mark (built from the PDF, using your exact brand colors) since no
vector source file exists yet. It's a placeholder, not a trace — swap in the
real exported SVG from Geotech Media whenever you have it, and nothing else
in the app needs to change.

## About the typeface

Glonto (your brand font) isn't on Google Fonts, so the site currently falls
back to Poppins, which has a similar rounded-geometric shape. To use the real
font: drop the `.woff2` file into `public/fonts/`, then uncomment the
`@font-face` block at the top of `src/index.css`.

## Next up — Phase 2

Static content pages: Home, About, Services, Specialties, How It Works, FAQ,
Privacy, Terms.