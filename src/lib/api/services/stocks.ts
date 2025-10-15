import { apiClient, apiRequest } from '../client';
import { API_ENDPOINTS } from '../config';
import type { Stock, StockDetail, StockPriceHistory, PaginatedResponse } from '@/types';

export const stocksService = {
  /**
   * Get list of stocks with pagination
   */
  async getStocks(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedResponse<Stock>> {
    return apiRequest<PaginatedResponse<Stock>>(
      apiClient.marketData,
      'get',
      API_ENDPOINTS.stocks.list,
      undefined,
      { params }
    );
  },

  /**
   * Get detailed information for a specific stock
   */
  async getStockDetail(symbol: string): Promise<StockDetail> {
    return apiRequest<StockDetail>(
      apiClient.marketData,
      'get',
      API_ENDPOINTS.stocks.detail(symbol)
    );
  },

  /**
   * Search stocks by symbol or name
   */
  async searchStocks(query: string): Promise<Stock[]> {
    return apiRequest<Stock[]>(
      apiClient.marketData,
      'get',
      API_ENDPOINTS.stocks.search,
      undefined,
      { params: { q: query } }
    );
  },

  /**
   * Get price history for a stock
   */
  async getStockHistory(
    symbol: string,
    interval: '1m' | '5m' | '15m' | '1h' | '1d' | '1w' | '1M' = '1d'
  ): Promise<StockPriceHistory> {
    return apiRequest<StockPriceHistory>(
      apiClient.marketData,
      'get',
      API_ENDPOINTS.stocks.history(symbol),
      undefined,
      { params: { interval } }
    );
  },
};
