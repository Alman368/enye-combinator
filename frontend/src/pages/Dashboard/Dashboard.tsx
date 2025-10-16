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
    <div className="space-y-2">
      {/* First Row: Timeline Chart + KPI Cards */}
      <div className="grid gap-2 lg:grid-cols-[1fr_300px]">
        <TimelineChart />
        <StatsCards />
      </div>

      {/* Second Row: Top Diagnósticos and Severity */}
      <div className="grid gap-2 lg:grid-cols-2">
        <TopDiagnosticsChart />
        <SeverityRadialChart />
      </div>
    </div>
  );
};

export default Dashboard;

