/**
 * StatsCards Component
 *
 * Displays key performance indicators
 */

import { Activity, Clock, Euro } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardData {
  title: string;
  value: string | number;
  subtitle: string;
  icon: 'ingresos' | 'estancia' | 'coste';
}

const stats: StatCardData[] = [
  {
    title: 'Ingresos',
    value: '1,247',
    subtitle: 'totales',
    icon: 'ingresos',
  },
  {
    title: 'Días estancia',
    value: '18.3',
    subtitle: 'media',
    icon: 'estancia',
  },
  {
    title: 'Coste medio',
    value: '4,521€',
    subtitle: '',
    icon: 'coste',
  },
];

const iconMap = {
  ingresos: Activity,
  estancia: Clock,
  coste: Euro,
};

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat, index) => {
        const Icon = iconMap[stat.icon];

        return (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.title} {stat.subtitle}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

