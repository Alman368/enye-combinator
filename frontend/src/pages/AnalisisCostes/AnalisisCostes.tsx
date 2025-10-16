/**
 * Análisis de Costes Page
 *
 * Cost analysis with charts and insights for mental health services
 */

import { DollarSign, TrendingUp, Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Line, LineChart } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

// Mock data basado en los registros reales
const costesPorDiagnostico = [
  { diagnosis: 'Depresión', coste: 4250, casos: 342, fill: 'var(--color-depresion)' },
  { diagnosis: 'Esquizofrenia', coste: 5890, casos: 287, fill: 'var(--color-esquizofrenia)' },
  { diagnosis: 'Bipolar', coste: 5120, casos: 213, fill: 'var(--color-bipolar)' },
  { diagnosis: 'Esquizoafectivo', coste: 6340, casos: 189, fill: 'var(--color-esquizoafectivo)' },
  { diagnosis: 'Ansiedad', coste: 2980, casos: 156, fill: 'var(--color-ansiedad)' },
];

const costesPorSeveridad = [
  { nivel: 'Nivel 1', costePromedio: 3200, casos: 972 },
  { nivel: 'Nivel 2', costePromedio: 5800, casos: 224 },
  { nivel: 'Nivel 3', costePromedio: 8900, casos: 37 },
  { nivel: 'Nivel 4', costePromedio: 12400, casos: 14 },
];

const evolucionCostes = [
  { mes: 'Ene', coste: 415000 },
  { mes: 'Feb', coste: 432000 },
  { mes: 'Mar', coste: 468000 },
  { mes: 'Abr', coste: 521000 },
  { mes: 'May', coste: 548000 },
  { mes: 'Jun', coste: 592000 },
  { mes: 'Jul', coste: 578000 },
  { mes: 'Ago', coste: 524000 },
  { mes: 'Sep', coste: 489000 },
  { mes: 'Oct', coste: 445000 },
  { mes: 'Nov', coste: 428000 },
  { mes: 'Dic', coste: 412000 },
];

const costesPorServicio = [
  { servicio: 'Psiquiatría', coste: 5240, casos: 687, fill: 'hsl(201 83% 24%)' },
  { servicio: 'Neurología', coste: 3890, casos: 560, fill: 'hsl(199 89% 48%)' },
];

const hospitalesAnonimos = [
  { hospital: 'Hospital A', costePromedio: 3456, casos: 342, eficiencia: 'Alta' },
  { hospital: 'Hospital B', costePromedio: 4821, casos: 287, eficiencia: 'Media' },
  { hospital: 'Hospital C', costePromedio: 4123, casos: 213, eficiencia: 'Media' },
  { hospital: 'Hospital D', costePromedio: 5234, casos: 189, eficiencia: 'Baja' },
  { hospital: 'Hospital E', costePromedio: 3789, casos: 156, eficiencia: 'Alta' },
];

const chartConfig = {
  coste: {
    label: 'Coste €',
  },
  depresion: {
    label: 'Depresión',
    color: 'hsl(201 83% 24%)',
  },
  esquizofrenia: {
    label: 'Esquizofrenia',
    color: 'hsl(199 89% 35%)',
  },
  bipolar: {
    label: 'Bipolar',
    color: 'hsl(199 89% 48%)',
  },
  esquizoafectivo: {
    label: 'Esquizoafectivo',
    color: 'hsl(197 92% 61%)',
  },
  ansiedad: {
    label: 'Ansiedad',
    color: 'hsl(185 94% 37%)',
  },
} satisfies ChartConfig;

const AnalisisCostes = () => {
  const totalCases = costesPorDiagnostico.reduce((acc, curr) => acc + curr.casos, 0);
  const avgCost = Math.round(
    costesPorDiagnostico.reduce((acc, curr) => acc + curr.coste * curr.casos, 0) / totalCases
  );
  const totalYearlyCost = evolucionCostes.reduce((acc, curr) => acc + curr.coste, 0);

  return (
    <div className="space-y-4">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-3xl font-bold">{totalCases.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-1">Casos totales</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-3xl font-bold">{avgCost.toLocaleString()}€</p>
              <p className="text-sm text-muted-foreground mt-1">Coste medio</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-3xl font-bold">{(totalYearlyCost / 1000000).toFixed(1)}M€</p>
              <p className="text-sm text-muted-foreground mt-1">Coste anual</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-3xl font-bold">5</p>
              <p className="text-sm text-muted-foreground mt-1">Hospitales</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Evolución Temporal de Costes */}
      <Card>
        <CardHeader>
          <CardTitle>Evolución Mensual de Costes</CardTitle>
          <CardDescription>Distribución de costes por mes (Año 2024)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <LineChart
              data={evolucionCostes}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="mes"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K€`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => `${(Number(value) / 1000).toFixed(0)}K€`}
                  />
                }
              />
              <Line
                dataKey="coste"
                type="monotone"
                stroke="hsl(201 83% 24%)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Segunda fila: Costes por Diagnóstico y Severidad */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Coste Promedio por Diagnóstico */}
        <Card>
          <CardHeader>
            <CardTitle>Coste Promedio por Diagnóstico</CardTitle>
            <CardDescription>Comparativa de costes medios (€)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart
                data={costesPorDiagnostico}
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
                />
                <XAxis
                  type="number"
                  hide
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel formatter={(value) => `${value}€`} />}
                />
                <Bar dataKey="coste" layout="vertical" radius={5} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Coste por Severidad */}
        <Card>
          <CardHeader>
            <CardTitle>Coste por Nivel de Severidad</CardTitle>
            <CardDescription>Impacto de la severidad en costes</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                costePromedio: {
                  label: 'Coste Promedio €',
                  color: 'hsl(199 89% 48%)',
                },
              }}
              className="h-[300px]"
            >
              <BarChart
                data={costesPorSeveridad}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="nivel"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}K€`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => `${Number(value).toLocaleString()}€`}
                    />
                  }
                />
                <Bar dataKey="costePromedio" fill="hsl(199 89% 48%)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tercera fila: Servicios y Hospitales */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Costes por Servicio */}
        <Card>
          <CardHeader>
            <CardTitle>Costes por Servicio</CardTitle>
            <CardDescription>Comparativa entre servicios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {costesPorServicio.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{item.servicio}</p>
                      <p className="text-sm text-muted-foreground">{item.casos} casos</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{item.coste.toLocaleString()}€</p>
                      <p className="text-xs text-muted-foreground">promedio</p>
                    </div>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all"
                      style={{
                        width: `${(item.coste / 6000) * 100}%`,
                        backgroundColor: item.fill,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Eficiencia Hospitalaria */}
        <Card>
          <CardHeader>
            <CardTitle>Eficiencia por Hospital</CardTitle>
            <CardDescription>Hospitales anónimos ordenados por coste</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {hospitalesAnonimos.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        item.eficiencia === 'Alta'
                          ? 'bg-green-500'
                          : item.eficiencia === 'Media'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    />
                    <div>
                      <p className="font-medium text-sm">{item.hospital}</p>
                      <p className="text-xs text-muted-foreground">{item.casos} casos</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{item.costePromedio.toLocaleString()}€</p>
                    <p className="text-xs text-muted-foreground">
                      {item.eficiencia === 'Alta' ? (
                        <span className="text-green-600">✓ Eficiente</span>
                      ) : item.eficiencia === 'Media' ? (
                        <span className="text-yellow-600">○ Medio</span>
                      ) : (
                        <span className="text-red-600">⚠ Mejorable</span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Análisis y Recomendaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h4 className="font-semibold text-green-900">Punto Fuerte</h4>
              </div>
              <p className="text-sm text-green-800">
                El Hospital A mantiene costes 23% por debajo del promedio manteniendo calidad de atención
              </p>
            </div>

            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold text-blue-900">Oportunidad</h4>
              </div>
              <p className="text-sm text-blue-800">
                Casos de Severidad 3-4 representan solo 4% de casos pero 28% de costes totales
              </p>
            </div>

            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-orange-600" />
                <h4 className="font-semibold text-orange-900">Recomendación</h4>
              </div>
              <p className="text-sm text-orange-800">
                Implementar protocolos del Hospital A en hospitales con mayor coste promedio
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalisisCostes;
