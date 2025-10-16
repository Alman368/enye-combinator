/**
 * Dashboard Page
 *
 * Main dashboard with overview statistics and key charts
 * Complete MindHealth Analytics dashboard with AI insights
 */

import { Calendar, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { TimelineChart } from '@/components/dashboard/TimelineChart';
import { TopDiagnosticsChart } from '@/components/dashboard/TopDiagnosticsChart';
import { SeverityRadialChart } from '@/components/dashboard/SeverityRadialChart';
import { GeographicMap } from '@/components/dashboard/GeographicMap';

const Dashboard = () => {
  return (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              <p className="text-muted-foreground">
                Visión general de datos de salud mental
              </p>
            </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Filtro de fechas
          </Button>
          <Button size="sm">
            <FileDown className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
        </div>
      </div>

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

