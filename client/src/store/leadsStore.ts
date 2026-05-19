import { create } from 'zustand';
import { Lead, LeadFilters, PaginationMeta } from '../types/lead.types';

interface LeadsState {
  leads: Lead[];
  pagination: PaginationMeta | null;
  filters: LeadFilters;
  isLoading: boolean;
  error: string | null;
  setLeads: (leads: Lead[], pagination: PaginationMeta) => void;
  setFilters: (filters: Partial<LeadFilters>) => void;
  resetFilters: () => void;
  setPage: (page: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const defaultFilters: LeadFilters = {
  status: '',
  source: '',
  search: '',
  sort: 'latest',
  page: 1,
};

export const useLeadsStore = create<LeadsState>((set) => ({
  leads: [],
  pagination: null,
  filters: defaultFilters,
  isLoading: false,
  error: null,
  setLeads: (leads, pagination) => set({ leads, pagination }),
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters, page: 1 },
    })),
  resetFilters: () => set({ filters: defaultFilters }),
  setPage: (page) => set((state) => ({ filters: { ...state.filters, page } })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
