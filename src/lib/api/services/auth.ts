import { apiClient, apiRequest, setAuthTokens, clearTokens } from '../client';
import { API_ENDPOINTS } from '../config';
import type { LoginRequest, RegisterRequest, AuthResponse, User } from '@/types';

export const authService = {
  /**
   * Login with email and password
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiRequest<AuthResponse>(
      apiClient.gateway,
      'post',
      API_ENDPOINTS.auth.login,
      credentials
    );

    // Store tokens
    setAuthTokens(response.token, response.refreshToken);

    return response;
  },

  /**
   * Register a new user
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiRequest<AuthResponse>(
      apiClient.gateway,
      'post',
      API_ENDPOINTS.auth.register,
      userData
    );

    // Store tokens
    setAuthTokens(response.token, response.refreshToken);

    return response;
  },

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    try {
      await apiRequest<void>(
        apiClient.gateway,
        'post',
        API_ENDPOINTS.auth.logout
      );
    } finally {
      // Clear tokens even if request fails
      clearTokens();
    }
  },

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<User> {
    return apiRequest<User>(
      apiClient.gateway,
      'get',
      API_ENDPOINTS.auth.me
    );
  },
};
