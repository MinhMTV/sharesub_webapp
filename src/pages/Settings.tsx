import { useEffect, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { updateApiConfig } from '@/repository/api.ts';
import { ArrowLeft } from 'lucide-react';

export default function SettingsPage() {
  const supabase = getSupabaseClient();
  const navigate = useNavigate();

  const [apiUrl, setApiUrl] = useState('');
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
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
    };

    fetchSettings();
  }, []);

  const isValidUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const save = async () => {
    if (!isValidUrl(apiUrl)) {
      alert('❌ Bitte eine gültige URL eingeben (inkl. http:// oder https://)');
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('settings')
      .upsert({
        user_id: user.id,
        api_url: apiUrl,
        api_key: apiKey,
      });

    if (error) {
      alert('❌ Fehler beim Speichern');
    } else {
      updateApiConfig(apiUrl, apiKey);
      alert('✅ Einstellungen gespeichert');
      navigate('/');
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('supabase_url');
    localStorage.removeItem('supabase_key');
    window.location.href = '/';
  };

  return (
    <div className="p-4 space-y-4">
      {/* Zurück-Button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition mb-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Zurück
      </button>

      <h2 className="text-lg font-bold">🔧 Einstellungen</h2>

      <input
        value={apiUrl}
        onChange={(e) => setApiUrl(e.target.value)}
        placeholder="FastAPI URL"
        className="w-full border p-2"
      />
      <input
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="API Key"
        className="w-full border p-2"
      />

      <button onClick={save} className="bg-green-500 text-white p-2 rounded">
        Speichern
      </button>

      <hr className="my-4" />

      <button onClick={logout} className="bg-red-500 text-white p-2 rounded">
        Abmelden
      </button>
    </div>
  );
}