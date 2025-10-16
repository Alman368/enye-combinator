
import pandas as pd

pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', None)
pd.set_option('display.width', None)
pd.set_option('display.max_colwidth', None)

# Cargar datos
df = pd.read_excel('SaludMental.xls')

print("=" * 80)
print("ANÁLISIS EXPLORATORIO DE DATOS - SALUD MENTAL")
print("=" * 80)

# 1. Información general
print("\n1. INFORMACIÓN GENERAL DEL DATASET")
print("-" * 80)
print(f"Número de registros: {len(df)}")
print(f"Número de columnas: {len(df.columns)}")

# 2. Nombres de columnas
print("\n2. LISTA DE COLUMNAS")
print("-" * 80)
for i, col in enumerate(df.columns, 1):
    print(f"{i}. {col}")

# 3. Valores nulos
print("\n3. VALORES NULOS POR COLUMNA")
print("-" * 80)
null_counts = df.isnull().sum()
null_percentages = (df.isnull().sum() / len(df)) * 100
null_df = pd.DataFrame({
    'Columna': null_counts.index,
    'Valores Nulos': null_counts.values,
    'Porcentaje': null_percentages.values
})
null_df = null_df[null_df['Valores Nulos'] > 0].sort_values('Valores Nulos', ascending=False)
print(null_df.to_string(index=False))

# 4. Eliminar columnas sin nignún dato válido
print("\n4. ELIMINAR COLUMNAS SIN NINGÚN DATO VÁLIDO")
print("-" * 80)
cols_to_drop = []
for col in df.columns:
    if df[col].isnull().all():
        cols_to_drop.append(col)

df = df.drop(columns=cols_to_drop)

print(f"✅ Columnas eliminadas: {cols_to_drop}")
print(f"📊 Número de columnas restante: {df.shape[1]}")

# 5. Tipos de datos
print("\n5. TIPOS DE DATOS")
print("-" * 80)
for i, col in enumerate(df.columns):
    print(f"{i}. {col}: {df[col].map(type).unique()}")

# 6. Estadísticas descriptivas de columnas numéricas
print("\n6. ESTADÍSTICAS DESCRIPTIVAS - COLUMNAS NUMÉRICAS")
print("-" * 80)
print(df.describe())

# 7. Valores únicos en columnas categóricas
print("\n7. VALORES ÚNICOS")
print("-" * 80)
for col in df.columns:
    unique_count = df[col].nunique()
    print(f"\n{col}: {unique_count} valores únicos")
    if unique_count <= 20:
        print(f"  Valores: {df[col].unique()}")
    else:
        print(f"  Primeros 10 valores: {df[col].unique()[:10]}")

# 8. Análisis de valores atípicos
print("\n8. ANÁLISIS DE VALORES ATÍPICOS")
print("-" * 80)
# 8.1. Contar cuántos valores en la columna Sexo no son 1 ni 2
mask_invalid = ~df['Sexo'].isin([1, 2])
num_invalid = mask_invalid.sum()

print(f"🚨 Filas con valor inválido en 'Sexo': {num_invalid}")

# 8.2. Eliminar esas filas
df = df[~mask_invalid]

# 8.3. Eliminar filas con códigos de país no numéricos
print("\n8.3. LIMPIEZA DE CÓDIGOS DE PAÍS NO NUMÉRICOS")
print("-" * 80)

# Función para verificar si es numérico
def es_numerico(valor):
    if pd.isna(valor):
        return False
    try:
        float(valor)
        return True
    except:
        return False

# Identificar registros con códigos no numéricos
mask_invalido_nacimiento = ~df['País Nacimiento'].apply(es_numerico)
mask_invalido_residencia = ~df['País Residencia'].apply(es_numerico)

num_invalidos_nacimiento = mask_invalido_nacimiento.sum()
num_invalidos_residencia = mask_invalido_residencia.sum()

print(f"🚨 Códigos no numéricos en 'País Nacimiento': {num_invalidos_nacimiento}")
print(f"🚨 Códigos no numéricos en 'País Residencia': {num_invalidos_residencia}")

# Combinar: eliminar si cualquiera de los dos no es numérico
mask_eliminar = mask_invalido_nacimiento | mask_invalido_residencia

print(f"📊 Total de filas a eliminar: {mask_eliminar.sum()}")

# Eliminar filas
df = df[~mask_eliminar]

print(f"✅ Registros restantes: {len(df)}")


# === INGENIERÍA DE CARACTERÍSTICAS AVANZADA ===
print("\n" + "=" * 80)
print("INGENIERÍA DE CARACTERÍSTICAS AVANZADA")
print("=" * 80)

# 1. GRUPOS DE EDAD
print("\n1. CREACIÓN DE GRUPOS DE EDAD")
print("-" * 80)

def clasificar_grupo_edad(edad):
    """Clasifica la edad en grupos demográficos"""
    if pd.isna(edad):
        return 'Desconocido'
    elif edad <= 12:
        return 'Infancia (0-12)'
    elif edad <= 17:
        return 'Adolescencia (13-17)'
    elif edad <= 35:
        return 'Adultos jóvenes (18-35)'
    elif edad <= 55:
        return 'Adultos (36-55)'
    elif edad <= 75:
        return 'Adultos mayores (56-75)'
    else:
        return 'Tercera edad (>75)'

df['Grupo_Edad'] = df['Edad'].apply(clasificar_grupo_edad)

print("✅ Columna 'Grupo_Edad' creada")
print("\nDistribución por Grupo de Edad:")
distribucion_edad = df['Grupo_Edad'].value_counts().sort_index()
for grupo, count in distribucion_edad.items():
    porcentaje = (count / len(df)) * 100
    print(f"  {grupo}: {count} ({porcentaje:.2f}%)")

# 2. COMPLEJIDAD DEL CASO (por número de diagnósticos)
print("\n2. CLASIFICACIÓN DE COMPLEJIDAD DEL CASO")
print("-" * 80)

# Contar diagnósticos no nulos para cada paciente
columnas_diagnostico = [col for col in df.columns if col.startswith('Diagnóstico')]
df['Num_Diagnosticos'] = df[columnas_diagnostico].notna().sum(axis=1)

def clasificar_complejidad(num_diagnosticos):
    """Clasifica la complejidad según número de diagnósticos"""
    if num_diagnosticos == 1:
        return 'Simple'
    elif 2 <= num_diagnosticos <= 3:
        return 'Moderada'
    elif 4 <= num_diagnosticos <= 6:
        return 'Compleja'
    else:  # > 6
        return 'Muy compleja'

df['Complejidad_Caso'] = df['Num_Diagnosticos'].apply(clasificar_complejidad)

print("✅ Columnas 'Num_Diagnosticos' y 'Complejidad_Caso' creadas")
print(f"\nEstadísticas de diagnósticos por paciente:")
print(f"  Media: {df['Num_Diagnosticos'].mean():.2f} diagnósticos")
print(f"  Mediana: {df['Num_Diagnosticos'].median():.0f} diagnósticos")
print(f"  Máximo: {df['Num_Diagnosticos'].max():.0f} diagnósticos")

print("\nDistribución por Complejidad del Caso:")
distribucion_complejidad = df['Complejidad_Caso'].value_counts()
for complejidad in ['Simple', 'Moderada', 'Compleja', 'Muy compleja']:
    if complejidad in distribucion_complejidad.index:
        count = distribucion_complejidad[complejidad]
        porcentaje = (count / len(df)) * 100
        print(f"  {complejidad}: {count} ({porcentaje:.2f}%)")

# 3. INDICADORES DE RIESGO
print("\n3. CREACIÓN DE INDICADORES DE RIESGO")
print("-" * 80)

# 3.1 Riesgo Alto (por severidad y mortalidad)
df['Riesgo_Alto'] = ((df['Nivel Severidad APR'] >= 3) | 
                     (df['Riesgo Mortalidad APR'] >= 3))

num_riesgo_alto = df['Riesgo_Alto'].sum()
porcentaje_riesgo = (num_riesgo_alto / len(df)) * 100
print(f"✅ Indicador 'Riesgo_Alto' creado")
print(f"   Pacientes con riesgo alto: {num_riesgo_alto} ({porcentaje_riesgo:.2f}%)")

# 3.2 Estancia Prolongada (percentil 90)
percentil_90_estancia = df['Estancia Días'].quantile(0.90)
df['Estancia_Prolongada'] = df['Estancia Días'] > percentil_90_estancia

num_estancia_prolongada = df['Estancia_Prolongada'].sum()
porcentaje_estancia = (num_estancia_prolongada / len(df)) * 100
print(f"\n✅ Indicador 'Estancia_Prolongada' creado (umbral: {percentil_90_estancia:.0f} días)")
print(f"   Pacientes con estancia prolongada: {num_estancia_prolongada} ({porcentaje_estancia:.2f}%)")

# 3.3 Coste Elevado (percentil 90)
percentil_90_coste = df['Coste APR'].quantile(0.90)
df['Coste_Elevado'] = df['Coste APR'] > percentil_90_coste

num_coste_elevado = df['Coste_Elevado'].sum()
porcentaje_coste = (num_coste_elevado / len(df)) * 100
print(f"\n✅ Indicador 'Coste_Elevado' creado (umbral: {percentil_90_coste:.0f} €)")
print(f"   Pacientes con coste elevado: {num_coste_elevado} ({porcentaje_coste:.2f}%)")

# 3.4 Indicador combinado de riesgo
df['Riesgo_Multiple'] = (df['Riesgo_Alto'].astype(int) + 
                         df['Estancia_Prolongada'].astype(int) + 
                         df['Coste_Elevado'].astype(int))

print(f"\n✅ Indicador 'Riesgo_Multiple' creado (0-3)")
print("\nDistribución de Riesgo Múltiple:")
distribucion_riesgo = df['Riesgo_Multiple'].value_counts().sort_index()
for nivel, count in distribucion_riesgo.items():
    porcentaje = (count / len(df)) * 100
    etiqueta = ['Sin riesgo', 'Riesgo bajo', 'Riesgo moderado', 'Riesgo alto'][int(nivel)]
    print(f"  Nivel {nivel} ({etiqueta}): {count} ({porcentaje:.2f}%)")

