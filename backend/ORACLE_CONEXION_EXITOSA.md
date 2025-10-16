# ✅ Conexión Oracle Exitosa - Resumen

## 🎉 Estado Actual

**✅ TODOS LOS SISTEMAS FUNCIONANDO CORRECTAMENTE**

### Conexión Oracle
- ✅ Wallet configurada correctamente
- ✅ Credenciales configuradas
- ✅ IP permitida en Access Control List
- ✅ Conexión SSL/TLS funcionando
- ✅ Base de datos AVAILABLE

### Backend API
- ✅ FastAPI servidor funcionando
- ✅ Autenticación JWT operativa
- ✅ Endpoints Oracle funcionando
- ✅ CORS configurado
- ✅ Documentación automática disponible

---

## 📊 Datos Disponibles

### Tablas en Oracle (11 tablas, 235,084+ registros)

| Tabla | Registros | Descripción |
|-------|-----------|-------------|
| **PACIENTES** | 12,891 | Datos de pacientes anonimizados |
| **INGRESOS** | 221,696 | Historial de ingresos hospitalarios |
| **DIAGNOSTICOS** | 263 | Catálogo de diagnósticos |
| **CENTROS_HOSPITALARIOS** | 230 | Información de centros de salud |
| **COMUNIDADES_AUTONOMAS** | 2 | Datos de comunidades autónomas |
| **PREVALENCIA_SALUD_MENTAL_INE** | 2 | Datos del INE sobre salud mental |
| **ENFERMEDADESMENTALESDIAGNOSTICO** | - | Diagnósticos de enfermedades mentales |

**Total de registros disponibles: ~235,000+**

---

## 🔐 Credenciales y Acceso

### Configuración Oracle (.env)
```bash
ORACLE_DB_USER=MALACKATHON
ORACLE_DB_PASSWORD=Oci.2025_v4m0ssss
ORACLE_DB_HOST=adb.eu-madrid-1.oraclecloud.com
ORACLE_DB_PORT=1522
ORACLE_DB_SERVICE_NAME=tke06ubevj4zkl7h_low
```

### Usuarios de la API

| Usuario | Password | Rol | Descripción |
|---------|----------|-----|-------------|
| admin@mindhealth.com | admin123 | Admin | Acceso completo |
| researcher@hospital.com | researcher123 | Researcher | Análisis de datos |
| viewer@hospital.com | viewer123 | Viewer | Solo lectura |

---

## 🚀 Iniciar el Backend

### Método 1: Desarrollo con auto-reload

```bash
cd /home/iv4nb/Descargas/enye-combinator/backend
source ../venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### Método 2: Producción

```bash
cd /home/iv4nb/Descargas/enye-combinator/backend
source ../venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Método 3: Usando el script de desarrollo

```bash
cd /home/iv4nb/Descargas/enye-combinator/backend
source ../venv/bin/activate
python3 run_dev.py
```

---

## 📖 Documentación de la API

Una vez iniciado el servidor:

### Swagger UI (Interactiva)
```
http://localhost:8000/api/v1/docs
```

### ReDoc (Alternativa)
```
http://localhost:8000/api/v1/redoc
```

### OpenAPI JSON
```
http://localhost:8000/api/v1/openapi.json
```

---

## 🧪 Endpoints Disponibles

### Autenticación

#### Login
```bash
POST /api/v1/auth/login
Content-Type: application/x-www-form-urlencoded

username=admin@mindhealth.com&password=admin123
```

**Respuesta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Oracle/Diseases Endpoints

#### 1. Listar Tablas Disponibles
```bash
GET /api/v1/diseases/tables
Authorization: Bearer {token}
```

**Respuesta:**
```json
{
  "tables": [
    "PACIENTES",
    "DIAGNOSTICOS",
    "INGRESOS",
    ...
  ]
}
```

#### 2. Información de una Tabla
```bash
GET /api/v1/diseases/tables/{table_name}/info
Authorization: Bearer {token}
```

**Ejemplo:**
```bash
GET /api/v1/diseases/tables/PACIENTES/info
```

**Respuesta:**
```json
{
  "table_name": "PACIENTES",
  "columns": [
    {
      "COLUMN_NAME": "ID_PACIENTE",
      "DATA_TYPE": "NUMBER",
      "DATA_LENGTH": 22,
      "NULLABLE": "N"
    },
    ...
  ]
}
```

#### 3. Obtener Datos con Paginación
```bash
GET /api/v1/diseases/data?table_name={table}&limit={n}&offset={m}
Authorization: Bearer {token}
```

**Ejemplo:**
```bash
GET /api/v1/diseases/data?table_name=PACIENTES&limit=10&offset=0
```

**Respuesta:**
```json
{
  "total": 12891,
  "limit": 10,
  "offset": 0,
  "data": [
    {
      "ID_PACIENTE": 212,
      "NOMBRE_ANONIMO": "PACIENTE_00000212",
      "FECHA_NACIMIENTO": "7/2/77",
      "SEXO": 2,
      "PAIS_NACIMIENTO": "724",
      "PAIS_RESIDENCIA": "724"
    },
    ...
  ]
}
```

#### 4. Alternativa - Datos por Path
```bash
GET /api/v1/diseases/data/{table_name}?limit={n}&offset={m}
Authorization: Bearer {token}
```

---

## 🧪 Scripts de Testing

### 1. Test de Autenticación Oracle
```bash
cd /home/iv4nb/Descargas/enye-combinator/backend
source ../venv/bin/activate
python3 test_auth.py
```

**Verifica:**
- ✅ Conexión a Oracle
- ✅ Usuario y contraseña
- ✅ Wallet configurada
- ✅ Tablas disponibles

### 2. Test de Endpoints Completo
```bash
python3 test_oracle_endpoints.py
```

**Prueba:**
- ✅ Login y JWT
- ✅ Lista de tablas
- ✅ Información de tablas
- ✅ Consulta de datos
- ✅ Todas las tablas principales

### 3. Test de Todos los Service Levels
```bash
python3 test_all_services.py
```

**Verifica qué service levels funcionan:**
- tke06ubevj4zkl7h_low ✅
- tke06ubevj4zkl7h_medium
- tke06ubevj4zkl7h_high
- tke06ubevj4zkl7h_tp
- tke06ubevj4zkl7h_tpurgent

---

## 📦 Ejemplos de Uso con curl

### 1. Login y Obtener Token
```bash
TOKEN=$(curl -s -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin@mindhealth.com&password=admin123" \
  | python3 -c "import sys, json; print(json.load(sys.stdin)['access_token'])")
```

### 2. Listar Tablas
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8000/api/v1/diseases/tables
```

### 3. Obtener Datos de Pacientes
```bash
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:8000/api/v1/diseases/data?table_name=PACIENTES&limit=5"
```

### 4. Info de Tabla Ingresos
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8000/api/v1/diseases/tables/INGRESOS/info
```

---

## 📦 Ejemplos de Uso con Python

### Script de Ejemplo
```python
import requests

# 1. Login
response = requests.post(
    "http://localhost:8000/api/v1/auth/login",
    data={
        "username": "admin@mindhealth.com",
        "password": "admin123"
    }
)
token = response.json()["access_token"]
headers = {"Authorization": f"Bearer {token}"}

# 2. Obtener tablas
tables_response = requests.get(
    "http://localhost:8000/api/v1/diseases/tables",
    headers=headers
)
tables = tables_response.json()["tables"]
print(f"Tablas disponibles: {tables}")

# 3. Obtener datos de pacientes
data_response = requests.get(
    "http://localhost:8000/api/v1/diseases/data",
    params={"table_name": "PACIENTES", "limit": 10},
    headers=headers
)
data = data_response.json()
print(f"Total pacientes: {data['total']}")
print(f"Primeros {len(data['data'])} registros obtenidos")
```

---

## 🔧 Archivos de Configuración

### Estructura del Proyecto
```
backend/
├── app/
│   ├── main.py                 # Aplicación FastAPI principal
│   ├── api/
│   │   └── api_v1/
│   │       ├── api.py          # Router principal
│   │       └── endpoints/
│   │           ├── auth.py     # Autenticación
│   │           ├── users.py    # Usuarios
│   │           └── diseases.py # Endpoints Oracle ✨
│   ├── core/
│   │   ├── config.py           # Configuración
│   │   └── security.py         # JWT y passwords
│   ├── db/
│   │   ├── session.py          # SQLite session
│   │   └── oracle_connection.py # Servicio Oracle ✨
│   ├── models/
│   │   └── user.py             # Modelo de usuario
│   └── schemas/
│       ├── disease.py          # Schemas Oracle ✨
│       ├── auth.py
│       └── user.py
├── wallet/                     # Wallet Oracle ✨
│   ├── cwallet.sso
│   ├── tnsnames.ora
│   ├── sqlnet.ora
│   └── ...
├── .env                        # Variables de entorno ✨
├── requirements.txt            # Dependencias Python
└── mindhealth.db              # Base de datos SQLite local
```

---

## 🌐 Herramientas Oracle Cloud

### Database Actions (SQL Developer Web)
```
https://GAAEA72BE18DA62-TKE06UBEVJ4ZKL7H.adb.eu-madrid-1.oraclecloudapps.com/ords/sql-developer
```

**Login:**
- Usuario: MALACKATHON
- Password: Oci.2025_v4m0ssss

**Funciones:**
- Ejecutar SQL directamente
- Ver estructura de tablas
- Exportar datos
- Crear usuarios
- Gestionar permisos

### Oracle APEX
```
https://GAAEA72BE18DA62-TKE06UBEVJ4ZKL7H.adb.eu-madrid-1.oraclecloudapps.com/ords/apex
```

---

## 🐛 Solución de Problemas

### Error: "Connection timeout"

**Causa:** Base de datos pausada o IP bloqueada

**Solución:**
1. Ve a Oracle Cloud Console
2. Verifica que la DB esté en estado **AVAILABLE**
3. Verifica que tu IP esté permitida en Access Control List
4. Tu IP actual: ejecuta `curl ifconfig.me`

### Error: "ORA-01017: invalid username/password"

**Causa:** Credenciales incorrectas

**Solución:**
1. Verifica el archivo `.env`
2. Usuario debe ser en MAYÚSCULAS si es ADMIN
3. Sin espacios extra en usuario/password
4. Resetea la password en Oracle Cloud Console si es necesario

### Error: "ORA-12154: TNS:could not resolve"

**Causa:** Service name incorrecto

**Solución:**
1. Verifica `ORACLE_DB_SERVICE_NAME` en `.env`
2. Debe ser uno de: `tke06ubevj4zkl7h_low`, `_medium`, `_high`, `_tp`, `_tpurgent`
3. Ejecuta `python3 test_all_services.py` para probar todos

---

## 📝 Próximos Pasos

### Para Desarrollo
- ✅ Backend funcionando con Oracle
- ⏳ Conectar frontend con los endpoints
- ⏳ Implementar dashboards con datos reales
- ⏳ Añadir filtros y búsquedas avanzadas

### Para Producción
- ⏳ Configurar HTTPS
- ⏳ Añadir rate limiting
- ⏳ Implementar logging avanzado
- ⏳ Configurar backups
- ⏳ Optimizar queries Oracle
- ⏳ Añadir caché (Redis)

---

## 📚 Documentación Relacionada

- `ORACLE_DIAGNOSTICO.md` - Diagnóstico completo de conexión
- `CONFIGURAR_ORACLE.md` - Guía de configuración paso a paso
- `PERMITIR_IP.md` - Cómo permitir IPs en Oracle Cloud
- `RESUMEN_WALLET.txt` - Información extraída de la wallet
- `ORACLE_API_DOCS.md` - Documentación de la API

---

## ✅ Checklist de Verificación

- [x] Wallet descargada y configurada
- [x] Archivo `.env` con credenciales correctas
- [x] IP permitida en Oracle Cloud Access Control
- [x] Base de datos en estado AVAILABLE
- [x] Conexión Oracle funcionando
- [x] Backend API iniciado
- [x] Endpoints de autenticación funcionando
- [x] Endpoints de Oracle funcionando
- [x] Tests pasando correctamente
- [x] Documentación completa

---

**Última actualización:** 16 de Octubre de 2025
**Estado:** ✅ OPERATIVO
**Versión Backend:** 1.0.0
**Database:** TKE06UBEVJ4ZKL7H (Oracle Autonomous Database)

