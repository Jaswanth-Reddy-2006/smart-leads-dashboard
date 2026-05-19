import { LeadSource, LeadStatus, SortOrder } from '../types/lead.types';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api';

export const LEAD_STATUSES: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Lost'];
export const LEAD_SOURCES: LeadSource[] = ['Website', 'Instagram', 'Referral'];
export const SORT_OPTIONS: Array<{ label: string; value: SortOrder }> = [
  { label: 'Latest first', value: 'latest' },
  { label: 'Oldest first', value: 'oldest' },
];

export const PAGE_SIZE = 10;

export const statusBadgeClasses: Record<LeadStatus, string> = {
  New: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  Contacted: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  Qualified: 'bg-green-500/10 text-green-400 border border-green-500/20',
  Lost: 'bg-red-500/10 text-red-400 border border-red-500/20',
};

export const sourceBadgeClasses: Record<LeadSource, string> = {
  Website: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  Instagram: 'bg-pink-500/10 text-pink-400 border border-pink-500/20',
  Referral: 'bg-teal-500/10 text-teal-400 border border-teal-500/20',
};
