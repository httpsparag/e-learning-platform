import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface ProtectedInstructorRouteProps {
  children: React.ReactNode;
}

export const ProtectedInstructorRoute = ({ children }: ProtectedInstructorRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Simple check: just verify token exists and role is correct
    const token = localStorage.getItem('accessToken');
    const userRole = localStorage.getItem('userRole');

    console.log('🔍 ProtectedInstructorRoute Check:', {
      hasToken: !!token,
      userRole,
      hasInstructorName: !!localStorage.getItem('instructorName'),
    });

    if (token && userRole === 'instructor') {
      console.log('✅ Token exists and role is instructor - allowing access');
      setIsAuthenticated(true);
      // Don't verify token on page load - let API calls handle 401
      // This avoids logout due to temporary network/backend issues
    } else {
      console.log('❌ No valid token or role - redirecting to login');
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-b-2 rounded-full border-emerald-600 animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/instructor/auth" replace />;
  }

  return <>{children}</>;
};
