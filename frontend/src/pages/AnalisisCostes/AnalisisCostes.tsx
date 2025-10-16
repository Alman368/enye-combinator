/**
 * Análisis de Costes Page
 *
 * Cost analysis and budget management for mental health services
 */

import { DollarSign, TrendingDown, TrendingUp, PieChart, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AnalisisCostes = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Análisis de Costes</h2>
          <p className="text-muted-foreground">
            Gestión y análisis de costes hospitalarios
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calculator className="h-4 w-4 mr-2" />
            Calculadora
          </Button>
          <Button>
            <PieChart className="h-4 w-4 mr-2" />
            Informe Costes
          </Button>
        </div>
      </div>

      {/* Cost Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Coste Total</h3>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold mt-2">€2.4M</p>
          <p className="text-xs text-muted-foreground mt-1">Último trimestre</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Coste Medio</h3>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold mt-2">€1,945</p>
          <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
            <TrendingDown className="h-3 w-3" />
            -5% vs. anterior
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Hospital Más Eficiente</h3>
            <TrendingDown className="h-4 w-4 text-green-600" />
          </div>
          <p className="text-2xl font-bold mt-2">Hospital A</p>
          <p className="text-xs text-muted-foreground mt-1">€1,234/paciente</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Proyección Anual</h3>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </div>
          <p className="text-3xl font-bold mt-2">€9.6M</p>
          <p className="text-xs text-orange-600 mt-1">+8% estimado</p>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Desglose de Costes</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6">
            <h4 className="font-semibold mb-4">Por Categoría de Diagnóstico</h4>
            <div className="space-y-3">
              {[
                { category: 'Depresión', cost: '€856K', percentage: 36, color: 'bg-primary' },
                { category: 'Ansiedad', cost: '€624K', percentage: 26, color: 'bg-blue-500' },
                { category: 'Trastorno Bipolar', cost: '€432K', percentage: 18, color: 'bg-green-600' },
                { category: 'Esquizofrenia', cost: '€288K', percentage: 12, color: 'bg-orange-600' },
                { category: 'Otros', cost: '€192K', percentage: 8, color: 'bg-gray-400' },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium">{item.category}</span>
                    <span className="text-muted-foreground">{item.cost}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h4 className="font-semibold mb-4">Por Hospital</h4>
            <div className="space-y-3">
              {[
                { hospital: 'Hospital General', cost: '€720K', patients: 370 },
                { hospital: 'Hospital Psiquiátrico', cost: '€648K', patients: 290 },
                { hospital: 'Centro de Salud Mental', cost: '€432K', patients: 245 },
                { hospital: 'Hospital Provincial', cost: '€384K', patients: 198 },
                { hospital: 'Otros Centros', cost: '€216K', patients: 131 },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                >
                  <div>
                    <p className="font-medium text-sm">{item.hospital}</p>
                    <p className="text-xs text-muted-foreground">{item.patients} pacientes</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{item.cost}</p>
                    <p className="text-xs text-muted-foreground">
                      €{Math.round(parseInt(item.cost.replace(/[€K]/g, '')) * 1000 / item.patients)}/pac
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cost Analysis Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Evolución de Costes</h3>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            <p>Gráfico de líneas - Evolución mensual de costes</p>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Comparativa Hospitales</h3>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            <p>Gráfico de barras - Coste por hospital</p>
          </div>
        </div>
      </div>

      {/* Budget Alerts */}
      <div className="rounded-lg border bg-orange-50 border-orange-200 p-6">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-orange-100 p-2">
            <DollarSign className="h-5 w-5 text-orange-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-orange-900 mb-1">Alertas Presupuestarias</h4>
            <p className="text-sm text-orange-800">
              El Hospital General ha superado el 85% de su presupuesto trimestral. Se recomienda
              revisar la asignación de recursos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalisisCostes;

