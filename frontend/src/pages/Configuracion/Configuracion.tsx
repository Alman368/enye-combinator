/**
 * Configuración Page
 *
 * Application settings and configuration
 */

import { Settings, User, Bell, Database, Shield, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Configuracion = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configuración</h2>
        <p className="text-muted-foreground">
          Gestiona las preferencias y configuración de la aplicación
        </p>
      </div>

      {/* Settings Sections */}
      <div className="grid gap-6">
        {/* User Settings */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Perfil de Usuario</h3>
              <p className="text-sm text-muted-foreground">Gestiona tu información personal</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium mb-1 block">Nombre</label>
                <input
                  type="text"
                  placeholder="Dr. Juan Pérez"
                  className="w-full px-3 py-2 rounded-lg border bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                <input
                  type="email"
                  placeholder="juan.perez@hospital.com"
                  className="w-full px-3 py-2 rounded-lg border bg-background"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Rol</label>
              <select className="w-full px-3 py-2 rounded-lg border bg-background">
                <option>Investigador</option>
                <option>Administrador</option>
                <option>Doctor</option>
                <option>Visualizador</option>
              </select>
            </div>
            <Button className="mt-2">Guardar Cambios</Button>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <Bell className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Notificaciones</h3>
              <p className="text-sm text-muted-foreground">Configura tus preferencias de notificaciones</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Alertas de nuevos datos', description: 'Recibir notificación cuando se añaden nuevos registros' },
              { label: 'Informes semanales', description: 'Resumen semanal de estadísticas' },
              { label: 'Alertas de costes', description: 'Notificaciones sobre presupuesto y costes' },
              { label: 'Actualizaciones del sistema', description: 'Notificaciones sobre actualizaciones' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div>
                  <p className="font-medium text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Data Settings */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-full bg-blue-100 p-3">
              <Database className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Datos y Exportación</h3>
              <p className="text-sm text-muted-foreground">Gestiona tus datos y exportaciones</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div>
                <p className="font-medium text-sm">Formato de fecha</p>
                <p className="text-xs text-muted-foreground">DD/MM/YYYY</p>
              </div>
              <Button variant="outline" size="sm">Cambiar</Button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div>
                <p className="font-medium text-sm">Formato de exportación predeterminado</p>
                <p className="text-xs text-muted-foreground">CSV</p>
              </div>
              <Button variant="outline" size="sm">Cambiar</Button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div>
                <p className="font-medium text-sm">Registros por página</p>
                <p className="text-xs text-muted-foreground">25 registros</p>
              </div>
              <Button variant="outline" size="sm">Cambiar</Button>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-full bg-orange-100 p-3">
              <Shield className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Seguridad y Privacidad</h3>
              <p className="text-sm text-muted-foreground">Protege tu cuenta y datos</p>
            </div>
          </div>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Cambiar Contraseña
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              Descargar Mis Datos
            </Button>
          </div>
        </div>

        {/* About */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-full bg-purple-100 p-3">
              <Settings className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Acerca de</h3>
              <p className="text-sm text-muted-foreground">MindHealth Analytics</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Versión:</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Última actualización:</span>
              <span className="font-medium">16 de octubre, 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Entorno:</span>
              <span className="font-medium">Desarrollo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;

