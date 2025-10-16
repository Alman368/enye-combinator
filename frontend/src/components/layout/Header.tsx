/**
 * Header Component
 *
 * Main application header/navigation bar
 * Works with Shadcn Sidebar
 */

import { SidebarTrigger } from '@/components/ui/sidebar';

export function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 px-4">
      <SidebarTrigger className="-ml-1" />
    </header>
  );
}

export default Header;

