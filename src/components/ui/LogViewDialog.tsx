import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function LogViewerDialog({
  open,
  onClose,
  title,
  content,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[80vh] overflow-y-auto whitespace-pre-wrap">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="text-sm font-mono text-gray-800 whitespace-pre-wrap">{content}</div>
      </DialogContent>
    </Dialog>
  );
}