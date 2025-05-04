import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useAddSubscriberInfo } from '@/hooks/useDigishare';

interface RowData {
  subscription_id: string;
  subscription_name: string;
  user_name: string;
  user_email?: string;
  user_account?: string;
  subscription_email?: string;
  subscription_password?: string;
  address?: string;
  link?: string;
}

interface Props {
  initialRows: RowData[];
}

export function DigishareInfoTable({ initialRows }: Props) {
  const [rows, setRows] = useState<RowData[]>(
    initialRows.map(r => ({ ...r }))
  );

  const handleChange = (index: number, field: keyof RowData, value: string) => {
    setRows(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const { mutateAsync } = useAddSubscriberInfo();

  const handleSave = async () => {
    try {
      let successCount = 0;
      for (const row of rows) {
        const original = initialRows.find(r => r.subscription_id === row.subscription_id && r.user_name === row.user_name);
        const changed = original && (
          row.user_email !== original.user_email ||
          row.user_account !== original.user_account ||
          row.subscription_email !== original.subscription_email ||
          row.subscription_password !== original.subscription_password ||
          row.address !== original.address ||
          row.link !== original.link
        );

        if (changed) {
          await mutateAsync(row);
          successCount++;
        }
      }
      if (successCount > 0) {
        toast.success(`${successCount} Einträge gespeichert`);
      } else {
        toast.info('Keine Änderungen zum Speichern');
      }
    } catch (e) {
      toast.error('❌ Fehler beim Speichern');
    }
  };

  return (
    <div className="overflow-auto">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Sub-ID</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">User-Email</th>
            <th className="p-2 border">User-Account</th>
            <th className="p-2 border">Sub-Email</th>
            <th className="p-2 border">Sub-Passwort</th>
            <th className="p-2 border">Adresse</th>
            <th className="p-2 border">Link</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="odd:bg-white even:bg-gray-50">
              <td className="p-2 border font-mono text-xs">{row.subscription_id}</td>
              <td className="p-2 border font-mono text-xs">{row.user_name}</td>
              <td className="p-1 border">
                <Input value={row.user_email || ''} onChange={e => handleChange(i, 'user_email', e.target.value)} />
              </td>
              <td className="p-1 border">
                <Input value={row.user_account || ''} onChange={e => handleChange(i, 'user_account', e.target.value)} />
              </td>
              <td className="p-1 border">
                <Input value={row.subscription_email || ''} onChange={e => handleChange(i, 'subscription_email', e.target.value)} />
              </td>
              <td className="p-1 border">
                <Input value={row.subscription_password || ''} onChange={e => handleChange(i, 'subscription_password', e.target.value)} />
              </td>
              <td className="p-1 border">
                <Input value={row.address || ''} onChange={e => handleChange(i, 'address', e.target.value)} />
              </td>
              <td className="p-1 border">
                <Input value={row.link || ''} onChange={e => handleChange(i, 'link', e.target.value)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-right">
        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">💾 Speichern</Button>
      </div>
    </div>
  );
}