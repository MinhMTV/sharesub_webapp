import React, { useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddAccount } from "@/hooks/useAddAccount";
import {toast} from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AddAccountDialog: React.FC<Props> = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("google");
  const [error, setError] = useState<string | null>(null);

  const { mutate: addAccount, isPending } = useAddAccount({
    onSuccess: () => {
      setEmail("");
      setPassword("");
      setLoginType("google");
      setError(null);
      onClose();
    },
    onError: (err: any) => {
      const message = err?.response?.data?.detail || "Unbekannter Fehler";
      toast('⚠️ ' + message);
    },
  });


  const handleSubmit = () => {
    if (!email || !password || !loginType) {
      toast.warning("⚠️ Bitte alle Felder ausfüllen!");
      return;
    }

    addAccount({ email, password, login_type: loginType });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>➕ Neuen Account hinzufügen</DialogTitle>
        </DialogHeader>
        {/* ⚠️ Fehleranzeige zentral */}
        {error && (
          <div className="flex justify-center">
            <div className="text-red-500 text-sm bg-red-100 px-4 py-2 rounded-md text-center max-w-xs">
              ⚠️ {error}
            </div>
          </div>
        )}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-700">E-Mail</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="z.B. user@mail.com"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Passwort</label>
            <Input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Passwort"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Login-Typ</label>
            <select
              className="w-full border px-3 py-2 rounded-md"
              value={loginType}
              onChange={(e) => setLoginType(e.target.value)}
            >
              <option value="google">google</option>
              <option value="email">email</option>
            </select>
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-2">
          <Button
            onClick={handleSubmit}
            disabled={!email || !password || isPending}
            className="w-full"
          >
            Hinzufügen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};