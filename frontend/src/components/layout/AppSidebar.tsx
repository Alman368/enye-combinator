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
  DollarSign,
  User,
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
    title: 'General',
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
    title: 'Análisis de Costes',
    url: '/costes',
    icon: DollarSign,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <img src="/favicon.png" alt="Ñ Combinator" className="h-6 w-6" />
          <span className="font-semibold text-sm">Ñ Combinator</span>
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
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
            <User className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Usuario Admin</span>
            <span className="text-xs text-muted-foreground">admin@mindhealth.com</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

// Keep the old export for backwards compatibility
export default AppSidebar;

