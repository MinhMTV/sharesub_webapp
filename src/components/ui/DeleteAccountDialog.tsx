import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteAccounts } from "@/hooks/useDeleteAccounts";
import { useQuery } from '@tanstack/react-query';
import { fetchAccounts } from '@/repository/accounts'; // 🔁 dein fetch hook

interface Props {
  open: boolean;
  onClose: () => void;
}

export const DeleteAccountsDialog: React.FC<Props> = ({ open, onClose }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const { data: accountsData } = useQuery({ queryKey: ['accounts'], queryFn: fetchAccounts });
  const accounts = Array.isArray(accountsData) ? accountsData : [];

  const { mutate: deleteAccounts, isPending } = useDeleteAccounts({
    onSuccess: () => {
      setSelected([]);
      onClose();
    },
  });

  const handleToggle = (email: string) => {
    setSelected((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>🗑 Accounts löschen</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {accounts.map((acc) => (
            <label key={acc.email} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selected.includes(acc.email)}
                onChange={() => handleToggle(acc.email)}
              />
              <span className="text-sm">{acc.email}</span>
            </label>
          ))}
        </div>
        <DialogFooter>
          <Button
            variant="destructive"
            disabled={selected.length === 0 || isPending}
            onClick={() => deleteAccounts(selected)}
          >
            Löschen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};