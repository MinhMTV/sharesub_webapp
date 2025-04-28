import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { useAddCost, useMissingCosts, useCosts } from '@/hooks/useCosts';
import { toast } from 'sonner';

export function AddCostsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { data: missingCosts = [] } = useMissingCosts();
  const { data: allCosts = [] } = useCosts();

  const [mode, setMode] = useState<'new' | 'update'>('new');

  const [selected, setSelected] = useState('');
  const [customName, setCustomName] = useState('');
  const [value, setValue] = useState('');

  const addCost = useAddCost({
    onSuccess: () => {
      toast.success('✅ Kosten gespeichert');
      setSelected('');
      setCustomName('');
      setValue('');
      onClose();
    },
    onError: () => {
      toast.error('❌ Fehler beim Speichern');
    },
  });

const handleSubmit = () => {
  const monthly_cost = parseFloat(value);

  if (!selected) {
    toast.error('❌ Bitte ein Abo auswählen');
    return;
  }

  if (isNaN(monthly_cost)) {
    toast.error('❌ Bitte eine gültige Zahl für die Kosten eingeben');
    return;
  }

  const subscription_name = selected === '__custom__' ? customName : selected;

  if (!subscription_name || (selected === '__custom__' && !customName)) {
    toast.error('❌ Bitte einen Namen für das Abo eingeben');
    return;
  }

  addCost.mutate({ subscription_name, monthly_cost });
};

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>➕ Neue oder bestehende Kosten hinzufügen</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          {/* Auswahlmodus */}
          <div className="flex gap-2">
            <button
              className={`flex-1 p-2 rounded ${mode === 'new' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setMode('new')}
            >
              ➕ Neues Abo
            </button>
            <button
              className={`flex-1 p-2 rounded ${mode === 'update' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setMode('update')}
            >
              ✏️ Bestehendes Abo aktualisieren
            </button>
          </div>

          {/* Abo-Auswahl */}
          {mode === 'new' && (
            <select
              className="w-full border rounded p-2"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              <option value="">Wähle ein fehlendes Abo</option>
              {missingCosts.map((item) => (
                <option key={item.subscription_name} value={item.subscription_name}>
                  {item.subscription_name}
                </option>
              ))}
              <option value="__custom__">📝 Anderes Abo manuell...</option>
            </select>
          )}

          {mode === 'update' && (
            <select
              className="w-full border rounded p-2"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              <option value="">Wähle ein Abo zur Aktualisierung</option>
              {allCosts.map((item) => (
                <option key={item.subscription_name} value={item.subscription_name}>
                  {item.subscription_name} ({item.monthly_cost.toFixed(2)} €)
                </option>
              ))}
            </select>
          )}

          {/* Custom-Abo-Eingabe */}
          {mode === 'new' && selected === '__custom__' && (
            <input
              placeholder="Abo-Name eingeben"
              className="w-full border rounded p-2"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
            />
          )}

          {/* Preis-Eingabe */}
          <input
            type="number"
            placeholder="Monatliche Kosten (€)"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full border rounded p-2"
          />

          <button onClick={handleSubmit} className="w-full p-2 rounded bg-blue-500 text-white hover:bg-blue-600">
            Speichern
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}