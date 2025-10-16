/**
 * Datos y Registros Page
 *
 * Advanced data table with filters and patient diagnosis records
 * Connected to backend Oracle database
 */

import { useState, useEffect, useMemo } from 'react';
import { FileSpreadsheet, ChevronLeft, ChevronRight, Filter as FilterIcon, X, Plus, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import diseasesService, { TableInfo, ColumnInfo } from '@/services/diseasesService';
import './DatosRegistros.css';

// Filter interface
interface FilterRule {
  id: string;
  field: string;
  operator: string;
  value: string;
}

const DatosRegistros = () => {
  // State for data from backend
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [columns, setColumns] = useState<ColumnInfo[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(20);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for UI
  const [selectedRecord, setSelectedRecord] = useState<Record<string, any> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterRule[]>([]);
  const [activeFilters, setActiveFilters] = useState<FilterRule[]>([]);

  // Table name (from Oracle database)
  const tableName = 'INGRESOS'; // Main table with 221,696 admission records

  // Fetch table structure (columns)
  useEffect(() => {
    const fetchTableInfo = async () => {
      try {
        const tableInfo: TableInfo = await diseasesService.getTableInfo(tableName);
        setColumns(tableInfo.columns);
      } catch (err) {
        console.error('Error fetching table info:', err);
        setError('Error loading table structure');
      }
    };

    fetchTableInfo();
  }, []);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const offset = page * pageSize;
        const response = await diseasesService.getData(tableName, pageSize, offset);

        setData(response.data);
        setTotal(response.total);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.response?.data?.detail || 'Error loading data from database');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize]);

  // Available fields for filtering (dynamically generated from columns)
  const filterFields = useMemo(() => {
    return columns.map((col) => ({
      value: col.COLUMN_NAME,
      label: col.COLUMN_NAME,
      type: col.DATA_TYPE === 'NUMBER' ? 'number' : 'text',
    }));
  }, [columns]);

  // Operators based on field type
  const getOperatorsForField = (fieldType: string) => {
    if (fieldType === 'number') {
      return [
        { value: '=', label: 'equals', symbol: '=' },
        { value: '!=', label: 'not equal', symbol: '<>' },
        { value: '>', label: 'greater than', symbol: '>' },
        { value: '<', label: 'less than', symbol: '<' },
        { value: '>=', label: 'greater than or equal', symbol: '>=' },
        { value: '<=', label: 'less than or equal', symbol: '<=' },
      ];
    } else {
      return [
        { value: '=', label: 'equals', symbol: '=' },
        { value: '!=', label: 'not equal', symbol: '<>' },
        { value: 'contains', label: 'like operator', symbol: '~~' },
        { value: 'startsWith', label: 'starts with', symbol: '~~*' },
        { value: 'endsWith', label: 'ends with', symbol: '*~~' },
      ];
    }
  };

  // Add new filter
  const addFilter = () => {
    const newFilter: FilterRule = {
      id: Math.random().toString(36).substr(2, 9),
      field: filterFields[0]?.value || '',
      operator: '=',
      value: '',
    };
    setFilters([...filters, newFilter]);
  };

  // Remove filter
  const removeFilter = (id: string) => {
    setFilters(filters.filter(f => f.id !== id));
  };

  // Update filter
  const updateFilter = (id: string, key: keyof FilterRule, value: string) => {
    setFilters(filters.map(f => f.id === id ? { ...f, [key]: value } : f));
  };

  // Apply filters
  const applyFilters = () => {
    setActiveFilters([...filters]);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters([]);
    setActiveFilters([]);
  };

  // Apply filters to the data (client-side filtering)
  const filteredRecords = useMemo(() => {
    if (activeFilters.length === 0) {
      return data;
    }

    return data.filter((record) => {
      return activeFilters.every((filter) => {
        const recordValue = record[filter.field];
        const filterValue = filter.value;

        if (!filterValue) return true;

        switch (filter.operator) {
          case '=':
            return String(recordValue).toLowerCase() === String(filterValue).toLowerCase();
          case '!=':
            return String(recordValue).toLowerCase() !== String(filterValue).toLowerCase();
          case '>':
            return Number(recordValue) > Number(filterValue);
          case '<':
            return Number(recordValue) < Number(filterValue);
          case '>=':
            return Number(recordValue) >= Number(filterValue);
          case '<=':
            return Number(recordValue) <= Number(filterValue);
          case 'contains':
            return String(recordValue).toLowerCase().includes(String(filterValue).toLowerCase());
          case 'startsWith':
            return String(recordValue).toLowerCase().startsWith(String(filterValue).toLowerCase());
          case 'endsWith':
            return String(recordValue).toLowerCase().endsWith(String(filterValue).toLowerCase());
          default:
            return true;
        }
      });
    });
  }, [data, activeFilters]);

  const handleRowClick = (record: Record<string, any>) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  // Pagination
  const totalPages = Math.ceil(total / pageSize);
  const currentPage = page + 1;

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const csv = [
      // Header
      columns.map(col => col.COLUMN_NAME).join(','),
      // Data
      ...filteredRecords.map(record =>
        columns.map(col => record[col.COLUMN_NAME] || '').join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tableName}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Data Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle>Tabla de Registros - {tableName}</CardTitle>
              <CardDescription>
                {total.toLocaleString()} registros totales - {pageSize} por página
                {columns.length > 0 && ` - ${columns.length} columnas`}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={addFilter}
                className="h-9 gap-2"
              >
                <FilterIcon className="h-4 w-4" />
                {activeFilters.length > 0 ? `Filtrado por ${activeFilters.length}` : 'Filtrar'}
              </Button>
              <Button variant="outline" size="sm" onClick={exportToCSV}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Exportar CSV
              </Button>
            </div>
          </div>

          {/* Filter Rules - Only show if there are filters */}
          {filters.length > 0 && (
            <div className="space-y-3 pb-4 border-b">
              {filters.map((filter) => {
                const selectedField = filterFields.find(f => f.value === filter.field);
                const fieldType = selectedField?.type || 'text';
                const operators = getOperatorsForField(fieldType);

                return (
                  <div key={filter.id} className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg border">
                    {/* Field Selector */}
                    <Select
                      value={filter.field}
                      onValueChange={(value) => updateFilter(filter.id, 'field', value)}
                    >
                      <SelectTrigger className="w-[200px] h-9 bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {filterFields.map((field) => (
                          <SelectItem key={field.value} value={field.value}>
                            {field.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Operator Selector */}
                    <Select
                      value={filter.operator}
                      onValueChange={(value) => updateFilter(filter.id, 'operator', value)}
                    >
                      <SelectTrigger className="w-[100px] h-9 bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {operators.map((op) => (
                          <SelectItem key={op.value} value={op.value}>
                            {op.symbol}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Value Input */}
                    <Input
                      type={fieldType === 'number' ? 'number' : 'text'}
                      value={filter.value}
                      onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
                      placeholder="Valor..."
                      className="h-9 flex-1 bg-background"
                    />

                    {/* Remove Filter Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFilter(filter.id)}
                      className="h-9 w-9 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}

              {/* Apply/Clear Buttons */}
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Limpiar Filtros
                </Button>
                <Button size="sm" onClick={applyFilters}>
                  Aplicar Filtros
                </Button>
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent>
          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-lg flex items-center gap-3 mb-4">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <div>
                <p className="font-medium">Error al cargar datos</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Cargando datos...</span>
            </div>
          ) : (
            <>
              {/* Table */}
              <div className="rounded-md border overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      {columns.slice(0, 10).map((col) => (
                        <th key={col.COLUMN_NAME} className="px-4 py-3 text-left font-medium">
                          {col.COLUMN_NAME}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.length > 0 ? (
                      filteredRecords.map((record, index) => (
                        <tr
                          key={index}
                          className="border-b hover:bg-muted/50 cursor-pointer transition-colors"
                          onClick={() => handleRowClick(record)}
                        >
                          {columns.slice(0, 10).map((col) => (
                            <td key={col.COLUMN_NAME} className="px-4 py-3">
                              {record[col.COLUMN_NAME] !== null && record[col.COLUMN_NAME] !== undefined
                                ? String(record[col.COLUMN_NAME])
                                : '-'}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={columns.length} className="px-4 py-8 text-center text-muted-foreground">
                          No se encontraron registros que coincidan con los filtros aplicados
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <Button variant="outline" size="sm" disabled={page === 0} onClick={handlePrevPage}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Anterior
                </Button>
                <div className="text-sm text-muted-foreground font-medium">
                  Página {currentPage} de {totalPages} ({total.toLocaleString()} registros)
                </div>
                <Button variant="outline" size="sm" disabled={page >= totalPages - 1} onClick={handleNextPage}>
                  Siguiente
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalle del Registro</DialogTitle>
            <DialogDescription>Información completa del registro seleccionado</DialogDescription>
          </DialogHeader>

          {selectedRecord && (
            <div className="grid gap-6 py-4">
              {/* All fields displayed in a grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {columns.map((col) => (
                  <div key={col.COLUMN_NAME} className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{col.COLUMN_NAME}</p>
                    <p className="text-sm font-mono">
                      {selectedRecord[col.COLUMN_NAME] !== null && selectedRecord[col.COLUMN_NAME] !== undefined
                        ? String(selectedRecord[col.COLUMN_NAME])
                        : '-'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DatosRegistros;
