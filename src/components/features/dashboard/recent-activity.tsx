'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function RecentActivity() {
  // Mock data - will be replaced with real API data
  const activities = [
    {
      id: '1',
      type: 'BUY',
      symbol: 'AAPL',
      quantity: 10,
      price: 175.50,
      date: '2024-01-15T10:30:00Z',
    },
    {
      id: '2',
      type: 'SELL',
      symbol: 'GOOGL',
      quantity: 5,
      price: 142.30,
      date: '2024-01-14T15:45:00Z',
    },
    {
      id: '3',
      type: 'BUY',
      symbol: 'MSFT',
      quantity: 15,
      price: 420.75,
      date: '2024-01-13T11:20:00Z',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-4">
                <Badge variant={activity.type === 'BUY' ? 'default' : 'secondary'}>
                  {activity.type}
                </Badge>
                <div>
                  <p className="font-medium">{activity.symbol}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.quantity} shares @ ${activity.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  ${(activity.quantity * activity.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(activity.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
