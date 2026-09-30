/**
 * ==============================================================================
 * POLARSPHERE SUPABASE CLIENT
 * "The Polar World, Through India's Eyes"
 * ==============================================================================
 * Safe initialization of Supabase client with graceful degradation.
 * Never throws on missing environment variables.
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = typeof import.meta !== 'undefined' && import.meta.env 
  ? import.meta.env.VITE_SUPABASE_URL 
  : (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_URL : undefined);

const supabaseAnonKey = typeof import.meta !== 'undefined' && import.meta.env 
  ? import.meta.env.VITE_SUPABASE_ANON_KEY 
  : (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_ANON_KEY : undefined);

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-id') &&
  !supabaseAnonKey.includes('your-anon-key')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    })
  : null;

if (isSupabaseConfigured) {
  console.info('[PolarSphere DB] Connected to live Supabase PostgreSQL instance:', supabaseUrl);
} else {
  console.info('[PolarSphere DB] Supabase credentials not set or placeholder. Operating in local relational development mode.');
}
