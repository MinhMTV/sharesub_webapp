import { useEffect, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase';

export function useApiSettings() {
  const [apiUrl, setApiUrl] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const supabase = getSupabaseClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('settings')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setApiUrl(data.api_url);
        setApiKey(data.api_key);
      }

      setLoading(false);
    };

    load();
  }, []);

  return { apiUrl, apiKey, loading };
}