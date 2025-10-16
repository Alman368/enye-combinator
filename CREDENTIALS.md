# 🔑 Credenciales de Acceso - MindHealth Analytics

## 👤 Usuarios de Desarrollo

### 1. Administrador (Recomendado para desarrollo)
```
📧 Email:    admin@mindhealth.com
🔐 Password: admin123
👔 Rol:      Admin (Acceso completo)
```

### 2. Investigador
```
📧 Email:    researcher@hospital.com
🔐 Password: researcher123
👔 Rol:      Researcher (Análisis de datos)
```

### 3. Visualizador
```
📧 Email:    viewer@hospital.com
🔐 Password: viewer123
👔 Rol:      Viewer (Solo lectura)
```

### 4. Usuario de Prueba (Inactivo)
```
📧 Email:    test@hospital.com
🔐 Password: test123
👔 Rol:      Viewer (Cuenta desactivada - no puede hacer login)
```

---

## 🚀 Inicio Rápido

1. **Iniciar la aplicación:**
   ```bash
   cd /home/alman/enye-combinator
   ./start-dev.sh
   ```

2. **Abrir en el navegador:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000/api/v1/docs

3. **Hacer login:**
   - Usar: `admin@mindhealth.com` / `admin123`

---

## 🗄️ Base de Datos

- **Tipo:** SQLite (desarrollo)
- **Ubicación:** `/backend/mindhealth.db`
- **Inicialización:** Automática al ejecutar `./start-dev.sh`

### Reinicializar Base de Datos

Si necesitas reinicializar la base de datos:

```bash
cd /home/alman/enye-combinator/backend
rm mindhealth.db  # Eliminar base de datos existente
python3 init_db.py  # Crear nueva base de datos
```

---

## 🔐 Cambiar Contraseñas

Para cambiar las contraseñas en producción, edita el archivo:
`/backend/init_db.py` y ejecuta de nuevo el script de inicialización.

---

## 📝 Notas de Seguridad

⚠️ **IMPORTANTE:** Estas credenciales son solo para desarrollo local.

Para producción:
- ✅ Cambiar todas las contraseñas
- ✅ Usar variables de entorno para credenciales
- ✅ Implementar autenticación de 2 factores
- ✅ Rotar el SECRET_KEY del backend

---

**Última actualización:** 2025-10-16
