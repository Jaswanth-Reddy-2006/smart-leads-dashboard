import { FilterQuery } from 'mongoose';
import { Lead, ILeadDocument } from '../models/Lead.model.js';
import {
  CreateLeadDTO,
  ILead,
  LeadFilters,
  PaginatedLeadsResponse,
  UpdateLeadDTO,
  UserRole,
} from '../types/lead.types.js';
import { ApiError } from '../utils/ApiError.js';

interface LeadRecord {
  _id: { toString(): string };
  name: string;
  email: string;
  status: ILead['status'];
  source: ILead['source'];
  createdAt: Date;
  updatedAt: Date;
  createdBy: { toString(): string };
}

const toLead = (lead: ILeadDocument): ILead => {
  const object = lead.toObject();
  return {
    _id: object._id.toString(),
    name: object.name,
    email: object.email,
    status: object.status,
    source: object.source,
    createdAt: object.createdAt,
    updatedAt: object.updatedAt,
    createdBy: object.createdBy.toString(),
  };
};

const toLeadFromRecord = (lead: LeadRecord): ILead => ({
  _id: lead._id.toString(),
  name: lead.name,
  email: lead.email,
  status: lead.status,
  source: lead.source,
  createdAt: lead.createdAt,
  updatedAt: lead.updatedAt,
  createdBy: lead.createdBy.toString(),
});

const buildLeadQuery = (
  filters: Omit<LeadFilters, 'page' | 'limit'>,
  requestingUserId: string,
  requestingUserRole: UserRole
): FilterQuery<ILeadDocument> => {
  const { status, source, search } = filters;
  const query: FilterQuery<ILeadDocument> = {};

  if (requestingUserRole === 'sales') {
    query.createdBy = requestingUserId;
  }

  if (status) query.status = status;
  if (source) query.source = source;

  if (search?.trim()) {
    const searchRegex = new RegExp(search.trim(), 'i');
    query.$or = [{ name: searchRegex }, { email: searchRegex }];
  }

  return query;
};

const normalizePage = (page?: number): number => Math.max(page ?? 1, 1);
const normalizeLimit = (limit?: number): number => Math.min(Math.max(limit ?? 10, 1), 100);

export const createLead = async (dto: CreateLeadDTO, userId: string): Promise<ILead> => {
  const lead = await Lead.create({ ...dto, createdBy: userId });
  return toLead(lead);
};

export const getLeads = async (
  filters: LeadFilters,
  requestingUserId: string,
  requestingUserRole: UserRole
): Promise<PaginatedLeadsResponse> => {
  const sort = filters.sort ?? 'latest';
  const page = normalizePage(filters.page);
  const limit = normalizeLimit(filters.limit);
  const query = buildLeadQuery(filters, requestingUserId, requestingUserRole);
  const sortOrder = sort === 'latest' ? -1 : 1;
  const skip = (page - 1) * limit;

  const [leads, total] = await Promise.all([
    Lead.find(query).sort({ createdAt: sortOrder }).skip(skip).limit(limit).lean(),
    Lead.countDocuments(query),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    leads: leads.map((lead) => toLeadFromRecord(lead)),
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

export const getLeadById = async (
  leadId: string,
  userId: string,
  userRole: UserRole
): Promise<ILead> => {
  const lead = await Lead.findById(leadId).lean();
  if (!lead) throw new ApiError(404, 'Lead not found.');

  if (userRole === 'sales' && lead.createdBy.toString() !== userId) {
    throw new ApiError(403, 'Access denied.');
  }

  return toLeadFromRecord(lead);
};

export const updateLead = async (
  leadId: string,
  dto: UpdateLeadDTO,
  userId: string,
  userRole: UserRole
): Promise<ILead> => {
  const lead = await Lead.findById(leadId);
  if (!lead) throw new ApiError(404, 'Lead not found.');

  if (userRole === 'sales' && lead.createdBy.toString() !== userId) {
    throw new ApiError(403, 'Access denied.');
  }

  Object.assign(lead, dto);
  await lead.save();
  return toLead(lead);
};

export const deleteLead = async (
  leadId: string,
  userId: string,
  userRole: UserRole
): Promise<void> => {
  const lead = await Lead.findById(leadId);
  if (!lead) throw new ApiError(404, 'Lead not found.');

  if (userRole === 'sales' && lead.createdBy.toString() !== userId) {
    throw new ApiError(403, "Only admins can delete other users' leads.");
  }

  await lead.deleteOne();
};

export const getAllLeadsForExport = async (
  filters: Omit<LeadFilters, 'page' | 'limit'>,
  userId: string,
  userRole: UserRole
): Promise<ILead[]> => {
  const sort = filters.sort ?? 'latest';
  const query = buildLeadQuery(filters, userId, userRole);
  const leads = await Lead.find(query).sort({ createdAt: sort === 'latest' ? -1 : 1 }).lean();

  return leads.map((lead) => toLeadFromRecord(lead));
};
