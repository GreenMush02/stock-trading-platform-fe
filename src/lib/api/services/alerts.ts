import { apiClient, apiRequest } from '../client';
import { API_ENDPOINTS } from '../config';
import type { Alert, CreateAlertRequest, UpdateAlertRequest, PaginatedResponse } from '@/types';

export const alertsService = {
  /**
   * Get all alerts for current user
   */
  async getAlerts(params?: {
    page?: number;
    limit?: number;
    status?: 'ACTIVE' | 'TRIGGERED' | 'CANCELLED' | 'EXPIRED';
  }): Promise<PaginatedResponse<Alert>> {
    return apiRequest<PaginatedResponse<Alert>>(
      apiClient.alert,
      'get',
      API_ENDPOINTS.alerts.list,
      undefined,
      { params }
    );
  },

  /**
   * Create a new price alert
   */
  async createAlert(alert: CreateAlertRequest): Promise<Alert> {
    return apiRequest<Alert>(
      apiClient.alert,
      'post',
      API_ENDPOINTS.alerts.create,
      alert
    );
  },

  /**
   * Update an existing alert
   */
  async updateAlert(id: string, updates: UpdateAlertRequest): Promise<Alert> {
    return apiRequest<Alert>(
      apiClient.alert,
      'patch',
      API_ENDPOINTS.alerts.update(id),
      updates
    );
  },

  /**
   * Delete an alert
   */
  async deleteAlert(id: string): Promise<void> {
    return apiRequest<void>(
      apiClient.alert,
      'delete',
      API_ENDPOINTS.alerts.delete(id)
    );
  },
};
