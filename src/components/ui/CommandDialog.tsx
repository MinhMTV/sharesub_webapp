import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog.tsx';
import { toast } from 'sonner';
import { api } from '@/repository/api.ts';
import { useState } from 'react';
import { LogViewerDialog } from '@/components/ui/LogViewDialog.tsx';
import { LastReplyDialog } from '@/components/ui/LastReplyDialog.tsx';

export function CommandDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [logDialogOpen, setLogDialogOpen] = useState(false);
  const [logDialogTitle, setLogDialogTitle] = useState('');
  const [logDialogContent, setLogDialogContent] = useState('');

  const [lastReplyOpen, setLastReplyOpen] = useState(false);

  const handleScrapeAll = async () => {
    try {
      await api.post('/scrape/all');
      toast.success('✅ Full Scrape wurde gestartet');
    } catch (e) {
      toast.error(`❌ Fehler beim Full Scrape ${e}`);
    }
  };

  const handleScrapeAccounts = async () => {
    try {
      await api.post('/scrape/accounts');
      toast.success('✅ Account-Scrape gestartet');
    } catch (e) {
      toast.error(`❌ Fehler beim Account-Scrape ${e}`);
    }
  };

  const handleScrapeChats = async () => {
    try {
      await api.post('/scrape/chats');
      toast.success('✅ Chat-Scrape gestartet');
    } catch (e) {
      toast.error(`❌ Fehler beim Chat-Scrape ${e}`);
    }
  };

  const handleUpdateSheet = async () => {
    try {
      await api.post('/google/update');
      toast.success('✅ Google Sheet Update gestartet');
    } catch (e) {
      toast.error(`❌ Fehler beim Google Sheet Update ${e}`);
    }
  };

  const handleLogs = async () => {
    try {
      const { data } = await api.get('/status/logs');
      setLogDialogTitle('📄 Allgemeine Logs');
      setLogDialogContent(data?.logs || 'Keine Logs gefunden');
      setLogDialogOpen(true);
    } catch (e) {
      toast.error(`❌ Fehler beim Laden der Logs ${e}`);
    }
  };

  const handleAccessLogs = async () => {
    try {
      const { data } = await api.get('/status/logs/access');
      setLogDialogTitle('📄 Access Logs');
      setLogDialogContent(data?.logs || 'Keine Logs gefunden');
      setLogDialogOpen(true);
    } catch (e) {
      toast.error(`❌ Fehler beim Laden der Logs ${e}`);
    }
  };

  const handleAttackLogs = async () => {
    try {
      const { data } = await api.get('/status/logs/attack');
      setLogDialogTitle('📄 Attack Logs');
      setLogDialogContent(data?.logs || 'Keine Logs gefunden');
      setLogDialogOpen(true);
    } catch (e) {
      toast.error(`❌ Fehler beim Laden der Logs ${e}`);
    }
  };

    const handleLastReply = async () => {
    try {
      setLogDialogTitle('📄 Last Reply');
      setLogDialogOpen(true);
    } catch (e) {
      toast.error(`❌ Fehler beim Laden der Logs ${e}`);
    }
  };

  const handleAddLogin = async () => {
    toast('🔐 Login-Hinzufügen-Dialog folgt...');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg space-y-6">
        <DialogHeader>
          <DialogTitle>📖 Befehlsübersicht</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="font-semibold mb-2">🛠️ Scraping starten</p>
            <div className="flex flex-col gap-2">
              <button onClick={handleScrapeAll} className="w-full p-2 rounded bg-blue-500 text-white hover:bg-blue-600">
                🔄 Full Scrape starten
              </button>
              <button onClick={handleScrapeAccounts} className="w-full p-2 rounded bg-indigo-500 text-white hover:bg-indigo-600">
                📥 Account-Scrape starten
              </button>
              <button onClick={handleScrapeChats} className="w-full p-2 rounded bg-purple-500 text-white hover:bg-purple-600">
                💬 Chat-Scrape starten
              </button>
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2">📊 Google Sheets</p>
            <div className="flex flex-col gap-2">
              <button onClick={handleUpdateSheet} className="w-full p-2 rounded bg-green-500 text-white hover:bg-green-600">
                📈 Google Sheet aktualisieren
              </button>
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2">🪵 Logs & Debug</p>
            <div className="flex flex-col gap-2">
              <button onClick={handleLogs} className="w-full p-2 rounded bg-gray-600 text-white hover:bg-gray-700">
                📄 Allgemeine Logs
              </button>
              <button onClick={handleAccessLogs} className="w-full p-2 rounded bg-gray-600 text-white hover:bg-gray-700">
                🔐 Access Logs
              </button>
              <button onClick={handleAttackLogs} className="w-full p-2 rounded bg-gray-600 text-white hover:bg-gray-700">
                🛡️ Angriff-Logs
              </button>
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2">🕒 Erinnerungen</p>
            <div className="flex flex-col gap-2">
              <button onClick={handleLastReply} className="w-full p-2 rounded bg-yellow-500 text-white hover:bg-yellow-600">
                📬 Letzte unbeantwortete Nachrichten
              </button>
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2">📥 Login hinzufügen</p>
            <div className="flex flex-col gap-2">
              <button onClick={handleAddLogin} className="w-full p-2 rounded bg-pink-500 text-white hover:bg-pink-600">
                ➕ Login hinzufügen
              </button>
            </div>
          </div>
        </div>

        <LogViewerDialog
          open={logDialogOpen}
          onClose={() => setLogDialogOpen(false)}
          title={logDialogTitle}
          content={logDialogContent}
        />

        <LastReplyDialog
          open={lastReplyOpen}
          onClose={() => setLastReplyOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
