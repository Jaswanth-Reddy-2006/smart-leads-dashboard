import { axiosInstance } from './axiosInstance';
import { ApiResponse } from '../types/api.types';
import { AuthCredentials, AuthResponse, RegisterPayload, User } from '../types/auth.types';

export const login = async (payload: AuthCredentials): Promise<AuthResponse> => {
  const response = await axiosInstance.post<ApiResponse<AuthResponse>>('/auth/login', payload);
  return response.data.data;
};

export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const response = await axiosInstance.post<ApiResponse<AuthResponse>>('/auth/register', payload);
  return response.data.data;
};

export const fetchCurrentUser = async (): Promise<User> => {
  const response = await axiosInstance.get<ApiResponse<User>>('/auth/me');
  return response.data.data;
};

export const createAdmin = async (payload: RegisterPayload): Promise<User> => {
  const response = await axiosInstance.post<ApiResponse<User>>('/auth/create-admin', payload);
  return response.data.data;
};

export const fetchAdmins = async (): Promise<User[]> => {
  const response = await axiosInstance.get<ApiResponse<User[]>>('/auth/admins');
  return response.data.data;
};
