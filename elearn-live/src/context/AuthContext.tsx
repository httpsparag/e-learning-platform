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
      const userRole = localStorage.getItem('userRole');
      
      if (token && userRole) {
        // Just trust localStorage, don't verify with backend
        // This prevents 401 errors on page refresh
        try {
          const userData = JSON.parse(localStorage.getItem('user') || '{}');
          if (userData.id || userData._id) {
            const user: User = {
              id: userData._id || userData.id,
              name: userData.name || localStorage.getItem('instructorName') || 'User',
              email: userData.email || localStorage.getItem('instructorEmail') || '',
              role: userRole,
              avatar: userData.avatar,
            };
            setUser(user);
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.log('Error parsing user data from localStorage');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Listen for token changes
  useEffect(() => {
    const handleTokenSet = async () => {
      const token = localStorage.getItem('accessToken');
      const userRole = localStorage.getItem('userRole');
      
      if (token && userRole) {
        try {
          const userData = JSON.parse(localStorage.getItem('user') || '{}');
          if (userData.id || userData._id) {
            const user: User = {
              id: userData._id || userData.id,
              name: userData.name || localStorage.getItem('instructorName') || 'User',
              email: userData.email || localStorage.getItem('instructorEmail') || '',
              role: userRole,
              avatar: userData.avatar,
            };
            setUser(user);
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.log('Error parsing user data from localStorage');
          setIsAuthenticated(false);
        }
      }
    };

    window.addEventListener('authTokenSet', handleTokenSet);
    return () => window.removeEventListener('authTokenSet', handleTokenSet);
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
        const userData = response.data.user || response.data;
        // Map _id to id for consistency
        const user: User = {
          id: userData._id || userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          avatar: userData.avatar,
        };
        setUser(user);
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
