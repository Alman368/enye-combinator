# 🌐 Permitir tu IP en Oracle Autonomous Database

## 📍 Tu IP Pública Actual

```
150.214.58.68
```

**Anota esta IP**, la necesitarás para configurar el Access Control List.

---

## 🔧 Pasos para Permitir la IP

### Paso 1: Accede a Oracle Cloud Console

1. Ve a: https://cloud.oracle.com
2. Inicia sesión con tus credenciales

### Paso 2: Navega a tu Base de Datos

1. Haz clic en el **menú hamburguesa** (☰) arriba a la izquierda
2. Selecciona: **Oracle Database** → **Autonomous Database**
3. Verifica que estés en la región correcta: **EU-MADRID-1**
4. Haz clic en el nombre de tu base de datos: **TKE06UBEVJ4ZKL7H**

### Paso 3: Verificar el Estado

Antes de configurar el Access Control, verifica:

- 🟢 **AVAILABLE** → La base de datos está funcionando ✅
- 🔴 **STOPPED** → Primero debes iniciarla (botón "Start")
- 🟡 **STOPPING/STARTING** → Espera a que termine

### Paso 4: Configurar Access Control

Busca en la página de detalles de la DB:

1. Desplázate hacia abajo hasta la sección **"Network"**
2. Verás **"Access Control List"** o **"Access control"**
3. Haz clic en el botón **"Edit"**

### Paso 5: Elegir Configuración (2 opciones)

#### ✅ OPCIÓN A: Permitir acceso desde cualquier lugar (MÁS FÁCIL)

**Recomendado para desarrollo:**

1. Selecciona: ☑️ **"Secure access from everywhere"**
2. Haz clic en **"Update"** o **"Save Changes"**

**Ventajas:**
- ✅ Fácil, no necesitas actualizar IPs
- ✅ Funciona desde cualquier red (casa, trabajo, cafetería)

**Desventajas:**
- ⚠️ Menos seguro (cualquier IP puede intentar conectarse)
- ⚠️ Depende de tus credenciales para la seguridad

---

#### 🔐 OPCIÓN B: Solo permitir tu IP específica (MÁS SEGURO)

**Recomendado para producción:**

1. Selecciona: ☑️ **"IP notation type"** o **"IP Address"**
2. En el campo **"Values"** o **"IP Addresses"**, añade:
   ```
   150.214.58.68/32
   ```
   (El `/32` significa solo esa IP específica)

3. Si necesitas añadir más IPs (por ejemplo, de otros desarrolladores), sepáralas con comas:
   ```
   150.214.58.68/32, 192.168.1.100/32, 10.0.0.50/32
   ```

4. Haz clic en **"Update"** o **"Save Changes"**

**Ventajas:**
- ✅ Más seguro
- ✅ Solo tú puedes conectarte

**Desventajas:**
- ⚠️ Si tu IP cambia (cambias de red), debes actualizarla
- ⚠️ Debes recordar añadir nuevas IPs cuando cambies de ubicación

---

### Paso 6: Esperar Aplicación

- El cambio tarda **10-30 segundos** en aplicarse
- Verás un mensaje de confirmación
- El estado puede cambiar brevemente a "UPDATING"

---

## 🧪 Verificar Conexión

Una vez configurado el Access Control, ejecuta:

```bash
cd /home/iv4nb/Descargas/enye-combinator/backend
source ../venv/bin/activate
python3 test_auth.py
```

**Salida esperada si funciona:**

```
======================================================================
TEST DE AUTENTICACIÓN ORACLE
======================================================================

📋 Configuración actual:
   ORACLE_DB_USER: 'MALACKATHON'
   ORACLE_DB_PASSWORD: 'Oci***sss' (longitud: 17)
   ORACLE_DB_SERVICE_NAME: 'tke06ubevj4zkl7h_low'

✅ No hay espacios extra en las credenciales

🔌 Intentando conectar con timeout de 30 segundos...

✅ ¡AUTENTICACIÓN EXITOSA!

👤 Usuario conectado: MALACKATHON
   Session user: MALACKATHON

📊 Tablas disponibles: X

📋 Primeras tablas:
   • TABLA1
   • TABLA2
   ...

✅ Conexión cerrada correctamente
======================================================================
```

---

## 🚨 Solución de Problemas

### Si sigue sin funcionar después de permitir la IP:

1. **Verifica que la base de datos esté AVAILABLE** (no STOPPED)

2. **Verifica tu IP actual** (por si cambió):
   ```bash
   curl -4 ifconfig.me
   ```

3. **Prueba todos los service levels**:
   ```bash
   python3 test_all_services.py
   ```

4. **Verifica las credenciales**:
   - Usuario correcto (MALACKATHON o ADMIN)
   - Password correcto (case-sensitive)

---

## 📋 Checklist

- [ ] Accedí a Oracle Cloud Console
- [ ] Encontré mi base de datos TKE06UBEVJ4ZKL7H
- [ ] Verifiqué que está en estado AVAILABLE
- [ ] Configuré Access Control (opción A o B)
- [ ] Esperé 30 segundos
- [ ] Ejecuté `python3 test_auth.py`
- [ ] ✅ CONEXIÓN EXITOSA

---

## 💡 Recomendación Final

Para **desarrollo local**: Usa **"Secure access from everywhere"**

Para **producción**: Usa **lista específica de IPs** y actualiza cuando sea necesario

---

## 🔗 Enlaces Útiles

**Oracle Cloud Console:**
https://cloud.oracle.com

**Database Actions (SQL Developer Web):**
https://GAAEA72BE18DA62-TKE06UBEVJ4ZKL7H.adb.eu-madrid-1.oraclecloudapps.com/ords/sql-developer

Aquí también puedes probar tus credenciales desde el navegador.


