import { apiClient, apiRequest } from '../client';
import { API_ENDPOINTS } from '../config';
import type { Portfolio, Transaction, CreateTransactionRequest, PaginatedResponse } from '@/types';

export const portfolioService = {
  /**
   * Get user's portfolio
   */
  async getPortfolio(): Promise<Portfolio> {
    return apiRequest<Portfolio>(
      apiClient.portfolio,
      'get',
      API_ENDPOINTS.portfolio.get
    );
  },

  /**
   * Get transaction history
   */
  async getTransactions(params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Transaction>> {
    return apiRequest<PaginatedResponse<Transaction>>(
      apiClient.portfolio,
      'get',
      API_ENDPOINTS.portfolio.transactions,
      undefined,
      { params }
    );
  },

  /**
   * Create a new transaction (buy/sell)
   */
  async createTransaction(transaction: CreateTransactionRequest): Promise<Transaction> {
    return apiRequest<Transaction>(
      apiClient.portfolio,
      'post',
      API_ENDPOINTS.portfolio.createTransaction,
      transaction
    );
  },
};
