import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../models/User.model.js';
import { AuthResponse, JwtPayload, LoginDTO, RegisterDTO } from '../types/auth.types.js';
import { ApiError } from '../utils/ApiError.js';

const generateToken = (payload: JwtPayload): string => {
  const options: SignOptions = { expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'] };
  return jwt.sign(payload, env.JWT_SECRET, options);
};

export const registerUser = async (dto: RegisterDTO): Promise<AuthResponse> => {
  const existing = await User.findOne({ email: dto.email });
  if (existing) throw new ApiError(409, 'Email already in use.');

  const user = await User.create({
    ...dto,
    role: 'sales',
  });
  const token = generateToken({ userId: user._id.toString(), role: user.role });

  return {
    token,
    user: {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    },
  };
};

export const loginUser = async (dto: LoginDTO): Promise<AuthResponse> => {
  const user = await User.findOne({ email: dto.email }).select('+password');
  if (!user) throw new ApiError(401, 'Invalid credentials.');

  const isMatch = await user.comparePassword(dto.password);
  if (!isMatch) throw new ApiError(401, 'Invalid credentials.');

  const token = generateToken({ userId: user._id.toString(), role: user.role });

  return {
    token,
    user: {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    },
  };
};

export const getCurrentUser = async (userId: string): Promise<AuthResponse['user']> => {
  const user = await User.findById(userId).lean();
  if (!user) throw new ApiError(404, 'User not found.');

  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
};

export const createAdminUser = async (dto: RegisterDTO): Promise<AuthResponse['user']> => {
  const existing = await User.findOne({ email: dto.email });
  if (existing) throw new ApiError(409, 'Email already in use.');

  const user = await User.create({
    ...dto,
    role: 'admin',
  });

  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
};

export const getAllAdmins = async (): Promise<AuthResponse['user'][]> => {
  const admins = await User.find({ role: 'admin' }).sort({ createdAt: -1 }).lean();
  return admins.map((user) => ({
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  }));
};
