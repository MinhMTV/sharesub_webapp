import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { api } from '@/repository/api';
import { toast } from 'sonner';

export function LastReplyDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [entries, setEntries] = useState<any[]>([]);
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(false);

  const fetchReplies = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/chats/last_reply?days=${days}`);
      if (data?.error) {
        toast.error(data.error);
      } else {
        setEntries(data);
      }
    } catch (e) {
      toast.error(`❌ Fehler beim Laden: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) fetchReplies();
  }, [open, days]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto space-y-4">
        <DialogHeader className="flex justify-between items-start">
          <DialogTitle>📬 Letzte unbeantwortete Nachrichten</DialogTitle>
          <div className="flex items-center gap-2">
            <label className="text-sm">Tage:</label>
            <Input
              type="number"
              min={1}
              max={30}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-20"
            />
          </div>
        </DialogHeader>

        {loading ? (
          <p className="text-gray-500">⏳ Lade Nachrichten...</p>
        ) : entries.length === 0 ? (
          <p className="text-gray-500">✅ Keine unbeantworteten Nachrichten gefunden.</p>
        ) : (
          <div className="text-sm whitespace-pre-wrap space-y-4">
            {entries.map((r, index) => (
              <div key={index} className="p-3 border rounded bg-gray-50">
                <p><strong>👤 Subscriber:</strong> {r.subscriber_name} <code>({r.subscriber_id})</code></p>
                <p><strong>📦 Subscription:</strong> {r.subscription_name} <code>({r.subscription_id})</code></p>
                <p><strong>📧 Account:</strong> <code>{r.account_email}</code></p>
                <p><strong>🕒 Zeit:</strong> {r.time}</p>
                <p><strong>💬 Nachricht:</strong> {r.content}</p>
                <p className="mt-2">
                  <code>/reply {r.subscription_id} {r.subscriber_id}</code><br />
                  <code>/details {r.subscription_id}</code>
                </p>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}