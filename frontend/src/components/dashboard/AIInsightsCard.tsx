/**
 * AIInsightsCard Component
 *
 * Displays AI-generated insights from Oracle 23ai
 */

import { Sparkles, TrendingUp, AlertCircle, Info } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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

export function AIInsightsCard() {
  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <CardTitle className="text-purple-900">
              Insights Generados por IA Oracle 23ai
            </CardTitle>
          </div>
          <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
            IA Activa
          </span>
        </div>
        <CardDescription className="text-purple-700">
          Análisis automático y detección de patrones
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div
              key={index}
              className={`rounded-lg border-2 ${insight.borderColor} ${insight.bgColor} p-4`}
            >
              <div className="flex gap-3">
                <div className={`mt-0.5 ${insight.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className={`font-semibold text-sm ${insight.color}`}>
                      {insight.title}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
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

        <div className="mt-4 flex items-center justify-between p-3 rounded-lg bg-purple-100/50 border border-purple-200">
          <p className="text-xs text-purple-900 font-medium">
            Último análisis: Hace 5 minutos
          </p>
          <button className="text-xs text-purple-700 hover:text-purple-900 font-medium underline">
            Ver todos los insights →
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

