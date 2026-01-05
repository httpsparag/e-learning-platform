import React, { createContext, useState, useCallback, useEffect } from 'react';
import authService from '../services/auth.service';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  register: (name: string, email: string, password: string, confirmPassword: string) => Promise<any>;
  verifyEmail: (userId: string, otp: string) => Promise<any>;
  resendOtp: (userId: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  forgotPassword: (email: string) => Promise<any>;
  resetPassword: (token: string, password: string, confirmPassword: string) => Promise<any>;
  getMe: () => Promise<any>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const response = await authService.getMe();
          if (response.success && response.data) {
            setUser(response.data);
            setIsAuthenticated(true);
          }
        } catch (error) {
          localStorage.removeItem('accessToken');
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const register = useCallback(async (name: string, email: string, password: string, confirmPassword: string) => {
    setIsLoading(true);
    try {
      const response = await authService.register({ name, email, password, confirmPassword });
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }, []);

  const verifyEmail = useCallback(async (userId: string, otp: string) => {
    setIsLoading(true);
    try {
      const response = await authService.verifyEmail({ userId, otp });
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }, []);

  const resendOtp = useCallback(async (userId: string) => {
    setIsLoading(true);
    try {
      const response = await authService.resendOtp(userId);
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      if (response.success && response.data) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    setIsLoading(true);
    try {
      const response = await authService.forgotPassword(email);
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }, []);

  const resetPassword = useCallback(async (token: string, password: string, confirmPassword: string) => {
    setIsLoading(true);
    try {
      const response = await authService.resetPassword(token, password, confirmPassword);
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }, []);

  const getMe = useCallback(async () => {
    try {
      const response = await authService.getMe();
      if (response.success && response.data) {
        setUser(response.data);
        setIsAuthenticated(true);
      }
      return response;
    } catch (error) {
      throw error;
    }
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    register,
    verifyEmail,
    resendOtp,
    login,
    logout,
    forgotPassword,
    resetPassword,
    getMe,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
