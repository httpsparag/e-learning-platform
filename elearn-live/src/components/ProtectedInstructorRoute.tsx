import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface ProtectedInstructorRouteProps {
  children: React.ReactNode;
}

export const ProtectedInstructorRoute = ({ children }: ProtectedInstructorRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('accessToken');
    const userRole = localStorage.getItem('userRole');
    
    if (!token || userRole !== 'instructor') {
      setIsAuthenticated(false);
      setUserRole(null);
      return;
    }

    try {
      // Verify token is still valid
      const response = await fetch('http://localhost:5000/api/auth/instructor/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setUserRole('instructor');
      } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userRole');
        setIsAuthenticated(false);
        setUserRole(null);
      }
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userRole');
      setIsAuthenticated(false);
      setUserRole(null);
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-b-2 border-emerald-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/instructor/auth" replace />;
  }

  return <>{children}</>;
};
