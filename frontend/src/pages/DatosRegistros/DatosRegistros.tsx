/**
 * Datos y Registros Page
 *
 * Data and records management - patient diagnoses records
 */

import { Search, Filter, Download, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DatosRegistros = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Datos y Registros</h2>
          <p className="text-muted-foreground">
            Gestión de datos y registros de diagnósticos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar diagnósticos..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background"
          />
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Total Registros</h3>
            <Database className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold mt-2">1,234</p>
          <p className="text-xs text-green-600 mt-1">+89 este mes</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Hospitales</h3>
          <p className="text-3xl font-bold mt-2">45</p>
          <p className="text-xs text-muted-foreground mt-1">Activos</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Categorías</h3>
          <p className="text-3xl font-bold mt-2">12</p>
          <p className="text-xs text-muted-foreground mt-1">Diagnósticos</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Última Actualización</h3>
          <p className="text-3xl font-bold mt-2">Hoy</p>
          <p className="text-xs text-muted-foreground mt-1">12:00 PM</p>
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Registros de Diagnósticos</h3>
          <div className="text-sm text-muted-foreground">
            <p>Tabla de datos con ordenación y paginación.</p>
            <p className="mt-2">Funcionalidades a implementar:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Ordenación por columnas</li>
              <li>Paginación de resultados</li>
              <li>Filtros avanzados (fecha, hospital, categoría)</li>
              <li>Selección de filas</li>
              <li>Exportar datos seleccionados</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Visualizations */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Distribución por Categoría</h3>
          <div className="h-[250px] flex items-center justify-center text-muted-foreground">
            <p>Gráfico circular - Diagnósticos por categoría</p>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Tendencia Temporal</h3>
          <div className="h-[250px] flex items-center justify-center text-muted-foreground">
            <p>Gráfico de líneas - Evolución temporal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatosRegistros;

