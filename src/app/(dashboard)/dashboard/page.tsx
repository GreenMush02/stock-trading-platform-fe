import { PortfolioSummary } from '@/components/features/dashboard/portfolio-summary';
import { RecentActivity } from '@/components/features/dashboard/recent-activity';
import { ActiveAlerts } from '@/components/features/dashboard/active-alerts';

export default function DashboardPage() {
  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your portfolio and recent activity
          </p>
        </div>

        <PortfolioSummary />

        <div className="grid gap-4 md:grid-cols-2">
          <RecentActivity />
          <ActiveAlerts />
        </div>
      </div>
    </div>
  );
}
