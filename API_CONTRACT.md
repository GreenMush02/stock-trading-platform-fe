# API Contract - Stock Trading Platform

This document defines the API contract that the backend needs to implement for the frontend application.

## Base URLs

- **API Gateway**: `http://localhost:8080`
- **Market Data Service**: `http://localhost:8081`
- **Portfolio Service**: `http://localhost:8082`
- **Alert Service**: `http://localhost:8083`

## Common Patterns

### Response Format

All successful responses follow this structure:

```json
{
  "data": <T>,
  "message": "Optional success message",
  "success": true
}
```

### Error Response Format

All error responses follow this structure:

```json
{
  "message": "Error description",
  "statusCode": 400,
  "errors": {
    "field1": ["Error message 1", "Error message 2"],
    "field2": ["Error message"]
  }
}
```

### Pagination Response Format

```json
{
  "data": [<T>],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

### Authentication

Protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Endpoints

---

## 1. Authentication Service

### 1.1 User Registration

**Endpoint**: `POST /api/auth/register`

**Request Body**:
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "confirmPassword": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response** (201 Created):
```json
{
  "data": {
    "user": {
      "id": "uuid",
      "email": "john.doe@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here"
  },
  "success": true
}
```

**Validation Rules**:
- `email`: Valid email format, unique
- `password`: Min 6 characters
- `confirmPassword`: Must match password
- `firstName`: Min 2 characters
- `lastName`: Min 2 characters

---

### 1.2 User Login

**Endpoint**: `POST /api/auth/login`

**Request Body**:
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Response** (200 OK):
```json
{
  "data": {
    "user": {
      "id": "uuid",
      "email": "john.doe@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here"
  },
  "success": true
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid credentials

---

### 1.3 Token Refresh

**Endpoint**: `POST /api/auth/refresh`

**Request Body**:
```json
{
  "refreshToken": "refresh_token_here"
}
```

**Response** (200 OK):
```json
{
  "data": {
    "token": "new_jwt_token_here"
  },
  "success": true
}
```

---

### 1.4 Get Current User

**Endpoint**: `GET /api/auth/me`

**Headers**: `Authorization: Bearer <token>`

**Response** (200 OK):
```json
{
  "data": {
    "id": "uuid",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "success": true
}
```

---

### 1.5 Logout

**Endpoint**: `POST /api/auth/logout`

**Headers**: `Authorization: Bearer <token>`

**Response** (200 OK):
```json
{
  "data": null,
  "message": "Logged out successfully",
  "success": true
}
```

---

## 2. Market Data Service

### 2.1 Get Stocks List

**Endpoint**: `GET /api/stocks`

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)
- `search` (optional): Search by symbol or name

**Example**: `GET /api/stocks?page=1&limit=20&search=AAPL`

**Response** (200 OK):
```json
{
  "data": [
    {
      "symbol": "AAPL",
      "name": "Apple Inc.",
      "price": 175.50,
      "change": 2.50,
      "changePercent": 1.44,
      "volume": 52341234,
      "marketCap": 2800000000000,
      "lastUpdated": "2024-01-15T15:45:00Z"
    },
    {
      "symbol": "GOOGL",
      "name": "Alphabet Inc.",
      "price": 142.30,
      "change": -1.20,
      "changePercent": -0.84,
      "volume": 23456789,
      "marketCap": 1800000000000,
      "lastUpdated": "2024-01-15T15:45:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

---

### 2.2 Get Stock Detail

**Endpoint**: `GET /api/stocks/:symbol`

**Example**: `GET /api/stocks/AAPL`

**Response** (200 OK):
```json
{
  "data": {
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "price": 175.50,
    "change": 2.50,
    "changePercent": 1.44,
    "volume": 52341234,
    "marketCap": 2800000000000,
    "open": 173.00,
    "high": 176.20,
    "low": 172.80,
    "previousClose": 173.00,
    "exchange": "NASDAQ",
    "currency": "USD",
    "lastUpdated": "2024-01-15T15:45:00Z"
  },
  "success": true
}
```

**Error Responses**:
- `404 Not Found`: Stock not found

---

### 2.3 Search Stocks

**Endpoint**: `GET /api/stocks/search`

**Query Parameters**:
- `q` (required): Search query (symbol or company name)

**Example**: `GET /api/stocks/search?q=apple`

**Response** (200 OK):
```json
{
  "data": [
    {
      "symbol": "AAPL",
      "name": "Apple Inc.",
      "price": 175.50,
      "change": 2.50,
      "changePercent": 1.44,
      "volume": 52341234,
      "marketCap": 2800000000000,
      "lastUpdated": "2024-01-15T15:45:00Z"
    }
  ],
  "success": true
}
```

---

### 2.4 Get Stock Price History

**Endpoint**: `GET /api/stocks/:symbol/history`

**Query Parameters**:
- `interval` (optional): Time interval - `1m`, `5m`, `15m`, `1h`, `1d`, `1w`, `1M` (default: `1d`)

**Example**: `GET /api/stocks/AAPL/history?interval=1d`

**Response** (200 OK):
```json
{
  "data": {
    "symbol": "AAPL",
    "interval": "1d",
    "prices": [
      {
        "timestamp": "2024-01-10T00:00:00Z",
        "open": 170.00,
        "high": 172.50,
        "low": 169.50,
        "close": 171.80,
        "volume": 45123456
      },
      {
        "timestamp": "2024-01-11T00:00:00Z",
        "open": 171.80,
        "high": 174.20,
        "low": 171.50,
        "close": 173.00,
        "volume": 48234567
      }
    ]
  },
  "success": true
}
```

---

## 3. Portfolio Service

### 3.1 Get User Portfolio

**Endpoint**: `GET /api/portfolio`

**Headers**: `Authorization: Bearer <token>`

**Response** (200 OK):
```json
{
  "data": {
    "id": "uuid",
    "userId": "user_uuid",
    "totalValue": 125450.75,
    "totalCost": 100000.00,
    "totalGainLoss": 25450.75,
    "totalGainLossPercent": 25.45,
    "positions": [
      {
        "id": "position_uuid",
        "portfolioId": "portfolio_uuid",
        "symbol": "AAPL",
        "stockName": "Apple Inc.",
        "quantity": 100,
        "averagePrice": 150.00,
        "currentPrice": 175.50,
        "totalValue": 17550.00,
        "totalCost": 15000.00,
        "gainLoss": 2550.00,
        "gainLossPercent": 17.00,
        "createdAt": "2024-01-10T10:30:00Z",
        "updatedAt": "2024-01-15T15:45:00Z"
      }
    ],
    "createdAt": "2024-01-01T10:00:00Z",
    "updatedAt": "2024-01-15T15:45:00Z"
  },
  "success": true
}
```

---

### 3.2 Get Transaction History

**Endpoint**: `GET /api/portfolio/transactions`

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)

**Example**: `GET /api/portfolio/transactions?page=1&limit=20`

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": "transaction_uuid",
      "portfolioId": "portfolio_uuid",
      "symbol": "AAPL",
      "type": "BUY",
      "quantity": 10,
      "price": 175.50,
      "totalAmount": 1755.00,
      "createdAt": "2024-01-15T10:30:00Z"
    },
    {
      "id": "transaction_uuid_2",
      "portfolioId": "portfolio_uuid",
      "symbol": "GOOGL",
      "type": "SELL",
      "quantity": 5,
      "price": 142.30,
      "totalAmount": 711.50,
      "createdAt": "2024-01-14T15:45:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
```

---

### 3.3 Create Transaction

**Endpoint**: `POST /api/portfolio/transactions`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "symbol": "AAPL",
  "type": "BUY",
  "quantity": 10,
  "price": 175.50
}
```

**Validation Rules**:
- `symbol`: Required, valid stock symbol
- `type`: Required, must be "BUY" or "SELL"
- `quantity`: Required, positive integer
- `price`: Required, positive number

**Response** (201 Created):
```json
{
  "data": {
    "id": "transaction_uuid",
    "portfolioId": "portfolio_uuid",
    "symbol": "AAPL",
    "type": "BUY",
    "quantity": 10,
    "price": 175.50,
    "totalAmount": 1755.00,
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "success": true
}
```

**Error Responses**:
- `400 Bad Request`: Invalid data or insufficient shares for SELL
- `404 Not Found`: Stock not found

---

## 4. Alert Service

### 4.1 Get User Alerts

**Endpoint**: `GET /api/alerts`

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)
- `status` (optional): Filter by status - `ACTIVE`, `TRIGGERED`, `CANCELLED`, `EXPIRED`

**Example**: `GET /api/alerts?status=ACTIVE&page=1&limit=20`

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": "alert_uuid",
      "userId": "user_uuid",
      "symbol": "AAPL",
      "stockName": "Apple Inc.",
      "condition": "ABOVE",
      "targetPrice": 180.00,
      "currentPrice": 175.50,
      "status": "ACTIVE",
      "message": "Alert me when AAPL goes above $180",
      "createdAt": "2024-01-10T10:30:00Z",
      "triggeredAt": null
    },
    {
      "id": "alert_uuid_2",
      "userId": "user_uuid",
      "symbol": "TSLA",
      "stockName": "Tesla Inc.",
      "condition": "BELOW",
      "targetPrice": 200.00,
      "currentPrice": 205.30,
      "status": "ACTIVE",
      "message": null,
      "createdAt": "2024-01-12T14:20:00Z",
      "triggeredAt": null
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 12,
    "totalPages": 1
  }
}
```

---

### 4.2 Create Alert

**Endpoint**: `POST /api/alerts`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "symbol": "AAPL",
  "condition": "ABOVE",
  "targetPrice": 180.00,
  "message": "Alert me when AAPL goes above $180"
}
```

**Validation Rules**:
- `symbol`: Required, valid stock symbol
- `condition`: Required, must be "ABOVE" or "BELOW"
- `targetPrice`: Required, positive number
- `message`: Optional, max 255 characters

**Response** (201 Created):
```json
{
  "data": {
    "id": "alert_uuid",
    "userId": "user_uuid",
    "symbol": "AAPL",
    "stockName": "Apple Inc.",
    "condition": "ABOVE",
    "targetPrice": 180.00,
    "currentPrice": 175.50,
    "status": "ACTIVE",
    "message": "Alert me when AAPL goes above $180",
    "createdAt": "2024-01-15T10:30:00Z",
    "triggeredAt": null
  },
  "success": true
}
```

**Error Responses**:
- `400 Bad Request`: Invalid data
- `404 Not Found`: Stock not found

---

### 4.3 Update Alert

**Endpoint**: `PATCH /api/alerts/:id`

**Headers**: `Authorization: Bearer <token>`

**Request Body** (all fields optional):
```json
{
  "condition": "BELOW",
  "targetPrice": 170.00,
  "status": "CANCELLED",
  "message": "Updated message"
}
```

**Response** (200 OK):
```json
{
  "data": {
    "id": "alert_uuid",
    "userId": "user_uuid",
    "symbol": "AAPL",
    "stockName": "Apple Inc.",
    "condition": "BELOW",
    "targetPrice": 170.00,
    "currentPrice": 175.50,
    "status": "ACTIVE",
    "message": "Updated message",
    "createdAt": "2024-01-10T10:30:00Z",
    "triggeredAt": null
  },
  "success": true
}
```

**Error Responses**:
- `404 Not Found`: Alert not found or doesn't belong to user

---

### 4.4 Delete Alert

**Endpoint**: `DELETE /api/alerts/:id`

**Headers**: `Authorization: Bearer <token>`

**Response** (200 OK):
```json
{
  "data": null,
  "message": "Alert deleted successfully",
  "success": true
}
```

**Error Responses**:
- `404 Not Found`: Alert not found or doesn't belong to user

---

## 5. WebSocket API (Real-time Updates)

### Connection

**Endpoint**: `ws://localhost:8081/ws`

**Authentication**: Send token in connection query parameter or initial message

**Example**: `ws://localhost:8081/ws?token=<jwt_token>`

---

### Message Format

All WebSocket messages follow this structure:

```json
{
  "type": "MESSAGE_TYPE",
  "data": {},
  "timestamp": "2024-01-15T15:45:00Z"
}
```

---

### 5.1 Price Update Message

**Type**: `PRICE_UPDATE`

**Server → Client**:
```json
{
  "type": "PRICE_UPDATE",
  "data": {
    "symbol": "AAPL",
    "price": 175.50,
    "change": 2.50,
    "changePercent": 1.44,
    "volume": 52341234,
    "timestamp": "2024-01-15T15:45:00Z"
  },
  "timestamp": "2024-01-15T15:45:00Z"
}
```

---

### 5.2 Alert Triggered Message

**Type**: `ALERT_TRIGGERED`

**Server → Client**:
```json
{
  "type": "ALERT_TRIGGERED",
  "data": {
    "alertId": "alert_uuid",
    "symbol": "AAPL",
    "targetPrice": 180.00,
    "currentPrice": 180.50,
    "condition": "ABOVE",
    "message": "Alert me when AAPL goes above $180",
    "timestamp": "2024-01-15T15:45:00Z"
  },
  "timestamp": "2024-01-15T15:45:00Z"
}
```

---

### 5.3 Portfolio Update Message

**Type**: `PORTFOLIO_UPDATE`

**Server → Client**:
```json
{
  "type": "PORTFOLIO_UPDATE",
  "data": {
    "portfolioId": "portfolio_uuid",
    "totalValue": 125450.75,
    "totalGainLoss": 25450.75,
    "totalGainLossPercent": 25.45,
    "timestamp": "2024-01-15T15:45:00Z"
  },
  "timestamp": "2024-01-15T15:45:00Z"
}
```

---

## HTTP Status Codes

- `200 OK`: Successful GET, PATCH, DELETE
- `201 Created`: Successful POST
- `400 Bad Request`: Validation error or invalid data
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Authenticated but not authorized
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource conflict (e.g., duplicate email)
- `422 Unprocessable Entity`: Semantic errors
- `500 Internal Server Error`: Server error

---

## Data Types

### Enums

**Transaction Type**:
- `BUY`
- `SELL`

**Alert Condition**:
- `ABOVE`
- `BELOW`

**Alert Status**:
- `ACTIVE`: Alert is active and monitoring
- `TRIGGERED`: Alert condition has been met
- `CANCELLED`: User cancelled the alert
- `EXPIRED`: Alert has expired (optional feature)

**Price Interval**:
- `1m`: 1 minute
- `5m`: 5 minutes
- `15m`: 15 minutes
- `1h`: 1 hour
- `1d`: 1 day
- `1w`: 1 week
- `1M`: 1 month

---

## Notes for Backend Implementation

1. **Authentication**: Implement JWT-based authentication with access and refresh tokens
2. **Token Expiry**: Access tokens should expire after 15-30 minutes, refresh tokens after 7 days
3. **Rate Limiting**: Implement rate limiting on all endpoints
4. **CORS**: Configure CORS to allow the frontend origin
5. **Real-time Updates**: WebSocket should push updates for:
   - Stock price changes (for stocks in user's portfolio or watched stocks)
   - Alert triggers
   - Portfolio value changes
6. **Pagination**: Default to 20 items per page, max 100
7. **Timestamps**: Use ISO 8601 format (UTC)
8. **Decimal Precision**: Use appropriate precision for financial data (2 decimal places for prices)
9. **Transaction Validation**:
   - For SELL transactions, verify user has sufficient shares
   - For BUY transactions, optional: verify user has sufficient balance (if implementing balance)
10. **Stock Data**: Can use mock data or integrate with real stock market APIs (Alpha Vantage, IEX Cloud, etc.)

---

## Optional Enhancements

These features are not required but would enhance the platform:

1. **User Balance Management**: Track user's cash balance
2. **Order Types**: Support limit orders, stop-loss orders
3. **Watchlists**: Allow users to create watchlists
4. **Stock News**: Fetch and display news for stocks
5. **Portfolio Analytics**: Historical performance, dividend tracking
6. **Multi-portfolio Support**: Allow users to have multiple portfolios
7. **Social Features**: Share portfolios, follow other users
8. **Notifications**: Email/SMS notifications for alerts

---

**Version**: 1.0.0
**Last Updated**: 2024-01-15
