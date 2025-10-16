/**
 * TopDiagnosticsChart Component
 *
 * Horizontal bar chart showing top 5 diagnoses
 */

import { Bar, BarChart, XAxis, YAxis } from 'recharts';
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
  { diagnosis: 'depresion', label: 'Depresión', casos: 342, fill: 'var(--color-depresion)' },
  { diagnosis: 'esquizofrenia', label: 'Esquizofrenia', casos: 287, fill: 'var(--color-esquizofrenia)' },
  { diagnosis: 'bipolar', label: 'Bipolar', casos: 213, fill: 'var(--color-bipolar)' },
  { diagnosis: 'esquizoafectivo', label: 'Esquizoafectivo', casos: 189, fill: 'var(--color-esquizoafectivo)' },
  { diagnosis: 'ansiedad', label: 'Ansiedad', casos: 156, fill: 'var(--color-ansiedad)' },
];

const chartConfig = {
  casos: {
    label: 'Casos',
  },
  depresion: {
    label: 'Depresión',
    color: 'hsl(201 83% 24%)', // Primary darkest
  },
  esquizofrenia: {
    label: 'Esquizofrenia',
    color: 'hsl(199 89% 35%)', // Primary dark
  },
  bipolar: {
    label: 'Bipolar',
    color: 'hsl(199 89% 48%)', // Primary medium
  },
  esquizoafectivo: {
    label: 'Esquizoafectivo',
    color: 'hsl(197 92% 61%)', // Primary light
  },
  ansiedad: {
    label: 'Ansiedad',
    color: 'hsl(185 94% 37%)', // Teal
  },
} satisfies ChartConfig;

export function TopDiagnosticsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 5 Diagnósticos</CardTitle>
        <CardDescription>Principales códigos CIE-10 (Año 2024)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 10,
              right: 20,
            }}
          >
            <YAxis
              dataKey="diagnosis"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={110}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="casos" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="casos" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

