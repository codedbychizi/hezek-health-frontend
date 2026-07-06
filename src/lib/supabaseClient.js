import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Fails loudly in dev rather than silently returning a broken client.
  console.error(
    'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY — check your .env file.'
  );
}

// Used client-side for: reading the admin's auth session, and any public
// reads that don't need the Express layer. Admin writes and anything
// touching Storage/email go through the backend instead.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);