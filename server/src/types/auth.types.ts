import { UserRole } from './lead.types.js';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface JwtPayload {
  userId: string;
  role: UserRole;
}

export type SafeUser = Omit<IUser, 'password'>;

export interface AuthResponse {
  token: string;
  user: SafeUser;
}
