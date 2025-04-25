// src/components/ui/CostDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCosts } from '@/hooks/useCosts';

export function CostDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { data, isLoading, error } = useCosts();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto space-y-6">
        <DialogHeader>
          <DialogTitle>💸 Aktuelle Kosten</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <p>Lade...</p>
        ) : error ? (
          <p>Fehler beim Laden der Kosten</p>
        ) : (
          <ul className="space-y-2">
            {data?.map((cost) => (
              <li key={cost.subscription_name} className="flex justify-between border-b pb-1">
                <span>{cost.subscription_name}</span>
                <span>{cost.monthly_cost.toFixed(2)} €</span>
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}