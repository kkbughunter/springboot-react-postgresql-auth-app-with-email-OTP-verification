
import { authAPI } from '../../../shared/services/api';

export const authService = {
  async register(userData) {
    try {
      const response = await authAPI.register(userData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.responseMessage || 'Registration failed' 
      };
    }
  },

  async login(credentials) {
    try {
      const response = await authAPI.login(credentials);
      if (response.data.responseData.token) {
        localStorage.setItem('token', response.data.responseData.token);
        localStorage.setItem('refreshToken', response.data.responseData.refreshToken);
        localStorage.setItem('userRole', response.data.responseData.roleCode);
        localStorage.setItem('landingUrl', response.data.responseData.landingUrl);
      }
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.responseMessage || 'Login failed' 
      };
    }
  },

  async sendOtp(email) {
    try {
      const response = await authAPI.sendOtp(email);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.responseMessage || 'Failed to send OTP' 
      };
    }
  },

  async verifyOtp(otpData) {
    try {
      const response = await authAPI.verifyOtp(otpData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.responseMessage || 'OTP verification failed' 
      };
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('landingUrl');
  },

  getToken() {
    return localStorage.getItem('token');
  },

  async validateToken() {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const response = await fetch('http://localhost:8080/api/auth/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') })
      });
      
      if (!response.ok) {
        this.logout();
        return false;
      }
      return true;
    } catch (error) {
      // If server is down, assume token is valid to avoid logout on connection issues
      return true;
    }
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  async checkAuthOnRefresh() {
    const token = this.getToken();
    if (!token) {
      window.location.href = '/login';
      return false;
    }
    
    const isValid = await this.validateToken();
    if (!isValid) {
      window.location.href = '/login';
      return false;
    }
    return true;
  },

  getLandingUrl() {
    return localStorage.getItem('landingUrl') || '/dashboard';
  }
};