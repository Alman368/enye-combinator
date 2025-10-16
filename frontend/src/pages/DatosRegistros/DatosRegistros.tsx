/**
 * Datos y Registros Page
 *
 * Advanced data table with filters and patient diagnosis records
 */

import { useState, useMemo } from 'react';
import { FileSpreadsheet, ChevronLeft, ChevronRight, Filter as FilterIcon, X, Plus } from 'lucide-react';
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
import './DatosRegistros.css';

// Type for detailed record information
interface DetailedRecord {
  id: number;
  cie: string;
  diagnosis: string;
  age: number;
  sex: 'M' | 'F';
  stay: number;
  severity: number;
  cost: number;
  // Extended details
  recordNumber: string;
  region: string;
  diagnosisCategory: string;
  presentAtAdmission: boolean;
  secondaryDiagnoses: string[];
  aprGrd: number;
  mortalityRisk: number;
  spanishWeight: number;
  admissionDate: string;
  dischargeDate: string;
  service: string;
  dischargeType: number;
  procedures: string[];
}

// Placeholder data for the table with extended details
const mockRecords: DetailedRecord[] = [
  {
    id: 1,
    cie: 'F32.9',
    diagnosis: 'Trastorno depresivo, no especificado',
    age: 59,
    sex: 'F',
    stay: 11,
    severity: 1,
    cost: 3824,
    recordNumber: '8741727',
    region: 'Andalucía',
    diagnosisCategory: 'Trastornos del humor [afectivos]',
    presentAtAdmission: true,
    secondaryDiagnoses: ['I10 - Hipertensión esencial', 'M19.90 - Artrosis no especificada', 'M76.50 - Tendinitis patelar', 'M79.7 - Fibromialgia'],
    aprGrd: 754,
    mortalityRisk: 1,
    spanishWeight: 1.94,
    admissionDate: '01/02/2016',
    dischargeDate: '13/02/2016',
    service: 'NRL (Neurología)',
    dischargeType: 1,
    procedures: ['B020ZZZ', 'B030ZZZ']
  },
  {
    id: 2,
    cie: 'F12.251',
    diagnosis: 'Cannabis uso grave con psicosis',
    age: 46,
    sex: 'M',
    stay: 4,
    severity: 2,
    cost: 3879,
    recordNumber: '8741728',
    region: 'Andalucía',
    diagnosisCategory: 'Trastornos mentales y del comportamiento debidos al uso de sustancias',
    presentAtAdmission: true,
    secondaryDiagnoses: ['F17.200 - Dependencia nicotina', 'Z72.0 - Uso de tabaco'],
    aprGrd: 740,
    mortalityRisk: 1,
    spanishWeight: 1.82,
    admissionDate: '15/03/2016',
    dischargeDate: '19/03/2016',
    service: 'PSQ (Psiquiatría)',
    dischargeType: 1,
    procedures: ['GZ31ZZZ']
  },
  {
    id: 3,
    cie: 'F25.0',
    diagnosis: 'Trastorno esquizoafectivo tipo depresivo',
    age: 34,
    sex: 'M',
    stay: 19,
    severity: 1,
    cost: 6073,
    recordNumber: '8741729',
    region: 'Andalucía',
    diagnosisCategory: 'Esquizofrenia, trastornos esquizotípicos',
    presentAtAdmission: true,
    secondaryDiagnoses: ['F17.200 - Dependencia nicotina', 'Z65.0 - Condena en prisión civil'],
    aprGrd: 750,
    mortalityRisk: 1,
    spanishWeight: 2.15,
    admissionDate: '10/01/2016',
    dischargeDate: '29/01/2016',
    service: 'PSQ (Psiquiatría)',
    dischargeType: 1,
    procedures: ['GZ30ZZZ', 'GZ31ZZZ']
  },
  {
    id: 4,
    cie: 'F20.0',
    diagnosis: 'Esquizofrenia paranoide',
    age: 39,
    sex: 'F',
    stay: 26,
    severity: 1,
    cost: 6073,
    recordNumber: '8741730',
    region: 'Andalucía',
    diagnosisCategory: 'Esquizofrenia, trastornos esquizotípicos',
    presentAtAdmission: true,
    secondaryDiagnoses: ['E66.9 - Obesidad no especificada'],
    aprGrd: 750,
    mortalityRisk: 1,
    spanishWeight: 2.15,
    admissionDate: '05/04/2016',
    dischargeDate: '01/05/2016',
    service: 'PSQ (Psiquiatría)',
    dischargeType: 1,
    procedures: ['GZ30ZZZ']
  },
  {
    id: 5,
    cie: 'F31.0',
    diagnosis: 'Trastorno bipolar',
    age: 42,
    sex: 'M',
    stay: 15,
    severity: 2,
    cost: 4521,
    recordNumber: '8741731',
    region: 'Andalucía',
    diagnosisCategory: 'Trastornos del humor [afectivos]',
    presentAtAdmission: true,
    secondaryDiagnoses: ['F10.20 - Dependencia alcohol', 'Z63.5 - Ruptura familiar por separación'],
    aprGrd: 755,
    mortalityRisk: 1,
    spanishWeight: 1.98,
    admissionDate: '20/02/2016',
    dischargeDate: '06/03/2016',
    service: 'PSQ (Psiquiatría)',
    dischargeType: 1,
    procedures: ['GZ31ZZZ']
  },
  {
    id: 6,
    cie: 'F41.9',
    diagnosis: 'Ansiedad generalizada',
    age: 51,
    sex: 'F',
    stay: 7,
    severity: 1,
    cost: 2890,
    recordNumber: '8741732',
    region: 'Andalucía',
    diagnosisCategory: 'Trastornos neuróticos, relacionados con el estrés',
    presentAtAdmission: true,
    secondaryDiagnoses: ['F32.0 - Episodio depresivo leve'],
    aprGrd: 758,
    mortalityRisk: 1,
    spanishWeight: 1.45,
    admissionDate: '12/05/2016',
    dischargeDate: '19/05/2016',
    service: 'PSQ (Psiquiatría)',
    dischargeType: 1,
    procedures: ['GZ30ZZZ']
  },
  {
    id: 7,
    cie: 'F10.20',
    diagnosis: 'Alcohol dependencia',
    age: 48,
    sex: 'M',
    stay: 21,
    severity: 3,
    cost: 5234,
    recordNumber: '8741733',
    region: 'Andalucía',
    diagnosisCategory: 'Trastornos mentales y del comportamiento debidos al uso de sustancias',
    presentAtAdmission: true,
    secondaryDiagnoses: ['K70.30 - Cirrosis hepática alcohólica', 'F17.200 - Dependencia nicotina'],
    aprGrd: 740,
    mortalityRisk: 2,
    spanishWeight: 2.34,
    admissionDate: '08/06/2016',
    dischargeDate: '29/06/2016',
    service: 'PSQ (Psiquiatría)',
    dischargeType: 1,
    procedures: ['GZ30ZZZ', 'GZ58ZZZ']
  },
  {
    id: 8,
    cie: 'F33.2',
    diagnosis: 'Depresión recurrente',
    age: 55,
    sex: 'F',
    stay: 18,
    severity: 2,
    cost: 4987,
    recordNumber: '8741734',
    region: 'Andalucía',
    diagnosisCategory: 'Trastornos del humor [afectivos]',
    presentAtAdmission: true,
    secondaryDiagnoses: ['E11.9 - Diabetes mellitus tipo 2', 'I10 - Hipertensión esencial'],
    aprGrd: 754,
    mortalityRisk: 1,
    spanishWeight: 2.08,
    admissionDate: '14/07/2016',
    dischargeDate: '01/08/2016',
    service: 'PSQ (Psiquiatría)',
    dischargeType: 1,
    procedures: ['GZ31ZZZ']
  },
  {
    id: 9,
    cie: 'F60.3',
    diagnosis: 'Trastorno borderline',
    age: 29,
    sex: 'F',
    stay: 12,
    severity: 2,
    cost: 3654,
    recordNumber: '8741735',
    region: 'Andalucía',
    diagnosisCategory: 'Trastornos de la personalidad y del comportamiento',
    presentAtAdmission: true,
    secondaryDiagnoses: ['F32.9 - Trastorno depresivo', 'T39.1 - Intoxicación por analgésicos'],
    aprGrd: 758,
    mortalityRisk: 1,
    spanishWeight: 1.76,
    admissionDate: '22/08/2016',
    dischargeDate: '03/09/2016',
    service: 'PSQ (Psiquiatría)',
    dischargeType: 1,
    procedures: ['GZ30ZZZ']
  },
  {
    id: 10,
    cie: 'F84.0',
    diagnosis: 'Autismo',
    age: 23,
    sex: 'M',
    stay: 8,
    severity: 1,
    cost: 3120,
    recordNumber: '8741736',
    region: 'Andalucía',
    diagnosisCategory: 'Trastornos del desarrollo psicológico',
    presentAtAdmission: true,
    secondaryDiagnoses: ['F90.0 - Trastorno de la actividad y de la atención'],
    aprGrd: 757,
    mortalityRisk: 1,
    spanishWeight: 1.58,
    admissionDate: '10/09/2016',
    dischargeDate: '18/09/2016',
    service: 'PSQ (Psiquiatría)',
    dischargeType: 1,
    procedures: ['GZ30ZZZ']
  },
];

const getSeverityBadge = (severity: number) => {
  const colors = {
    1: 'bg-green-100 text-green-700 border-green-200',
    2: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    3: 'bg-orange-100 text-orange-700 border-orange-200',
    4: 'bg-red-100 text-red-700 border-red-200',
  };
  const icons = { 1: '🟢', 2: '🟡', 3: '🟠', 4: '🔴' };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${colors[severity as keyof typeof colors]}`}>
      <span>{icons[severity as keyof typeof icons]}</span>
      {severity}
    </span>
  );
};

// Filter interface
interface FilterRule {
  id: string;
  field: string;
  operator: string;
  value: string;
}

const DatosRegistros = () => {
  const [selectedRecord, setSelectedRecord] = useState<DetailedRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterRule[]>([]);
  const [activeFilters, setActiveFilters] = useState<FilterRule[]>([]);

  // Available fields for filtering
  const filterFields = [
    { value: 'cie', label: 'Código CIE-10', type: 'text' },
    { value: 'diagnosis', label: 'Diagnóstico', type: 'text' },
    { value: 'age', label: 'Edad', type: 'number' },
    { value: 'sex', label: 'Sexo', type: 'select', options: ['M', 'F'] },
    { value: 'stay', label: 'Días de Estancia', type: 'number' },
    { value: 'severity', label: 'Severidad', type: 'select', options: ['1', '2', '3', '4'] },
    { value: 'cost', label: 'Coste (€)', type: 'number' },
    { value: 'service', label: 'Servicio', type: 'select', options: ['PSQ (Psiquiatría)', 'NRL (Neurología)'] },
    { value: 'diagnosisCategory', label: 'Categoría Diagnóstico', type: 'text' },
  ];

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
    } else if (fieldType === 'text') {
      return [
        { value: '=', label: 'equals', symbol: '=' },
        { value: '!=', label: 'not equal', symbol: '<>' },
        { value: 'contains', label: 'like operator', symbol: '~~' },
        { value: 'startsWith', label: 'starts with', symbol: '~~*' },
        { value: 'endsWith', label: 'ends with', symbol: '*~~' },
      ];
    } else {
      return [
        { value: '=', label: 'equals', symbol: '=' },
        { value: '!=', label: 'not equal', symbol: '<>' },
      ];
    }
  };

  // Add new filter
  const addFilter = () => {
    const newFilter: FilterRule = {
      id: Math.random().toString(36).substr(2, 9),
      field: filterFields[0].value,
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

  // Apply filters to the data
  const filteredRecords = useMemo(() => {
    if (activeFilters.length === 0) {
      return mockRecords;
    }

    return mockRecords.filter((record) => {
      return activeFilters.every((filter) => {
        const recordValue = record[filter.field as keyof DetailedRecord];
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
  }, [activeFilters]);

  const handleRowClick = (record: DetailedRecord) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const getSeverityLabel = (severity: number) => {
    const labels = {
      1: 'Menor',
      2: 'Moderado',
      3: 'Mayor',
      4: 'Extremo'
    };
    return labels[severity as keyof typeof labels] || 'Desconocido';
  };

  const getMortalityRiskLabel = (risk: number) => {
    const labels = {
      1: 'Bajo',
      2: 'Moderado',
      3: 'Alto',
      4: 'Muy Alto'
    };
    return labels[risk as keyof typeof labels] || 'Desconocido';
  };

  return (
    <div className="space-y-6">
      {/* Data Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle>Tabla de Registros</CardTitle>
              <CardDescription>Paginada - 20 registros por página</CardDescription>
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
              <Button variant="outline" size="sm">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Exportar Excel
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
                        <SelectValue>
                          {operators.find(op => op.value === filter.operator)?.symbol || '='}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {operators.map((op) => (
                          <SelectItem key={op.value} value={op.value}>
                            <span className="flex items-center gap-2">
                              <span className="text-muted-foreground font-mono">[ {op.symbol} ]</span>
                              <span>{op.label}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Value Input */}
                    {selectedField?.type === 'select' && selectedField.options ? (
                      <Select
                        value={filter.value}
                        onValueChange={(value) => updateFilter(filter.id, 'value', value)}
                      >
                        <SelectTrigger className="flex-1 h-9 bg-background">
                          <SelectValue placeholder="Seleccionar valor" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedField.options.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        type={fieldType === 'number' ? 'number' : 'text'}
                        value={filter.value}
                        onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
                        placeholder="Ingresar valor"
                        className="flex-1 h-9 bg-background"
                      />
                    )}

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFilter(filter.id)}
                      className="h-9 w-9 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}

              {/* Apply and Clear Buttons */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addFilter}
                  className="h-9 gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Agregar filtro
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-9"
                  >
                    Limpiar
                  </Button>
                  <Button
                    onClick={applyFilters}
                    size="sm"
                    className="h-9"
                  >
                    Aplicar filtros
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-medium">CIE-10</th>
                  <th className="px-4 py-3 text-left font-medium">Diagnóstico</th>
                  <th className="px-4 py-3 text-left font-medium">Edad</th>
                  <th className="px-4 py-3 text-left font-medium">Sexo</th>
                  <th className="px-4 py-3 text-left font-medium">Estancia</th>
                  <th className="px-4 py-3 text-left font-medium">Severidad</th>
                  <th className="px-4 py-3 text-left font-medium">Coste</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <tr
                      key={record.id}
                      className="border-b hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => handleRowClick(record)}
                    >
                      <td className="px-4 py-3 font-mono text-xs">{record.cie}</td>
                      <td className="px-4 py-3">{record.diagnosis}</td>
                      <td className="px-4 py-3 text-center">{record.age}</td>
                      <td className="px-4 py-3 text-center">{record.sex}</td>
                      <td className="px-4 py-3">{record.stay} días</td>
                      <td className="px-4 py-3">{getSeverityBadge(record.severity)}</td>
                      <td className="px-4 py-3 font-mono">€{record.cost.toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                      No se encontraron registros que coincidan con los filtros aplicados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Anterior
            </Button>
            <div className="text-sm text-muted-foreground font-medium">
              Página 1 de 63
            </div>
            <Button variant="outline" size="sm">
              Siguiente
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Detalle del Registro #{selectedRecord?.recordNumber}
            </DialogTitle>
            <DialogDescription>
              Información completa del diagnóstico y hospitalización
            </DialogDescription>
          </DialogHeader>

          {selectedRecord && (
            <div className="space-y-6 pt-4">
              {/* Patient Information */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-primary border-b pb-2">
                  Información del Paciente
                </h3>
                <div className="grid gap-2 text-sm">
                  <div className="flex">
                    <span className="text-muted-foreground w-32">Edad:</span>
                    <span className="font-medium">{selectedRecord.age} años</span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-32">Sexo:</span>
                    <span className="font-medium">{selectedRecord.sex === 'M' ? 'Masculino' : 'Femenino'}</span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-32">Comunidad:</span>
                    <span className="font-medium">{selectedRecord.region}</span>
                  </div>
                </div>
              </div>

              {/* Primary Diagnosis */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-primary border-b pb-2">
                  Diagnóstico Principal
                </h3>
                <div className="grid gap-2 text-sm">
                  <div className="flex">
                    <span className="text-muted-foreground w-32">Código:</span>
                    <span className="font-mono font-medium">{selectedRecord.cie}</span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-32">Descripción:</span>
                    <span className="font-medium">{selectedRecord.diagnosis}</span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-32">Categoría:</span>
                    <span className="font-medium">{selectedRecord.diagnosisCategory}</span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-32">Presente al ingreso:</span>
                    <span className="font-medium">{selectedRecord.presentAtAdmission ? 'Sí' : 'No'}</span>
                  </div>
                </div>
              </div>

              {/* Secondary Diagnoses */}
              {selectedRecord.secondaryDiagnoses.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-primary border-b pb-2">
                    Diagnósticos Secundarios
                  </h3>
                  <ul className="space-y-1.5 text-sm">
                    {selectedRecord.secondaryDiagnoses.map((diagnosis, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-muted-foreground mt-1">•</span>
                        <span className="font-medium">{diagnosis}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* APR-GRD Classification */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-primary border-b pb-2">
                  Clasificación APR-GRD
                </h3>
                <div className="grid gap-2 text-sm">
                  <div className="flex">
                    <span className="text-muted-foreground w-32">GRD:</span>
                    <span className="font-medium">{selectedRecord.aprGrd}</span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-32">Severidad:</span>
                    <span className="font-medium">
                      {selectedRecord.severity} ({getSeverityLabel(selectedRecord.severity)})
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-32">Riesgo mortalidad:</span>
                    <span className="font-medium">
                      {selectedRecord.mortalityRisk} ({getMortalityRiskLabel(selectedRecord.mortalityRisk)})
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-32">Peso español:</span>
                    <span className="font-medium">{selectedRecord.spanishWeight}</span>
                  </div>
                </div>
              </div>

              {/* Hospital Admission */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-primary border-b pb-2">
                  Ingreso Hospitalario
                </h3>
                <div className="grid gap-2 text-sm">
                  <div className="flex">
                    <span className="text-muted-foreground w-32">Fecha ingreso:</span>
                    <span className="font-medium">{selectedRecord.admissionDate}</span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-32">Fecha alta:</span>
                    <span className="font-medium">{selectedRecord.dischargeDate}</span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-32">Estancia:</span>
                    <span className="font-medium">{selectedRecord.stay} días</span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-32">Servicio:</span>
                    <span className="font-medium">{selectedRecord.service}</span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-32">Tipo alta:</span>
                    <span className="font-medium">{selectedRecord.dischargeType}</span>
                  </div>
                </div>
              </div>

              {/* Procedures */}
              {selectedRecord.procedures.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-primary border-b pb-2">
                    Procedimientos
                  </h3>
                  <ul className="space-y-1.5 text-sm">
                    {selectedRecord.procedures.map((procedure, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-muted-foreground mt-1">•</span>
                        <span className="font-mono font-medium">{procedure}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Economic Information */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-primary border-b pb-2">
                  Información Económica
                </h3>
                <div className="grid gap-2 text-sm">
                  <div className="flex">
                    <span className="text-muted-foreground w-32">Coste total:</span>
                    <span className="font-mono font-bold text-lg">€{selectedRecord.cost.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-end pt-4 border-t">
                <Button onClick={() => setIsModalOpen(false)} variant="outline">
                  Cerrar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DatosRegistros;

