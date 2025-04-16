import { getSupabaseClient } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export function Auth() {
  const [url, setUrl] = useState('');
  const [key, setKey] = useState('');
  const [connected, setConnected] = useState(false);

  // Nur beim ersten Mount: Daten aus localStorage laden
  useEffect(() => {
    const savedUrl = localStorage.getItem('supabase_url');
    const savedKey = localStorage.getItem('supabase_key');
    if (savedUrl && savedKey) {
      setUrl(savedUrl);
      setKey(savedKey);
      setConnected(true); // Nur setzen, wenn nach Reload alles da ist
    }
  }, []);

  const handleInit = () => {
    localStorage.setItem('supabase_url', url);
    localStorage.setItem('supabase_key', key);
    window.location.reload(); // sicheres Neu-Initialisieren
  };

  const signInWithGoogle = async () => {
    const supabase = getSupabaseClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: "http://app.thatsmyname.de",
      },
    });
    if (error) alert('Fehler beim Login: ' + error.message);
  };

  if (!connected) {
    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
          <div className="p-6 space-y-4 bg-white shadow-lg rounded-xl w-full max-w-sm text-center">
            <h2 className="text-xl font-bold">🔌 Supabase Zugang</h2>
            <input
                name="username"
                autoComplete="username"
                placeholder="Supabase URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full border p-2"
            />
            <input
                name="password"
                autoComplete="current-password"
                placeholder="Supabase Anon Key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full border p-2"
            />
            <button onClick={handleInit} className="w-full bg-green-600 text-white p-2 rounded">
              Verbinden
            </button>
          </div>
        </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
      <div className="p-6 space-y-4 bg-white shadow-lg rounded-xl w-full max-w-sm text-center">
        <h2 className="text-xl font-bold">🔐 Google Login</h2>
        <button
          onClick={signInWithGoogle}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Mit Google anmelden
        </button>
      </div>
    </div>
  );
}