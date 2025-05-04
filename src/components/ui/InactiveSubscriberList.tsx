import { useEffect, useState } from 'react';
import { fetchInactiveSubscribers } from '@/repository/digishare';
import { Input } from '@/components/ui/input';

export function InactiveSubscriberList() {
  const [days, setDays] = useState(7);
  const [subs, setSubs] = useState<any[]>([]);

  useEffect(() => {
    fetchInactiveSubscribers(days).then(setSubs);
  }, [days]);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-sm">🔍 Zeige alle inaktiven Nutzer seit</span>
        <Input
          type="number"
          min={1}
          value={days}
          onChange={(e) => setDays(parseInt(e.target.value || '1'))}
          className="w-20"
        />
        <span className="text-sm">Tagen</span>
      </div>

      <div className="max-h-[60vh] overflow-y-auto border rounded-md p-2 text-sm">
        {subs.length === 0 && <p>✅ Keine inaktiven Nutzer gefunden</p>}
        {subs.map((s, i) => (
          <div key={i} className="border-b py-1">
            <code>{s.subscription_id}</code> – {s.subscription_name} – <code>{s.user_name}</code> – letzte Zahlung: <b>{s.last_payment}</b>
          </div>
        ))}
      </div>
    </div>
  );
}