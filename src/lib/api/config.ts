// API Configuration

export const API_CONFIG = {
  gateway: process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://localhost:8080',
  marketData: process.env.NEXT_PUBLIC_MARKET_DATA_URL || 'http://localhost:8081',
  portfolio: process.env.NEXT_PUBLIC_PORTFOLIO_URL || 'http://localhost:8082',
  alert: process.env.NEXT_PUBLIC_ALERT_URL || 'http://localhost:8083',
  ws: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8081/ws',
} as const;

export const API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    refresh: '/api/auth/refresh',
    me: '/api/auth/me',
  },
  // Market Data endpoints
  stocks: {
    list: '/api/stocks',
    detail: (symbol: string) => `/api/stocks/${symbol}`,
    search: '/api/stocks/search',
    history: (symbol: string) => `/api/stocks/${symbol}/history`,
  },
  // Portfolio endpoints
  portfolio: {
    get: '/api/portfolio',
    positions: '/api/portfolio/positions',
    transactions: '/api/portfolio/transactions',
    createTransaction: '/api/portfolio/transactions',
  },
  // Alert endpoints
  alerts: {
    list: '/api/alerts',
    create: '/api/alerts',
    detail: (id: string) => `/api/alerts/${id}`,
    update: (id: string) => `/api/alerts/${id}`,
    delete: (id: string) => `/api/alerts/${id}`,
  },
} as const;

export const REQUEST_TIMEOUT = 30000; // 30 seconds
