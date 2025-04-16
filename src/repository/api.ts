import axios from 'axios';
import { getSupabaseClient } from '@/lib/supabase';

const api = axios.create({
  baseURL: '',
  headers: {
    'X-API-Key': '',
    'Content-Type': 'application/json',
  },
});

// Dynamische Konfiguration setzen
export function updateApiConfig(url: string, key: string) {
  api.defaults.baseURL = url;
  api.defaults.headers['X-API-Key'] = key;

  // Optional: lokal speichern
  localStorage.setItem('api_url', url);
  localStorage.setItem('api_key', key);
}

// Automatisch aus Supabase laden
export async function loadApiConfigFromSupabase(): Promise<boolean> {
  try {
    const supabase = getSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.warn('🔑 Kein User gefunden – kann API-Konfiguration nicht laden.');
      return false;
    }

    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error || !data?.api_url || !data?.api_key) {
      console.warn('⚠️ API-Konfiguration fehlt in Supabase oder konnte nicht geladen werden.');
      return false;
    }

    updateApiConfig(data.api_url, data.api_key);
    console.info('✅ API-Konfiguration erfolgreich geladen.');
    return true;

  } catch (e) {
    console.error('❌ Fehler beim Laden der API-Konfiguration aus Supabase:', e);
    return false;
  }
}
export { api };