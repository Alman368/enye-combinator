# Oracle Disease Data API

API para acceder a datos de enfermedades desde Oracle Database.

## 🔧 Configuración

### Variables de Entorno (.env)

```env
ORACLE_DB_USER=MALACKATHON
ORACLE_DB_PASSWORD=Oci.2025_v4m0ssss
ORACLE_DB_HOST=gaaea72be18da62-tke06ubevj4zkl7h.adb.eu-madrid-1.oraclecloudapps.com
ORACLE_DB_PORT=1522
ORACLE_DB_SERVICE_NAME=malackathon_high
```

### Instalación

```bash
cd backend
pip install oracledb==2.0.1
```

## 📚 Endpoints

### 1. Listar Tablas Disponibles

```http
GET /api/v1/diseases/tables
Authorization: Bearer {token}
```

**Respuesta:**
```json
{
  "tables": [
    "PATIENTS",
    "DIAGNOSES",
    "TREATMENTS"
  ]
}
```

### 2. Información de una Tabla

```http
GET /api/v1/diseases/tables/{table_name}/info
Authorization: Bearer {token}
```

**Ejemplo:**
```http
GET /api/v1/diseases/tables/PATIENTS/info
```

**Respuesta:**
```json
{
  "table_name": "PATIENTS",
  "columns": [
    {
      "COLUMN_NAME": "ID",
      "DATA_TYPE": "NUMBER",
      "DATA_LENGTH": 22,
      "NULLABLE": "N"
    },
    {
      "COLUMN_NAME": "NAME",
      "DATA_TYPE": "VARCHAR2",
      "DATA_LENGTH": 100,
      "NULLABLE": "Y"
    }
  ]
}
```

### 3. Obtener Datos (Opción 1)

```http
GET /api/v1/diseases/data?table_name={table}&limit={limit}&offset={offset}
Authorization: Bearer {token}
```

**Parámetros:**
- `table_name`: Nombre de la tabla (requerido)
- `limit`: Número de registros (1-1000, default: 10)
- `offset`: Número de registros a saltar (default: 0)

**Ejemplo:**
```http
GET /api/v1/diseases/data?table_name=PATIENTS&limit=20&offset=0
```

### 4. Obtener Datos (Opción 2)

```http
GET /api/v1/diseases/data/{table_name}?limit={limit}&offset={offset}
Authorization: Bearer {token}
```

**Ejemplo:**
```http
GET /api/v1/diseases/data/PATIENTS?limit=20&offset=40
```

**Respuesta:**
```json
{
  "total": 150,
  "limit": 20,
  "offset": 40,
  "data": [
    {
      "ID": 1,
      "NAME": "John Doe",
      "AGE": 45,
      "DIAGNOSIS": "Diabetes"
    },
    {
      "ID": 2,
      "NAME": "Jane Smith",
      "AGE": 32,
      "DIAGNOSIS": "Hypertension"
    }
  ]
}
```

## 🔒 Autenticación

Todos los endpoints requieren autenticación JWT.

1. **Login primero:**
```bash
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin@mindhealth.com&password=admin123"
```

2. **Usar el token en los requests:**
```bash
curl -X GET "http://localhost:8000/api/v1/diseases/tables" \
  -H "Authorization: Bearer {your_token}"
```

## 🧪 Ejemplos de Uso

### Con cURL

```bash
# 1. Login y guardar token
TOKEN=$(curl -s -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin@mindhealth.com&password=admin123" | \
  jq -r '.access_token')

# 2. Listar tablas
curl -X GET "http://localhost:8000/api/v1/diseases/tables" \
  -H "Authorization: Bearer $TOKEN"

# 3. Ver info de una tabla
curl -X GET "http://localhost:8000/api/v1/diseases/tables/PATIENTS/info" \
  -H "Authorization: Bearer $TOKEN"

# 4. Obtener primeros 10 registros
curl -X GET "http://localhost:8000/api/v1/diseases/data?table_name=PATIENTS&limit=10&offset=0" \
  -H "Authorization: Bearer $TOKEN"

# 5. Obtener siguientes 10 registros (paginación)
curl -X GET "http://localhost:8000/api/v1/diseases/data?table_name=PATIENTS&limit=10&offset=10" \
  -H "Authorization: Bearer $TOKEN"
```

### Con Python (requests)

```python
import requests

# Login
response = requests.post(
    "http://localhost:8000/api/v1/auth/login",
    data={"username": "admin@mindhealth.com", "password": "admin123"}
)
token = response.json()['access_token']

# Headers con autenticación
headers = {"Authorization": f"Bearer {token}"}

# Obtener datos
response = requests.get(
    "http://localhost:8000/api/v1/diseases/data",
    params={"table_name": "PATIENTS", "limit": 20, "offset": 0},
    headers=headers
)

data = response.json()
print(f"Total records: {data['total']}")
print(f"Returned: {len(data['data'])} records")
```

### Desde el Frontend (TypeScript/React)

```typescript
import api from '@/services/api';

// El token ya está en el header por authService
const response = await api.get('/diseases/data', {
  params: {
    table_name: 'PATIENTS',
    limit: 20,
    offset: 0
  }
});

const { total, data } = response.data;
console.log(`Total: ${total}, Records: ${data.length}`);
```

## 📊 Paginación

Para implementar paginación en el frontend:

```typescript
const fetchPage = async (page: number, pageSize: number) => {
  const offset = page * pageSize;
  const response = await api.get('/diseases/data', {
    params: {
      table_name: 'PATIENTS',
      limit: pageSize,
      offset: offset
    }
  });
  return response.data;
};

// Página 1 (primeros 20 registros)
const page1 = await fetchPage(0, 20);  // offset: 0

// Página 2 (registros 21-40)
const page2 = await fetchPage(1, 20);  // offset: 20

// Página 3 (registros 41-60)
const page3 = await fetchPage(2, 20);  // offset: 40
```

## 🔍 Swagger UI

Accede a la documentación interactiva en:
```
http://localhost:8000/api/v1/docs
```

## ⚠️ Notas de Seguridad

1. **SQL Injection Protection**: El endpoint valida y sanitiza los nombres de tabla
2. **Authentication Required**: Todos los endpoints requieren JWT válido
3. **Rate Limiting**: Máximo 1000 registros por request
4. **Connection Management**: Las conexiones se gestionan automáticamente

## 🐛 Troubleshooting

### Error: "Error connecting to Oracle"

- Verificar credenciales en `.env`
- Verificar conectividad de red
- Verificar que el servicio Oracle esté activo

### Error: "Table not found"

- Usar nombres de tabla en MAYÚSCULAS
- Verificar que la tabla existe con `/tables`

### Error: "401 Unauthorized"

- Verificar que el token JWT sea válido
- Hacer login de nuevo si el token expiró
