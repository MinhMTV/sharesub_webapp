import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { fetchMissingSubscriberInfos } from '@/repository/digishare';
import { DigishareInfoTable } from './DigishareInfoTable';
import {InactiveSubscriberList} from "@/components/ui/InactiveSubscriberList.tsx";
import {InactiveSubscriberGroupedList} from "@/components/ui/InactiveSubscriberGroupedList.tsx";

interface DigishareDialogProps {
  open: boolean;
  onClose: () => void;
}

export function DigishareDialog({ open, onClose }: DigishareDialogProps) {
  const [missingInfos, setMissingInfos] = useState<any[]>([]);

  useEffect(() => {
    if (open) {
      fetchMissingSubscriberInfos().then(setMissingInfos);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-screen max-w-none max-h-screen overflow-hidden px-4">
        <DialogHeader>
          <DialogTitle>🧠 Digishare Verwaltung</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="missing" className="w-full">
          <TabsList>
            <TabsTrigger value="missing">Fehlende Infos</TabsTrigger>
            <TabsTrigger value="add">Infos hinzufügen</TabsTrigger>
            <TabsTrigger value="inactive">Inaktive Nutzer</TabsTrigger>
            <TabsTrigger value="inactive-grouped">Inaktive (Gruppiert)</TabsTrigger>
          </TabsList>

          <TabsContent value="inactive">
            <InactiveSubscriberList />
          </TabsContent>

          <TabsContent value="inactive-grouped">
            <InactiveSubscriberGroupedList />
          </TabsContent>

          <TabsContent value="missing">
            <div className="h-[70vh] w-full overflow-y-auto border p-2 rounded-md text-sm space-y-1">
              {missingInfos.length === 0 && <p>✅ Keine fehlenden Einträge</p>}
              {missingInfos.map((info, i) => (
                <div key={i} className="border-b py-1">
                  <code>'{info.subscription_id}'</code> – {info.subscription_name} – <code>'{info.user_name}'</code>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="add">
            <div className="h-[70vh] w-full overflow-y-auto border p-2 rounded-md">
              <DigishareInfoTable initialRows={missingInfos} />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}