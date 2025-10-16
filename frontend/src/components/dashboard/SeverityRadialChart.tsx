/**
 * SeverityRadialChart Component
 *
 * Radial chart showing APR severity distribution with labels
 */

import { TrendingUp } from 'lucide-react';
import { LabelList, RadialBar, RadialBarChart } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  { nivel: 'Nivel 1', casos: 972, fill: 'var(--color-nivel1)' },
  { nivel: 'Nivel 2', casos: 224, fill: 'var(--color-nivel2)' },
  { nivel: 'Nivel 3', casos: 37, fill: 'var(--color-nivel3)' },
  { nivel: 'Nivel 4', casos: 14, fill: 'var(--color-nivel4)' },
];

const chartConfig = {
  casos: {
    label: 'Casos',
  },
  nivel1: {
    label: 'Nivel 1',
    color: 'hsl(201 83% 24%)', // Primary - darkest
  },
  nivel2: {
    label: 'Nivel 2',
    color: 'hsl(199 89% 35%)', // Primary - dark
  },
  nivel3: {
    label: 'Nivel 3',
    color: 'hsl(199 89% 48%)', // Primary - medium
  },
  nivel4: {
    label: 'Nivel 4',
    color: 'hsl(197 92% 61%)', // Primary - light
  },
} satisfies ChartConfig;

export function SeverityRadialChart() {
  const totalCases = chartData.reduce((acc, curr) => acc + curr.casos, 0);
  const nivel1Percentage = Math.round((chartData[0].casos / totalCases) * 100);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribución Severidad APR</CardTitle>
        <CardDescription>Niveles de complejidad (Año 2024)</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="nivel" />}
            />
            <RadialBar dataKey="casos" background>
              <LabelList
                position="insideStart"
                dataKey="nivel"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {nivel1Percentage}% en Nivel 1 (baja complejidad) <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando distribución por severidad APR-GRD
        </div>
      </CardFooter>
    </Card>
  );
}

