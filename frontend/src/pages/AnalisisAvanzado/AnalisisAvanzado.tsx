/**
 * Análisis Avanzado Page
 *
 * Advanced analysis with complex visualizations and insights
 */

import { TrendingUp, BarChart3, Activity, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AnalisisAvanzado = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Análisis Avanzado</h2>
          <p className="text-muted-foreground">
            Análisis profundo y visualizaciones avanzadas
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Cambiar Vista
          </Button>
          <Button>
            <Activity className="h-4 w-4 mr-2" />
            Nuevo Análisis
          </Button>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tendencia General</p>
              <p className="text-2xl font-bold">+12.5%</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Incremento en diagnósticos vs. mes anterior
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-green-100 p-3">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tasa de Recuperación</p>
              <p className="text-2xl font-bold">78%</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Pacientes en seguimiento positivo
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-orange-100 p-3">
              <AlertCircle className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Casos Críticos</p>
              <p className="text-2xl font-bold">23</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Requieren atención inmediata
          </p>
        </div>
      </div>

      {/* Analysis Types */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Tipos de Análisis</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Análisis Temporal',
              description: 'Evolución de diagnósticos a lo largo del tiempo',
              icon: TrendingUp,
            },
            {
              title: 'Análisis Demográfico',
              description: 'Distribución por edad, género y región',
              icon: BarChart3,
            },
            {
              title: 'Análisis Comparativo',
              description: 'Comparación entre hospitales y períodos',
              icon: Activity,
            },
            {
              title: 'Análisis Predictivo',
              description: 'Predicción de tendencias futuras',
              icon: TrendingUp,
            },
            {
              title: 'Análisis de Correlación',
              description: 'Relaciones entre variables',
              icon: BarChart3,
            },
            {
              title: 'Análisis de Riesgo',
              description: 'Identificación de factores de riesgo',
              icon: AlertCircle,
            },
          ].map((analysis, index) => (
            <div
              key={index}
              className="rounded-lg border bg-card p-6 hover:bg-accent cursor-pointer transition-colors"
            >
              <analysis.icon className="h-8 w-8 mb-3 text-primary" />
              <h4 className="font-semibold mb-2">{analysis.title}</h4>
              <p className="text-sm text-muted-foreground">{analysis.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Visualizations */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Análisis de Correlación</h3>
          <div className="h-[350px] flex items-center justify-center text-muted-foreground">
            <p>Matriz de correlación - Relaciones entre variables</p>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Predicción de Tendencias</h3>
          <div className="h-[350px] flex items-center justify-center text-muted-foreground">
            <p>Gráfico predictivo - Proyección de casos futuros</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalisisAvanzado;

