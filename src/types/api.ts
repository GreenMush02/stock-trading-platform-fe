// API Response Types

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

// Stock Market Types
export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  lastUpdated: string;
}

export interface StockDetail extends Stock {
  open: number;
  high: number;
  low: number;
  previousClose: number;
  exchange: string;
  currency: string;
}

export interface StockPriceHistory {
  symbol: string;
  prices: PricePoint[];
  interval: '1m' | '5m' | '15m' | '1h' | '1d' | '1w' | '1M';
}

export interface PricePoint {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Portfolio Types
export interface Portfolio {
  id: string;
  userId: string;
  totalValue: number;
  totalCost: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  positions: Position[];
  createdAt: string;
  updatedAt: string;
}

export interface Position {
  id: string;
  portfolioId: string;
  symbol: string;
  stockName: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  totalValue: number;
  totalCost: number;
  gainLoss: number;
  gainLossPercent: number;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  portfolioId: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  totalAmount: number;
  createdAt: string;
}

export interface CreateTransactionRequest {
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
}

// Alert Types
export interface Alert {
  id: string;
  userId: string;
  symbol: string;
  stockName: string;
  condition: AlertCondition;
  targetPrice: number;
  currentPrice: number;
  status: AlertStatus;
  message?: string;
  createdAt: string;
  triggeredAt?: string;
}

export type AlertCondition = 'ABOVE' | 'BELOW';
export type AlertStatus = 'ACTIVE' | 'TRIGGERED' | 'CANCELLED' | 'EXPIRED';

export interface CreateAlertRequest {
  symbol: string;
  condition: AlertCondition;
  targetPrice: number;
  message?: string;
}

export interface UpdateAlertRequest {
  condition?: AlertCondition;
  targetPrice?: number;
  status?: AlertStatus;
  message?: string;
}

// WebSocket Message Types
export interface WebSocketMessage<T = unknown> {
  type: 'PRICE_UPDATE' | 'ALERT_TRIGGERED' | 'PORTFOLIO_UPDATE';
  data: T;
  timestamp: string;
}

export interface PriceUpdateMessage {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  timestamp: string;
}

export interface AlertTriggeredMessage {
  alertId: string;
  symbol: string;
  targetPrice: number;
  currentPrice: number;
  condition: AlertCondition;
  message?: string;
  timestamp: string;
}
