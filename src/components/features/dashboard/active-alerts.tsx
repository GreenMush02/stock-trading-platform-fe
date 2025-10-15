'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, TrendingUp, TrendingDown } from 'lucide-react';

export function ActiveAlerts() {
  // Mock data - will be replaced with real API data
  const alerts = [
    {
      id: '1',
      symbol: 'AAPL',
      condition: 'ABOVE',
      targetPrice: 180.00,
      currentPrice: 175.50,
      status: 'ACTIVE',
    },
    {
      id: '2',
      symbol: 'TSLA',
      condition: 'BELOW',
      targetPrice: 200.00,
      currentPrice: 205.30,
      status: 'ACTIVE',
    },
    {
      id: '3',
      symbol: 'NVDA',
      condition: 'ABOVE',
      targetPrice: 500.00,
      currentPrice: 495.75,
      status: 'ACTIVE',
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Active Alerts</CardTitle>
        <Bell className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                {alert.condition === 'ABOVE' ? (
                  <TrendingUp className="h-5 w-5 text-green-500" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-500" />
                )}
                <div>
                  <p className="font-medium">{alert.symbol}</p>
                  <p className="text-sm text-muted-foreground">
                    {alert.condition === 'ABOVE' ? 'Above' : 'Below'} ${alert.targetPrice.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${alert.currentPrice.toFixed(2)}</p>
                <Badge variant="outline" className="mt-1">
                  {alert.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
