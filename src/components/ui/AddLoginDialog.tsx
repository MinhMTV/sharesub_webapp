import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { api } from '@/repository/api';
import { toast } from 'sonner';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select.tsx';

type AddLoginDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type AvailableSubscription = {
  subscription_id: string;
  subscription_name: string;
  account_email: string;
};

export function AddLoginDialog({ open, onOpenChange }: AddLoginDialogProps) {
  const [available, setAvailable] = useState<AvailableSubscription[]>([]);
  const [manual, setManual] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState('');
  const [subscriptionName, setSubscriptionName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subscriptionDetails, setSubscriptionDetails] = useState<any | null>(null);

  useEffect(() => {
    if (open) {
      api.get('/external-login/available').then(({ data }) => {
        setAvailable(data.available || []);
      });
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      setManual(false);
      setSubscriptionId('');
      setSubscriptionName('');
      setEmail('');
      setPassword('');
      setSubscriptionDetails(null);
    }
  }, [open]);

  const handleSubmit = async () => {
  if (!subscriptionId || !subscriptionName || !email || !password) {
    toast.error('❌ Bitte fülle alle Felder aus.');
    return;
  }

  try {
    await api.post('/external-login/add', {
      subscription_id: subscriptionId,
      subscription_name: subscriptionName,
      email,
      password,
    });
    toast.success('✅ Login gespeichert');

    // 🆕 API erneut abfragen, damit korrekte Liste kommt
    const { data } = await api.get('/external-login/available');
    setAvailable(data.available || []);

    // Felder zurücksetzen
    setEmail('');
    setPassword('');
    setSubscriptionId('');
    setSubscriptionName('');
    setSubscriptionDetails(null);
  } catch (e) {
    toast.error(`❌ Fehler beim Speichern des Logins ${e}`);
  }
};

  const handleSelectChange = async (value: string) => {
    const found = available.find((a) => a.subscription_id === value);
    if (!found) return;

    setSubscriptionId(found.subscription_id);
    setSubscriptionName(found.subscription_name);

    try {
      const { data } = await api.get(`/subscriptions/id/${found.subscription_id}`);
      setSubscriptionDetails(data);
    } catch (e) {
      setSubscriptionDetails(null);
      toast.error(`❌ Fehler beim Laden der Abo-Details ${e}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg space-y-4">
        <DialogHeader>
          <DialogTitle>🔐 External Login hinzufügen</DialogTitle>
        </DialogHeader>

        {!manual && (
          <div className="space-y-2">
            <label className="font-semibold">📂 Auswahl</label>
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Wähle ein Abo" />
              </SelectTrigger>
              <SelectContent>
                {available.map((item) => (
                  <SelectItem
                      key={item.subscription_id}
                      value={item.subscription_id}
                      className="hover:bg-blue-500 hover:text-white cursor-pointer"
                    >
                      {item.subscription_name} ({item.subscription_id}) – {item.account_email}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {subscriptionDetails && (
              <div className="border p-3 rounded text-sm bg-muted mt-2 space-y-1">
                <p><strong>📦 Name:</strong> {subscriptionDetails.name}</p>
                <p><strong>📧 Account:</strong> {subscriptionDetails.account_email}</p>
                <p><strong>👥 Nutzer:</strong> {subscriptionDetails.num_users}</p>
                <p><strong>💰 Einnahmen:</strong> {subscriptionDetails.money_received}€</p>
                <p><strong>📍 Adresse:</strong> {subscriptionDetails.address}</p>
                <p><strong>🔗 Link:</strong>{' '}
                  <a
                    href={subscriptionDetails.link}
                    target="_blank"
                    className="underline text-blue-600"
                    rel="noreferrer"
                  >
                    {subscriptionDetails.link}
                  </a>
                </p>
              </div>
            )}
          </div>
        )}

        {manual && (
          <div className="space-y-2">
            <Input
              placeholder="Subscription Name"
              value={subscriptionName}
              onChange={(e) => setSubscriptionName(e.target.value)}
            />
            <Input
              placeholder="Subscription ID"
              value={subscriptionId}
              onChange={(e) => setSubscriptionId(e.target.value)}
            />
          </div>
        )}

        <div className="space-y-2">
          <Input
            placeholder="Email / Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Passwort"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-between gap-2">
          <Button onClick={() => setManual(!manual)} variant="outline" className="w-1/3">
            {manual ? '🔁 Zur Auswahl' : '✍️ Manuell'}
          </Button>
          <Button onClick={handleSubmit} className="w-2/3">
            ✅ Speichern
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}