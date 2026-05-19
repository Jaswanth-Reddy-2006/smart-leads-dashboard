import { ReactNode, createContext, useMemo } from 'react';
import { useAuthStore } from '../store/authStore';
import { User } from '../types/auth.types';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const { user, token, isAuthenticated, logout } = useAuthStore();
  const value = useMemo(
    () => ({ user, token, isAuthenticated, logout }),
    [user, token, isAuthenticated, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
