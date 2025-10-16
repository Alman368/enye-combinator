# 🔍 Diagnóstico de Conexión Oracle

## ❌ Problema Identificado

**La base de datos Oracle Autonomous está PAUSADA o DETENIDA**

### Evidencias:
- ✅ Puerto 1522 es accesible desde tu máquina
- ✅ Archivos de wallet están completos y correctos
- ✅ Credenciales configuradas correctamente
- ✅ Módulo `oracledb` instalado
- ❌ Conexión se queda esperando (timeout después de 15+ segundos)

## ✅ Correcciones Realizadas

### 1. Archivo `wallet/sqlnet.ora`
**Antes:**
```
WALLET_LOCATION = (SOURCE = (METHOD = file) (METHOD_DATA = (DIRECTORY="/home/iv4nb/Descargas/enye-combinator/backend/wallet")))
```

**Después:**
```
WALLET_LOCATION = (SOURCE = (METHOD = file) (METHOD_DATA = (DIRECTORY="?/network/admin")))
```

El placeholder `?/network/admin` es sustituido automáticamente por `python-oracledb` con la ruta del `config_dir`.

### 2. Dependencias Instaladas

Se instaló correctamente:
- `oracledb==2.0.1`
- Y todas las demás dependencias del proyecto

### 3. Configuración Verificada

**Archivo `.env`:**
```bash
ORACLE_DB_USER=MALACKATHON
ORACLE_DB_PASSWORD=Oci.2025_v4m0ssss
ORACLE_DB_HOST=adb.eu-madrid-1.oraclecloud.com
ORACLE_DB_PORT=1522
ORACLE_DB_SERVICE_NAME=tke06ubevj4zkl7h_high
```

**Wallet:** `/home/iv4nb/Descargas/enye-combinator/backend/wallet/`
- ✅ `tnsnames.ora` - Aliases de conexión configurados
- ✅ `sqlnet.ora` - Configuración de wallet corregida
- ✅ `cwallet.sso` - Certificados SSL presentes
- ✅ Otros archivos necesarios

## 🔧 Solución Requerida

### Paso 1: Iniciar la Base de Datos

1. Ve a **Oracle Cloud Console**: https://cloud.oracle.com
2. Login con tus credenciales
3. Navega a: **Menú** → **Oracle Database** → **Autonomous Database**
4. Busca tu base de datos: **TKE06UBEVJ4ZKL7H**
5. Verifica el estado actual:
   - 🔴 **STOPPED** → Base de datos detenida
   - 🟡 **STOPPING/STARTING** → En transición
   - 🟢 **AVAILABLE** → Base de datos funcionando
6. Si está **STOPPED**:
   - Haz clic en **"More Actions"** → **"Start"**
   - Espera 2-5 minutos a que cambie a **AVAILABLE**

### Paso 2: Verificar la Conexión

Una vez que la base de datos esté **AVAILABLE**, ejecuta:

```bash
cd /home/iv4nb/Descargas/enye-combinator/backend
source ../venv/bin/activate
python3 test_oracle_timeout.py
```

**Salida esperada si funciona:**
```
🔌 Conectando a Oracle (timeout: 15s)...
   Usuario: MALACKATHON
   Servicio: tke06ubevj4zkl7h_high

✅ ¡CONEXIÓN EXITOSA!

📊 Base de datos: Oracle Database 19c Enterprise Edition...
📋 Tablas en el schema: X
```

## 🧪 Scripts de Diagnóstico Disponibles

### 1. `test_oracle_timeout.py`
Test rápido con timeout de 15 segundos para detectar si la DB está pausada.

```bash
python3 test_oracle_timeout.py
```

### 2. `test_all_services.py`
Prueba todos los service levels disponibles (_low, _medium, _high, _tp, _tpurgent).

```bash
python3 test_all_services.py
```

### 3. `test_oracle_simple.py`
Test detallado con información completa de configuración.

```bash
python3 test_oracle_simple.py
```

## 📋 Service Levels Disponibles

Tu wallet incluye estos alias de conexión:

| Alias | Uso Recomendado |
|-------|----------------|
| `tke06ubevj4zkl7h_low` | Consultas no críticas, batch jobs |
| `tke06ubevj4zkl7h_medium` | **Recomendado** - Balance entre rendimiento y costo |
| `tke06ubevj4zkl7h_high` | Consultas críticas que necesitan máxima prioridad |
| `tke06ubevj4zkl7h_tp` | Transacciones OLTP |
| `tke06ubevj4zkl7h_tpurgent` | Transacciones urgentes de máxima prioridad |

Si `_high` no funciona después de iniciar la DB, prueba con `_medium` o `_low`.

## 🚨 Otros Problemas Posibles

Si después de iniciar la base de datos sigues teniendo problemas:

### 1. IP No Autorizada (Access Control List)

La base de datos puede tener restricciones de IP. Solución:

1. En Oracle Cloud Console → Tu Base de Datos
2. Haz clic en **"Edit"** en la sección de red
3. En **Access Control List**, verifica:
   - **Allow secure access from everywhere** (recomendado para desarrollo)
   - O añade tu IP pública actual

### 2. Verificar Tu IP Pública

```bash
curl -4 ifconfig.me
```

### 3. Credenciales Incorrectas

Si recibes error `ORA-01017: invalid username/password`:
- Verifica que `ORACLE_DB_USER` y `ORACLE_DB_PASSWORD` en `.env` sean correctos
- El usuario por defecto suele ser `ADMIN` (mayúsculas)
- Verifica que no haya espacios extra en el password

## 📞 Información de Conexión

- **Host**: `adb.eu-madrid-1.oraclecloud.com` (155.248.137.242)
- **Puerto**: 1522 ✅ (accesible)
- **Protocolo**: TCPS (TLS/SSL)
- **Wallet**: Configurada correctamente
- **Usuario**: MALACKATHON
- **Database**: TKE06UBEVJ4ZKL7H

## ✅ Checklist Post-Inicio

Después de iniciar la base de datos:

- [ ] Estado en Oracle Cloud = **AVAILABLE** (verde)
- [ ] `python3 test_oracle_timeout.py` = **ÉXITO**
- [ ] Puedes ejecutar consultas SQL
- [ ] El endpoint `/api/v1/diseases` funciona

## 💡 Tips

- Las bases de datos Autonomous pueden auto-pausarse si no se usan durante un tiempo
- Considera configurar auto-scaling si necesitas disponibilidad 24/7
- Para desarrollo, `_medium` o `_low` son suficientes (más económicos)
- Revisa los costos de mantener la DB activa constantemente

