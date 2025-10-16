/**
 * AppSidebar Component
 *
 * Main navigation sidebar using Shadcn Sidebar component
 *
 * Features:
 * - Navigation links (Dashboard, Data Explorer, Reports)
 * - Active route highlighting (TODO: add routing)
 * - Collapsible menu (mobile-friendly)
 * - Icons from lucide-react
 */

import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Database,
  TrendingUp,
  DollarSign,
  Settings,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';

// Menu items for navigation - Ñ Combinator
const menuItems = [
  {
    title: 'Dashboard',
    subtitle: 'Inicio',
    url: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Datos y Registros',
    url: '/datos',
    icon: Database,
  },
  {
    title: 'Análisis Avanzado',
    url: '/analisis',
    icon: TrendingUp,
  },
  {
    title: 'Análisis de Costes',
    url: '/costes',
    icon: DollarSign,
  },
  {
    title: 'Configuración',
    url: '/configuracion',
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Ñ Combinator"
            className="h-8 w-8 object-contain"
            onError={(e) => {
              // Fallback if logo.png doesn't exist yet - hide the img
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Ñ Combinator</span>
            <span className="text-xs text-muted-foreground">Mental Health Analytics</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="text-xs text-muted-foreground">
          © 2025 Ñ Combinator
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

// Keep the old export for backwards compatibility
export default AppSidebar;

