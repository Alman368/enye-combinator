/**
 * TimelineChart Component
 *
 * Line chart showing average hospital admissions per month
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

// Monthly average admissions data
const chartData = [
  { month: 'Ene', ingresos: 154 },
  { month: 'Feb', ingresos: 167 },
  { month: 'Mar', ingresos: 201 },
  { month: 'Abr', ingresos: 232 },
  { month: 'May', ingresos: 254 },
  { month: 'Jun', ingresos: 281 },
  { month: 'Jul', ingresos: 272 },
  { month: 'Ago', ingresos: 243 },
  { month: 'Sep', ingresos: 213 },
  { month: 'Oct', ingresos: 185 },
  { month: 'Nov', ingresos: 166 },
  { month: 'Dic', ingresos: 152 },
];

const chartConfig = {
  ingresos: {
    label: 'Ingresos',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function TimelineChart() {
  // Calculate the average admissions for the year
  const averageIngresos = React.useMemo(
    () => Math.round(chartData.reduce((acc, curr) => acc + curr.ingresos, 0) / chartData.length),
    []
  );

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Evolución Temporal de Ingresos</CardTitle>
          <CardDescription>
            Media de ingresos por mes (Año 2024)
          </CardDescription>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-muted-foreground text-xs">
              Media anual
            </span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              {averageIngresos}
            </span>
          </div>
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
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="ingresos"
                />
              }
            />
            <Line
              dataKey="ingresos"
              type="monotone"
              stroke="var(--color-ingresos)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

