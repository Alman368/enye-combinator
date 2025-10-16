# 🔧 Configuración Oracle - Información Extraída de la Wallet

## 📋 Información de la Base de Datos

**De la wallet he extraído:**

- **Database ID**: `TKE06UBEVJ4ZKL7H`
- **Host**: `adb.eu-madrid-1.oraclecloud.com`
- **Puerto**: `1522`
- **Protocolo**: `TCPS` (SSL/TLS)
- **Wallet descargada**: 2025-10-16 16:42:30 UTC
- **Certificados válidos hasta**: 2030-10-15 10:03:20 UTC

## 🔑 CREDENCIALES (Necesitas configurarlas)

⚠️ **IMPORTANTE**: El usuario y contraseña **NO están en la wallet**. Son credenciales que tú creaste/configuraste en Oracle Cloud.

### Dónde obtener las credenciales:

1. **Usuario**: Normalmente es `ADMIN` (en MAYÚSCULAS)
   - O puede ser otro usuario que hayas creado (como `MALACKATHON`)

2. **Contraseña**: La que configuraste al crear la base de datos
   - Si no la recuerdas, puedes resetearla en Oracle Cloud Console

## 📝 Configuración del archivo `.env`

Agrega estas líneas al final de tu archivo `.env`:

```bash
# Oracle Database Configuration
ORACLE_DB_USER=ADMIN
ORACLE_DB_PASSWORD=TU_PASSWORD_AQUI
ORACLE_DB_HOST=adb.eu-madrid-1.oraclecloud.com
ORACLE_DB_PORT=1522
ORACLE_DB_SERVICE_NAME=tke06ubevj4zkl7h_low
```

## 🎯 Service Levels Disponibles

Tu wallet incluye estos alias (extraídos de `tnsnames.ora`):

| Service Name | Uso Recomendado | Cuándo Usar |
|--------------|----------------|-------------|
| `tke06ubevj4zkl7h_low` | ✅ **Desarrollo** | Consultas no críticas, menos costo |
| `tke06ubevj4zkl7h_medium` | ⚡ Balance | Producción normal |
| `tke06ubevj4zkl7h_high` | 🚀 Alto rendimiento | Consultas críticas prioritarias |
| `tke06ubevj4zkl7h_tp` | 💼 Transaccional | Aplicaciones OLTP |
| `tke06ubevj4zkl7h_tpurgent` | 🔥 Urgente | Transacciones de máxima prioridad |

**Recomendación**: Para desarrollo usa `tke06ubevj4zkl7h_low`

## 🌐 Herramientas Web Disponibles

### Database Actions (SQL Developer Web)
```
https://GAAEA72BE18DA62-TKE06UBEVJ4ZKL7H.adb.eu-madrid-1.oraclecloudapps.com/ords/sql-developer
```
Aquí puedes:
- Ejecutar SQL directamente
- Ver las tablas y datos
- Gestionar usuarios
- **Verificar tus credenciales**

### Oracle APEX
```
https://GAAEA72BE18DA62-TKE06UBEVJ4ZKL7H.adb.eu-madrid-1.oraclecloudapps.com/ords/apex
```

### Graph Studio
```
https://GAAEA72BE18DA62-TKE06UBEVJ4ZKL7H.adb.eu-madrid-1.oraclecloudapps.com/graphstudio/
```

## 🔐 Cómo Obtener/Resetear la Contraseña

Si no recuerdas la contraseña del usuario ADMIN:

1. Ve a **Oracle Cloud Console**: https://cloud.oracle.com
2. Navega a: **Menu** → **Oracle Database** → **Autonomous Database**
3. Selecciona tu base de datos: **TKE06UBEVJ4ZKL7H**
4. Haz clic en **"Administrator"** → **"Reset Password"**
5. Introduce una nueva contraseña que cumpla los requisitos:
   - Mínimo 12 caracteres
   - Al menos 1 mayúscula
   - Al menos 1 minúscula
   - Al menos 1 número
   - Al menos 1 carácter especial
   - No debe contener el nombre de usuario

## ✅ Después de Configurar el `.env`

### 1. Verifica que el archivo `.env` contenga:

```bash
ORACLE_DB_USER=ADMIN  # o el usuario que uses
ORACLE_DB_PASSWORD=tu_password_real
ORACLE_DB_HOST=adb.eu-madrid-1.oraclecloud.com
ORACLE_DB_PORT=1522
ORACLE_DB_SERVICE_NAME=tke06ubevj4zkl7h_low
```

### 2. Ejecuta el test de conexión:

```bash
cd /home/iv4nb/Descargas/enye-combinator/backend
source ../venv/bin/activate
python3 test_auth.py
```

### 3. Si funciona, verás:

```
✅ ¡AUTENTICACIÓN EXITOSA!
👤 Usuario conectado: ADMIN
📊 Tablas disponibles: X
```

## 🚨 Posibles Errores y Soluciones

### Error: ORA-01017 (Invalid username/password)

**Causas**:
- Usuario incorrecto (verifica mayúsculas/minúsculas)
- Contraseña incorrecta
- Espacios extra en usuario o contraseña

**Solución**:
- Usa `ADMIN` en mayúsculas
- Verifica que no haya espacios antes/después
- Resetea la contraseña si es necesario

### Error: ORA-12154 (TNS:could not resolve)

**Causas**:
- `ORACLE_DB_SERVICE_NAME` no coincide con los alias en tnsnames.ora

**Solución**:
- Usa uno de estos valores exactos:
  - `tke06ubevj4zkl7h_low`
  - `tke06ubevj4zkl7h_medium`
  - `tke06ubevj4zkl7h_high`
  - `tke06ubevj4zkl7h_tp`
  - `tke06ubevj4zkl7h_tpurgent`

### La conexión se queda colgada

**Causa**:
- Base de datos pausada/detenida

**Solución**:
- Ve a Oracle Cloud Console y verifica que el estado sea **AVAILABLE**

## 🎯 Template Completo del `.env`

```bash
# Database - Using SQLite for easy development
DATABASE_URL=sqlite:///./mindhealth.db

# Security
SECRET_KEY=09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# API
API_V1_STR=/api/v1
PROJECT_NAME=MindHealth Analytics API
VERSION=1.0.0

# CORS
BACKEND_CORS_ORIGINS=["http://localhost:3000","http://localhost:5173","http://localhost:5174","http://localhost:8080","https://combinator.fluwy.es"]

# Environment
ENVIRONMENT=development

# Oracle Database Configuration
ORACLE_DB_USER=ADMIN
ORACLE_DB_PASSWORD=TuPasswordAqui123!
ORACLE_DB_HOST=adb.eu-madrid-1.oraclecloud.com
ORACLE_DB_PORT=1522
ORACLE_DB_SERVICE_NAME=tke06ubevj4zkl7h_low
```


