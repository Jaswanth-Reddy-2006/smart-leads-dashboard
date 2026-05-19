import { Request, Response } from 'express';
import * as AuthService from '../services/auth.service.js';
import { LoginDTO, RegisterDTO } from '../types/auth.types.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const auth = await AuthService.registerUser(req.body as RegisterDTO);
  res.status(201).json(new ApiResponse(auth, 'Registered successfully'));
});

export const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const auth = await AuthService.loginUser(req.body as LoginDTO);
  res.status(200).json(new ApiResponse(auth, 'Logged in successfully'));
});

export const me = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.user) throw new ApiError(401, 'Unauthorized');
  const user = await AuthService.getCurrentUser(req.user.userId);
  res.status(200).json(new ApiResponse(user));
});

export const createAdmin = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = await AuthService.createAdminUser(req.body as RegisterDTO);
  res.status(201).json(new ApiResponse(user, 'Admin created successfully'));
});

export const getAdmins = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const admins = await AuthService.getAllAdmins();
  res.status(200).json(new ApiResponse(admins));
});
