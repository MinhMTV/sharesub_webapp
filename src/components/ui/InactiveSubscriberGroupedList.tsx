import { useEffect, useState } from 'react';
import { fetchInactiveSubscribersGrouped } from '@/repository/digishare';
import { Input } from '@/components/ui/input';

export function InactiveSubscriberGroupedList() {
  const [days, setDays] = useState(7);
  const [grouped, setGrouped] = useState<Record<string, any[]>>({});

  useEffect(() => {
    fetchInactiveSubscribersGrouped(days).then(setGrouped);
  }, [days]);

  const subscriptionIds = Object.keys(grouped).sort();

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-sm">🔍 Zeige gruppierte inaktive Nutzer seit</span>
        <Input
          type="number"
          min={1}
          value={days}
          onChange={(e) => setDays(parseInt(e.target.value || '1'))}
          className="w-20"
        />
        <span className="text-sm">Tagen</span>
      </div>

      <div className="max-h-[60vh] overflow-y-auto border rounded-md p-2 text-sm space-y-4">
        {subscriptionIds.length === 0 && <p>✅ Keine inaktiven Nutzer gefunden</p>}

        {subscriptionIds.map((subId) => (
          <div key={subId}>
            <div className="font-bold border-b pb-1 mb-1">
              Abo: <code>{subId}</code> ({grouped[subId].length} Nutzer)
            </div>
            {grouped[subId].map((u, i) => (
              <div key={i} className="border-b py-1">
                👤 <b>{u.user_name}</b> – letzte Zahlung: <code>{u.last_payment}</code>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}