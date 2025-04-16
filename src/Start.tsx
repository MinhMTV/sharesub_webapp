import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Auth } from './components/Auth';
import App from './App';
import SettingsPage from './pages/Settings';
import { getSupabaseClient } from '@/lib/supabase';

export function Start() {
  const [supabaseReady, setSupabaseReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  // Nur ausführen, wenn Supabase-Zugang vorhanden ist
  useEffect(() => {
    const url = localStorage.getItem('supabase_url');
    const key = localStorage.getItem('supabase_key');
    if (!url || !key) {
      setSupabaseReady(false);
      setLoading(false);
      return;
    }

    setSupabaseReady(true);
    const supabase = getSupabaseClient();

    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setAuthenticated(!!user);
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div className="p-4">🔄 Lade...</div>;

  return (
    <Routes>
      {!supabaseReady ? (
        <Route path="*" element={<Auth />} />
      ) : authenticated ? (
        <Route path="*" element={<App />} />
      ) : (
        <Route path="*" element={<Auth />} />
      )}
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}