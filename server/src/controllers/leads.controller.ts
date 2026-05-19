import { Request, Response } from 'express';
import * as LeadsService from '../services/leads.service.js';
import { CreateLeadDTO, LeadFilters, UpdateLeadDTO } from '../types/lead.types.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const getAuthUser = (req: Request) => {
  if (!req.user) throw new ApiError(401, 'Unauthorized');
  return req.user;
};

const parseLeadFilters = (req: Request): LeadFilters => ({
  status: req.query.status as LeadFilters['status'],
  source: req.query.source as LeadFilters['source'],
  search: req.query.search as string | undefined,
  sort: req.query.sort as LeadFilters['sort'],
  page: req.query.page ? Number(req.query.page) : undefined,
  limit: req.query.limit ? Number(req.query.limit) : undefined,
});

const escapeCsvCell = (cell: string): string => `"${cell.replace(/"/g, '""')}"`;

export const createLead = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = getAuthUser(req);
  const lead = await LeadsService.createLead(req.body as CreateLeadDTO, user.userId);
  res.status(201).json(new ApiResponse(lead, 'Lead created successfully'));
});

export const getLeads = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = getAuthUser(req);
  const data = await LeadsService.getLeads(parseLeadFilters(req), user.userId, user.role);
  res.status(200).json(new ApiResponse(data));
});

export const getLeadById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = getAuthUser(req);
  const lead = await LeadsService.getLeadById(String(req.params.id), user.userId, user.role);
  res.status(200).json(new ApiResponse(lead));
});

export const updateLead = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = getAuthUser(req);
  const lead = await LeadsService.updateLead(
    String(req.params.id),
    req.body as UpdateLeadDTO,
    user.userId,
    user.role
  );
  res.status(200).json(new ApiResponse(lead, 'Lead updated successfully'));
});

export const deleteLead = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = getAuthUser(req);
  const id = String(req.params.id);
  await LeadsService.deleteLead(id, user.userId, user.role);
  res.status(200).json(new ApiResponse({ id }, 'Lead deleted successfully'));
});

export const exportLeads = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = getAuthUser(req);
  const filters = parseLeadFilters(req);
  const leads = await LeadsService.getAllLeadsForExport(filters, user.userId, user.role);
  const headers = ['Name', 'Email', 'Status', 'Source', 'Created At'];
  const rows = leads.map((lead) => [
    lead.name,
    lead.email,
    lead.status,
    lead.source,
    lead.createdAt.toISOString(),
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => escapeCsvCell(cell)).join(','))
    .join('\n');

  res.header('Content-Type', 'text/csv');
  res.attachment(`leads-export-${Date.now()}.csv`);
  res.status(200).send(csv);
});
