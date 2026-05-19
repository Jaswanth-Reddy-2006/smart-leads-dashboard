import { CheckCircle2, Clock3, Target, Users, Percent, Shield } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Lead } from '../../types/lead.types';

interface LeadStatsProps {
  leads: Lead[];
  total: number;
}

interface StatCard {
  label: string;
  value: string | number;
  helper: string;
  icon: JSX.Element;
}

export function LeadStats({ leads, total }: LeadStatsProps): JSX.Element {
  const user = useAuthStore((state) => state.user);
  const isSales = user?.role === 'sales';

  const visibleQualified = leads.filter((lead) => lead.status === 'Qualified').length;
  const visibleContacted = leads.filter((lead) => lead.status === 'Contacted').length;
  const visibleNew = leads.filter((lead) => lead.status === 'New').length;

  const totalVisible = leads.length;
  const personalConversionRate = totalVisible > 0 ? Math.round((visibleQualified / totalVisible) * 100) : 0;
  const adminConversionRate = total > 0 ? Math.round((leads.filter(l => l.status === 'Qualified').length / totalVisible) * 100) : 0;

  const stats: StatCard[] = isSales
    ? [
        {
          label: 'My Lead Queue',
          value: total,
          helper: 'Total assigned opportunities',
          icon: <Users size={18} />,
        },
        {
          label: 'Active Conversions',
          value: visibleQualified,
          helper: 'Qualified status in queue',
          icon: <CheckCircle2 size={18} />,
        },
        {
          label: 'Follow-up Target',
          value: visibleContacted,
          helper: 'Leads currently in contacted state',
          icon: <Target size={18} />,
        },
        {
          label: 'Personal Conversion Rate',
          value: `${personalConversionRate}%`,
          helper: 'Qualified leads to total visible',
          icon: <Percent size={18} />,
        },
      ]
    : [
        {
          label: 'Total Leads',
          value: total,
          helper: 'Platform-wide total leads count',
          icon: <Users size={18} />,
        },
        {
          label: 'Overall Conversion Rate',
          value: `${personalConversionRate}%`, // dynamic conversion of loaded leads
          helper: 'Platform-wide qualification rate',
          icon: <Percent size={18} />,
        },
        {
          label: 'Active Opportunities',
          value: visibleContacted + visibleNew,
          helper: 'New & contacted pipeline state',
          icon: <Target size={18} />,
        },
        {
          label: 'Fresh pipeline',
          value: visibleNew,
          helper: 'New unqualified lead records',
          icon: <Clock3 size={18} />,
        },
      ];

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article key={stat.label} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-soft">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">{stat.value}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-300">
              {stat.icon}
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{stat.helper}</p>
        </article>
      ))}
    </section>
  );
}
