/**
 * TopDiagnosticsChart Component
 *
 * Mixed horizontal bar chart showing top 5 diagnoses with AI insights
 */

import { TrendingUp, Sparkles, AlertCircle, Info } from 'lucide-react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
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
  { diagnosis: 'depresion', label: 'F32.9 - Depresión', casos: 342, fill: 'var(--color-depresion)' },
  { diagnosis: 'esquizofrenia', label: 'F20.0 - Esquizofrenia', casos: 287, fill: 'var(--color-esquizofrenia)' },
  { diagnosis: 'bipolar', label: 'F31.0 - Bipolar', casos: 213, fill: 'var(--color-bipolar)' },
  { diagnosis: 'esquizoafectivo', label: 'F25.0 - Esquizoafectivo', casos: 189, fill: 'var(--color-esquizoafectivo)' },
  { diagnosis: 'ansiedad', label: 'F41.9 - Ansiedad', casos: 156, fill: 'var(--color-ansiedad)' },
];

const chartConfig = {
  casos: {
    label: 'Casos',
  },
  depresion: {
    label: 'F32.9 - Depresión',
    color: 'hsl(201 83% 24%)', // Primary darkest
  },
  esquizofrenia: {
    label: 'F20.0 - Esquizofrenia',
    color: 'hsl(199 89% 35%)', // Primary dark
  },
  bipolar: {
    label: 'F31.0 - Bipolar',
    color: 'hsl(199 89% 48%)', // Primary medium
  },
  esquizoafectivo: {
    label: 'F25.0 - Esquizoafectivo',
    color: 'hsl(197 92% 61%)', // Primary light
  },
  ansiedad: {
    label: 'F41.9 - Ansiedad',
    color: 'hsl(185 94% 37%)', // Teal
  },
} satisfies ChartConfig;

const insights = [
  {
    type: 'pattern',
    icon: TrendingUp,
    title: 'Patrón detectado',
    message: 'Los ingresos por ansiedad (F41.x) aumentan un 34% en enero vs media anual.',
    detail: 'Correlación con período post-navideño.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    type: 'alert',
    icon: AlertCircle,
    title: 'Anomalía detectada',
    message: 'Aumento inusual de casos de depresión severa en Málaga (+45%).',
    detail: 'Se recomienda investigación adicional.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
  },
  {
    type: 'optimization',
    icon: Info,
    title: 'Optimización sugerida',
    message: 'La estancia media puede reducirse 2.3 días con protocolos mejorados.',
    detail: 'Basado en análisis de casos similares.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
];

export function TopDiagnosticsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 5 Diagnósticos</CardTitle>
        <CardDescription>Principales códigos CIE-10 (Año 2024)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Chart Section */}
          <div className="space-y-4">
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                  left: 0,
                }}
              >
                <YAxis
                  dataKey="diagnosis"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
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
            <div className="flex gap-2 text-sm font-medium leading-none">
              Depresión lidera con 342 casos <TrendingUp className="h-4 w-4" />
            </div>
          </div>

          {/* AI Insights Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <h3 className="text-sm font-semibold text-purple-900">
                Insights Generados por IA Oracle 23ai
              </h3>
              <span className="ml-auto text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                IA Activa
              </span>
            </div>
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div
                  key={index}
                  className={`rounded-lg border ${insight.borderColor} ${insight.bgColor} p-3`}
                >
                  <div className="flex gap-2">
                    <div className={`mt-0.5 ${insight.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className={`font-semibold text-xs ${insight.color}`}>
                        {insight.title}
                      </p>
                      <p className="text-xs font-medium text-gray-900">
                        {insight.message}
                      </p>
                      <p className="text-xs text-gray-600">
                        {insight.detail}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="mt-3 p-2 rounded-lg bg-purple-50 border border-purple-200">
              <p className="text-xs text-purple-900 font-medium">
                Último análisis: Hace 5 minutos
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Mostrando los 5 diagnósticos más frecuentes con análisis automático de IA
      </CardFooter>
    </Card>
  );
}

