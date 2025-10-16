/**
 * TimelineChart Component
 *
 * Interactive line chart showing temporal evolution of hospital admissions
 */

import * as React from 'react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { date: '2024-01-01', urgencias: 89, programados: 65 },
  { date: '2024-01-15', urgencias: 95, programados: 72 },
  { date: '2024-02-01', urgencias: 103, programados: 78 },
  { date: '2024-02-15', urgencias: 98, programados: 81 },
  { date: '2024-03-01', urgencias: 112, programados: 89 },
  { date: '2024-03-15', urgencias: 118, programados: 92 },
  { date: '2024-04-01', urgencias: 127, programados: 98 },
  { date: '2024-04-15', urgencias: 134, programados: 105 },
  { date: '2024-05-01', urgencias: 142, programados: 112 },
  { date: '2024-05-15', urgencias: 149, programados: 118 },
  { date: '2024-06-01', urgencias: 156, programados: 125 },
  { date: '2024-06-15', urgencias: 162, programados: 131 },
  { date: '2024-07-01', urgencias: 149, programados: 123 },
  { date: '2024-07-15', urgencias: 143, programados: 118 },
  { date: '2024-08-01', urgencias: 134, programados: 109 },
  { date: '2024-08-15', urgencias: 128, programados: 103 },
  { date: '2024-09-01', urgencias: 118, programados: 95 },
  { date: '2024-09-15', urgencias: 112, programados: 89 },
  { date: '2024-10-01', urgencias: 103, programados: 82 },
  { date: '2024-10-15', urgencias: 98, programados: 76 },
  { date: '2024-11-01', urgencias: 95, programados: 71 },
  { date: '2024-11-15', urgencias: 92, programados: 68 },
  { date: '2024-12-01', urgencias: 89, programados: 65 },
  { date: '2024-12-15', urgencias: 87, programados: 63 },
];

const chartConfig = {
  ingresos: {
    label: 'Ingresos',
  },
  urgencias: {
    label: 'Urgencias',
    color: 'hsl(var(--chart-1))',
  },
  programados: {
    label: 'Programados',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function TimelineChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('urgencias');

  const total = React.useMemo(
    () => ({
      urgencias: chartData.reduce((acc, curr) => acc + curr.urgencias, 0),
      programados: chartData.reduce((acc, curr) => acc + curr.programados, 0),
    }),
    []
  );

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Evolución Temporal de Ingresos</CardTitle>
          <CardDescription>
            Comparación de ingresos por urgencias vs programados (últimos 12 meses)
          </CardDescription>
        </div>
        <div className="flex">
          {['urgencias', 'programados'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('es-ES', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="ingresos"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('es-ES', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

