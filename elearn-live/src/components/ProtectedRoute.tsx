import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import authService from '../services/auth.service';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const response = await authService.getMe();
      setIsAuthenticated(true);
      setUserRole(response.data.user.role);
    } catch (error) {
      setIsAuthenticated(false);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
