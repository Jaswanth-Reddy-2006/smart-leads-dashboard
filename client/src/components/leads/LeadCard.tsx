import { Badge } from '../ui/Badge';
import { Lead } from '../../types/lead.types';
import { formatDate } from '../../utils/formatDate';
import { sourceBadgeClasses, statusBadgeClasses } from '../../utils/constants';

interface LeadCardProps {
  lead: Lead;
}

export function LeadCard({ lead }: LeadCardProps): JSX.Element {
  return (
    <article className="rounded-lg border border-slate-700 bg-slate-800 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-50">{lead.name}</h3>
          <p className="text-sm text-slate-400">{lead.email}</p>
        </div>
        <Badge className={statusBadgeClasses[lead.status]}>{lead.status}</Badge>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Badge className={sourceBadgeClasses[lead.source]}>{lead.source}</Badge>
        <span className="text-xs text-slate-500">{formatDate(lead.createdAt)}</span>
      </div>
    </article>
  );
}
