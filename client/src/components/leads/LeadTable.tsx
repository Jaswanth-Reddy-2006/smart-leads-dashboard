import { Edit3, Eye, Trash2 } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/authStore';
import { Lead } from '../../types/lead.types';
import { formatDate } from '../../utils/formatDate';
import { sourceBadgeClasses, statusBadgeClasses } from '../../utils/constants';

interface LeadTableProps {
  leads: Lead[];
  isLoading: boolean;
  onView: (lead: Lead) => void;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

const getInitials = (name: string): string =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

function SkeletonRows(): JSX.Element {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={index} className="animate-pulse border-t border-slate-200 dark:border-slate-800">
          <td className="px-5 py-4">
            <div className="h-10 w-48 rounded bg-slate-200 dark:bg-slate-800" />
          </td>
          <td className="px-5 py-4"><div className="h-6 w-24 rounded-full bg-slate-200 dark:bg-slate-800" /></td>
          <td className="px-5 py-4"><div className="h-6 w-24 rounded-full bg-slate-200 dark:bg-slate-800" /></td>
          <td className="px-5 py-4"><div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" /></td>
          <td className="px-5 py-4"><div className="h-8 w-28 rounded bg-slate-200 dark:bg-slate-800" /></td>
        </tr>
      ))}
    </>
  );
}

export function LeadTable({
  leads,
  isLoading,
  onView,
  onEdit,
  onDelete,
}: LeadTableProps): JSX.Element {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-soft">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800">
          <thead className="bg-slate-50 dark:bg-slate-900/50 text-left text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-5 py-3 font-semibold">Lead</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold">Source</th>
              <th className="px-5 py-3 font-semibold">Created</th>
              <th className="px-5 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {isLoading ? <SkeletonRows /> : null}
            {!isLoading
              ? leads.map((lead) => (
                  <tr key={lead._id} className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10 text-sm font-semibold text-indigo-600 dark:text-indigo-300 border border-indigo-500/15">
                          {getInitials(lead.name)}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 dark:text-slate-50">{lead.name}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{lead.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Badge className={statusBadgeClasses[lead.status]}>{lead.status}</Badge>
                    </td>
                    <td className="px-5 py-4">
                      <Badge className={sourceBadgeClasses[lead.source]}>{lead.source}</Badge>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">{formatDate(lead.createdAt)}</td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <Button 
                          variant="ghost" 
                          className="h-9 bg-white px-3 text-xs flex items-center gap-1.5 rounded-lg border border-slate-200 text-slate-700 shadow-sm transition-all hover:bg-slate-100 hover:text-slate-950 dark:border-slate-700/50 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white" 
                          onClick={() => onView(lead)} 
                          title="View Lead Details"
                        >
                          <Eye size={13} className="text-slate-500 dark:text-slate-400" />
                          <span>View</span>
                        </Button>
                        {user?.role === 'admin' ? (
                          <Button 
                            variant="ghost" 
                            className="h-9 bg-white px-3 text-xs flex items-center gap-1.5 rounded-lg border border-slate-200 text-slate-700 shadow-sm transition-all hover:bg-slate-100 hover:text-slate-950 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200 dark:hover:bg-blue-500/20 dark:hover:text-white" 
                            onClick={() => onEdit(lead)} 
                            title="Edit Lead"
                          >
                            <Edit3 size={13} className="text-slate-500 dark:text-blue-300" />
                            <span>Edit</span>
                          </Button>
                        ) : null}
                        {user?.role === 'admin' ? (
                          <Button 
                            variant="danger" 
                            className="h-8 px-2.5 text-xs flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/5 hover:bg-red-500/20 transition-all shadow-sm animate-none" 
                            onClick={() => onDelete(lead)} 
                            title="Delete Lead"
                          >
                            <Trash2 size={13} />
                            <span>Delete</span>
                          </Button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
