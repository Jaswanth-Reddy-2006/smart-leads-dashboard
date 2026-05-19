import { ArrowDownUp, Search, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { useLeadsStore } from '../../store/leadsStore';
import { LeadSource, LeadStatus, SortOrder } from '../../types/lead.types';
import { LEAD_SOURCES, LEAD_STATUSES, SORT_OPTIONS } from '../../utils/constants';

export function LeadFilters(): JSX.Element {
  const { filters, setFilters, resetFilters } = useLeadsStore();
  const activeCount = [filters.status, filters.source, filters.search.trim()].filter(Boolean).length;
  const hasDefaultSort = filters.sort === 'latest';
  const filterSummary = [
    filters.status ? `Status: ${filters.status}` : null,
    filters.source ? `Source: ${filters.source}` : null,
    filters.search.trim() ? `Search: ${filters.search.trim()}` : null,
    !hasDefaultSort ? 'Sort: Oldest first' : null,
  ].filter(Boolean);

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
        <div className="min-w-0 flex-1 space-y-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300" htmlFor="lead-search">
            Search leads
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-3.5 text-slate-500" size={16} />
            <input
              id="lead-search"
              className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
              placeholder="Search by name or email..."
              value={filters.search}
              onChange={(event) => setFilters({ search: event.target.value })}
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 xl:w-[580px]">
          <Select
            label="Status"
            value={filters.status}
            onChange={(event) => setFilters({ status: event.target.value as LeadStatus | '' })}
          >
            <option value="">All statuses</option>
            {LEAD_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>

          <Select
            label="Source"
            value={filters.source}
            onChange={(event) => setFilters({ source: event.target.value as LeadSource | '' })}
          >
            <option value="">All sources</option>
            {LEAD_SOURCES.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </Select>

          <Select
            label="Sort by"
            value={filters.sort}
            onChange={(event) => setFilters({ sort: event.target.value as SortOrder })}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex gap-2 xl:pb-0">
          <Button
            variant="ghost"
            type="button"
            onClick={resetFilters}
            disabled={activeCount === 0 && hasDefaultSort}
            className="h-11 border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <X size={16} />
            Reset
          </Button>
        </div>
      </div>

      {filterSummary.length > 0 ? (
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            <ArrowDownUp size={14} />
            Applied
          </span>
          {filterSummary.map((item) => (
            <span
              key={item}
              className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300"
            >
              {item}
            </span>
          ))}
        </div>
      ) : null}
    </section>
  );
}
