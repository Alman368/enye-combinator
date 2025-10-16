# 🚀 Inicio Rápido - MindHealth Analytics

## ▶️ Opción 1: Script Automático (Recomendado)

El script automático limpia procesos previos y asegura que los puertos estén disponibles:

```bash
cd /home/alman/enye-combinator
./start-dev.sh
```

## ▶️ Opción 2: Comando Manual

```bash
cd /home/alman/enye-combinator
npm start
```

Esto iniciará automáticamente:
- ✅ **Backend (FastAPI)** en `http://localhost:8000`
- ✅ **Frontend (React + Vite)** en `http://localhost:5173`

---

## 📋 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `./start-dev.sh` | **[RECOMENDADO]** Limpia puertos e inicia todo |
| `npm start` | Inicia backend + frontend |
| `npm run frontend` | Solo frontend (desarrollo) |
| `npm run backend` | Solo backend (desarrollo) |

---

## 🌐 URLs de Acceso

### Frontend (React)
- **Aplicación**: http://localhost:5173
- **Puerto fijo**: Siempre 5173 (o siguiente disponible)

### Backend (FastAPI)
- **API**: http://localhost:8000
- **Documentación Swagger**: http://localhost:8000/api/v1/docs
- **Documentación ReDoc**: http://localhost:8000/api/v1/redoc

---

## 🎨 Logs con Colores

Los logs aparecen diferenciados por colores:
- 🔵 **BACKEND** - Fondo azul
- 🟢 **FRONTEND** - Fondo verde

---

## ⚠️ Solución de Problemas

### Puerto ocupado
Si ves errores de "Puerto en uso" o el frontend usa puertos como 3001, 3002, etc.:

```bash
# Opción 1: Usa el script automático
./start-dev.sh

# Opción 2: Limpia manualmente
pkill -f vite
pkill -f uvicorn
npm start
```

### Backend no inicia
Verifica que el archivo `.env` existe en `/backend/`:
```bash
ls -la backend/.env
```

### Frontend no carga
Verifica que el puerto 5173 esté libre:
```bash
lsof -i:5173
```

---

## 🛑 Detener los Servicios

Presiona `Ctrl+C` en la terminal para detener ambos servicios.

---

## 📝 Configuración

### Backend (.env)
Ubicación: `/backend/.env`
- Base de datos SQLite para desarrollo
- CORS habilitado para localhost:5173
- SECRET_KEY para desarrollo

### Frontend (vite.config.ts)
- Puerto: 5173 (por defecto de Vite)
- Hot reload automático
- Proxy al backend configurado

---

## 📌 Puertos por Defecto

| Servicio | Puerto | URL |
|----------|--------|-----|
| Frontend | 5173 | http://localhost:5173 |
| Backend | 8000 | http://localhost:8000 |
| API Docs | 8000 | http://localhost:8000/api/v1/docs |

---

## 💡 Tips

✅ **Hot Reload**: Ambos servicios se recargan automáticamente al detectar cambios  
✅ **Logs Unificados**: Todos los logs aparecen en la misma terminal  
✅ **Errores Claros**: Los errores se muestran con el prefijo [BACKEND] o [FRONTEND]  
✅ **Script Limpio**: `./start-dev.sh` asegura un inicio limpio sin conflictos de puertos

---

**¡Listo para desarrollar! 🎉**

Para más información, revisa el README.md principal del proyecto.
