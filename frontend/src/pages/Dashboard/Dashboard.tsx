/**
 * Dashboard Page
 *
 * Main dashboard with overview statistics and key charts
 * Complete MindHealth Analytics dashboard with AI insights
 */

import { StatsCards } from '@/components/dashboard/StatsCards';
import { TimelineChart } from '@/components/dashboard/TimelineChart';
import { TopDiagnosticsChart } from '@/components/dashboard/TopDiagnosticsChart';
import { SeverityRadialChart } from '@/components/dashboard/SeverityRadialChart';
import { GeographicMap } from '@/components/dashboard/GeographicMap';

const Dashboard = () => {
  return (
        <div className="space-y-4">
      {/* KPI Cards */}
      <StatsCards />

      {/* Timeline Chart */}
      <TimelineChart />

      {/* Second Row: Top Diagnósticos with AI Insights, Severity, Geographic Map */}
      <div className="grid gap-4 lg:grid-cols-2">
        <TopDiagnosticsChart />

        <div className="space-y-4">
          <SeverityRadialChart />
          <GeographicMap />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

