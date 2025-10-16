/**
 * StatsCards Component
 *
 * Displays key performance indicators
 */

import { Card, CardContent } from '@/components/ui/card';

interface StatCardData {
  title: string;
  value: string | number;
  subtitle: string;
}

const stats: StatCardData[] = [
  {
    title: 'Ingresos',
    value: '1,247',
    subtitle: 'totales',
  },
  {
    title: 'Días estancia',
    value: '18.3',
    subtitle: 'media',
  },
  {
    title: 'Coste medio',
    value: '4,521€',
    subtitle: '',
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-2 grid-rows-3 h-full">
      {stats.map((stat, index) => {
        return (
          <Card key={index} className="flex items-center">
            <CardContent className="p-3 w-full">
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">
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

