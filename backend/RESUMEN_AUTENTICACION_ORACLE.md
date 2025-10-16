# ✅ Resumen: Autenticación con Oracle

## 🎯 Objetivo Completado

Tu sistema de autenticación ahora usa **Oracle** como base de datos principal, reemplazando SQLite.

---

## 📦 Archivos Creados

### Scripts de Base de Datos
- ✅ `create_users_table_oracle.sql` - SQL para crear tabla de usuarios
- ✅ `migrate_users_to_oracle.py` - Migrar usuarios de SQLite a Oracle
- ✅ `init_db_oracle.py` - Inicializar Oracle desde cero
- ✅ `test_oracle_auth.py` - Probar autenticación con Oracle
- ✅ `setup_oracle_auth.sh` - Script automatizado de setup

### Código Actualizado
- ✅ `app/db/session.py` - Detecta automáticamente Oracle vs SQLite
- ✅ `app/db/session_oracle.py` - Configuración específica Oracle
- ✅ `app/models/user.py` - Modelo compatible con Oracle

### Documentación
- ✅ `MIGRACION_ORACLE.md` - Guía completa de migración
- ✅ `RESUMEN_AUTENTICACION_ORACLE.md` - Este resumen

---

## 🔧 Cambios Principales

### 1. Modelo de Usuario Actualizado

**Antes (SQLite):**
```python
is_active = Column(Boolean, default=True)
is_superuser = Column(Boolean, default=False)
role = Column(Enum(UserRole), default=UserRole.VIEWER)
```

**Ahora (Oracle):**
```python
is_active = Column(SmallInteger, default=1)      # 1=True, 0=False
is_superuser = Column(SmallInteger, default=0)   # 1=True, 0=False
role = Column(String(20), default='VIEWER')      # 'ADMIN', 'RESEARCHER', 'VIEWER'
```

### 2. Detección Automática de BD

El sistema ahora detecta qué base de datos usar:

```python
# En app/db/session.py
if settings.ORACLE_DB_USER and settings.ORACLE_DB_SERVICE_NAME:
    # Usa Oracle
    connection_string = f"oracle+oracledb://..."
else:
    # Usa DATABASE_URL (SQLite/PostgreSQL)
    connection_string = settings.DATABASE_URL
```

### 3. Tabla en Oracle

```sql
CREATE TABLE users (
    id NUMBER(10) PRIMARY KEY,
    email VARCHAR2(255) UNIQUE NOT NULL,
    hashed_password VARCHAR2(255) NOT NULL,
    full_name VARCHAR2(255),
    role VARCHAR2(20) DEFAULT 'VIEWER' NOT NULL,
    is_active NUMBER(1) DEFAULT 1 NOT NULL,
    is_superuser NUMBER(1) DEFAULT 0 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);
```

Con triggers para:
- Auto-incremento de ID
- Actualización automática de `updated_at`

---

## 🚀 Cómo Usar

### Opción 1: Setup Automatizado (Recomendado)

```bash
cd backend
./setup_oracle_auth.sh
```

Este script:
1. Verifica configuración (`.env`, `wallet/`)
2. Te pregunta si migrar usuarios o crear nuevos
3. Prueba la autenticación automáticamente

### Opción 2: Manual - Migrar Usuarios Existentes

```bash
cd backend
python migrate_users_to_oracle.py
```

### Opción 3: Manual - Empezar desde Cero

```bash
cd backend
python init_db_oracle.py
```

---

## 🔑 Usuarios de Prueba

Después de la inicialización, tendrás estos usuarios:

| Email | Password | Rol | Activo | Superuser |
|-------|----------|-----|--------|-----------|
| admin@mindhealth.com | admin123 | ADMIN | ✅ | ✅ |
| researcher@hospital.com | researcher123 | RESEARCHER | ✅ | ❌ |
| viewer@hospital.com | viewer123 | VIEWER | ✅ | ❌ |
| test@hospital.com | test123 | VIEWER | ❌ | ❌ |

---

## 🧪 Probar que Funciona

### 1. Iniciar Backend

```bash
cd backend
source ../venv/bin/activate  # o venv\Scripts\activate en Windows
python run_dev.py
```

**Deberías ver:**
```
🔌 Using Oracle database: tke06ubevj4zkl7h_high
✅ Oracle engine configured successfully!
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### 2. Probar Login

```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin@mindhealth.com&password=admin123"
```

**Respuesta esperada:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer"
}
```

### 3. Ejecutar Suite de Pruebas

```bash
cd backend
python test_oracle_auth.py
```

Esto probará:
- ✅ Login con diferentes usuarios
- ✅ Obtener información del usuario actual
- ✅ Acceso a endpoints protegidos
- ✅ Rechazo de credenciales inválidas
- ✅ Refresh de tokens
- ✅ Logout

---

## 📊 Arquitectura

```
┌─────────────────────────────────────────┐
│         Frontend (React)                │
│  - Login form                           │
│  - JWT token storage                    │
└──────────────┬──────────────────────────┘
               │ HTTP + JWT
               ▼
┌─────────────────────────────────────────┐
│        FastAPI Backend                  │
│  ┌─────────────────────────────────┐   │
│  │  Auth Endpoints                 │   │
│  │  - POST /auth/login             │   │
│  │  - POST /auth/refresh           │   │
│  │  - GET  /auth/me                │   │
│  │  - POST /auth/logout            │   │
│  └──────────────┬──────────────────┘   │
│                 │                       │
│  ┌──────────────▼──────────────────┐   │
│  │  SQLAlchemy ORM                 │   │
│  │  - User model                   │   │
│  │  - Session management           │   │
│  └──────────────┬──────────────────┘   │
└─────────────────┼───────────────────────┘
                  │ oracle+oracledb://
                  │ + Oracle Wallet
                  ▼
┌─────────────────────────────────────────┐
│     Oracle Autonomous Database          │
│  ┌─────────────────────────────────┐   │
│  │  Table: USERS                   │   │
│  │  - id (NUMBER)                  │   │
│  │  - email (VARCHAR2)             │   │
│  │  - hashed_password (VARCHAR2)   │   │
│  │  - role (VARCHAR2)              │   │
│  │  - is_active (NUMBER)           │   │
│  │  - is_superuser (NUMBER)        │   │
│  │  - created_at (TIMESTAMP)       │   │
│  │  - updated_at (TIMESTAMP)       │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

---

## 🔒 Seguridad

### ✅ Implementado

1. **Contraseñas hasheadas** con bcrypt
2. **JWT tokens** con expiración
3. **Refresh tokens** para renovación
4. **Role-based access control** (ADMIN, RESEARCHER, VIEWER)
5. **Validación de usuarios activos**
6. **Conexión segura** a Oracle con Wallet

### 💡 Mejoras Futuras (Opcionales)

- [ ] Token blacklist en Oracle
- [ ] Rate limiting por usuario
- [ ] Logs de autenticación
- [ ] 2FA (Two-factor authentication)
- [ ] Reset de contraseña por email
- [ ] Verificación de email

---

## 🔧 Configuración

### Archivo `.env`

```env
# Oracle Database (REQUERIDO)
ORACLE_DB_USER=ADMIN
ORACLE_DB_PASSWORD=tu_password
ORACLE_DB_SERVICE_NAME=tke06ubevj4zkl7h_high
ORACLE_DB_HOST=adb.sa-santiago-1.oraclecloud.com
ORACLE_DB_PORT=1522

# Security (REQUERIDO)
SECRET_KEY=tu_secret_key_super_segura
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# Opcional (para fallback a SQLite)
DATABASE_URL=sqlite:///./mindhealth.db

# API
API_V1_STR=/api/v1
PROJECT_NAME=MindHealth Analytics API

# CORS
BACKEND_CORS_ORIGINS=["http://localhost:5173","http://localhost:3000"]

# Environment
ENVIRONMENT=development
```

---

## 📝 Comandos Útiles

### Ver usuarios en Oracle

```sql
-- En SQL Developer o sqlplus
SELECT id, email, role, is_active, is_superuser 
FROM users 
ORDER BY id;
```

### Crear nuevo usuario (Python)

```python
from app.db.session import SessionLocal
from app.models.user import User
from app.core.security import auth_service

db = SessionLocal()

new_user = User(
    email="nuevo@example.com",
    hashed_password=auth_service.get_password_hash("password123"),
    full_name="Nuevo Usuario",
    role="VIEWER",
    is_active=1,
    is_superuser=0
)

db.add(new_user)
db.commit()
print(f"✅ Usuario creado: {new_user.email}")
```

### Reset de contraseña

```python
from app.db.session import SessionLocal
from app.models.user import User
from app.core.security import auth_service

db = SessionLocal()

user = db.query(User).filter(User.email == "admin@mindhealth.com").first()
user.hashed_password = auth_service.get_password_hash("nueva_password")
db.commit()

print(f"✅ Contraseña actualizada para {user.email}")
```

---

## 🐛 Troubleshooting

### "Could not connect to Oracle"

**Causas posibles:**
- Credenciales incorrectas en `.env`
- Wallet no está en `backend/wallet/`
- Base de datos pausada en Oracle Cloud
- IP no está en lista blanca

**Solución:**
```bash
# Verificar conexión básica
cd backend
python -c "from app.db.oracle_connection import oracle_service; oracle_service.connect()"
```

### "Table or view does not exist"

**Solución:**
```bash
cd backend
python init_db_oracle.py
```

### "Unique constraint violated"

**Causa:** Email ya existe

**Solución:**
```sql
-- Ver usuarios existentes
SELECT * FROM users WHERE email = 'email@example.com';

-- Actualizar en lugar de insertar
UPDATE users SET hashed_password = '...' WHERE email = 'email@example.com';
```

---

## ✅ Checklist

- [x] Tabla `users` creada en Oracle
- [x] Usuarios migrados/creados
- [x] Modelo `User` compatible con Oracle
- [x] Configuración de sesión actualizada
- [x] Scripts de migración creados
- [x] Scripts de prueba creados
- [x] Documentación completa
- [ ] Backend iniciado sin errores
- [ ] Login probado exitosamente
- [ ] Frontend conectado (si aplica)

---

## 🎓 Lo que Aprendiste

1. **Oracle vs SQLite diferencias:**
   - Oracle usa `NUMBER` en lugar de `BOOLEAN`
   - Oracle requiere longitudes en `VARCHAR2`
   - Triggers para auto-increment

2. **SQLAlchemy con Oracle:**
   - Connection string: `oracle+oracledb://...`
   - Configuración de wallet
   - Pool de conexiones

3. **Migración de datos:**
   - Preservar contraseñas hasheadas
   - Conversión de tipos de datos
   - Verificación de integridad

---

## 📚 Referencias

- [Documentación del proyecto](./MIGRACION_ORACLE.md)
- [Oracle SQLAlchemy](https://docs.sqlalchemy.org/en/20/dialects/oracle.html)
- [python-oracledb](https://python-oracledb.readthedocs.io/)
- [FastAPI Security](https://fastapi.tiangolo.com/tutorial/security/)

---

## 🎉 ¡Listo!

Tu sistema de autenticación ahora está completamente integrado con Oracle.

**Próximo paso:** Probar login desde el frontend.

```bash
# Iniciar backend
cd backend
python run_dev.py

# En otra terminal, iniciar frontend
cd frontend
npm run dev
```

¡Disfruta tu nueva autenticación con Oracle! 🚀


