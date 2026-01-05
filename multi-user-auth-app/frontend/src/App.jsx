import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './features/auth/components/Login';
import Register from './features/auth/components/Register';
import VerifyOtp from './features/auth/components/VerifyOtp';
import Dashboard from './features/dashboard/Dashboard';
import ProtectedRoute from './shared/components/ProtectedRoute';
import NotFound from './shared/components/NotFound';
import LoadingSpinner from './shared/components/LoadingSpinner';
import { authService } from './features/auth/services/authService';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (authService.getToken()) {
        const isValid = await authService.checkAuthOnRefresh();
        setIsAuthenticated(isValid);
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? authService.getLandingUrl() : "/login"} replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
