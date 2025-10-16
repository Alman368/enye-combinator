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
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
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
  (error) => {
    // TODO: Handle common errors (401, 403, 500, etc.)
    return Promise.reject(error);
  }
);

export default api;

