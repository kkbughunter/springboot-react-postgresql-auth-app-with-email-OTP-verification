import { useState } from 'react';
import { authService } from '../services/authService';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const register = async (userData) => {
    setLoading(true);
    setError('');
    const result = await authService.register(userData);
    setLoading(false);
    if (!result.success) {
      setError(result.error);
    }
    return result;
  };

  const login = async (credentials) => {
    setLoading(true);
    setError('');
    const result = await authService.login(credentials);
    setLoading(false);
    if (!result.success) {
      setError(result.error);
    }
    return result;
  };

  const sendOtp = async (email) => {
    setLoading(true);
    setError('');
    const result = await authService.sendOtp(email);
    setLoading(false);
    if (!result.success) {
      setError(result.error);
    }
    return result;
  };

  const verifyOtp = async (otpData) => {
    setLoading(true);
    setError('');
    const result = await authService.verifyOtp(otpData);
    setLoading(false);
    if (!result.success) {
      setError(result.error);
    }
    return result;
  };

  return {
    loading,
    error,
    register,
    login,
    sendOtp,
    verifyOtp,
    logout: authService.logout,
    isAuthenticated: authService.isAuthenticated,
  };
};