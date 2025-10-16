/**
 * Dashboard Page
 *
 * Main dashboard with overview statistics and key charts
 * Complete Ñ Combinator dashboard with AI insights
 */

import { StatsCards } from '@/components/dashboard/StatsCards';
import { TimelineChart } from '@/components/dashboard/TimelineChart';
import { TopDiagnosticsChart } from '@/components/dashboard/TopDiagnosticsChart';
import { SeverityRadialChart } from '@/components/dashboard/SeverityRadialChart';

const Dashboard = () => {
  return (
        <div className="space-y-4">
      {/* KPI Cards */}
      <StatsCards />

      {/* Timeline Chart */}
      <TimelineChart />

      {/* Second Row: Top Diagnósticos and Severity */}
      <div className="grid gap-4 lg:grid-cols-2">
        <TopDiagnosticsChart />
        <SeverityRadialChart />
      </div>
    </div>
  );
};

export default Dashboard;

