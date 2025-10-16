/**
 * Main Layout Component
 *
 * Wrapper layout for all authenticated pages with Shadcn Sidebar
 * Uses React Router Outlet for nested routes
 */

import { Outlet } from 'react-router-dom';
import {
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { Header } from './Header';

const MainLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-auto p-4 pt-2 md:p-6 md:pt-3">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;

