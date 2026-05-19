import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, z } from 'zod';

export const validate = (schema: AnyZodObject) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err) {
      next(err);
    }
  };
};

const roleEnum = z.enum(['admin', 'sales']);
const statusEnum = z.enum(['New', 'Contacted', 'Qualified', 'Lost']);
const sourceEnum = z.enum(['Website', 'Instagram', 'Referral']);
const sortEnum = z.enum(['latest', 'oldest']);
const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid id');

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});

export const idParamSchema = z.object({
  params: z.object({
    id: objectId,
  }),
});

export const createLeadSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50),
    email: z.string().email('Invalid email address'),
    status: statusEnum,
    source: sourceEnum,
  }),
});

export const updateLeadSchema = z.object({
  params: z.object({
    id: objectId,
  }),
  body: z.object({
    name: z.string().min(2).max(50).optional(),
    email: z.string().email().optional(),
    status: statusEnum.optional(),
    source: sourceEnum.optional(),
  }),
});

export const getLeadsQuerySchema = z.object({
  query: z.object({
    status: statusEnum.optional(),
    source: sourceEnum.optional(),
    search: z.string().trim().max(100).optional(),
    sort: sortEnum.optional(),
    page: z.string().regex(/^\d+$/).optional(),
    limit: z.string().regex(/^\d+$/).optional(),
  }),
});
