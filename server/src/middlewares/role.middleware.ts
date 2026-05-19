import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/ApiError.js';
import { UserRole } from '../types/lead.types.js';

export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new ApiError(401, 'Unauthorized. Please authenticate first.');
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(403, 'Forbidden. You do not have permission to access this resource.');
    }

    next();
  };
};
