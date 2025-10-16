/**
 * Authentication Service
 *
 * This service handles user authentication with JWT tokens
 */

import api from './api';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'admin' | 'researcher' | 'viewer';
  is_active: boolean;
}

const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

const authService = {
  /**
   * Login user with email and password
   */
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      // FastAPI OAuth2 expects form data with 'username' field
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await api.post<LoginResponse>('/auth/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      // Store tokens
      localStorage.setItem(TOKEN_KEY, response.data.access_token);
      localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh_token);

      // Update axios default headers
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;

      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Logout user and clear tokens
   */
  logout: async (): Promise<void> => {
    try {
      // Call backend logout endpoint
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout backend call failed:', error);
      // Continue with logout even if backend call fails
    } finally {
      // Always clear tokens from storage
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);

      // Remove authorization header
      delete api.defaults.headers.common['Authorization'];
    }
  },

  /**
   * Get current authenticated user
   */
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await api.get<User>('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  /**
   * Refresh access token using refresh token
   */
  refreshToken: async (): Promise<string> => {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post<LoginResponse>('/auth/refresh', {
        refresh_token: refreshToken,
      });

      // Update tokens
      localStorage.setItem(TOKEN_KEY, response.data.access_token);
      localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh_token);

      // Update axios header
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;

      return response.data.access_token;
    } catch (error) {
      console.error('Refresh token error:', error);
      // If refresh fails, logout user
      authService.logout();
      throw error;
    }
  },

  /**
   * Get stored access token
   */
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Initialize auth service (call on app start)
   */
  init: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  },
};

export default authService;

