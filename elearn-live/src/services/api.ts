// src/services/api.ts
import axios, { AxiosError } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Track if we're already refreshing the token to avoid multiple refresh requests
let isRefreshing = false;
let failedQueue: Array<{
  onSuccess: (token: string) => void;
  onFailed: (error: AxiosError) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.onFailed(error);
    } else if (token) {
      prom.onSuccess(token);
    }
  });
  failedQueue = [];
};

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((onSuccess, onFailed) => {
          failedQueue.push({
            onSuccess: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              onSuccess(api(originalRequest));
            },
            onFailed: (err: AxiosError) => onFailed(err),
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call refresh endpoint - HTTP-only cookie is sent automatically with withCredentials
        const { data } = await axios.post(
          `${API_URL}/auth/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );

        if (data.success && data.data?.accessToken) {
          localStorage.setItem('accessToken', data.data.accessToken);
          
          // Update the original request with new token
          originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
          
          // Process the queue of failed requests
          processQueue(null, data.data.accessToken);
          isRefreshing = false;
          
          // Retry the original request
          return api(originalRequest);
        } else {
          throw new Error('Token refresh failed');
        }
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        window.location.href = '/auth/login';
        processQueue(refreshError as AxiosError, null);
        isRefreshing = false;
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
