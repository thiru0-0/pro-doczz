import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PlusSquare, Library } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TopNav } from './layout/TopNav';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Create Doc', href: '/create', icon: PlusSquare },
  { name: 'My Library', href: '/library', icon: Library },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex min-h-screen bg-gray-100 flex-col md:flex-row">
      {/* Top nav for small screens */}
      <div className="md:hidden">
        <TopNav />
      </div>
      {/* Sidebar Navigation for md+ */}
      <div className="hidden md:flex w-60 bg-white shadow-md flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">Pro DocZz</h1>
        </div>
        <nav className="flex-1 px-4 py-2 space-y-2">
          {navItems.map((item) => {
            const isActive = currentPath === item.href || 
              (item.href !== '/' && currentPath.startsWith(item.href));
            return (
              <Link
                to={item.href}
                key={item.name}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                  isActive
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      {/* Main Page Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}


