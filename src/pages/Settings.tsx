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
  <div className="min-h-screen w-screen flex items-center justify-center bg-gray-50 p-4">
    <div className="w-full max-w-md space-y-6 bg-white p-6 rounded-lg shadow-md">
      {/* Zurück-Button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Zurück
      </button>

      <h2 className="text-lg font-bold text-center">🔧 Einstellungen</h2>

      <div className="flex flex-col items-center gap-4">
        <input
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
          placeholder="FastAPI URL"
          className="w-[320px] border border-gray-300 rounded p-2"
        />
        <input
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="API Key"
          className="w-[320px] border border-gray-300 rounded p-2"
        />

        <button
          onClick={save}
          className="w-[320px] bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
        >
          Speichern
        </button>

        <hr className="w-[320px] border-gray-200" />

        <button
          onClick={logout}
          className="w-[320px] bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
        >
          Abmelden
        </button>
      </div>
    </div>
  </div>
);}