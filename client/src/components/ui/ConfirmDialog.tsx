import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';
import { Modal } from './Modal';

interface ConfirmDialogProps {
  title: string;
  description: string;
  confirmLabel: string;
  isOpen: boolean;
  isLoading: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}

export function ConfirmDialog({
  title,
  description,
  confirmLabel,
  isOpen,
  isLoading,
  onCancel,
  onConfirm,
}: ConfirmDialogProps): JSX.Element {
  return (
    <Modal title={title} isOpen={isOpen} onClose={onCancel}>
      <div className="space-y-5">
        <div className="flex gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 text-red-300">
            <AlertTriangle size={20} />
          </div>
          <p className="text-sm leading-6 text-slate-300">{description}</p>
        </div>
        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" disabled={isLoading} onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" variant="danger" disabled={isLoading} onClick={() => void onConfirm()}>
            {isLoading ? 'Deleting...' : confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
