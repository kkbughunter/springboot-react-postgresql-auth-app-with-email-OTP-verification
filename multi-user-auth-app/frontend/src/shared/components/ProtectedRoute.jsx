import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authService } from '../../features/auth/services/authService';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (authService.getToken()) {
        const isValid = await authService.validateToken();
        setIsAuthenticated(isValid);
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;