# Análisis Exploratorio de Datos

---

## 1. Información General del Dataset

### 1.1 Dimensiones
- **Número total de registros:** 21,210 pacientes
- **Número de columnas inicial:** 111 variables
- **Número de columnas tras limpieza:** 97 variables (eliminadas 14 columnas sin datos válidos)
- **Periodo temporal:** 2016-01-01 a 2018-12-31
- **Comunidades Autónomas:** 2 (Andalucía y La Rioja)

### 1.2 Tipos de Datos Identificados

El dataset contiene diferentes tipos de variables:

| Tipo de Variable | Ejemplos | Descripción |
|-----------------|----------|-------------|
| **Temporal** | Fecha de nacimiento, Fecha de Ingreso, Fecha de Fin Contacto | Fechas de eventos clínicos |
| **Categórica** | Sexo, Tipo Alta, Categoría diagnóstica | Variables con valores discretos |
| **Numérica continua** | Edad, Estancia Días, Coste APR | Valores numéricos continuos |
| **Codificada** | Diagnóstico Principal, Procedimientos, CIE | Códigos clínicos estandarizados |
| **Identificadores** | Nombre, CIP SNS Recodificado, Centro Recodificado | Datos anonimizados de identificación |

---

## 2. Análisis Descriptivo Inicial

### 2.1 Calidad de Datos - Valores Nulos

Se identificaron valores nulos en 73 de las 111 columnas originales. A continuación, se presenta el análisis de las columnas con mayor porcentaje de valores faltantes:

#### Columnas completamente vacías (100% nulos) - ELIMINADAS
- CCAA Residencia
- GDR AP, CDM AP, Tipo GDR AP
- Valor Peso Español, Tipo GDR APR, Valor Peso Americano APR
- Reingreso
- GDR IR, Tipo GDR IR, Tipo PROCESO IR
- Procedimiento Externo 4, 5 y 6

#### Columnas con valores nulos significativos (>90%)
- **Procedimientos 11-20:** 99.92% - 99.99% nulos
- **Diagnósticos 15-20:** 99.57% - 99.95% nulos
- **Procedimientos Externos 1-3:** 99.99% nulos
- **Días UCI:** 99.53% nulos

#### Columnas con valores nulos moderados (50-90%)
- **Diagnósticos 5-14:** 60.65% - 99.32% nulos
- **Procedimientos 1-10:** 78.22% - 99.89% nulos
- **POA (Present on Admission) 5-14:** Coinciden con sus diagnósticos correspondientes

#### Columnas con valores nulos bajos (<10%)
- **CIP SNS Recodificado:** 4.00% nulos
- **Diagnóstico 2:** 12.28% nulos
- **Diagnóstico 3:** 29.00% nulos
- **Diagnóstico 4:** 45.87% nulos

**Interpretación:** Los valores nulos en diagnósticos y procedimientos secundarios son esperables en un contexto clínico, ya que no todos los pacientes requieren múltiples diagnósticos o intervenciones.

### 2.2 Variables Demográficas

#### Distribución por Sexo
| Sexo | Descripción | Frecuencia |
|------|-------------|------------|
| 1 | Sexo 1 | ~55% |
| 2 | Sexo 2 | ~45% |
| 9 | Indeterminado/Otro | 25 casos (0.12%) |

**Acción tomada:** Se eliminaron 25 registros con valor de Sexo = 9 (valores atípicos) para mantener la integridad del análisis.

#### Distribución de Edad
- **Edad mínima:** 0 años (recién nacidos)
- **Edad máxima:** 96 años
- **Edad media:** 43.64 años
- **Edad mediana:** 44 años
- **Desviación estándar:** 14.11 años
- **Rango intercuartílico:** 34-53 años

**Distribución:** La distribución de edad muestra una concentración en la edad adulta (34-53 años), representando el 50% central de los pacientes.

### 2.3 Variables Clínicas

#### Estancia Hospitalaria
- **Estancia mínima:** 0 días (alta el mismo día)
- **Estancia máxima:** 814 días (outlier significativo)
- **Estancia media:** 15.46 días
- **Estancia mediana:** 11 días
- **Rango intercuartílico:** 5-19 días

**Observación:** El 75% de los pacientes tienen estancias ≤19 días. Valores extremos (>100 días) representan casos de hospitalización prolongada que requieren análisis específico.

#### Categorías Diagnósticas Principales
El dataset incluye 7 categorías principales de salud mental:

1. Esquizofrenia, trastornos esquizotípicos y trastornos delirantes
2. Trastornos neuróticos, trastornos relacionados con el estrés y trastornos somatomorfos
3. Trastornos de la personalidad y del comportamiento en adultos
4. Trastornos mentales y del comportamiento debidos al uso de sustancias psicoactivas
5. Trastornos del humor [afectivos]
6. Trastornos emocionales y del comportamiento que aparecen habitualmente en la niñez y en la adolescencia
7. Síndromes del comportamiento asociados con alteraciones fisiológicas y factores físicos

**Códigos únicos:** 263 diagnósticos principales diferentes (codificados según CIE-10)

#### Variables APR-DRG (All Patient Refined Diagnosis Related Groups)
- **GRD APR:** 26 grupos diferentes
- **Nivel Severidad APR:** 1-4 (siendo 4 el más severo)
  - Media: 1.54
  - Mediana: 1
- **Riesgo Mortalidad APR:** 1-4 (siendo 4 el más alto)
  - Media: 1.06
  - Mediana: 1

**Interpretación:** La mayoría de casos presentan severidad y riesgo de mortalidad bajos (nivel 1), indicando que gran parte de los ingresos corresponden a casos de complejidad moderada.

#### Coste Hospitalario
- **Coste mínimo:** 1,496 €
- **Coste máximo:** 70,601 € (outlier)
- **Coste medio:** 5,453 €
- **Coste mediano:** 5,988 €
- **Rango intercuartílico:** 4,228 - 6,319 €

### 2.4 Variables Administrativas

#### Servicios Hospitalarios
30 servicios diferentes identificados, incluyendo:
- PSQ (Psiquiatría) - mayoritario
- CAR (Cardiología)
- MIR (Medicina Interna)
- NRL (Neurología)
- Otros servicios especializados

### 2.5 Variables Geográficas

**Nota importante:** Se realizó limpieza de códigos de país no numéricos (4,007 registros eliminados), conservando solo códigos válidos según estándar ISO 3166-1 numérico. Los resultados que se presentan a continuación corresponden al dataset limpio.

#### País de Nacimiento
- **Valores únicos originales:** 81 códigos diferentes
- **Códigos no numéricos eliminados:** 4,001 registros (18.9% del total)
- **Código más frecuente:** 724 (España)
- **Observación:** Se identificaron valores no numéricos como "ZZZ" que fueron eliminados durante la limpieza de datos

#### País de Residencia
- **Valores únicos originales:** 56 códigos diferentes
- **Códigos no numéricos eliminados:** 12 registros (0.06% del total)
- **Código más frecuente:** 724 (España)
- **Observación:** Alta consistencia en formato numérico, con mínima presencia de valores inválidos

---

## 3. Ingeniería de Características

### 3.1 Variables Demográficas

#### Grupos de Edad
Se categorizó la variable Edad en seis tramos demográficos con utilidad epidemiológica:

| Grupo de Edad | Rango | Cantidad | Porcentaje |
|---------------|-------|----------|------------|
| Infancia | 0-12 años | 166 | 0.97% |
| Adolescencia | 13-17 años | 348 | 2.03% |
| Adultos jóvenes | 18-35 años | 4,825 | 28.09% |
| Adultos | 36-55 años | 8,615 | 50.15% |
| Adultos mayores | 56-75 años | 2,983 | 17.37% |
| Tercera edad | >75 años | 241 | 1.40% |

**Observación:** El 50.15% de los pacientes se encuentra en el grupo de adultos (36-55 años), representando la mayor concentración de ingresos por salud mental.

### 3.2 Variables de Complejidad Clínica

#### Número de Diagnósticos
Se contabilizó el número de diagnósticos no nulos por episodio para estimar la carga diagnóstica:

- **Media:** 4.34 diagnósticos por paciente
- **Mediana:** 4 diagnósticos
- **Máximo:** 20 diagnósticos en un mismo episodio

#### 3.3 Complejidad del Caso
Clasificación basada en número de diagnósticos:

| Nivel de Complejidad | Criterio | Cantidad | Porcentaje |
|---------------------|----------|----------|------------|
| Simple | 1 diagnóstico | 2,026 | 11.79% |
| Moderada | 2-3 diagnósticos | 5,711 | 33.25% |
| Compleja | 4-6 diagnósticos | 6,278 | 36.55% |
| Muy compleja | >6 diagnósticos | 3,163 | 18.41% |

**Interpretación:** El 54.96% de los casos presentan complejidad alta (compleja o muy compleja), indicando alta prevalencia de comorbilidades en salud mental.

### 3.3 Indicadores de Riesgo

Se definieron cuatro indicadores para priorización operativa y gestión de recursos:

#### Riesgo Alto (Clínico)
- **Criterio:** Nivel Severidad APR ≥3 O Riesgo Mortalidad APR ≥3
- **Prevalencia:** 555 pacientes (3.23%)
- **Utilidad:** Identificación de casos que requieren atención especializada intensiva

#### Estancia Prolongada
- **Criterio:** Estancia Días > Percentil 90
- **Umbral:** >32 días de hospitalización
- **Prevalencia:** 1,705 pacientes (9.93%)
- **Utilidad:** Detección de casos con necesidades de atención prolongada

#### Coste Elevado
- **Criterio:** Coste APR > Percentil 90
- **Umbral:** >7,078 €
- **Prevalencia:** 1,517 pacientes (8.83%)
- **Utilidad:** Gestión de recursos económicos y planificación presupuestaria

#### 3.4 Riesgo Múltiple (Indicador Compuesto)
Suma de los tres indicadores anteriores (escala 0-3):

| Nivel | Descripción | Cantidad | Porcentaje |
|-------|-------------|----------|------------|
| 0 | Sin riesgo identificado | 14,063 | 81.87% |
| 1 | Riesgo bajo (1 indicador) | 2,526 | 14.70% |
| 2 | Riesgo moderado (2 indicadores) | 516 | 3.00% |
| 3 | Riesgo alto (3 indicadores) | 73 | 0.42% |

**Hallazgo clave:** Solo el 0.42% de los pacientes (73 casos) acumulan los tres factores de riesgo simultáneamente, representando los casos más críticos del sistema.
