# Stock Trading Platform - Frontend

A modern, real-time stock trading and portfolio management platform built with Next.js 14+, TypeScript, and Tailwind CSS.

## Project Overview

This is the frontend application for a comprehensive stock trading platform that allows users to:
- View real-time stock prices and market data
- Manage their investment portfolio
- Execute buy/sell transactions
- Set up price alerts for stocks
- Monitor portfolio performance

## Technology Stack

### Core Technologies
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI primitives)

### Key Libraries
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Charts**: Recharts, TradingView Lightweight Charts
- **Themes**: next-themes
- **Notifications**: Sonner (toast)
- **Icons**: Lucide React
- **Date Utils**: date-fns

## Project Structure

```
frontend/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Auth route group (login, register)
│   │   ├── (dashboard)/              # Dashboard route group
│   │   │   ├── dashboard/            # Main dashboard
│   │   │   ├── stocks/               # Stock search and details
│   │   │   ├── portfolio/            # Portfolio management
│   │   │   └── alerts/               # Price alerts
│   │   ├── layout.tsx                # Root layout with providers
│   │   └── page.tsx                  # Landing page (redirects to login)
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   ├── layout/                   # Layout components (Header, Footer, etc.)
│   │   ├── features/                 # Feature-specific components
│   │   │   └── dashboard/            # Dashboard components
│   │   └── providers/                # React providers (Theme, etc.)
│   ├── lib/
│   │   ├── api/                      # API client and services
│   │   │   ├── client.ts             # Axios instance with interceptors
│   │   │   ├── config.ts             # API endpoints configuration
│   │   │   └── services/             # API service modules
│   │   │       ├── auth.ts           # Authentication services
│   │   │       ├── stocks.ts         # Stock market data services
│   │   │       ├── portfolio.ts      # Portfolio services
│   │   │       └── alerts.ts         # Alert services
│   │   ├── hooks/                    # Custom React hooks
│   │   └── utils.ts                  # Utility functions
│   └── types/
│       ├── api.ts                    # API type definitions
│       └── index.ts                  # Type exports
├── public/                           # Static assets
├── .env.local                        # Environment variables (local)
├── .env.example                      # Environment variables template
├── components.json                   # shadcn/ui configuration
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json                      # Dependencies
```

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
# API Gateway (main entry point)
NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:8080

# Direct service endpoints (for development)
NEXT_PUBLIC_MARKET_DATA_URL=http://localhost:8081
NEXT_PUBLIC_PORTFOLIO_URL=http://localhost:8082
NEXT_PUBLIC_ALERT_URL=http://localhost:8083

# WebSocket endpoint
NEXT_PUBLIC_WS_URL=ws://localhost:8081/ws

# Application settings
NEXT_PUBLIC_APP_NAME="Stock Trading Platform"
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Available Scripts

```bash
npm run dev          # Start development server (with Turbopack)
npm run build        # Build for production (with Turbopack)
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## API Integration

### API Client

The application uses Axios with custom interceptors for:
- **Authentication**: Automatically adds Bearer token to requests
- **Token Refresh**: Handles 401 errors and refreshes expired tokens
- **Error Handling**: Transforms errors to consistent ApiError format

### Service Organization

API calls are organized by domain:

```typescript
// Authentication
import { authService } from '@/lib/api';
await authService.login({ email, password });
await authService.register(userData);

// Stocks
import { stocksService } from '@/lib/api';
await stocksService.getStocks({ page: 1, limit: 20 });
await stocksService.getStockDetail('AAPL');

// Portfolio
import { portfolioService } from '@/lib/api';
await portfolioService.getPortfolio();
await portfolioService.createTransaction({ symbol: 'AAPL', type: 'BUY', quantity: 10, price: 175.50 });

// Alerts
import { alertsService } from '@/lib/api';
await alertsService.createAlert({ symbol: 'AAPL', condition: 'ABOVE', targetPrice: 180 });
```

## Features

### Authentication
- Login page with email/password validation
- Registration with form validation (Zod)
- JWT token management (access + refresh)
- Protected routes (to be implemented)

### Dashboard
- Portfolio summary cards (total value, gain/loss, positions count)
- Recent transaction activity
- Active price alerts
- Real-time updates (to be connected)

### Stocks
- Stock search functionality
- Stock list with pagination
- Individual stock detail view (to be implemented)
- Real-time price updates (to be connected)

### Portfolio
- Portfolio overview
- Position management
- Transaction history
- Add/remove transactions

### Alerts
- Create price alerts (above/below)
- View active alerts
- View triggered alerts
- Alert management (update, delete)

## UI Components

### shadcn/ui Components Available
- Avatar
- Badge
- Button
- Card
- Dialog
- Dropdown Menu
- Form (with React Hook Form integration)
- Input
- Label
- Select
- Separator
- Skeleton
- Sonner (Toast notifications)
- Table
- Tabs

### Layout Components
- **Header**: Navigation, theme toggle, user menu
- **Footer**: Links and copyright
- **MainLayout**: Wrapper with header and footer

## Styling

### Tailwind CSS v4
- Custom design tokens in `globals.css`
- Dark mode support via `next-themes`
- Responsive design (mobile-first)
- Custom color system with OKLCH

### Theme
- Light/Dark mode toggle
- System preference detection
- Persistent theme selection

## Type Safety

### TypeScript Configuration
- Strict mode enabled
- No implicit any
- Path aliases configured (`@/` for `src/`)

### Type Definitions
All API requests/responses are fully typed in `src/types/api.ts`:
- Request types (LoginRequest, CreateAlertRequest, etc.)
- Response types (ApiResponse<T>, PaginatedResponse<T>)
- Domain models (User, Stock, Portfolio, Alert, etc.)
- WebSocket message types

## Development Best Practices

### Code Organization
- **Components**: Small, reusable, single responsibility
- **API Services**: Domain-separated, typed, with error handling
- **Types**: Centralized in `src/types/`
- **Hooks**: Custom hooks in `src/lib/hooks/`

### Naming Conventions
- **Components**: PascalCase (e.g., `PortfolioSummary`)
- **Files**: kebab-case for directories, PascalCase for components
- **Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE

### State Management
- Local state: `useState` for component state
- Form state: React Hook Form
- Global state: Zustand (to be implemented as needed)
- Server state: React Query (recommended for data fetching)

## Next Steps (To Be Implemented)

1. **Authentication Context**
   - User state management
   - Protected route wrapper
   - Automatic token refresh

2. **Real-time Updates**
   - WebSocket connection for stock prices
   - Real-time portfolio updates
   - Alert notifications

3. **Stock Detail Pages**
   - Price charts (TradingView Lightweight Charts)
   - Historical data visualization
   - Buy/sell transaction forms

4. **Enhanced Portfolio**
   - Performance charts
   - Position detail modals
   - Export functionality

5. **Alert System**
   - Real-time alert triggers
   - Browser notifications
   - Alert history

6. **Error Boundaries**
   - Global error handling
   - Fallback UI components
   - Error logging

7. **Loading States**
   - Skeleton loaders
   - Loading spinners
   - Suspense boundaries

8. **Testing**
   - Unit tests (Jest/Vitest)
   - Component tests (React Testing Library)
   - E2E tests (Playwright)

## Backend Integration

The frontend is designed to connect to these backend services:

- **API Gateway**: `http://localhost:8080` - Main entry point
- **Market Data Service**: `http://localhost:8081` - Stock data
- **Portfolio Service**: `http://localhost:8082` - Portfolio management
- **Alert Service**: `http://localhost:8083` - Price alerts

**Note**: Backend services are in development. The frontend uses mock data for now.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [React Hook Form Documentation](https://react-hook-form.com)
- [Zod Documentation](https://zod.dev)

## Contributing

When contributing to this project:
1. Follow existing code style and conventions
2. Ensure TypeScript strict mode compliance
3. Write meaningful commit messages
4. Test your changes thoroughly
5. Update this documentation as needed

## License

[Add license information]

---

**Last Updated**: 2024-01-15
**Version**: 1.0.0
