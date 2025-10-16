# Cómo Usar el Logout

## 🚪 Ruta de Logout

La aplicación ahora tiene una ruta `/logout` que automáticamente:

1. ✅ Llama al endpoint del backend `/api/v1/auth/logout`
2. ✅ Limpia los tokens del localStorage
3. ✅ Elimina el header de Authorization
4. ✅ Redirige a la página de login

## 📍 Cómo Usar

### Opción 1: Navegación Directa
Simplemente navega a:
```
http://localhost:5173/logout
```

### Opción 2: Programáticamente
Desde cualquier componente con `useNavigate`:
```typescript
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate('/logout');
  };
  
  return <button onClick={handleLogout}>Cerrar Sesión</button>;
};
```

### Opción 3: Con Link
```typescript
import { Link } from 'react-router-dom';

<Link to="/logout">Cerrar Sesión</Link>
```

## 🔄 Flujo del Logout

```
Usuario va a /logout
    ↓
Se muestra "Cerrando sesión..."
    ↓
Se llama a authService.logout()
    ↓
Backend recibe POST /api/v1/auth/logout
    ↓
Backend registra el evento
    ↓
Tokens eliminados del localStorage
    ↓
Redirección a /login
```

## 🧪 Pruebas

1. **Hacer login**:
   - Ve a `/login`
   - Ingresa credenciales

2. **Probar logout**:
   - Navega manualmente a `/logout`
   - O añade un botón temporal

3. **Verificar**:
   - Deberías ser redirigido a `/login`
   - Los tokens deben estar eliminados (F12 → Application → Local Storage)
   - En la consola del backend verás: `User <email> logged out`

## 🎯 Próximos Pasos

Para una implementación completa, puedes:
- Añadir un botón de logout en el Header/Sidebar
- Crear un menú de usuario con opción de logout
- Implementar confirmación antes del logout

