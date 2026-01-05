// src/services/auth.service.ts
import api from './api';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface VerifyEmailData {
  userId: string;
  otp: string;
}

class AuthService {
  async register(data: RegisterData) {
    const response = await api.post('/auth/register', data);
    return response.data;
  }

  async verifyEmail(data: VerifyEmailData) {
    const response = await api.post('/auth/verify-email', data);
    return response.data;
  }

  async resendOtp(userId: string) {
    const response = await api.post('/auth/resend-otp', { userId });
    return response.data;
  }

  async login(data: LoginData) {
    const response = await api.post('/auth/login', data);
    localStorage.setItem('accessToken', response.data.data.accessToken);
    // Dispatch custom event to notify other parts of the app
    window.dispatchEvent(new CustomEvent('authTokenSet', { detail: { token: response.data.data.accessToken } }));
    return response.data;
  }

  async logout() {
    const response = await api.post('/auth/logout');
    localStorage.removeItem('accessToken');
    return response.data;
  }

  async forgotPassword(email: string) {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  }

  async resetPassword(token: string, password: string, confirmPassword: string) {
    const response = await api.post('/auth/reset-password', {
      token,
      password,
      confirmPassword,
    });
    return response.data;
  }

  async getMe() {
    const response = await api.get('/auth/me');
    return response.data;
  }
}

export default new AuthService();
