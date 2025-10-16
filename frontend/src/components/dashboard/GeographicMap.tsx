/**
 * GeographicMap Component
 *
 * Distribution by hospital facilities in Andalucía
 */

import { Hospital } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const hospitals = [
  { name: 'Hospital Regional Universitario', cases: 342, color: 'hsl(201 83% 24%)' },
  { name: 'Hospital Virgen del Rocío', cases: 287, color: 'hsl(199 89% 35%)' },
  { name: 'Hospital Clínico San Cecilio', cases: 213, color: 'hsl(199 89% 48%)' },
  { name: 'Hospital Universitario Reina Sofía', cases: 189, color: 'hsl(197 92% 61%)' },
  { name: 'Hospital Puerta del Mar', cases: 156, color: 'hsl(195 95% 70%)' },
];

export function GeographicMap() {
  const maxCases = Math.max(...hospitals.map(h => h.cases));
  const totalCases = hospitals.reduce((acc, h) => acc + h.cases, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Casos por Hospital</CardTitle>
        <CardDescription>Principales centros hospitalarios en Andalucía</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {hospitals.map((hospital, index) => {
            const percentage = (hospital.cases / maxCases) * 100;
            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Hospital className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{hospital.name}</span>
                  </div>
                  <span className="text-muted-foreground font-mono">
                    {hospital.cases} casos
                  </span>
                </div>
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: hospital.color
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 p-3 rounded-lg bg-muted/50 border">
          <p className="text-xs text-muted-foreground">
            <strong>Total Andalucía:</strong> {totalCases.toLocaleString()} casos registrados en {hospitals.length} hospitales principales
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

