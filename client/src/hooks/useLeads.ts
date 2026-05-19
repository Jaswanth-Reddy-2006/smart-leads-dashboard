import { useCallback, useEffect, useMemo } from 'react';
import { fetchLeads } from '../api/leads.api';
import { useLeadsStore } from '../store/leadsStore';
import { useDebounce } from './useDebounce';

export function useLeads(): { reload: () => Promise<void> } {
  const { filters, setLeads, setLoading, setError } = useLeadsStore();
  const debouncedSearch = useDebounce(filters.search, 400);
  const effectiveFilters = useMemo(
    () => ({
      ...filters,
      search: debouncedSearch,
    }),
    [debouncedSearch, filters.page, filters.sort, filters.source, filters.status]
  );

  const load = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLeads(effectiveFilters);
      setLeads(data.leads, data.pagination);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load leads');
    } finally {
      setLoading(false);
    }
  }, [effectiveFilters, setError, setLeads, setLoading]);

  useEffect(() => {
    void load();
  }, [load]);

  return { reload: load };
}
