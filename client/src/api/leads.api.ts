import { axiosInstance } from './axiosInstance';
import { ApiResponse } from '../types/api.types';
import {
  Lead,
  LeadFilters,
  LeadPayload,
  PaginatedLeadsResponse,
} from '../types/lead.types';
import { PAGE_SIZE } from '../utils/constants';

const toQuery = (filters: LeadFilters): URLSearchParams => {
  const params = new URLSearchParams();
  if (filters.status) params.set('status', filters.status);
  if (filters.source) params.set('source', filters.source);
  if (filters.search.trim()) params.set('search', filters.search.trim());
  params.set('sort', filters.sort);
  params.set('page', String(filters.page));
  params.set('limit', String(PAGE_SIZE));
  return params;
};

export const fetchLeads = async (filters: LeadFilters): Promise<PaginatedLeadsResponse> => {
  const response = await axiosInstance.get<ApiResponse<PaginatedLeadsResponse>>(
    `/leads?${toQuery(filters).toString()}`
  );
  return response.data.data;
};

export const createLead = async (payload: LeadPayload): Promise<Lead> => {
  const response = await axiosInstance.post<ApiResponse<Lead>>('/leads', payload);
  return response.data.data;
};

export const updateLead = async (id: string, payload: LeadPayload): Promise<Lead> => {
  const response = await axiosInstance.put<ApiResponse<Lead>>(`/leads/${id}`, payload);
  return response.data.data;
};

export const deleteLead = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/leads/${id}`);
};

export const exportLeads = async (filters: LeadFilters): Promise<Blob> => {
  const response = await axiosInstance.get(`/leads/export?${toQuery(filters).toString()}`, {
    responseType: 'blob',
  });
  return response.data as Blob;
};
