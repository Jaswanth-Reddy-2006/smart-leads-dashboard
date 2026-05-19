import { Modal } from '../ui/Modal';
import { Lead } from '../../types/lead.types';
import { formatDate } from '../../utils/formatDate';

interface LeadDetailModalProps {
  lead: Lead | null;
  onClose: () => void;
}

export function LeadDetailModal({ lead, onClose }: LeadDetailModalProps): JSX.Element | null {
  return (
    <Modal title="Lead details" isOpen={Boolean(lead)} onClose={onClose}>
      {lead ? (
        <dl className="grid gap-4 text-sm">
          <div>
            <dt className="text-slate-400">Name</dt>
            <dd className="mt-1 font-medium text-slate-50">{lead.name}</dd>
          </div>
          <div>
            <dt className="text-slate-400">Email</dt>
            <dd className="mt-1 font-medium text-slate-50">{lead.email}</dd>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-slate-400">Status</dt>
              <dd className="mt-1 text-slate-50">{lead.status}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Source</dt>
              <dd className="mt-1 text-slate-50">{lead.source}</dd>
            </div>
          </div>
          <div>
            <dt className="text-slate-400">Created</dt>
            <dd className="mt-1 text-slate-50">{formatDate(lead.createdAt)}</dd>
          </div>
        </dl>
      ) : null}
    </Modal>
  );
}
