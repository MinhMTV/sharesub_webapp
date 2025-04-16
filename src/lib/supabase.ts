import { createClient, SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!client) {
    const url = localStorage.getItem('supabase_url');
    const key = localStorage.getItem('supabase_key');
    if (!url || !key) {
      throw new Error('Supabase-URL oder Key fehlt');
    }
    client = createClient(url, key);
  }
  return client;
}