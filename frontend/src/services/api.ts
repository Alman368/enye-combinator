/**
 * API Configuration
 *
 * This file configures the Axios instance for API calls
 *
 * TODO:
 * - Set base URL (environment variable)
 * - Configure interceptors for authentication
 * - Add error handling
 * - Add request/response logging
 */

import axios from 'axios';

// Base API configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (for adding auth tokens, etc.)
api.interceptors.request.use(
  (config) => {
    // TODO: Add authentication token
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (for error handling)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const authModule = await import('./authService');
        const newToken = await authModule.default.refreshToken();
        
        // Retry original request with new token
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    if (error.response?.status === 403) {
      console.error('Forbidden: You do not have permission to access this resource');
    } else if (error.response?.status === 404) {
      console.error('Not found: The requested resource does not exist');
    } else if (error.response?.status >= 500) {
      console.error('Server error: Please try again later');
    }

    return Promise.reject(error);
  }
);

export default api;

