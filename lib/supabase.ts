import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export type SignupRow = {
  email: string;
  mother_tongue: string;
  target_languages: string[];
  message?: string | null;
  source?: string | null;
  user_agent?: string | null;
};

let supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (supabase) return supabase;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  supabase = createClient(url, key);
  return supabase;
}
